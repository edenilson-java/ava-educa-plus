export class Aluno {
  constructor(
    id,
    nome,
    genero,
    dataNascimento,
    cpf,
    telefone,
    email,
    cep,
    cidade,
    estado,
    logradouro,
    numero,
    complemento,
    bairro
  ) {
    this.id = id;
    this.nome = nome;
    this.genero = genero;
    this.dataNascimento = dataNascimento;
    this.cpf = cpf;
    this.telefone = telefone;
    this.email = email;
    this.cep = cep;
    this.cidade = cidade;
    this.estado = estado;
    this.logradouro = logradouro;
    this.numero = numero;
    this.complemento = complemento;
    this.bairro = bairro;
  }
}
