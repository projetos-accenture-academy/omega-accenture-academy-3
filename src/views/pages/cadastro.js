import baseURL from '../../service/baseURL.js';






let cadastro = {


    render : async () => {
        let view = `
        <div class="container ">
        <div id="resultado"></div>
        
            <div class="row justify-content-center">

                <div class="col-md-6 col-sm-12 col-xs-12 m-auto">
                <img src="/img/signup.svg" class="img-fluid m-auto" width="100%" />
                </div>
            
            
                <div class="col-md-6 col-sm-12 col-xs-12 m-auto" style="background-color:#f0f0f0;border-radius:15px;">
                <div id='cadForm'>
                    <input type="text" id="cpf" maxlength="11" placeholder="Insira o seu CPF" class="form-control mb-3">
                    <input type="text" id="username" placeholder="Nome de usuário (apelido)" class="form-control mb-3">
                    <input type="text" id="fname" placeholder="Escreva aqui o seu email" class="form-control mb-3">
                    <input type="password" id="password" placeholder="Digite uma senha" class="form-control mb-3">
                    <input type="password" id="re_password" placeholder="Confirme a sua senha" class="form-control mb-3"> 
                    <button id="submit_new_register" class="form-control btn btn-outline-dark"><b>Cadastrar</b></button>
                </div>
                </div>
                
            </div>
        </div>
        `

        return view
    },
    after_render: async () => {


        function TestaCPF(strCPF) {
            var Soma;
            var Resto;
            var i;
            Soma = 0;
          if (strCPF == "00000000000") return false;
        
          for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
          Resto = (Soma * 10) % 11;
        
            if ((Resto == 10) || (Resto == 11))  Resto = 0;
            if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
        
          Soma = 0;
            for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
            Resto = (Soma * 10) % 11;
        
            if ((Resto == 10) || (Resto == 11))  Resto = 0;
            if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
            return true;
        }
        









        document.getElementById('submit_new_register').addEventListener('click', () => {
            let nameVal = document.getElementById('fname').value,
                userMail = document.getElementById('username').value,
                passwordVal = document.getElementById('password').value,
                RepasswordVal = document.getElementById('re_password').value,
                CPF = document.getElementById('cpf').value.replace(/[^\d]/g, "")
                console.log(CPF)


                if(passwordVal!=RepasswordVal){
                    document.getElementById('resultado').innerHTML='<p class="lead text-center">Os dois campos de senhas <b>devem conter o mesmo conteúdo</b>.</p>'
                }
                else if(nameVal=='' && userMail=='' && passwordVal=='' && RepasswordVal==''){
                    document.getElementById('resultado').innerHTML="<p class='lead text-center'>Todos os campos precisam estar preenchidos</p>";
                }
                else if(!TestaCPF(CPF)){
                    document.getElementById('resultado').innerHTML="<p class='lead text-center'>Necessário um CPF válido</p>";
                }
            
                else if ( passwordVal === RepasswordVal ){

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
