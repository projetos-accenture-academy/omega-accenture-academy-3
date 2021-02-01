import Auth from "../../service/auth.js";
import baseURL from '../../service/baseURL.js';
import Constants from "../../service/constants.js";


const viewLogin = () =>
{
    return
    `<div class="container">
        <div class="row mt-5 mb-5">
        <div class="col-md-6 m-auto">          
            <img src="img/login-omega.svg" class="img-fluid m-auto" width="80%" alt="Ilustração Õmega">
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
                <a id="btn-login" class="btn btn-primary" onclick="UserLogin()"> Login </a>
                </div>
            </form>
            </div>
        </div>
        </div>
    </div> `
}

let Login = 
{

}