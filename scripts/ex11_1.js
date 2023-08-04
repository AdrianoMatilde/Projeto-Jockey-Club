const frm = document.querySelector("form");
const respLista = document.querySelector("pre");
const respCavalo = document.querySelector("#outCacalo");

//Nome dos cavalos participantes no páreo
const CAVALOS = ["Marujo", "Tordilho", "Belga", "Twister", "Jaade", "Lucky"];

//vetor que irá aramazenar um Objeto aposta(com nº do cavalo e valor da aposta)
const apostas = [];

const obterCavalo = (num) =>{
    const posicao = num -1; //posição no vetor
    return CAVALOS[posicao];
}

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
        return;
    };

    
});