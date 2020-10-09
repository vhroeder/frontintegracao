function preenchercombo(lista){
    var combo = "";
    for (contador = 0; contador < lista.length; contador++){
        combo +=
        "<option value='" + lista[contador].id + "'>" + lista[contador].nomeArtistico + "</option>"
    }
    document.getElementById("cmbartistas").innerHTML=combo;
}

function carregarartistas(){
    var usuariologado = localStorage.getItem("logado");
    if (usuariologado == null){
        window.location="index.html";
    }else{
        fetch("http://localhost:8080/artista/all")
        .then(res => res.json())
        .then(res => preenchercombo(res));
    }
}

function preenchertabela(lista){    
    var tabela=    
    "<table width='75%' border='1' cellpadding='5' cellspacing='2' align='center'>" +    
    "<tr>" +     
    "<th>Música</th> <th>Lancamento</th> <th>Alteracao</th>" +    
    "</tr>";
    //preencher as linhas    
    for (contador=0;contador<lista.length;contador++){
        tabela+=
        "<tr>" + 
        "<td>" + lista[contador].titulo + "</td>" + 
        "<td>" + lista[contador].lancamento + "</td>" + 
        "<td>" +
        "<button onclick=alterarsim('" + lista[contador].id + "') type='button' class='btn btn-success'>Lançamento</button>" +
        "<button onclick=alterarnao('" + lista[contador].id + "') type='button' class='btn btn-danger'>Flashback</button>"
        "</tr>";
    }
    tabela+="</table>"    
    document.getElementById("resultado").innerHTML=tabela;
}

function filtrar(){
    fetch("http://localhost:8080/artista/" + document.getElementById("cmbartistas").value)
    .then(res => res.json())
    .then(res => preenchertabela(res.musicas));
}

function alterarsim(codigo){
    var carta = {
        id : codigo,
        lancamento : "1"
    }

    var envelope = {
        method : "POST",
        body: JSON.stringify(carta),
        headers : {
            "Content-type" : "application/json"
        }
    }
    fetch("http://localhost:8080/alterarlancamento", envelope)
        .then(res => res.json)
        .then(res => {
            window.alert("Alterado");
            filtrar();
        })
        .catch(err => {
            window.alert("Não Alterado");
        });
}

function alterarnao(codigo){
    var carta = {
        id : codigo,
        lancamento : "0"
    }

    var envelope = {
        method : "POST",
        body: JSON.stringify(carta),
        headers : {
            "Content-type" : "application/json"
        }
    }
    fetch("http://localhost:8080/alterarlancamento", envelope)
        .then(res => res.json)
        .then(res => {
            window.alert("Alterado");
            filtrar();
        })
        .catch(err => {
            window.alert("Não Alterado");
        });
}