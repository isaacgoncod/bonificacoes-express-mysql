//MODAL FORM
const registerNome = document.querySelector("#registerNome");
const registerDataAdmi = document.querySelector("#registerDataAdmi");
const registerSalario = document.querySelector("#registerSalario");
const registerDesempenho = document.querySelector("#registerDesempenho");

function registerFuncionario() {
  let data = {
    nomeCompleto: registerNome.value,
    dataAdmissao: registerDataAdmi.value,
    salario: registerSalario.value,
    desempenho: registerDesempenho.value,
  };

  let options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch("http://localhost:3000/funcionario/create", options)
    .then((resp) => {
      return resp.status;
    })
    .then((resp) => {
      if (resp == 201) {
        alert("Cadastrado com Sucesso!");
      } else {
        alert(info.msg);
      }
    });
}

// MODAL INFO
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
    let buttonDel = document.createElement("button");
    let btnUpdate = document.createElement("button");

    col1.innerHTML = e.nome_completo;
    col2.innerHTML = formatarData(e.data_admissao);
    button.innerHTML = "Info";
    buttonDel.innerHTML = "Excluir";
    btnUpdate.innerHTML = "Alterar";

    col3.className = "btn-modal-info";

    button.setAttribute("type", "button");
    button.setAttribute("data-mdb-toggle", "modal");
    button.setAttribute("data-mdb-target", "#myModalInfo");
    button.setAttribute("onclick", `getNomeFuncionario('${e.nome_completo}')`);

    button.className = "btn btn-primary";

    buttonDel.setAttribute("type", "button");
    buttonDel.setAttribute("onclick", `delFuncionario('${e.matricula}')`);

    buttonDel.className = "btn btn-danger";

    btnUpdate.setAttribute("type", "button");
    btnUpdate.setAttribute("data-mdb-toggle", "modal");
    btnUpdate.setAttribute("data-mdb-target", "#myModalFormUpdate");

    btnUpdate.className = "btn btn-secondary";

    linha.appendChild(col1);
    linha.appendChild(col2);
    linha.appendChild(col3);
    col3.appendChild(button);
    col3.appendChild(btnUpdate);
    col3.appendChild(buttonDel);

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
    let colMatri = document.createElement("td");
    let col1 = document.createElement("td");
    let col2 = document.createElement("td");
    let col3 = document.createElement("td");
    let col4 = document.createElement("td");
    let col5 = document.createElement("td");
    let col6 = document.createElement("td");

    modalTitle.innerHTML = e.nome_completo;
    colMatri.innerHTML = e.matricula;
    col1.innerHTML = e.nome_completo;
    col2.innerHTML = formatarData(e.data_admissao);
    col3.innerHTML = formatarMoeda(e.salario);
    col4.innerHTML = formatarData(e.data_pagto);
    col5.innerHTML = e.desempenho;
    col6.innerHTML = formatarMoeda(e.bonificacao);

    linha.appendChild(colMatri);
    linha.appendChild(col1);
    linha.appendChild(col2);
    linha.appendChild(col3);
    linha.appendChild(col4);
    linha.appendChild(col5);
    linha.appendChild(col6);

    modal.appendChild(linha);
  });
}

function delFuncionario(matricula) {
  if (confirm("Você deseja EXCLUIR este Funcionário?"))
    fetch(url + "/" + matricula, { method: "DELETE" })
      .then((resp) => resp.status)
      .then((resp) => {
        if (resp == 202) {
          alert("Excluido com Sucesso");
          window.location.reload();
        } else alert("Erro ao enviar dados");
      });
}

const updateMatricula = document.querySelector("#updateMatricula");
const updateNome = document.querySelector("#updateNome");
const updateDataAdmi = document.querySelector("#updateDataAdmi");
const updateSalario = document.querySelector("#updateSalario");
const updateDataPagto = document.querySelector("#updateDataPagto");
const updateDesempenho = document.querySelector("#updateDesempenho");
const updateBonificacao = document.querySelector("#updateBonificacao");

function updateFuncionario() {
  let data = {
    matricula: updateMatricula.value,
    nomeCompleto: updateNome.value,
    dataAdmissao: updateDataAdmi.value,
    salario: updateSalario.value,
    dataPagto: updateDataPagto.value,
    desempenho: updateDesempenho.value,
    bonificacao: updateBonificacao.value,
  };

  let options = {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(url + "/update", options)
    .then((resp) => {
      return resp.status;
    })
    .then((resp) => {
      if (resp == 202) {
        alert("Atualizado com Sucesso!");
        window.location.reload();
      } else {
        alert(info.msg);
      }
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
