import { ref } from 'vue';


class SurveysService{
       posts;
       post;

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
            const url = 'http://127.0.0.1:8000/api/surveys'
            const response = await fetch(url)
            const json = await response.json()  
            this.posts.value = await json 

        }catch(error){
            console.log(error)
        }
        
     }


     async fetchById(id){

      try{
          const url =`http://127.0.0.1:8000/api/surveys/${id}`
          const response = await fetch(url)
          const json = await response.json()  
          this.post.value = await json 
          

      }catch(error){
          console.log(error)
      }
      
     }



      // Nuevo método para enviar los datos del formulario
    async submitSurveyResponse( response) {
        try {
            const url = `http://127.0.0.1:8000/api/results`;
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
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