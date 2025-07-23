const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const startpauseBt = document.querySelector('#start-pause')
const botoes = document.querySelectorAll('.app__card-button')
const iniciarOuPauseBt = document.querySelector('#start-pause span')
const iniciarOupausarBtIcone = document.querySelector(".app__card-primary-butto-icon")
const musicaFocoInput = document.querySelector('#alternar-musica')
const tempoNaTela = document.querySelector('#timer')
const musica = new Audio('./sons/luna-rise-part-one.mp3')
const musicaplay = new Audio('./sons/play.wav')
const musicapause = new Audio('./sons/pause.mp3')
const musicatempoFinalizado = new Audio('./sons/beep.mp3')

musica.loop = true

let tempoDecorridoemSegundos = 1500
let intervaloId = null

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoemSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoemSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoemSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(Contexto) {
    mostrartempo()
    botoes.forEach(function (Contexto) {
        Contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', Contexto)
    banner.setAttribute('src', `./imagens/${Contexto}.png`)
    switch (Contexto) {
        case "foco":
            titulo.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;

        case "descanso-curto":
            titulo.innerHTML = `
                Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;

        case "descanso-longo":
            titulo.innerHTML = `
                Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break;

        default:
            break;
    }
}

const contagemregressiva = () => {
    if (tempoDecorridoemSegundos <= 0) {
        // musicatempoFinalizado.play()
        alert('Tempo finalizado!')
        zerar()
        return
    }
    tempoDecorridoemSegundos -= 1
    mostrartempo()
}

startpauseBt.addEventListener('click', iniciarOupausar)

function iniciarOupausar() {
    if (intervaloId) {
        musicapause.play()
        zerar()
        return
    }
    musicaplay.play()
    intervaloId = setInterval(contagemregressiva, 1000)
    iniciarOuPauseBt.textContent = "Pausar"
    iniciarOupausarBtIcone.setAttribute('src', `./imagens/pause.png `)
}

function zerar() {
    clearInterval(intervaloId)
    iniciarOuPauseBt.textContent = "Começar"
    iniciarOupausarBtIcone.setAttribute('src', `./imagens/play_arrow.png`)
    intervaloId = null
}

function mostrartempo() {
    const tempo = new Date(tempoDecorridoemSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {
        minute: '2-digit',
        second: '2-digit'
    })
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrartempo()