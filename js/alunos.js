import { alunos } from "../dados/listagem-alunos.js";

export function cadastrarAluno(aluno) {
  return new Promise((resolve, reject) => {
    try {
      const maiorId = alunos.reduce((maior, item) => {
        return item.id > maior ? item.id : maior;
      }, 0);

      aluno.id = maiorId + 1;
      alunos.push(aluno);
      resolve("Aluno cadastrado com sucesso!");
    } catch (erro) {
      reject("Erro ao cadastrar o aluno");
    }
  });
}
