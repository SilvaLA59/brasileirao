var request = require('request');
var cheerio = require('cheerio');

var brasileirao = module.exports = (options)=>{};

brasileirao.tabela = function(){
    return new Promise((resolve, reject)=>{
        request('https://globoesporte.globo.com/futebol/brasileirao-serie-a/', function(err, res, body){
            if (err){
                console.log('Erro: ' + err);
                reject(err);
            } 

            var $ = cheerio.load(body);
            var tabela = [];
            var times = $('.tabela-times').find('.tabela-body-linha');
            for (let index = 0; index < times.length; index++) {
                var element = times[index];

                var pontos = $($('.tabela-pontos').find('.tabela-body-linha')[index]).find('td');
                tabela.push({
                    posicao: $(element).find('.tabela-times-posicao').text(),
                    nome: $(element).find('.tabela-times-time-nome').text(),
                    sigla: $(element).find('.tabela-times-time-sigla').text(),
                    pontos: $(pontos[0]).text(),
                    jogos: $(pontos[1]).text(),
                    vitorias: $(pontos[2]).text(),
                    empates: $(pontos[3]).text(),
                    derrotas: $(pontos[4]).text(),
                    golsPro: $(pontos[5]).text(),
                    golsContra: $(pontos[6]).text(),
                    saldo: $(pontos[7]).text()
                });
            }            
            resolve(tabela);
        });
    })
};

brasileirao.rodada = function(rodada){
    return new Promise((resolve, reject)=>{
        request('https://globoesporte.globo.com/servico/backstage/esportes_campeonato/esporte/futebol/modalidade/futebol_de_campo/categoria/profissional/campeonato/campeonato-brasileiro/edicao/campeonato-brasileiro-2018/fases/fase-unica-seriea-2018/rodada/'+ rodada +'/jogos.html', function(err, res, body){
            if (err) {
                console.log(err);
                reject(err);
            }

            var $ = cheerio.load(body);

            var jogos = $('.lista-de-jogos-item');
            var listaJogos = [];
            for (let index = 0; index < jogos.length; index++) {
                const element = jogos[index];
                var placar = $(element).find('.placar-jogo-equipes-item')[1];
                var mandante = $(element).find('.placar-jogo-equipes-item')[0];
                var visitante = $(element).find('.placar-jogo-equipes-item')[2];

                listaJogos.push({
                    informacoes: $(element).find('.placar-jogo-informacoes').text(),
                    mandante: {
                        nome: $(mandante).find('.placar-jogo-equipes-nome').text(),
                        sigla: $(mandante).find('.placar-jogo-equipes-sigla').text()
                    },
                    visitante: {
                        nome: $(visitante).find('.placar-jogo-equipes-nome').text(),
                        sigla: $(visitante).find('.placar-jogo-equipes-sigla').text()
                    },
                    placar: {
                        mandante: $(placar).find('.placar-jogo-equipes-placar-mandante').text(),
                        visitante: $(placar).find('.placar-jogo-equipes-placar-visitante').text()
                    }
                });
            };
            resolve(listaJogos);
        });
    })
}