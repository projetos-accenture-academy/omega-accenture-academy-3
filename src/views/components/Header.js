import Constants from '../../service/constants';
import Auth from '../../service/auth'

let Header = {
    render: async () => {
        const userData = JSON.parse(localStorage.getItem(Constants.userDataCollection));

        const firstName = userData ? userData.usuario.nome.split(' ')[0] : '<vazio>' ;
        
        const viewAdmin = `<li class="nav-item">
                                    <a class="nav-link" href="/#/dashboard">Dashboard</a>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        Olá, ${firstName}
                                    </a>
                                    <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <li><a class="dropdown-item">Dados pessoais</a></li>
                                        <li><a class="dropdown-item">Alterar senha</a></li>
                                        <li><a class="dropdown-item" id="logout">Sair</a></li>
                                    </ul>
                                </li>`

        const viewCommon = `<li class="nav-item">
                                <a class="nav-link" href="/#/home">Home</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/#/login">Login</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/#/cadastro">Cadastre-se</a>
                                </li>`

        let view = `
            <nav class="navbar navbar-expand-lg navbar-light bg-light p-3 mb-4">
                <div class="container d-flex justify-content-between">
                    <a class="navbar-brand logo m-0" id="logo" href="#">
                        Ωmega Bank
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul class="navbar-nav ">
                        ${await Auth.isAuthenticated() 
                            ?  viewAdmin : viewCommon
                        }
                        </ul>
                    </div>
                </div>
            </nav>
        `;
        
        return view
    },
    after_render: async () => { 
        if(document.getElementById('logout'))
            document.getElementById('logout').addEventListener('click', () => {
                localStorage.clear()
                window.location.replace('#/login');
            })
    }

}

export default Header;