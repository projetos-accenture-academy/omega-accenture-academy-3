
const Auth = {
    /**
     * Verifica se o usuário está autenticado
     */
    isAuthenticated: async () => { 
        return localStorage.getItem('@token')
    },

    /**
     * Assegura que existe uma sessão salva, caso não exista, o usuário é redirecionado para o login
     */
    securePage: async () => {
        if(!localStorage.getItem('@token')){
            window.location.replace('#/login'); 
        } 
    }
}

export default Auth;