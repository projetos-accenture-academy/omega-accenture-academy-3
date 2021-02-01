import Constants from './constants.js'

const Auth = {
    /**
     * Verifica se o usuário está autenticado
     */
    isAuthenticated: async () => { 

        let userData = JSON.parse(localStorage.getItem(Constants.userDataCollection));
        if(userData!=undefined)
        {
            const {token}  = userData;
            return token ? true: false;
        }
        
    },

    /**
     * Assegura que existe uma sessão salva, caso não exista, o usuário é redirecionado para o login
     */
    securePage: async () => {
        let userData = JSON.parse(localStorage.getItem(Constants.userDataCollection))

        if(!userData){
            window.location.replace('#/login'); 
        }
    }
}

export default Auth;