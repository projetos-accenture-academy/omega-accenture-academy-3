import baseURL from '../../service/baseURL.js';


let cadastro = {
    render : async () => {
        let view = `
        <div class="container d-flex">
            <div class="col">
                <div class="md-12">
                   
                </div>
            </div>
            <div class="col">
                <div class="md-6">
                    <input type="text" id="cpf" maxlength="11" placeholder="Insira seu CPF" class="form-control">
                    <input type="text" id="username" placeholder="name" class="form-control">
                    <input type="text" id="fname" placeholder="email" class="form-control">
                    <input type="password" id="password" placeholder="password" class="form-control">
                    <input type="password" id="re_password" placeholder="password" class="form-control"> 
                    <button id="submit_new_register" class="form-control btn btn-outline-info">Cadastrar</button>
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
