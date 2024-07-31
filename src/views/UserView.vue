<template>
   
   <NavbarComponent />

<div class="centered-container  ">
  <div class="content ">
    <div class="bg-form-background"> <h1 class="text-white welcome shadow-text"> <v-icon name="io-person" class="icon-color icon-shadow " />
        {{user}}</h1>
    <h2 class="text-gray-300 shadow-text">Estudiante</h2>
  
     <button @click.prevent="logout"  class="rounded-md p-2 m-10 bg-green-600  font-semibold text-gray-800 shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">cerrar sesion de usuario</button></div>
   
  </div>
</div>

</template>
<script setup >
import router from '@/router';
import useAuth from '@/store/auth'
router
import NavbarComponent from "../components/NavbarComponent.vue"

const store= useAuth()


const user= store.name
const logout=()=>{
    store.logout()
    router.push({name:'login'})
}
</script>

<style scoped>
.centered-container {
  display: flex;
  justify-content: center;
  margin-top:40px;


  color: white;


}

.content {
  text-align: center;

  font-size:1.5rem; 

  padding:30px;


}

.text-white {
  margin-top: 20px;
  color: white;
  

}

.icon-color {
  margin-right: 10px;
  margin-bottom: 5px;
}


.welcome {
  font-size: 2rem; 
  font-weight: bold; 
}
.shadow-text {
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.9); 
}

.icon-color {
  color: rgb(25, 185, 25);
}

.icon-shadow {
  filter: drop-shadow(0 4px 6px rgb(0, 0, 0)); /* Ajusta el sombreado del ícono */
}


/* Fondo del formulario */
.bg-form-background {
    background-color: rgba(0, 0, 0, 0.5); /* Fondo con opacidad */
    padding: 2rem; /* Espaciado opcional alrededor del formulario */
    border-radius: 0.5rem; /* Bordes redondeados opcional */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* Sombra opcional */
 

}
</style>
