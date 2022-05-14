//selecionar os elementos que iremos manipular

//começar pelo relogio digital
let digitalElement = document.querySelector('.digital'); //relógio digital
let sElement = document.querySelector('.p_s'); //ponteiro de segundo
let mElement = document.querySelector('.p_m'); //ponteiro de minutos
let hElement = document.querySelector('.p_h'); //ponteiro de horas


//lógica de relógio: Ele funciona baseado em segundos, logo a cada segundo ele faz algo
//precisamos criar um timer (funcao) que busca a hora atual e posiciona os ponteiros, mostra o relógio etc...


function updateClock(){
    //buscar a hora atual função date busca a hora atual
    let now = new Date(); 
    let hour = now.getHours(); //função que busca as horas
    let minute = now.getMinutes(); //função que busca as horas
    let second = now.getSeconds(); //função que busca as horas

    //inserir hora no relógio digital (+ fácil)
                                //usar função para consertar template de casas decimais
    digitalElement.innerHTML = `${fixZero(hour)}:${fixZero(minute)}:${fixZero(second)}`


//////////////////////////relógio analógico
    //Eu já tenho a quantidade de segundos. Baseado nisso, preciso verificar qual vai ser a posição do meu ponteiro de segundos precisar estar
    //No CSS os ponteiros precisam rotacionar a partir de um ponto fixo (eixo) no meio, então usa-se o atributo transform origin: left para dizer que o ponto fixo está a esquerda (no caso bolinha do relógio)
    //usa-se um transform: rotate para definir a rotação do ponteiro, começa com 0, logo fica sempre a direita (errado, pois no relógio o 0 é sempre pra cima) então usamos -90deg p/ começar
    //selecionar elemento do segundo e rotaciona-lo inicialmente
    //como saber quantos deg é cada um dos segundos? Se um círculo tem quantos graus? 360º e no relógio tem quantos segundos? 60 s logo 360/60 = 6 graus por segundo
    let sDeg = (360 / 60) * second - 90; //variável que armazena o número correto de graus do ponteiro dos segundos. -90 Para corrigir a posição original defina pelo CSS (a direita) e deixar o ponteiro alinhado a cima
    sElement.style.transform = `rotate(${sDeg}deg)`;

    let mDeg = (360 / 60) * minute - 90; //Mesma conta, já que tenho 60 minutos no relógio tb
    mElement.style.transform = `rotate(${mDeg}deg)`; 

    let hDeg = (360 / 12) * hour - 90; //Quantas horas eu tenho no relógio? 12 horas (dá 2 voltas em um dia)
    hElement.style.transform = `rotate(${hDeg}deg)`; 


};


//Função que conserta quando o tempo está com apenas uma casa decimal ex: 1:05:3 ao invés de 01:05:03
function fixZero(time){
  return time < 10 ? `0${time}` : time; //if simplificado = retorne SE tempo<10 então 0+tempo SE NÃO ":" tempo

};


setInterval(updateClock, 1000); //cria intervalo e roda infinitamente a função a cada 1s

//Ao entrar na página, a função updateClock tem um delay de 1segundo como definimos, demorando este tempo para gerar o relógio e posicionar os ponteiros. Para evitar este problema, basta rodar a função 1x logo que entra na página, sem intervalo.
updateClock();
