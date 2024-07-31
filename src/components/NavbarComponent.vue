<template>
  <div class="bg-neutral-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="shrink-0 flex items-center">
            <router-link class="nav-link" to="/">
              <ApplicationMark class="block h-9 w-auto" />
            </router-link>
          </div>
          <div class="hidden space-x- sm:-my-px sm:ms-10 sm:flex">
            <router-link class="nav-link" to="/"> Inicio </router-link>
          </div>
          <div class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
            <router-link class="nav-link" to="/SurveysListView">
              Encuestas
            </router-link>
          </div>
        
        </div>
        <div class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
            <router-link class="nav-link " to="/user"> Usuario </router-link>
          </div>
      </div>
    </div>
  </div>



  
</template>

<script setup>
import ApplicationMark from "../components/ApplicationMark.vue";
</script>

<style scoped>
.nav-link {
  @apply inline-flex items-center px-1 pt-1 border-b-2 border-green-400 text-sm font-medium leading-5 text-white focus:text-green-500  focus:outline-none focus:border-green-700 transition duration-150 ease-in-out  hover:text-green-700 hover:border-green-800  ;
  border-bottom: none ; /* Asegura que cualquier borde inferior se elimine */
  text-decoration: none ; /* Asegura que cualquier subrayado se elimine */
}
</style>
