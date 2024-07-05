<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0 text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
        <p class="mt-2 text-lg leading-8 text-gray-600">Learn how to grow your business with our expert advice.</p>
      </div>
      <div class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <article v-for="post in posts" :key="post.id" class="flex max-w-xl flex-col items-center justify-between text-center">
          <div class="flex items-center gap-x-4 text-xs">
            <time :datetime="post.start_date" class="text-gray-500">publicado el {{ post.start_date }}</time>
            <p class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">materia {{ post.subject_id }}</p>
          </div>
          <div class="group relative">
            <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900">
              {{ post.title }}
            </h3>
            <p class="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">{{ post.description }}</p>
          </div>
          <div class="relative mt-5 flex items-center gap-x-4">
            <div class="text-sm leading-6">
              <a class="px-2 py-2 bg-blue-500 text-white text-xs font-semibold rounded hover:bg-blue-600">
                <router-link :to="{name: 'SurveyDetail', params:{id:post.id }}">
                  Realizar encuesta
                </router-link>
                
              </a>

            </div>
           
          </div>
           <div class="w-full mt-3  text-xs text-left">
            <time :datetime="post.final_date" class="text-gray-500">finaliza el {{ post.final_date }}</time>
           </div>
        </article>
      </div>
    </div>
  </div>
  
</template>



<script setup>
    import  SurveysService from '@/services/SurveysService'
    import{ onMounted} from 'vue'
  
    const service= new SurveysService()
    //obtenemos la informacion del servicio 
    const posts = service.getPosts() 

        
    onMounted(async() => {
        await service.fetchAll()
    })


</script>


<style scoped>
</style>