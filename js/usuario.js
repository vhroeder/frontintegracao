function filtrar(){
    var valor = document.getElementById("cmblancamento").value;
    if (valor == '0' || valor == '1'){
        fetch("http://localhost:8080/lancamento/" + valor).then(res => res.json())
        .then(res => preenchertabela(res))
        .catch(err =>{ window.alert("Não Encontrado");
        });
    }
}

function preenchertabela(lista){    
    var tabela=    
    "<table width='75%' border='1' cellpadding='5' cellspacing='2' align='center'>" +    
    "<tr>" +     
    "<th>Música</th> <th>Artista</th> <th>Cadastro</th>" +    
    "</tr>";
    //preencher as linhas    
    for (contador=0;contador<lista.length;contador++){
        tabela+=
        "<tr>" + 
        "<td>" + lista[contador].titulo + "</td>" + 
        "<td>" + lista[contador].artista.nomeArtistico + "</td>" + 
        "<td>" + lista[contador].cadastro + "</td>" + 
        "</tr>";
    }
    tabela+="</table>"    
    document.getElementById("resultado").innerHTML=tabela;
}

function carregarUsuario(){
    var usuariologado = localStorage.getItem("logado");
    if (usuariologado==null){
        window.location="index.html";
    }else {
        var usuariojson = JSON.parse(usuariologado);
        document.getElementById("foto").innerHTML = 
        "<img width='10%' src=imagens/" + usuariojson.foto + ">";
        document.getElementById("dados").innerHTML = 
        "<h3>" + usuariojson.nome + "<br>" + usuariojson.email + "<br>ID:" + usuariojson.id;
    }
}