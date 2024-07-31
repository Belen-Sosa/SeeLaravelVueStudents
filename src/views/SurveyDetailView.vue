<template>
  <NavbarComponent />
  <div class="p-10">
    <div v-if="survey" class="m-10">
      <h1 class="title m-2 ml-5">{{ survey.title.toUpperCase() }}</h1>
      <p class="m-2 ml-5 text-gray-200 drop-shadow-md">
        Por favor responda el siguiente cuestionario sobre la materia de {{ survey.subject.name }} de {{ survey.subject.year }} año de la carrera {{ survey.career.name }}
      </p>
      <form @submit.prevent="submitSurvey" ref="surveyForm">
        <div class="space-y-12 m-5" v-for="question in survey.questions" :key="question.id">
          <!-- Single-choice question -->
          <div v-if="question.type_question_id == 1" class="pb-6">
            <div class="mt-2 space-y-10 content-data">
              <fieldset class="m-4">
                <div class="border-b">
                  <legend class="text-sm font-semibold leading-6 text-gray-900">{{ question.title }}</legend>
                  <p class="mt-1 text-sm leading-6 text-gray-600">Por favor, seleccione solo una opción.</p>
                </div>
                <div class="mt-3 space-y-3">
                  <div v-for="option in question.options" :key="option.id" class="flex items-center gap-x-3">
                    <input required v-model="responses[question.id]" :value="option.id" :id="`option-${option.id}`" :name="`option-${question.id}`" type="radio" class="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600">
                    <label :for="`option-${option.id}`" class="block text-sm font-medium leading-6 text-gray-900">{{ option.value }}</label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>

          <!-- Multiple-choice question -->
          <div v-if="question.type_question_id == 2" class="pb-6">
            <div class="mt-2 space-y-10 content-data">
              <fieldset class="m-4">
                <div class="border-b">
                  <legend class="text-sm font-semibold leading-6 text-gray-900">{{ question.title }}</legend>
                  <p class="mt-1 text-sm leading-6 text-gray-600">Por favor, seleccione una o más opciones.</p>
                </div>
                <div class="mt-3 space-y-3">
                  <div v-for="option in question.options" :key="option.id" class="relative flex gap-x-3">
                    <div class="flex h-6 items-center">
                      <input v-model="responses[question.id]" :value="option.id" :id="`checkbox-${option.id}`" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600">
                    </div>
                    <div class="text-sm leading-6">
                      <label :for="`checkbox-${option.id}`" class="font-medium text-gray-900">{{ option.value }}</label>
                    </div>
                  </div>
                </div>
              </fieldset>
              <!-- Display error message if validation fails -->
              <div v-if="validationErrors[question.id]" class="alert-error">
                Por favor, seleccione al menos una opción en esta pregunta.
              </div>
            </div>
          </div>

          <!-- Text question -->
          <div v-if="question.type_question_id == 3" class="pb-6">
            <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 content-data">
              <div class="col-span-full m-5">
                <label :for="`textarea-${question.id}`" class="text-sm font-semibold leading-6 text-gray-900">{{ question.title }}</label>
                <p class="mt-1 text-sm leading-6 text-gray-600">Por favor, escriba su respuesta.</p>
                <div class="mt-2">
                  <textarea required v-model="responses[question.id]" :id="`textarea-${question.id}`" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
          <router-link :to="{ name: 'SurveysList' }" class="py-2 px-4 rounded-md shadow-inner font-semibold text-black bg-gray-500 hover:bg-gray-800">volver atrás</router-link>
          <button type="submit" class="rounded-md bg-green-600 px-4 py-2 font-semibold text-black shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Enviar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SurveysService from '@/services/SurveysService';
import NavbarComponent from "../components/NavbarComponent.vue"

const route = useRoute();
const router = useRouter();
const service = new SurveysService();
const survey = ref(null);
const responses = ref({});
const validationErrors = ref({});

onMounted(async () => {
  const id = route.params.id;
  await service.fetchById(id);
  survey.value = service.getPosts().value;

  // Initialize the responses and validationErrors objects
  survey.value.questions.forEach(question => {
    if (question.type_question_id === 2) {
      responses.value[question.id] = [];
    } else {
      responses.value[question.id] = '';
    }
    validationErrors.value[question.id] = false;
  });
});

const submitSurvey = async () => {
  let isValid = true;

  survey.value.questions.forEach(question => {
    if (question.type_question_id === 2 && responses.value[question.id].length === 0) {
      validationErrors.value[question.id] = true;
      isValid = false;
    } else {
      validationErrors.value[question.id] = false;
    }
  });

  if (!isValid) {
    return;
  }

  // Clone the responses object to avoid unwanted mutations
  const response = JSON.parse(JSON.stringify(responses.value));

  // Remove empty responses
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

  if (result.success) {
    console.log('Redirigiendo a SurveyResponse...');
    router.push({ name: 'SurveyResponse' });
  }
};
</script>

