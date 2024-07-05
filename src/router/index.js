import { createRouter, createWebHistory } from "vue-router"
import SurveysListView from '../views/SurveysListView.vue'
import SurveyDetailView from '../views/SurveyDetailView.vue'
import SurveyResponseView from '../views/SurveyResponseView.vue'

const routes=[
    {
        path:'/',
        redirect:{ name: 'SurveysList' }
       
    },
    {   path:'/SurveysListView',
        name:'SurveysList',
        component:SurveysListView
    },
    { path:'/post/:id',
        name:'SurveyDetail',
        component:SurveyDetailView
    },
    
    {  
         path:'/SurveyResponse',
        name:'SurveyResponse',
        component: SurveyResponseView
    }

]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router