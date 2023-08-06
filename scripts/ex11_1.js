const frm = document.querySelector("form");
const respLista = document.querySelector("pre");
const respCavalo = document.querySelector("#outCavalo");

//Nome dos cavalos participantes no páreo
const CAVALOS = ["Marujo", "Tordilho", "Belga", "Twister", "Jaade", "Lucky"];

//vetor que irá aramazenar um Objeto aposta(com nº do cavalo e valor da aposta)
const apostas = [];

frm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const cavalo = Number(frm.inCavalo.value);
    const valor = Number(frm.inValor.value);

    //adiciona ao vetor de objetos(atributos cavalo e valor);
    apostas.push({cavalo,valor});
    //variável para exibir a lista das apostas Realizasdas
     let lista = `Apostas Realizadas\n${"-".repeat(25)}\n`;

     // percorre o vetor e concatena em lista as apostas realizadas
     for (const aposta of apostas) {
        lista += `Nº${aposta.cavalo} ${obterCavalo(aposta.cavalo)}`;
        lista += ` - R$: ${aposta.valor.toFixed(2)}\n`
     }

     respLista.innerText = lista; //exibe lista de apostas

     frm.reset();
     frm.inCavalo.focus();
});

frm.inCavalo.addEventListener("blur",()=>{
    //se não preencehu o campo, limpa respCavalo e retorna
    //(não exibe mensagem de alerta, pois pode sair por um clique em ganhador)
    if(frm.inCavalo.value == "" ){
        respCavalo.innerText ="";
        return;
    };

    const numCavalo = Number(frm.inCavalo.value)// nº do cavalo convertido em number

    if(!validarCavalo(numCavalo)){
        alert("Nº do cavalo inválido");
        frm.inCavalo.focus();
        frm.inCavalo.value = "";
        return;
    };

    const nome = obterCavalo(numCavalo); // atribui retorno das funções à variáveis
    const contaNum = contarApostas(numCavalo);
    const total = totalizarApostas(numCavalo);

    //exibe o número de apostas e ototal apostado no cavalo
    respCavalo.innerText = `${nome} (Apostas: ${contaNum} - R$: ${total.toFixed(2)})`;

    
});

frm.inCavalo.addEventListener("focus",()=>{
    frm.inCavalo.value ="";
    respCavalo.innerText = "";
});

const obterCavalo = (num) =>{
    const posicao = num -1; //posição no vetor
    return CAVALOS[posicao];
}

const validarCavalo = (num) =>{
    //retorna o valor resultante da condição (true ou false)
    return num >= 1 && num <=CAVALOS.length; 
};

const contarApostas = (num) =>{
    let contador = 0;
    //percorre o vetor appstas
    for (const aposta of apostas) {
        //verifica se a aposta é no cavalo passado como parâmetro
        if(aposta.cavalo == num){
            contador ++; //conta +1 quando a aposta for no cavalo do parametro
        }
    }

    return contador; // retorna o nº de apostas no cavalo numCavalo
};

const totalizarApostas = (num) =>{
    let total = 0;
    for(const aposta of apostas) {
        if(aposta.cavalo == num){
            total += aposta.valor;//soma o valor das apostas
        }
    }

    return total; //retorna os valores apostados em um cavalo
};


