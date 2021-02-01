import homeCSS from '../../css/style_home.css'
import bankLogo from '../../images/bank-logo.png'


    const homeView = 
    `
    <!--First Container-->
    <div class="container">
        <div class="row mt-5 mb-5">

            <div class="col-md-6 m-auto">
                <div class="card shadow">
                    <h2 class="mt-5 mb-4 text-center">Bem vindo(a) ao Ωmega Bank!</h2>
                    <div class="fluid text-center pt-5">
                        <p>Bem vindo(a) ao Ωmega Bank, seu último destino quando se trata de bancos!</p>
                        <p>Se for um cliente, clique <a href="#/login.html">aqui</a> para abrir a página de login.</p>
                        <p>Caso queira conhecer mais sobre nosso banco, <a href="#bank-information">siga abaixo</a> para
                            um tour sobre nossa instituição!</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6 m-auto p-3">
                <!--<img src="https://assets.website-files.com/5ff79f3ebebf6b12f6b7747f/5ffe04fc6284b7e90070d985_logo-gama-academy.png" class="img-fluid m-auto" width="100%" alt="Imagem responsiva">-->
                <img src=${bankLogo} class="img-fluid m-auto" width="100%" alt="Desafio 6">
            </div>
        </div>
    </div>

    <!--Parallax Section-->
    <div id="bank-information" class="container-parallax parallax-img-v1">
        <div class="container content-default text-center content-align content-parallax-data">

            <div class="card rounded">
                <br>
                <h2 class="sub-logo">Vantagens de usar o Ômega Bank:</h2>

                <div id="card-group1" class="d-flex row p-4">

                    <div class="p-2 col-md-4">
                        <div class="card">
                            <img class="card-img rounded mx-auto d-block"
                                src="https://image.freepik.com/free-vector/financial-investments-stock-market_101179-280.jpg"
                                class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title title">Investimentos conscientes</h5>
                                <br>
                                <p class="card-text">Nunca brincaremos com seu dinheiro. Só sugerimos os investimentos
                                    que nós mesmos faríamos, pois não queremos que você tenha prejuízos.</p>
                            </div>
                        </div>
                    </div>
                    <div class="p-2 col-md-4">
                        <div class="card">
                            <img class="card-img2 rounded mx-auto d-block"
                                src="https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=995&q=80"
                                class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title title">Previdência</h5>
                                <br>
                                <p class="card-text">Aqui pensamos no longo prazo. Estamos preparados para ajudar você a
                                    preparar sua aposentadoria e aproveitar feliz seus melhores anos de vida.</p>
                            </div>
                        </div>
                    </div>
                    <div class="p-2 col-md-4">
                        <div class="card">
                            <img class="card-img3 rounded mx-auto d-block"
                                src="https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=950&q=80"
                                class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title title">Família</h5>
                                <br>
                                <p class="card-text">Aqui focamos em serviços e vantagens que ajudarão sua família a
                                    manter uma boa qualidade de vida e viver sem preocupações com burocracias e
                                    finanças.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>



    <!--Contact Form-->
    <section class="container rounded">
        <div class="shadow m-5 p-4 card">
            <div class="row text-center">
                <!-- Section Titile -->
                <div class="col-md-12 wow animated fadeInLeft" data-wow-delay=".2s">
                    <h1 class="sub-logo">Algo de errado? Tem alguma dúvida?</h1>
                </div>
            </div>
            <br>

            <div class="row">
                <!-- Section Titile -->
                <div class="col-md-6 mt-3 contact-widget-section2 wow animated fadeInLeft" data-wow-delay=".2s">
                    <p> No ÔmegaBank prezamos pela total transparência com nossos clientes. Afinal, queremos que este
                        seja o último banco que você irá se
                        afiliar na vida! <br>
                        Portanto, se houver qualquer dúvida sobre nossos serviços, ou se tiver interesse em nos procurar
                        para outras questões,
                        sinta-se a vontade para nos mandar uma mensagem por este formulário!</p>
                    <br>
                    <div>
                        <p> <b class="strong-p"> Endereço:</b> Rua Ômega, 9999<br>
                            <b class="strong-p"> Telefone:</b> (11) 4002-8922 <br>
                            <b class="strong-p"> Horário de funcionamento:</b> Segunda a sexta, 18:30-22:30 e Sábados,
                            09:00-18:00 <br>
                            <b class="strong-p"> Site:</b> <a href="">omegabank.com.br</a>
                        </p>
                    </div>
                </div>
                <!-- contact form -->
                <div class="col-md-6 wow animated fadeInRight" data-wow-delay=".2s">
                    <form class="shake" role="form" method="post" id="contactForm" name="contact-form"
                        data-toggle="validator">
                        <!-- Client Name -->
                        <div class="form-group label-floating">
                            <label class="control-label" for="name">Nome</label>
                            <input class="form-control" id="name" type="text" name="name"
                                placeholder="Digite seu nome aqui..." required data-error="Por favor digite seu nome">
                            <br>
                        </div>
                        <!-- Client Email -->
                        <div class="form-group label-floating">
                            <label class="control-label" for="email">Email</label>
                            <input class="form-control" id="email" type="email" name="email"
                                placeholder="Digite seu endereço de email aqui..." required
                                data-error="Por favor digite seu email">
                            <br>
                        </div>
                        <!-- Contact Subject -->
                        <div class="form-group label-floating">
                            <label class="control-label">Assunto</label>
                            <input class="form-control" id="msg_subject" type="text" name="subject"
                                placeholder="Digite o motivo de seu contato aqui..." required
                                data-error="Por favor insira um assunto para sua mensagem">
                            <br>
                        </div>
                        <!-- Contact Message -->
                        <div class="form-group label-floating">
                            <label for="message" class="control-label">Mensagem</label>
                            <textarea class="form-control" rows="3" id="message" name="message"
                                placeholder="Digite sua mensagem aqui..." required
                                data-error="Digite sua mensagem"></textarea>
                            <!--<div class="help-block with-errors">Por favor escreva sua mensagem aqui</div>-->
                        </div>
                        <!-- Form Submit -->
                        <div class="mt-5 form-submit">
                            <button type="button" class="btn btn-primary btn-lg btn-block">Enviar sua mensagem!</button>
                            <div id="msgSubmit" class="h3 text-center hidden"></div>
                            <div class="clearfix"></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>`

let Home =
{
    render: () =>
    {
        return homeView;
    }
}

export default Home;