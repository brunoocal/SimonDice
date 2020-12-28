const btnEmpezar = document.getElementById("btnEmpezar")
const celeste = document.getElementById("celeste")
const violeta = document.getElementById("violeta")
const naranja = document.getElementById("naranja")
const verde = document.getElementById("verde")
const ULTIMO_NIVEL = 5;

class Game{
    constructor(){
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel, 500)
    }

    inicializar(){
        this.elegirColor = this.elegirColor.bind(this)
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.toggleBtn()
        
        this.nivel = 1
    
        this.colores = {celeste, violeta, naranja, verde}
    }


    toggleBtn(){
        btnEmpezar.classList.toggle('hide')
    }

    generarSecuencia(){
        this.secuencia = new Array(ULTIMO_NIVEL).fill().map(n => Math.floor(Math.random() * 4))
        console.table(this.secuencia);
    }

    transformarNumeroAColor(n){
        switch(n){
            case 0:
            return 'celeste'
            case 1:
            return 'violeta'
            case 2:
            return 'naranja'
            case 3:
            return 'verde'
        }
    }

    transformarColorANumero(c){
        switch(c){
            case 'celeste':
            return 0
            case 'violeta':
            return 1
            case 'naranja':
            return 2
            case 'verde':
            return 3
        }
    }

    ganaJuego(){
        swal({
            title: "¡Buen trbajo!",
            text: "Has ganado el juego.",
            icon: "success",
            button: "Confirmar",
          })
          .then(this.inicializar.bind(this));
          
    }

    pierdeJuego(){
        swal({
            title: "¡Buen intento!",
            text: "Has perdido",
            icon: "error",
            button: "Confirmar",
          })
          .then(() =>{
            this.eliminarEventosClick();
            this.inicializar();
        })
    }

    iluminarColor(color){
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color), 350)
    }

    apagarColor(color){
        this.colores[color].classList.remove('light')
    }

    agregarEventosClick(){
        for(let color in this.colores){
            this.colores[color].addEventListener('click', this.elegirColor)
        }
    }

    eliminarEventosClick(){
        for(let color in this.colores){
            this.colores[color].removeEventListener('click', this.elegirColor)
        }
    }

    elegirColor(e){
        const nombreColor = e.target.dataset.color
        const numColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)
        if(numColor === this.secuencia[this.subnivel]){
             this.subnivel++
             if(this.subnivel === this.nivel){
                 this.nivel++
                 this.eliminarEventosClick()
                if(this.nivel === (ULTIMO_NIVEL + 1)){
                    this.ganaJuego()
                }else{
                    setTimeout(this.siguienteNivel, 1500)
                }
             }
        } else{
            this.pierdeJuego();
        }
    }

    iluminarSecuencia(){
        for(let i = 0; i < this.nivel; i++){
           let color = this.transformarNumeroAColor(this.secuencia[i]); 
           setTimeout(() => this.iluminarColor(color), 1000 * i);
        }
    }

    siguienteNivel(){
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }

}


function empezarJuego() {
   window.game = new Game();
}