import { createRouter, createWebHistory } from "vue-router"
import SurveysListView from '../views/SurveysListView.vue'
import SurveyDetailView from '../views/SurveyDetailView.vue'
import SurveyResponseView from '../views/SurveyResponseView.vue'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import UserView from '../views/UserView.vue'
import useAuth from "@/store/auth"
const routes=[
    {
        path:'/',
        name:'home',
        component:HomeView,
        meta:{
            requireAuth: true
        }
       
    },
    {   path:'/login',
        name:'login',
        component:LoginView,
        meta:{
            requireAuth: false
        }
       
    },
    {   path:'/user',
        name:'user',
        component:UserView,
        meta:{
            requireAuth: true
        }
       
    },
    {   path:'/SurveysListView',
        name:'SurveysList',
        component:SurveysListView,
        meta:{
            requireAuth: true
        }
       
    },
    { path:'/post/:id',
        name:'SurveyDetail',
        component:SurveyDetailView,
        meta:{
            requireAuth: true
        }
       
    },
    
    {  
         path:'/SurveyResponse',
        name:'SurveyResponse',
        component: SurveyResponseView,
        meta:{
            requireAuth: true
        }
    }

]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})


router.beforeEach((to,from,next)=>{

    const auth = useAuth()
    const isAuth= auth.token

    if((to.meta.requireAuth) && isAuth== null){
        next('login')
    }else{
        next()
    }

})



export default router