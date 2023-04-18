const registerNome = document.querySelector("#registerNome");
const registerDataAdmi = document.querySelector("#registerDataAdmi");
const registerSalario = document.querySelector("#registerSalario");
const registerDesempenho = document.querySelector("#registerDesempenho");

function registerPaciente() {
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
      return resp.json();
    })
    .then((info) => {
      if (info != undefined) {
        alert("Cadastrado com Sucesso!");
      } else {
        alert(info.msg);
      }
    });
}
