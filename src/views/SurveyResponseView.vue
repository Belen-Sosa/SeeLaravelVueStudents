<template>
     <router-link to="/"> Home </router-link>
    
    <router-link to="/SurveysListView"> Surveys </router-link>
    <router-link to="/login"> Login </router-link>
<h1>Gracias por responder la encuesta.</h1>


<router-link :to="{ name: 'SurveysList' }">volver al listado</router-link>
</template>


<script setup>

</script>