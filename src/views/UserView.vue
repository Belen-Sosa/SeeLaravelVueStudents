<template>
    <h1>El usuario esta logueado</h1>
    <button @click.prevent="logout">cerrar sesion de usuario</button>

</template>
<script setup >
import router from '@/router';
import useAuth from '@/store/auth'
router

const store= useAuth()

const logout=()=>{
    store.logout()
    router.push({name:'login'})
}
</script>