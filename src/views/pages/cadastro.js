import baseURL from '../../service/baseURL.js';


let cadastro = {
    render : async () => {
        let view = `
        <div class="container ">

            <div class="row justify-content-center">

                <div class="col-md-6 col-sm-12 col-xs-12">
                   
                </div>
            
            
                <div class="col-md-6 col-sm-12 col-xs-12">
                    <input type="text" id="cpf" maxlength="11" placeholder="Insira o seu CPF" class="form-control mb-3">
                    <input type="text" id="login" placeholder="Nome de usuário (apelido)" class="form-control mb-3">
                    <input type="text" id="fname" placeholder="Escreva aqui o seu email" class="form-control mb-3">
                    <input type="password" id="password" placeholder="Digite uma senha" class="form-control mb-3">
                    <input type="password" id="re_password" placeholder="Confirme a sua senha" class="form-control mb-3"> 
                    <button id="submit_new_register" class="form-control btn btn-outline-dark"><b>Cadastrar</b></button>
                </div>
                
            </div>
        </div>
        `

        return view
    },
    after_render: async () => {
        document.getElementById('submit_new_register').addEventListener('click', () => {
            let nameVal = document.getElementById('fname').value,
                userMail = document.getElementById('username').value,
                passwordVal = document.getElementById('password').value,
                RepasswordVal = document.getElementById('re_password').value,
                CPF = document.getElementById('cpf').value.replace(/[^\d]/g, "")
                console.log(CPF)
            
            if ( passwordVal === RepasswordVal ){

                axios.post(`${baseURL}usuarios`, {
                    cpf: CPF,
                    login: userMail,
                    nome: nameVal,
                    senha: passwordVal
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then( res => {
                    if ( res.status === 200 ){
                        window.location.replace('#/login')
                    }
                })

            } else {
                alert('confira sua senha!')
            }
        })
    }
}

export default cadastro;
