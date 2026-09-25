import { Aluno } from "../js/Aluno.js";
import { cadastrarAluno } from "../js/alunos.js";
import { alunos } from "../dados/listagem-alunos.js";

const usuarioArmazenado = sessionStorage.getItem("usuarioLogado");

if (!usuarioArmazenado) {
  navigation.navigate("../login/login.html");
} else {
  const usuarioLogado = JSON.parse(usuarioArmazenado);
  const formulario = document.querySelector("#form-aluno");
  const mensagem = document.querySelector("#cadastro-message");
  const tabelaAlunos = document.querySelector("#tabela-alunos");
  const totalAlunos = document.querySelector("#total-alunos");
  const nomeUsuario = document.querySelector("#usuario-nome");
  const menuDashboard = document.querySelector("#menu-dashboard");
  const menuCadastro = document.querySelector("#menu-cadastro");
  const menuSair = document.querySelector("#menu-sair");
  const menuToggle = document.querySelector("#menu-toggle");
  const navegacaoPrincipal = document.querySelector("#navegacao-principal");

  const campos = {
    nome: document.querySelector("#nome"),
    genero: document.querySelector("#genero"),
    dataNascimento: document.querySelector("#dataNascimento"),
    cpf: document.querySelector("#cpf"),
    telefone: document.querySelector("#telefone"),
    email: document.querySelector("#email"),
    cep: document.querySelector("#cep"),
    cidade: document.querySelector("#cidade"),
    estado: document.querySelector("#estado"),
    logradouro: document.querySelector("#logradouro"),
    numero: document.querySelector("#numero"),
    complemento: document.querySelector("#complemento"),
    bairro: document.querySelector("#bairro")
  };

  const camposObrigatorios = [
    "nome",
    "genero",
    "dataNascimento",
    "cpf",
    "telefone",
    "email",
    "cep",
    "cidade",
    "estado",
    "logradouro",
    "numero",
    "bairro"
  ];

  const camposNumericos = ["cpf", "telefone", "cep", "numero"];
  const formatosDataNascimento = ["D/M/YYYY", "DD/M/YYYY", "D/MM/YYYY", "DD/MM/YYYY"];
  let cepValido = false;
  let consultaCepAtual = 0;

  nomeUsuario.textContent = usuarioLogado.nome;

  function configurarMenu() {
    const consultaMobile = window.matchMedia("(max-width: 768px)");

    function fecharMenu() {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu de navegação");
      navegacaoPrincipal.hidden = consultaMobile.matches;
    }

    function atualizarMenu() {
      const mobile = consultaMobile.matches;
      menuToggle.hidden = !mobile;
      navegacaoPrincipal.hidden = mobile && menuToggle.getAttribute("aria-expanded") !== "true";

      if (!mobile) {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu de navegação");
      }
    }

    menuToggle.addEventListener("click", () => {
      const aberto = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!aberto));
      menuToggle.setAttribute(
        "aria-label",
        aberto ? "Abrir menu de navegação" : "Fechar menu de navegação"
      );
      navegacaoPrincipal.hidden = aberto;
    });

    window.addEventListener("resize", atualizarMenu);
    atualizarMenu();
    return fecharMenu;
  }

  const fecharMenu = configurarMenu();

  function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = `message message--${tipo}`;
  }

  function definirErro(nomeCampo, texto) {
    const erro = document.querySelector(`#erro-${nomeCampo}`);

    if (erro) {
      erro.textContent = texto;
    }

    campos[nomeCampo].setAttribute("aria-invalid", "true");
  }

  function limparErros() {
    Object.keys(campos).forEach((nomeCampo) => {
      const erro = document.querySelector(`#erro-${nomeCampo}`);

      if (erro) {
        erro.textContent = "";
      }

      campos[nomeCampo].removeAttribute("aria-invalid");
    });
  }

  function validarFormulario() {
    let formularioValido = true;

    camposObrigatorios.forEach((nomeCampo) => {
      const valor = campos[nomeCampo].value;
      const campoNumerico = camposNumericos.includes(nomeCampo);
      const vazio = campoNumerico ? valor === "" : !valor.trim();

      if (vazio) {
        definirErro(nomeCampo, "Campo obrigatório.");
        formularioValido = false;
      }
    });

    const quantidadeCaracteres = campos.nome.value.trim().length;
    if (quantidadeCaracteres > 0 && (quantidadeCaracteres < 4 || quantidadeCaracteres > 80)) {
      definirErro("nome", "Informe de 4 a 80 caracteres.");
      formularioValido = false;
    }

    if (campos.email.value.trim() && !campos.email.checkValidity()) {
      definirErro("email", "Informe um e-mail válido.");
      formularioValido = false;
    }

    camposNumericos.forEach((nomeCampo) => {
      const valor = campos[nomeCampo].value;
      const somenteDigitos = valor
        && valor.split("").every((caractere) => caractere >= "0" && caractere <= "9");

      if (valor && !somenteDigitos) {
        definirErro(nomeCampo, "Informe somente números.");
        formularioValido = false;
      } else if (nomeCampo === "cpf" && valor && valor.length !== 11) {
        definirErro(nomeCampo, "Informe exatamente 11 dígitos.");
        formularioValido = false;
      } else if (nomeCampo === "cep" && valor && valor.length !== 8) {
        definirErro(nomeCampo, "Informe exatamente 8 dígitos.");
        formularioValido = false;
      }
    });

    if (campos.dataNascimento.value.trim()) {
      if (!window.moment) {
        definirErro("dataNascimento", "Não foi possível carregar a validação de data.");
        formularioValido = false;
      } else {
        const dataNascimento = window.moment(campos.dataNascimento.value, formatosDataNascimento, true);
        const dataMinima = window.moment("01/01/1900", "DD/MM/YYYY", true);
        const dataAtual = window.moment().startOf("day");
        const dataPermitida = dataNascimento.isValid()
          && dataNascimento.isAfter(dataMinima)
          && dataNascimento.isBefore(dataAtual, "day");

        if (!dataPermitida) {
          definirErro(
            "dataNascimento",
            "Informe uma data maior que 01/01/1900 e menor que a data atual, no padrão DD/MM/YYYY."
          );
          formularioValido = false;
        }
      }
    }

    return formularioValido;
  }

  function normalizarDataNascimento() {
    const valor = campos.dataNascimento.value.trim();

    if (!valor || !window.moment) {
      return;
    }

    const dataNascimento = window.moment(valor, formatosDataNascimento, true);
    if (dataNascimento.isValid()) {
      campos.dataNascimento.value = dataNascimento.format("DD/MM/YYYY");
    }
  }

  function limparEndereco() {
    campos.cidade.value = "";
    campos.estado.value = "";
    campos.logradouro.value = "";
    campos.complemento.value = "";
    campos.bairro.value = "";
  }

  async function buscarEndereco() {
    const cep = campos.cep.value;
    const consulta = ++consultaCepAtual;
    cepValido = false;

    if (cep === "") {
      return false;
    }

    const somenteDigitos = cep
      .split("")
      .every((caractere) => caractere >= "0" && caractere <= "9");

    if (!somenteDigitos) {
      limparEndereco();
      definirErro("cep", "Informe somente números.");
      return false;
    }

    if (cep.length !== 8) {
      limparEndereco();
      definirErro("cep", "Informe exatamente 8 dígitos.");
      return false;
    }

    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const endereco = await resposta.json();

      if (consulta !== consultaCepAtual || cep !== campos.cep.value) {
        return false;
      }

      if (!resposta.ok || endereco.erro) {
        limparEndereco();
        definirErro("cep", "CEP não encontrado.");
        return false;
      }

      campos.cidade.value = endereco.localidade;
      campos.estado.value = endereco.uf;
      campos.logradouro.value = endereco.logradouro;
      campos.complemento.value = endereco.complemento;
      campos.bairro.value = endereco.bairro;
      campos.cep.removeAttribute("aria-invalid");
      document.querySelector("#erro-cep").textContent = "";
      cepValido = true;
      return true;
    } catch (erro) {
      if (consulta !== consultaCepAtual || cep !== campos.cep.value) {
        return false;
      }

      limparEndereco();
      definirErro("cep", "Não foi possível consultar o CEP.");
      return false;
    }
  }

  function formatarDataTabela(data) {
    if (!data.includes("-")) {
      return data;
    }

    const partes = data.split("-");
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }

  function renderizarTabela() {
    tabelaAlunos.innerHTML = "";

    alunos.forEach((aluno) => {
      const linha = document.createElement("tr");
      const valores = [
        aluno.id,
        aluno.nome,
        aluno.genero,
        formatarDataTabela(aluno.dataNascimento),
        aluno.cpf,
        aluno.telefone,
        aluno.email,
        aluno.cep,
        aluno.cidade,
        aluno.estado,
        aluno.logradouro,
        aluno.numero,
        aluno.complemento,
        aluno.bairro
      ];

      valores.forEach((valor) => {
        const celula = document.createElement("td");
        celula.textContent = valor;
        linha.appendChild(celula);
      });

      tabelaAlunos.appendChild(linha);
    });

    totalAlunos.textContent = `${alunos.length} alunos`;
  }

  campos.cep.addEventListener("input", () => {
    consultaCepAtual += 1;
    cepValido = false;
  });

  campos.cep.addEventListener("change", () => {
    buscarEndereco();
  });

  campos.dataNascimento.addEventListener("blur", normalizarDataNascimento);

  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    limparErros();
    normalizarDataNascimento();

    if (campos.cep.value && !cepValido) {
      await buscarEndereco();
    }

    if (!validarFormulario() || !cepValido) {
      mostrarMensagem("Verifique os campos destacados.", "error");
      return;
    }

    const aluno = new Aluno(
      null,
      campos.nome.value.trim(),
      campos.genero.value,
      campos.dataNascimento.value.trim(),
      campos.cpf.value.trim(),
      campos.telefone.value.trim(),
      campos.email.value.trim(),
      campos.cep.value.trim(),
      campos.cidade.value.trim(),
      campos.estado.value.trim(),
      campos.logradouro.value.trim(),
      campos.numero.value.trim(),
      campos.complemento.value.trim(),
      campos.bairro.value.trim()
    );

    try {
      const retorno = await cadastrarAluno(aluno);
      mostrarMensagem(retorno, "success");
      formulario.reset();
      cepValido = false;
      renderizarTabela();
    } catch (erro) {
      mostrarMensagem(erro, "error");
    }
  });

  menuDashboard.addEventListener("click", () => {
    fecharMenu();
    navigation.navigate("../dashboard/dashboard.html");
  });

  menuCadastro.addEventListener("click", () => {
    fecharMenu();
    navigation.navigate("./cadastro-aluno.html");
  });

  menuSair.addEventListener("click", () => {
    fecharMenu();
    sessionStorage.removeItem("usuarioLogado");
    navigation.navigate("../login/login.html");
  });

  renderizarTabela();
}
