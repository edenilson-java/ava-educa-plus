import { listarCursos } from "../js/cursos.js";

const usuarioArmazenado = sessionStorage.getItem("usuarioLogado");

if (!usuarioArmazenado) {
  navigation.navigate("../login/login.html");
} else {
  const usuarioLogado = JSON.parse(usuarioArmazenado);
  const nomeUsuario = document.querySelector("#usuario-nome");
  const listaCursos = document.querySelector("#lista-cursos");
  const mensagem = document.querySelector("#cursos-message");
  const menuDashboard = document.querySelector("#menu-dashboard");
  const menuCadastro = document.querySelector("#menu-cadastro");
  const menuSair = document.querySelector("#menu-sair");
  const menuToggle = document.querySelector("#menu-toggle");
  const navegacaoPrincipal = document.querySelector("#navegacao-principal");

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

  function formatarData(data) {
    const partes = data.split("-");
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }

  function criarCardCurso(curso) {
    const card = document.createElement("article");
    card.className = "course-card surface";

    const titulo = document.createElement("h2");
    titulo.textContent = curso.nomeCurso;

    const dados = document.createElement("dl");
    const rotuloInicio = document.createElement("dt");
    const valorInicio = document.createElement("dd");
    const rotuloFim = document.createElement("dt");
    const valorFim = document.createElement("dd");

    rotuloInicio.textContent = "Início";
    valorInicio.textContent = formatarData(curso.dataInicio);
    rotuloFim.textContent = "Fim";
    valorFim.textContent = formatarData(curso.dataFim);

    dados.append(rotuloInicio, valorInicio, rotuloFim, valorFim);
    card.append(titulo, dados);
    return card;
  }

  async function carregarCursos() {
    try {
      const cursos = await listarCursos(usuarioLogado);
      cursos.forEach((curso) => {
        listaCursos.appendChild(criarCardCurso(curso));
      });
    } catch (erro) {
      mensagem.textContent = erro;
      mensagem.className = "message message--error";
    }
  }

  menuDashboard.addEventListener("click", () => {
    fecharMenu();
    navigation.navigate("./dashboard.html");
  });

  menuCadastro.addEventListener("click", () => {
    fecharMenu();
    navigation.navigate("../cadastro-aluno/cadastro-aluno.html");
  });

  menuSair.addEventListener("click", () => {
    fecharMenu();
    sessionStorage.removeItem("usuarioLogado");
    navigation.navigate("../login/login.html");
  });

  carregarCursos();
}
