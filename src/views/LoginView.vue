<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="mt-40 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6 bg-form-background" action="#" method="POST">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-white">Email</label>
          <div class="mt-2">
            <input v-model="email" id="email" name="email" type="email" required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-white">Contraseña</label>
          </div>
          <div class="mt-2">
            <input v-model="password" id="password" name="password" type="password" required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button type="submit" @click.prevent="authUser"
            class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Iniciar
            sesión</button>
        </div>
        
      
      </form>
       <!-- Alert Message -->
       <div v-if="feedback" class="alert-error">
          <p>{{ feedback }}</p>
        </div>
    </div>
     
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AuthService from '../services/AuthService'
import useAuth from '@/store/auth';
import router from '@/router';

let email = ref("");
let password = ref("");
let feedback = ref("")

const store = useAuth();

const authUser = async () => {
  const auth = new AuthService();
  const success = await store.login(email.value, password.value);
  if (success) {
    console.log(auth.getJwt().value);
    router.push({ name: 'home' });
  } else {
    feedback.value = "Error. La contraseña o el correo son incorrectos.";
  }
}
</script>

<style scoped>




.relative {
    position: relative;
}




.bg-transparent {
    background-color: transparent;
}
/* Fondo del formulario */
.bg-form-background {
    background-color: rgba(0, 0, 0, 0.5); /* Fondo con opacidad */
    padding: 1rem; /* Espaciado opcional alrededor del formulario */
    border-radius: 0.5rem; /* Bordes redondeados opcional */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* Sombra opcional */
}
</style>