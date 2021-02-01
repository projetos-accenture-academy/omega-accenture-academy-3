import Auth from "../../service/auth.js";
import baseURL from '../../service/baseURL.js';
import Constants from "../../service/constants.js";

import cssLoading from '../../css/loading.css';

import cssDashboard from '../../css/styles-dashboard.css';

import {fazerTransferencia} from './Transacoes.js'

const userData = JSON.parse(localStorage.getItem(Constants.userDataCollection));

const requestDashboard = async (initialDate = '', finalDate = '') => {
    if(userData){
        const {usuario: {login}, token}  = userData;
            
        const now = new Date();
        const thisMonth = `${now.getFullYear()}-${(now.getMonth() <= 9 ? '0' + (now.getMonth()+1) : now.getMonth()+1)}`;
        const lastDay = new Date(now.getFullYear(), thisMonth.substr(5,7), 0).getDate()
        const ini = initialDate ? initialDate : `${thisMonth}-01`;

        const final = finalDate ? finalDate : `${thisMonth}-${now.getMonth() == 2 ? '28' : lastDay}`;
        
        await axios
            .get(`${baseURL}dashboard?fim=${final}&inicio=${ini}&login=${login}`,  {
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


const modalFilter = `

    <div class="modal fade" id="modal-filter" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Filtro de lançamentos da conta</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body row">
                    <div class="container flex-column p-3">
                        <label for="birthday">Período de lançamentos:</label>
                        <div class="input-group mb-3 ">
                            <input type="date" class="form-control" id="initialDate" name="initialDate">
                            <span style="margin: 0 5px" class="d-flex align-items-center">à</span>
                            <input type="date" class="form-control" id="finalDate" name="finalDate">
                        </div>

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                        id="cancel-filter">Cancelar</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="apply-filter">Filtrar</button>
                </div>
            </div>
        </div>
    </div>
`


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
                    <div class="container mb-2 p-2">
                            <div class="container p-0 mt-2 d-grid gap-2 d-md-flex justify-content-md-between">
                                <div class="d-flex align-items-center">
                                    <h6 id="filter-label">Extrato do mês atual</h6>
                                </div>
                                <button class="btn btn-primary btn-sm" type="button" data-bs-toggle="modal"
                                    data-bs-target="#modal-filter">
                                    Filtros <i class="fas fa-filter"></i>
                                </button>

                                ${modalFilter}
                            </div>
                        </div>
                        <div class="container lancamentos">
                         
                        ${conta.lancamentos.length > 0 ?
                        conta.lancamentos.map(info => {
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
                    <div class="d-flex justify-content-between align-items-center flex-wrap">
                        <div
                            class="container header-dash p-0 pb-2 mt-2 d-md-flex justify-content-sm-between justify-content-md-between  align-items-center">
                            <h4 class="page-title">Extrato de lançamentos das contas</h4>
                            <div id="transactions" class="operations-group d-grid gap-2 d-flex justify-content-center justify-content-md-end">
                               
                            </div>
                        </div>
                    </div>
                    <div id="view-contas" class=" row p-0 m-0 mt-3 d-flex  justify-content-sm-between justify-content-evenly">
                        ${viewAccountItem(contaBancoDash, 'Conta Banco') + viewAccountItem(contaCreditoDash, 'Conta Corrent')}
                    </div>
                </div>
            `;
    
        }

        return view
    },
    after_render: async () => {
        fazerTransferencia()

        if(document.getElementById('apply-filter')){
            document.getElementById('apply-filter').addEventListener('click', async function(e){
                let iniDate = document.getElementById('initialDate').value
                let finDate = document.getElementById('finalDate').value
                if(iniDate != '' && finDate != ''){
                    await requestDashboard(iniDate, finDate)
                    const accountsRefreshed = JSON.parse(localStorage.getItem(Constants.userAccountStatements))
                    const {contaBanco: contaBancoDash, contaCredito: contaCreditoDash} = accountsRefreshed
                    const viewContas = null || document.getElementById('view-contas')

                    viewContas.innerHTML =  viewAccountItem(contaBancoDash, 'Conta Banco') + viewAccountItem(contaCreditoDash, 'Conta Corrent')
                    
                    if(document.getElementById('filter-label')){
                        const filterLabel = document.getElementById('filter-label')
                        
                        filterLabel.innerHTML = `${iniDate} à ${finDate}`
                        
                        iniDate = ""
                        finDate = ""
                    }
                   
                } else {
                    alert("Preencha os campos de datas (inicial e final)");
                }
            })
        }
    }
}

export default Dash;