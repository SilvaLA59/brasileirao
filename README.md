### How to use:
```
npm install --save https://github.com/SilvaLA59/brasileirao.git
```

Sample
```
var brasileirao = require('brasileirao');

//Pegar a tabela do Brasileirão 2018
brasileirao.tabela().then(val => {
    var tabela = val;
    console.log(tabela);
}).catch(err => console.error(err));
//Pegar as informações sobre a primeira rodada do Brasileirão 2018
brasileirao.rodada(1).then(val =>{
    var resultados = val;
    console.log(resultados);
}).catch(err => console.error(err));
```

### Dependencies

- request
- cheerio