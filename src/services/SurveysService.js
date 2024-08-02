import { ref } from 'vue';
import useAuth from '@/store/auth';



class SurveysService{
       posts;
       post;
       store= useAuth()
     // cuando llamemos el servicio a traves de un componente nos generar un posts vacio al comienzo a traves del constructor 
     constructor(){

        this.posts= ref([])
        this.post=ref({})

     }

     //vamos a poder solicitar los posts de las encuestas que tenemos en nuestro sistema 

     getPosts(){
        return this.posts 
     }

     //vamos a poder solicitar una encuesta en especifico que tenemos en nuestro sistema 

     getPost(){
      return this.post 
   }
   

     //obteniendo la informacion de la API 

     async fetchAll(){

        try{
             const uri= `${this.store.baseURL}/api_surveys`

            const rawResponse= await fetch(uri,{
                method:'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization':`Bearer ${this.store.token}`
                }
               
              
            })


            const response= await rawResponse.json()

            this.posts.value = await response 

            console.log("surveys:",this.posts.value)


            // Obtener los IDs de las materias en las que el usuario está inscrito
            const userSubjectIds = this.store.subjects_register.map(item => item.subject.subject_id);

            console.log("userSubjectIds:",userSubjectIds)
        
            // Filtrar las encuestas según las materias del usuario
            const filteredSurveys = this.posts.value.filter(survey => userSubjectIds.includes(survey.subject_id));
            
            this.posts.value= filteredSurveys
          
            console.log("filteredSurveys",filteredSurveys)


         

        }catch(error){
            console.log(error)
        }
        
     }


     async fetchById(id){

      try{
         
        


          const uri= `${this.store.baseURL}/api_surveys/${id}`

          const rawResponse= await fetch(uri,{
              method:'GET',
              headers:{
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization':`Bearer ${this.store.token}`
              }
             
            
          })


          const response= await rawResponse.json()

          this.posts.value = await response 



          

      }catch(error){
          console.log(error)
      }
      
     }



      // Nuevo método para enviar los datos del formulario
    async submitSurveyResponse( response) {
        try {
            
            const url = `${this.store.baseURL}/results`;
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept':'application/json',
                    'Authorization': `Bearer ${this.store.token}`
                   
                },
                body: JSON.stringify(response)
            });
            const json = await res.json();
            return json;
        } catch (error) {
            console.log(error);
        }
    }








    
}


    export default SurveysService