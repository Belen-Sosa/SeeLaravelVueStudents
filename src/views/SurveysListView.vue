<template>
  <NavbarComponent />
  <div class="p-6">
    <div class="p-6 ">
      <div class="mx-auto text-center">
        <h2 class="text-3xl mt-20 font-bold tracking-tight text-white sm:text-4xl">Encuestas</h2>
        <p class="mt-2 text-lg leading-8 text-gray-200">Aquí podrá ver todas las encuestas disponibles para usted.</p>
      </div>
      <div
        class="mx-auto  grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16   sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <article v-for="post in posts" :key="post.id" 
          class="content-data flex flex-col justify-between text-center p-5 rounded-lg shadow-md">
          <div class="flex items-center gap-x-4 text-xs border-b border-gray-300 ">
            <time :datetime="post.start_date" class="text-gray-500 pl-5">Publicado el {{ post.start_date }}</time>
            <p class="p-1 mb-1 font-medium text-gray-600 rounded bg-slate-300">{{
              post.subject.name }}</p>
          </div>

          <div class="group relative">
            <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900">
              {{ post.title }}
            </h3>
            <p class="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">{{ post.description }}</p>
          </div>
          <div class="relative mt-5 flex items-center gap-x-4  border-b border-gray-300">
            <div class="text-sm leading-6 mx-auto mb-5">
              <router-link class="px-2 py-2 bg-blue-500 text-xs rounded hover:bg-blue-600 border-link text-white"
                :to="{ name: 'SurveyDetail', params: { id: post.id } }">
                Realizar encuesta
              </router-link>
            </div>
          </div>
          <div class="w-full mx-auto text-xs mt-2 text-left pb-2 ">
            <time :datetime="post.final_date" class="text-gray-500 pl-5">Finaliza el {{ post.final_date }}</time>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import SurveysService from '@/services/SurveysService'
import { onMounted } from 'vue'
import NavbarComponent from "../components/NavbarComponent.vue"

const service = new SurveysService()
// Obtenemos la información del servicio 
const posts = service.getPosts()
console.log('posts', posts)

onMounted(async () => {
  await service.fetchAll()
})
</script>

<style scoped>
.border-link {
  border-bottom: none;
  text-decoration: none;
}

</style>
