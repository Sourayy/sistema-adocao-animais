class AbrigoAnimais {
  constructor() {
    this.animais = {
      Rex: { tipo: "cão", brinquedos: ["RATO", "BOLA"] },
      Mimi: { tipo: "gato", brinquedos: ["BOLA", "LASER"] },
      Fofo: { tipo: "gato", brinquedos: ["BOLA", "RATO", "LASER"] },
      Zero: { tipo: "gato", brinquedos: ["RATO", "BOLA"] },
      Bola: { tipo: "cão", brinquedos: ["CAIXA", "NOVELO"] },
      Bebe: { tipo: "cão", brinquedos: ["LASER", "RATO", "BOLA"] },
      Loco: { tipo: "jabuti", brinquedos: ["SKATE", "RATO"] },
    };

    this.listaBrinquedos = new Set([
      "RATO",
      "BOLA",
      "LASER",
      "CAIXA",
      "NOVELO",
      "SKATE",
    ]);
  }

  verificaEntrada(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const brinquedos1 = brinquedosPessoa1
      .split(",")
      .map((brinquedo) => brinquedo.trim());
    const brinquedos2 = brinquedosPessoa2
      .split(",")
      .map((brinquedo) => brinquedo.trim());
    const animais = ordemAnimais
      .split(",")
      .map((brinquedo) => brinquedo.trim());

    if (
      new Set(brinquedos1).size !== brinquedos1.length ||
      new Set(brinquedos2).size !== brinquedos2.length
    ) {
      return { erro: "Brinquedo inválido" };
    }

    const brinquedoInvalido1 = brinquedos1.filter(
      (brinquedo) => !this.listaBrinquedos.has(brinquedo)
    );
    const brinquedoInvalido2 = brinquedos2.filter(
      (brinquedo) => !this.listaBrinquedos.has(brinquedo)
    );

    if (brinquedoInvalido1.length > 0 || brinquedoInvalido2.length > 0) {
      return { erro: "Brinquedo inválido" };
    }

    if (new Set(animais).size !== animais.length) {
      return { erro: "Animal inválido" };
    }

    const animaisInvalidos = animais.filter((animal) => !this.animais[animal]);

    if (animaisInvalidos.length > 0) {
      return { erro: "Animal inválido" };
    }

    return { brinquedos1, brinquedos2, animais };
  }

 temBrinquedosEmOrdem(brinquedosPessoa, brinquedosAnimal, ignorarOrdem = false) {
  if (ignorarOrdem) {
    return brinquedosAnimal.every(b => brinquedosPessoa.includes(b));
  }

  let indexPessoa = 0;

  for (let brinquedoAnimal of brinquedosAnimal) {
    let encontrado = false;
    while (indexPessoa < brinquedosPessoa.length) {
      if (brinquedosPessoa[indexPessoa] === brinquedoAnimal) {
        encontrado = true;
        indexPessoa++;
        break;
      }
      indexPessoa++;
    }
    if (!encontrado) return false;
  }

  return true;
}


  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const validaDados = this.verificaEntrada(
      brinquedosPessoa1,
      brinquedosPessoa2,
      ordemAnimais
    );

    if (validaDados.erro) return { erro: validaDados.erro };

    const { brinquedos1, brinquedos2, animais } = validaDados;

    const resultados = [];
    const quantidadeAdotados = { 1: 0, 2: 0 };

    for (let animalNome of animais) {
      const animal = this.animais[animalNome];
      const ignorarOrdem = animalNome === "Loco";

      const pessoa1podeAdotar =
        this.temBrinquedosEmOrdem(
          brinquedos1,
          animal.brinquedos,
          ignorarOrdem
        ) && quantidadeAdotados[1] < 3;
      const pessoa2podeAdotar =
        this.temBrinquedosEmOrdem(
          brinquedos2,
          animal.brinquedos,
          ignorarOrdem
        ) && quantidadeAdotados[2] < 3;

      let destino = "abrigo";

      if (animal.tipo === "gato") {
        if (pessoa1podeAdotar && !pessoa2podeAdotar) {
          destino = "pessoa 1";
          quantidadeAdotados[1]++;
        }

        if (!pessoa1podeAdotar && pessoa2podeAdotar) {
          destino = "pessoa 2";
          quantidadeAdotados[2]++;
        }
      } else if (animalNome === "Loco") {
        if (
          pessoa1podeAdotar &&
          quantidadeAdotados[1] > 0 &&
          quantidadeAdotados[1] < 3
        ) {
          destino = "pessoa 1";
          quantidadeAdotados[1]++;
        }
        if (
          pessoa2podeAdotar &&
          quantidadeAdotados[2] > 0 &&
          quantidadeAdotados[2] < 3
        ) {
          destino = "pessoa 2";
          quantidadeAdotados[2]++;
        }
      } else {
        if (pessoa1podeAdotar && !pessoa2podeAdotar) {
          destino = "pessoa 1";
          quantidadeAdotados[1]++;
        }

        if (!pessoa1podeAdotar && pessoa2podeAdotar) {
          destino = "pessoa 2";
          quantidadeAdotados[2]++;
        }
      }
      resultados.push(`${animalNome} - ${destino}`);
    }

    const resultadosOrdenados = resultados.sort((a, b) => a.localeCompare(b));

    return { lista: resultadosOrdenados };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
