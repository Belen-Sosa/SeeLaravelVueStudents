<template>
    <NavbarComponent/>

  <div class="centered-container">
    <div class="content">
      <h1 class="text-white welcome shadow-text">¡Bienvenido!</h1>
      <h2 class="text-gray-200 shadow-text">Estudiante</h2>
      <span class="span shadow-text">
        <v-icon name="io-person" class="icon-color icon-shadow " />
         {{user}}
      </span>
    </div>
  </div>

</template>

<script  setup>
import NavbarComponent from "../components/NavbarComponent.vue"
import useAuth from '@/store/auth';
import { addIcons } from "oh-vue-icons";
import { IoPerson } from "oh-vue-icons/icons";

addIcons(IoPerson);

const store = useAuth();

const user= store.name
</script>

<style scoped>
.centered-container {
  display: flex;
  justify-content: center;
  margin-top:40px;
  min-height: 100vh;
  color: white; /* Text color for better readability */
 

}

.content {
  text-align: center;
  padding-top: 60px; /* Increased padding for a larger content box */
  font-size:1.5rem; /* Increased font size for larger text */

}

.text-white {
  margin-top: 20px; /* Increased padding for a larger content box */
  color: white;
  padding: 30px 0px 30px 0; 

}

.icon-color {
  color: #fff; /* Icon color */
  margin-right: 10px;
  margin-bottom: 5px;
}

.span{
  margin:30px;
}

.welcome {
  font-size: 4rem; /* Adjust this value to make the text larger or smaller */
  font-weight: bold; /* Optional: Make the text bold */
}
.shadow-text {
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.9); /* Shadow for the coordinator text */
}

.icon-color {
  color: rgb(25, 185, 25);
}

.icon-shadow {
  filter: drop-shadow(0 4px 6px rgb(0, 0, 0)); /* Ajusta el sombreado del ícono */
}
</style>
