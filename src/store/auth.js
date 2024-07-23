import {defineStore} from 'pinia'

const useAuth= defineStore('auth',{
    state: ()=>{
        return{
            token:null,
            baseURL: 'http://127.0.0.1:8000/api',
            subjects_register:null,
           
        }
    },
    actions:{ 

        async login(email,password){
            const uri= `${this.baseURL}/login`

            const rawResponse= await fetch(uri,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    'email':email,
                    'password':password
                })
            })


            const response= await rawResponse.json() 
        
            console.log(response)
            if ('message' in response && response.message === 'Unauthorized'){
          
          
                this.token=""
                return false;  
            }else {
        
                this.token = response.token;
                console.log("entro aka",response.token)
                console.log(  "response")
                console.log(  response)
              

                this.subjects_register=response.subjects_register
          
                return true;
            } 
       
        },
        logout(){
            this.token= null
        },

      


    }


})


export default useAuth