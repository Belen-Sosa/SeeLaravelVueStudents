
import {ref} from 'vue';
class AuthService{

    constructor(){
        this.jwt= ref('')
        this.error= ref('')

    
    }

    getJwt(){
        return this.jwt
    }

    getError(){
        return this.error
    }


    async login(email, password ){
        try {

             
            const res = await fetch('http://127.0.0.1:8000/api/login',{
                method: 'POST',
                headers:{

                    'Accept': 'application/json',
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify({
                    email:email,
                    password:password
                })
            })
            
            const response= await res.json() 
            console.log('Response:', response); // Add this line for debugging

            if ('message' in response && response.message === 'Unauthorized'){
             
                console.log('Login failed'); // Add this line for debugging
                this.error.value = 'Login fail';
                return false;  
            }else if ('token' in response) {
                console.log('Login success'); // Add this line for debugging
                this.jwt.value = response.token;
                return true;
            } 
       

        } catch (error) {
            console.log(error)
        }
    }

}

export default AuthService