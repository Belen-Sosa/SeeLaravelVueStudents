<template>
  <div>
    <h2>Esta es la encuesta</h2>
    <div v-if="survey">
      <h1 class="font-semibold text-xl text-gray-800 leading-tight">
        {{ survey.title }}
      </h1>
      <p class="mt-2">
        Por favor responda el siguiente cuestionario sobre la materia de {{ survey.subject?.name }} perteneciente a {{ survey.subject?.year }} año de la carrera {{ survey.career?.name }}
      </p>

      <form @submit.prevent="submitSurvey" ref="surveyForm">
        <div class="space-y-12" v-for="question in survey.questions" :key="question.id">
          <!-- Pregunta de tipo opción única -->
          <div v-if="question.type_question_id == 1" class="border-b border-gray-900/10 pb-12">
            <div class="mt-4 space-y-10">
              <fieldset>
                <legend class="text-sm font-semibold leading-6 text-gray-900">{{ question.title }}</legend>
                <p class="mt-1 text-sm leading-6 text-gray-600">Por favor, seleccione solo una opción.</p>
                <div class="mt-6 space-y-6">
                  <div v-for="option in question.options" :key="option.id" class="flex items-center gap-x-3">
                    <input required v-model="responses[question.id]" :value="option.id" :id="`option-${option.id}`" :name="`option-${question.id}`" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600">
                    <label :for="`option-${option.id}`" class="block text-sm font-medium leading-6 text-gray-900">{{ option.value }}</label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>

          <!-- Pregunta de tipo opción múltiple -->
          <div v-if="question.type_question_id == 2" class="border-b border-gray-900/10 pb-12">
            <div class="mt-4 space-y-10">
              <fieldset>
                <legend class="text-sm font-semibold leading-6 text-gray-900">{{ question.title }}</legend>
                <p class="mt-1 text-sm leading-6 text-gray-600">Por favor, seleccione una o más opciones.</p>
                <div class="mt-3 space-y-3">
                  <div v-for="option in question.options" :key="option.id" class="relative flex gap-x-3">
                    <div class="flex h-6 items-center">
                      <input v-model="responses[question.id]" :value="option.id" :id="`checkbox-${option.id}`" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                    </div>
                    <div class="text-sm leading-6">
                      <label :for="`checkbox-${option.id}`" class="font-medium text-gray-900">{{ option.value }}</label>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
            <div v-if="validationError" class="text-red-500">Por favor, seleccione al menos una opción en cada pregunta de tipo opción múltiple.</div>
          </div>
       

          <!-- Pregunta de tipo texto -->
          <div v-if="question.type_question_id == 3" class="border-b border-gray-900/10 pb-12">
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div class="col-span-full">
                <label :for="`textarea-${question.id}`" class="text-sm font-semibold leading-6 text-gray-900">{{ question.title }}</label>
                <p class="mt-1 text-sm leading-6 text-gray-600">Por favor, escriba su respuesta.</p>
                <div class="mt-2">
                  <textarea required v-model="responses[question.id]" :id="`textarea-${question.id}`" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
       
        <button type="submit" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Enviar</button>
      </form>
    </div>
    <router-link :to="{ name: 'SurveysList' }">volver atrás</router-link>
  </div>
  <h2>{{ responses }}</h2>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SurveysService from '@/services/SurveysService';

const route = useRoute();
const router = useRouter();
const service = new SurveysService();
const survey = ref(null);
const responses = ref({});
const validationError = ref(false);

onMounted(async () => {
  const id = route.params.id;
  await service.fetchById(id);
  survey.value = service.getPost().value;

  // Inicializa el objeto responses con las preguntas
  survey.value.questions.forEach(question => {
    if (question.type_question_id === 2) {
      responses.value[question.id] = [];
    } else {
      responses.value[question.id] = '';
    }
  });
});

const submitSurvey = async () => {
  // Validar que al menos una opción sea seleccionada en cada pregunta de tipo opción múltiple
  let isValid = true;
  survey.value.questions.forEach(question => {
    if (question.type_question_id === 2 && responses.value[question.id].length === 0) {
      isValid = false;
    }
  });

  if (!isValid) {
    validationError.value = true;
    return;
  } else {
    validationError.value = false;
  }

  // Clonar el objeto responses para evitar mutaciones no deseadas
  const response = JSON.parse(JSON.stringify(responses.value));

  // Eliminar respuestas vacías
  Object.keys(response).forEach(key => {
    if (Array.isArray(response[key]) && response[key].length === 0) {
      delete response[key];
    } else if (typeof response[key] === 'string' && response[key].trim() === '') {
      delete response[key];
    }
  });

  console.log(response);
  const result = await service.submitSurveyResponse(response);
  console.log(result);

  // Redirigir a la vista de lista de encuestas si la respuesta fue exitosa
  if (result.success) {
    console.log('Redirigiendo a SurveyResponse...');
    router.push({ name: 'SurveyResponse' });
  }
};
</script>
