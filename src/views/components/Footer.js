let Footer = {
    render : async () => {
        let view = `
        <footer class="container pt-md-5 pb-md-5 border-top mt-5 footer " style="  position: absolute;
        bottom: 0;
        width: 100%;
        height: 60px; 
        line-height: 60px; " >
          <div class="d-flex justify-content-center">
            Copyright ÔmegaBank© 2021 - Todos os direitos reservados
          </div>
        </footer>
          `

        return view
    },
    after_render: async () => {

    }
}

export default Footer;