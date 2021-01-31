/**
 * IDs a serem utilizados para obter/salvar itens no localStorage
 * Exemplo: 
 *  - Obter os dados de login salvos no browser
 *      localStorage.getItem(userDataCollection)
 */
const Constants = {
    // Dados obtidos no login
    userDataCollection   : "@userDataCollection",

    // Planos de contas do usuário
    userAccountPlans     : "@userAccountPlans",

    // Dados do dashboard (extrato de transações)
    userAccountStatements : "@userAccountStatements",
};

export default Constants;