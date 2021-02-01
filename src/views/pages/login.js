import Auth from "../../service/auth.js";
import baseURL from '../../service/baseURL.js';
import Constants from "../../service/constants.js";
import Utils from "../../service/utils.js";
import loginImg from '../../images/login-omega.svg';


import loginCSS from '../../css/style_login.css'


const loginView = 
    `<div class="container">
        <div class="row mt-5 mb-5">
        <div class="col-md-6 m-auto">          
            <img src=${loginImg} class="img-fluid m-auto" width="80%" alt="Ilustração Õmega">
        </div>
        <div class="col-md-6 m-auto">
            <div class="card">
            <div class="fluid text-center pt-5">              
                <p class="login-text">Viva uma nova experiência!</p>
            </div>            
            <form class="p-5">
                <p id ='login-error-warning'></p>
                <div class="form-group">
                <label for="exampleInputEmail1">E-mail</label>
                <input id = 'username-input' type="email" class="form-control  mb-4" placeholder="Digite o seu e-mail ou nome de usuário...">                
                </div>
                <div class="form-group">
                <label for="senha">Senha</label>
                <input id='password-input' type="password" class="form-control  mb-4" placeholder="Digite a sua senha...">
                
                </div>              
                <div>
                <p>Ainda não tem uma conta? <a href="./cadastro.html">Cadastre-se!</a></p>
                </div>
                <div class="btn-container">
                <a id="btn-login" class="btn btn-primary"> Login </a>
                </div>
            </form>
            </div>
        </div>
        </div>
    </div> `;


let Login = 
{
    render: async () =>
    {
        //Checks if user is already authenticated; if so, redirect them to Dashboard

        let isAuth = await Auth.isAuthenticated();

        if(isAuth)
        {
            Utils.RedirectUser("#/dashboard");
        }


        return loginView;
    },

    after_render: async() =>
    {

        document.getElementById('btn-login').addEventListener('click', ()=>
        {
            let username = document.getElementById('username-input').value;
            let password = document.getElementById('password-input').value;

            console.log("Fazendo login...");
            axios.post(`${baseURL}login`,
                {
                    senha: password,
                    usuario: username
                }
                )
                .then
                (
                    res=> 
                    {
                        if(res.status == 200)
                        {

                            //Save user data in local browser variable for further use
                            localStorage.setItem(Constants.userDataCollection, JSON.stringify(res.data))
                                
                            Utils.RedirectUser('#/dashboard');
                            
                        }
                    }
                ).catch(err =>
                    {
                        
                        //Show error message for user
                        document.getElementById('login-error-warning').innerHTML = "Erro: Login e/ou senha incorretos."
                        //clean up password input
                        document.getElementById('password-input').value='';

                        //console.log("Erro ao realizar o login:", err);
        
                    })
            
                
        } );
    }
}

export default Login;