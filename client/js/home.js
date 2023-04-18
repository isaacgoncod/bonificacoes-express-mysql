const url = "http://localhost:3000/funcionario";
const corpo = document.querySelector("#corpo");
const modal = document.querySelector(".modal-corpo");
const modalTitle = document.querySelector(".modal-title");

fetch(url + "/listar", { method: "GET" })
  .then((resp) => resp.json())
  .then((resp) => {
    montarTabela(resp);
  })
  .catch((err) => console.error(err));

function montarTabela(vetor) {
  vetor.forEach((e) => {
    let linha = document.createElement("tr");
    let col1 = document.createElement("td");
    let col2 = document.createElement("td");
    let col3 = document.createElement("td");
    let button = document.createElement("button");

    col1.innerHTML = e.nome_completo;
    col2.innerHTML = formatarData(e.data_admissao);
    button.innerHTML = "Info";

    button.setAttribute("type", "button");
    button.setAttribute("data-mdb-toggle", "modal");
    button.setAttribute("data-mdb-target", "#myModal");
    button.setAttribute("onclick", `getNomeFuncionario('${e.nome_completo}')`);

    button.className = "btn btn-primary";

    linha.appendChild(col1);
    linha.appendChild(col2);
    linha.appendChild(col3);
    col3.appendChild(button);

    corpo.appendChild(linha);
  });
}

function getNomeFuncionario(nome) {
  fetch(url + "/listar/nome?nomeCompleto=" + nome, { method: "GET" })
    .then((resp) => resp.json())
    .then((resp) => {
      modal.innerHTML = "";

      getFuncionarioInfo(resp);
    })
    .catch((err) => console.error(err));
}

function getFuncionarioInfo(vetor) {
  vetor.forEach((e) => {
    let linha = document.createElement("tr");
    let col1 = document.createElement("td");
    let col2 = document.createElement("td");
    let col3 = document.createElement("td");
    let col4 = document.createElement("td");
    let col5 = document.createElement("td");
    let col6 = document.createElement("td");

    modalTitle.innerHTML = e.nome_completo;
    col1.innerHTML = e.nome_completo;
    col2.innerHTML = formatarData(e.data_admissao);
    col3.innerHTML = formatarMoeda(e.salario);
    col4.innerHTML = formatarData(e.data_pagto);
    col5.innerHTML = e.desempenho;
    col6.innerHTML = formatarMoeda(e.bonificacao);

    linha.appendChild(col1);
    linha.appendChild(col2);
    linha.appendChild(col3);
    linha.appendChild(col4);
    linha.appendChild(col5);
    linha.appendChild(col6);

    modal.appendChild(linha);
  });
}

function formatarData(data) {
  return new Date(data).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}
