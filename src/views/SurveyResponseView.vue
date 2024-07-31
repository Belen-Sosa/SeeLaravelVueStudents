<template>
    



<div class="centered-container">
  <div class="content">
    <h1  class=" shadow-text" >Gracias por responder la encuesta.</h1>
    <h2 class="text-gray-300  shadow-text m-2">Su respuesta ah sido guardada con exito.</h2>
    <router-link :to="{ name: 'SurveysList' }"   class="rounded-md p-2 bg-green-600  font-semibold text-gray-800 shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Volver al listado</router-link>

  </div>
</div>
</template>


<script setup>

</script>

<style scoped>
.centered-container {
  display: flex;
  justify-content: center;
  margin-top:50px;
  min-height: 100vh;
  color: white; /* Text color for better readability */
 

}

.content {
  text-align: center;
  padding-top: 10%; /* Increased padding for a larger content box */
  font-size:1.5rem; /* Increased font size for larger text */

}

.text-white {
  margin-top: 20px; /* Increased padding for a larger content box */
  color: white;
  padding: 30px 0px 30px 0; 

}



.shadow-text {
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.9); /* Shadow for the coordinator text */
}


</style>
