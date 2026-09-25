import { usuarios } from "../dados/listagem-usuarios.js";

export function login(usuario, senha) {
  return new Promise((resolve, reject) => {
    const usuarioEncontrado = usuarios.find((item) => {
      return item.email === usuario && item.senha === senha;
    });

    if (usuarioEncontrado) {
      resolve(usuarioEncontrado);
      return;
    }

    reject("Dados incorretos. Favor verificar e tentar novamente");
  });
}
