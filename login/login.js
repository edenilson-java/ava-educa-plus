import { login } from "../js/auth.js";

const formulario = document.querySelector("#login-form");
const campoEmail = document.querySelector("#email");
const campoSenha = document.querySelector("#senha");
const mensagem = document.querySelector("#login-message");
const esqueceuSenha = document.querySelector("#esqueceu-senha");

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = `message message--${tipo}`;
}

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const email = campoEmail.value.trim();
  const senha = campoSenha.value.trim();

  if (!email || !senha) {
    mostrarMensagem("Preencha o Email e a Senha.", "error");
    return;
  }

  try {
    const usuarioLogado = await login(email, senha);
    sessionStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
    navigation.navigate("../dashboard/dashboard.html");
  } catch (erro) {
    mostrarMensagem(erro, "error");
  }
});

esqueceuSenha.addEventListener("click", (evento) => {
  evento.preventDefault();
  window.alert("Funcionalidade em construção.");
});
