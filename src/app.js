import Utils from './service/utils.js';
import Footer from './views/components/Footer.js';
import Header from './views/components/Header.js';
import Loading from './views/components/Loading.js';
import cadastro from './views/pages/cadastro.js';
import Dash from './views/pages/Dash.js';
import Error404 from './views/pages/Error404.js';
import Login from './views/pages/login.js'
  



// Utils
// Lista de rotas com suporte para full page, assim se fullPage for 'TRUE',
// o header e o footer não serão carregados
// 
let routes = {
    '/':          {route: Home, fullPage: false},
    '/home':     {route: Home, fullPage: false},
    '/login':     {route: Login, fullPage: false},
    '/cadastro':     {route: cadastro, fullPage: false},
    '/dashboard': {route: Dash, fullPage: false}
}


// O código do roteador. Pega um URL, verifica a lista de rotas com suporte e, em seguida, renderiza a página de conteúdo correspondente.
const router = async () => {

    // Elemento de visualização de carregamento Lazy Load:
    const header = null || document.getElementById('header');
    const content = null || document.getElementById('container');
    const footer = null || document.getElementById('footer');
    

    // Obtenha o URl do navegador
    let request = Utils.parseRequestURL()

    // Analise o URL e se ele tiver uma parte de id, altere-o com a string ": id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    
    if(routes[parsedURL] && !routes[parsedURL].fullPage){
        header.innerHTML = await Header.render();
        await Header.after_render();
        
        // Exibe um loading enquanto a da rota não é renderizada
        content.innerHTML = await Loading.render();

        footer.innerHTML = await Footer.render();
        await Footer.after_render();
    } else{
        header.innerHTML = '';
        footer.innerHTML = '';
    }


    // Obtenha a página de nosso hash de rotas com suporte.
    // Se o URL analisado não estiver em nossa lista de rotas compatíveis, selecione a página 404
    // let page = routes[parsedURL] ? routes[parsedURL].route : Error404
    
    if(routes[parsedURL]){ 
       let page =routes[parsedURL].route 
       content.innerHTML = await page.render();
       await page.after_render();
    }
    else { console.log('1')
        header.innerHTML = await Header.render();
        await Header.after_render();
        
        content.innerHTML = await Error404.render();

        footer.innerHTML = await Footer.render();
        await Footer.after_render();
    }
  
}

// Observa a mudança de hash:
window.addEventListener('hashchange', router);

// Observa o carregamento da página:
window.addEventListener('load', router);
