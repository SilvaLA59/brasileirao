var brasileirao = require('brasileirao');

//Pegar a tabela do Brasileirão 2018
brasileirao.tabela().then(val => {
    var tabela = val;
    console.log(tabela);
});
//Pegar as informações sobre a primeira rodada do Brasileirão 2018
brasileirao.rodada(1).then(val =>{
    var resultados = val;
    console.log(resultados);
});