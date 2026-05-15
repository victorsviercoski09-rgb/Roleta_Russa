let bala = slotBala();
let vez = "User";
let vidaUser = 3;
let vidaBot = 3;
let numerosUsados = [];

function slotBala(){
    return Math.floor(Math.random() * 6) + 1;
}

function escolha(botao, numeros){
    if( vez !== "User" )return;

    numerosUsados.push(numeros);
    botao.classList.add("hidden");

    if(numeros === bala){
        vidaUser--;
        document.getElementById("status").innerText = "Você Levou um Tiro meu Parceiro";
        somTiro();
        novaRodada();
        atualizarTela();
        efeitoTiro();

        if( vidaUser <= 0 ){
            document.getElementById("status").innerText = "Perdeu para Bot"
            resetarVidas();
            return;
        }
        novaRodada();
        return;
    }
    document.getElementById("status").innerText = "Você ta Vivo... Relaxe";
    turno = "Bot";
    setTimeout(escolhaBot, 1000);
}

function escolhaBot(){
    let disponiveis = [1, 2, 3, 4, 5, 6].filter( n => !numerosUsados.includes(n));
    let escolhaBot = disponiveis[Math.floor(Math.random() * disponiveis.length)];

    numerosUsados.push(escolhaBot);
    document.getElementById("b" + escolhaBot).classList.add("hidden");

    if( escolhaBot === bala ){
        vidaBot--;
        atualizarTela();
        somRisada();
        novaRodada();

        document.getElementById("status").innerText = "Bot Tomou um Tiro HAHAHA";

        if( vidaBot <= 0 ){
            document.getElementById("status").innerText = "Você Ganhou";
            resetarVidas();
            somGanhador();
            return;
        }
        return;
    }
    document.getElementById("status").innerText = "Bot Escolheu o Número: " + escolhaBot;
    vez = "User"
}

function novaRodada(){
    setTimeout(() => {
        bala = slotBala();
        numerosUsados = [];
        vez = "User";

        for( let i = 1; i <= 6; i++ ){
            document.getElementById("b"+ i ).classList.remove("hidden")
        }
        document.getElementById("status").innerText = "Nova Rodada"
    }, 1000);
}

function resetarVidas(){
    vidaBot = 3;
    vidaUser = 3;

    atualizarTela();
}

function atualizarTela(){
    let coracaoUser = "❤️".repeat(vidaUser);
    let coracaoBot = "❤️".repeat (vidaBot);
    document.getElementById("vidas").innerText =
    "Você: " + coracaoUser + " | Bot: " + coracaoBot;
}

function somTiro(){
    const som = new Audio("Tiro.mp3");
    som.volume = 1;
    som.currentTime = 0;
    som.play();
}
function somRisada(){
    const risada = new Audio("Risada.mp3");
    risada.volume = 0.5;
    risada.currentTime = 0;
    risada.play()
}
function efeitoTiro(){
    let efeito = document.getElementById("efeito");
    efeito.classList.add("ativo");
    setTimeout(() =>{
        efeito.classList.remove("ativo")
    }, 500)
}
