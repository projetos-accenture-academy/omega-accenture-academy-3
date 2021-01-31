import Auth from "../../service/auth.js";
import baseURL from '../../service/baseURL.js';
import Constants from "../../service/constants.js";

const userData = JSON.parse(localStorage.getItem(Constants.userDataCollection));

const requestDashboard = async () => {
    if(userData){
        const {usuario: {login}, token}  = userData;
        
        await axios
            .get(`${baseURL}dashboard?fim=2021-01-31&inicio=2021-01-01&login=${login}`,  {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            })
            .then(
                res =>  {
                    localStorage.setItem(Constants.userAccountStatements, JSON.stringify(res.data))
                    console.log('res', res.data)
                })
            .catch(err => {
                localStorage.removeItem(Constants.userAccountStatements)
                console.log('err', err)
            })
    }
}


const viewAccountItem = (conta, label) => {
    return `
    <div class="accordion col-md-6 mt-2" id="accordion">
        <div class="accordion-item shadow">
            <h2 class="accordion-header" id="heading151">
                <button class="accordion-button" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapse151" aria-expanded="true" aria-controls="collapse151">
                    <div class="col-6 justify-content-start d-flex">
                        <div>
                            ${label}
                        </div>
                    </div>
                    <div class="col-5 justify-content-end d-flex">
                        <div class="text-right p-2 w-75 bg-primary rounded-3 text-white">
                            Saldo: ${conta.saldo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                        </div>
                    </div>
                </button>
            </h2>
            <div id="collapse151" class="accordion-collapse collapse show" aria-labelledby="heading151"
                data-bs-parent="#accordion">
                <div class="accordion-body accordion-conta">
                    ${conta.lancamentos.length > 0 ?
                        `<div class="container mb-2 p-2">
                            <div class="container p-0 mt-2 d-grid gap-2 d-md-flex justify-content-md-end">
                                <button class="btn btn-primary btn-sm" type="button" data-bs-toggle="modal"
                                    data-bs-target="#modal-filter">
                                    Filtros <i class="fas fa-filter"></i>
                                </button>
                            </div>
                        </div>
                        <div class="container lancamentos">
                        ` 
                        +  conta.lancamentos.map(info => {
                                return `
                                    <div class="row justify-content-between">
                                        <div class="col-3">${info.data}</div>
                                        <div class="col-5">${info.descricao}</div>
                                        <div class="col-1 justify-content-center d-flex d-none d-md-block">
                                            <div><span class="badge bg-${info.tipo == 'R' ? 'success' : 'danger'}">${info.tipo}</span></div>
                                        </div>
                                        <div class="col-3 text-end valor-tipo-${info.valor}">${info.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</div>
                                    </div>
                                `
                            }).join('') 
                            : `<div class="h-100 text-center">Nenhum lançamento para esta conta</div>`}

                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}

const Dash = {
    render: async () => {
        await Auth.securePage();
        
        await requestDashboard();
        const userAccountsRaw = localStorage.getItem(Constants.userAccountStatements);
        
        let view = `<div class="error-dash">Não foi possível obter os dados do dashboard, por favor tente novamente.</div>`;

        if(userAccountsRaw){
                        
            const accounts = JSON.parse(userAccountsRaw);
            const {contaBanco: contaBancoDash, contaCredito: contaCreditoDash} = accounts;

            view =  `
                <div class="container">
                    <div class=" row p-0 m-0 mt-3 d-flex  justify-content-sm-between justify-content-evenly">
                        ${viewAccountItem(contaBancoDash, 'Conta Banco') + viewAccountItem(contaCreditoDash, 'Conta Corrent')}
                    </div>
                </div>
            `;
    
        }

        return view
    },
    after_render: async () => {
        
    }
}

export default Dash;