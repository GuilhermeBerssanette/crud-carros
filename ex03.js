const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let flashcards = [];
let proximoIdFlashcard = 1;


// =====================================
// CADASTRAR FLASHCARD
// =====================================

function cadastrarFlashcard() {

  rl.question("Digite a pergunta: ", (pergunta) => {

    rl.question("Digite a resposta: ", (resposta) => {

      rl.question("Digite a matéria: ", (materia) => {

        rl.question("Digite a dificuldade (facil/medio/dificil): ", (dificuldade) => {

          let flashcard = {
            id: proximoIdFlashcard,
            pergunta: pergunta,
            resposta: resposta,
            materia: materia,
            dificuldade: dificuldade,
            acertos: 0,
            erros: 0
          };

          flashcards.push(flashcard);

          proximoIdFlashcard++;

          console.log("\nFlashcard cadastrado com sucesso!");

          mostrarMenu();
        });

      });

    });

  });

}


// =====================================
// LISTAR FLASHCARDS
// =====================================

function listarFlashcards() {

  console.log("\n--- FLASHCARDS ---");

  if (flashcards.length === 0) {
    console.log("Nenhum flashcard cadastrado.");

    mostrarMenu();
    return;
  }

  for (let i = 0; i < flashcards.length; i++) {

    console.log("-----------------------");
    console.log("ID:", flashcards[i].id);
    console.log("Pergunta:", flashcards[i].pergunta);
    console.log("Resposta:", flashcards[i].resposta);
    console.log("Matéria:", flashcards[i].materia);
    console.log("Dificuldade:", flashcards[i].dificuldade);
    console.log("Acertos:", flashcards[i].acertos);
    console.log("Erros:", flashcards[i].erros);

  }

  mostrarMenu();
}


// =====================================
// BUSCAR POR ID
// =====================================

function buscarFlashcardPorId() {

  rl.question("Digite o ID do flashcard: ", (id) => {

    id = Number(id);

    let flashcardEncontrado = null;

    for (let i = 0; i < flashcards.length; i++) {

      if (flashcards[i].id === id) {
        flashcardEncontrado = flashcards[i];
      }

    }

    if (flashcardEncontrado === null) {

      console.log("Flashcard não encontrado.");

    } else {

      console.log("\nFlashcard encontrado:");

      console.log("ID:", flashcardEncontrado.id);
      console.log("Pergunta:", flashcardEncontrado.pergunta);
      console.log("Resposta:", flashcardEncontrado.resposta);
      console.log("Matéria:", flashcardEncontrado.materia);
      console.log("Dificuldade:", flashcardEncontrado.dificuldade);
      console.log("Acertos:", flashcardEncontrado.acertos);
      console.log("Erros:", flashcardEncontrado.erros);

    }

    mostrarMenu();

  });

}


// =====================================
// ATUALIZAR FLASHCARD
// =====================================

function atualizarFlashcard() {

  rl.question("Digite o ID do flashcard: ", (id) => {

    id = Number(id);

    let flashcardEncontrado = null;

    for (let i = 0; i < flashcards.length; i++) {

      if (flashcards[i].id === id) {
        flashcardEncontrado = flashcards[i];
      }

    }

    if (flashcardEncontrado === null) {

      console.log("Flashcard não encontrado.");

      mostrarMenu();
      return;
    }

    console.log("\nDeixe vazio para manter o valor atual.");

    rl.question(
      "Nova pergunta (" + flashcardEncontrado.pergunta + "): ",
      (pergunta) => {

        rl.question(
          "Nova resposta (" + flashcardEncontrado.resposta + "): ",
          (resposta) => {

            rl.question(
              "Nova matéria (" + flashcardEncontrado.materia + "): ",
              (materia) => {

                rl.question(
                  "Nova dificuldade (" + flashcardEncontrado.dificuldade + "): ",
                  (dificuldade) => {

                    if (pergunta !== "") {
                      flashcardEncontrado.pergunta = pergunta;
                    }

                    if (resposta !== "") {
                      flashcardEncontrado.resposta = resposta;
                    }

                    if (materia !== "") {
                      flashcardEncontrado.materia = materia;
                    }

                    if (dificuldade !== "") {
                      flashcardEncontrado.dificuldade = dificuldade;
                    }

                    console.log("Flashcard atualizado com sucesso!");

                    mostrarMenu();
                  }
                );

              }
            );

          }
        );

      }
    );

  });

}


// =====================================
// REMOVER FLASHCARD
// =====================================

function removerFlashcard() {

  rl.question("Digite o ID do flashcard: ", (id) => {

    id = Number(id);

    let indice = -1;

    for (let i = 0; i < flashcards.length; i++) {

      if (flashcards[i].id === id) {
        indice = i;
      }

    }

    if (indice === -1) {

      console.log("Flashcard não encontrado.");

    } else {

      flashcards.splice(indice, 1);

      console.log("Flashcard removido com sucesso.");

    }

    mostrarMenu();

  });

}


// =====================================
// LISTAR POR MATÉRIA
// =====================================

function listarPorMateria() {

  rl.question("Digite a matéria: ", (materia) => {

    let contador = 0;

    console.log("\n--- " + materia + " ---");

    for (let i = 0; i < flashcards.length; i++) {

      if (flashcards[i].materia === materia) {

        console.log(
          flashcards[i].id + " - " + flashcards[i].pergunta
        );

        contador++;
      }

    }

    if (contador === 0) {
      console.log("Nenhum flashcard encontrado.");
    }

    console.log("Total encontrado:", contador);

    mostrarMenu();

  });

}


// =====================================
// LISTAR POR DIFICULDADE
// =====================================

function listarPorDificuldade() {

  console.log("\n1 - Fácil");
  console.log("2 - Médio");
  console.log("3 - Difícil");

  rl.question("Escolha: ", (opcao) => {

    let dificuldade = "";

    if (opcao === "1") {
      dificuldade = "facil";
    } else if (opcao === "2") {
      dificuldade = "medio";
    } else if (opcao === "3") {
      dificuldade = "dificil";
    } else {

      console.log("Opção inválida.");

      mostrarMenu();
      return;
    }

    let contador = 0;

    console.log("\nFlashcards " + dificuldade + ":");

    for (let i = 0; i < flashcards.length; i++) {

      if (flashcards[i].dificuldade === dificuldade) {

        console.log("--------------------");
        console.log("ID:", flashcards[i].id);
        console.log("Pergunta:", flashcards[i].pergunta);

        contador++;
      }

    }

    if (contador === 0) {
      console.log("Nenhum flashcard encontrado.");
    }

    mostrarMenu();

  });

}


// =====================================
// MODO ESTUDO
// =====================================

function estudarFlashcard() {

  if (flashcards.length === 0) {

    console.log("Nenhum flashcard cadastrado.");

    mostrarMenu();
    return;
  }

  let indiceAleatorio = Math.floor(
    Math.random() * flashcards.length
  );

  let flashcard = flashcards[indiceAleatorio];

  console.log("\n========================");
  console.log("       FLASHCARD");
  console.log("========================");

  console.log("Matéria:", flashcard.materia);
  console.log("Dificuldade:", flashcard.dificuldade);

  console.log("\nPergunta:");
  console.log(flashcard.pergunta);

  rl.question(
    "\nPressione ENTER para mostrar a resposta...",
    () => {

      console.log("\nResposta:");
      console.log(flashcard.resposta);

      console.log("\nVocê acertou?");
      console.log("1 - Sim");
      console.log("2 - Não");

      rl.question("Escolha: ", (opcao) => {

        if (opcao === "1") {

          flashcard.acertos++;

          console.log("Acerto registrado!");

        } else if (opcao === "2") {

          flashcard.erros++;

          console.log("Erro registrado!");

        } else {

          console.log("Opção inválida.");

        }

        console.log("Acertos:", flashcard.acertos);
        console.log("Erros:", flashcard.erros);

        mostrarMenu();

      });

    }
  );

}


// =====================================
// VER DESEMPENHO
// =====================================

function verDesempenho() {

  rl.question("Digite o ID do flashcard: ", (id) => {

    id = Number(id);

    let flashcardEncontrado = null;

    for (let i = 0; i < flashcards.length; i++) {

      if (flashcards[i].id === id) {
        flashcardEncontrado = flashcards[i];
      }

    }

    if (flashcardEncontrado === null) {

      console.log("Flashcard não encontrado.");

      mostrarMenu();
      return;
    }

    Math.ceil()
    Math.round()

    let tentativas =
      flashcardEncontrado.acertos +
      flashcardEncontrado.erros;

    console.log("\n--- DESEMPENHO ---");

    console.log(
      "Pergunta:",
      flashcardEncontrado.pergunta
    );

    console.log(
      "Acertos:",
      flashcardEncontrado.acertos
    );

    console.log(
      "Erros:",
      flashcardEncontrado.erros
    );

    console.log(
      "Tentativas:",
      tentativas
    );

    if (
      flashcardEncontrado.acertos >
      flashcardEncontrado.erros
    ) {

      console.log("Situação: Bom desempenho");

    } else if (
      flashcardEncontrado.acertos ===
      flashcardEncontrado.erros
    ) {

      console.log("Situação: Precisa praticar mais");

    } else {

      console.log("Situação: Revisar este conteúdo");

    }

    mostrarMenu();

  });

}


// =====================================
// FLASHCARD COM MAIS ERROS
// =====================================

function flashcardComMaisErros() {

  if (flashcards.length === 0) {

    console.log("Nenhum flashcard cadastrado.");

    mostrarMenu();
    return;
  }

  let flashcardMaiorErro = flashcards[0];

  for (let i = 1; i < flashcards.length; i++) {

    if (
      flashcards[i].erros >
      flashcardMaiorErro.erros
    ) {

      flashcardMaiorErro = flashcards[i];

    }

  }

  console.log("\n--- FLASHCARD QUE MAIS PRECISA DE REVISÃO ---");

  console.log("ID:", flashcardMaiorErro.id);
  console.log("Pergunta:", flashcardMaiorErro.pergunta);
  console.log("Matéria:", flashcardMaiorErro.materia);
  console.log("Erros:", flashcardMaiorErro.erros);

  mostrarMenu();
}


// =====================================
// ESTATÍSTICAS
// =====================================

function mostrarEstatisticas() {

  let totalAcertos = 0;
  let totalErros = 0;

  for (let i = 0; i < flashcards.length; i++) {

    totalAcertos =
      totalAcertos + flashcards[i].acertos;

    totalErros =
      totalErros + flashcards[i].erros;

  }

  let totalRespostas =
    totalAcertos + totalErros;

  console.log("\n======= ESTATÍSTICAS =======");

  console.log(
    "Flashcards cadastrados:",
    flashcards.length
  );

  console.log(
    "Total de acertos:",
    totalAcertos
  );

  console.log(
    "Total de erros:",
    totalErros
  );

  console.log(
    "Total de respostas:",
    totalRespostas
  );

  mostrarMenu();
}


// =====================================
// LISTAR MATÉRIAS SEM REPETIR
// =====================================

function listarMaterias() {

  let materias = [];

  for (let i = 0; i < flashcards.length; i++) {

    let jaExiste = false;

    for (let j = 0; j < materias.length; j++) {

      if (
        flashcards[i].materia === materias[j]
      ) {

        jaExiste = true;

      }

    }

    if (jaExiste === false) {

      materias.push(flashcards[i].materia);

    }

  }

  console.log("\n--- MATÉRIAS ---");

  if (materias.length === 0) {

    console.log("Nenhuma matéria cadastrada.");

  } else {

    for (let i = 0; i < materias.length; i++) {

      console.log(materias[i]);

    }

  }

  mostrarMenu();
}


// =====================================
// MENU
// =====================================

function mostrarMenu() {

  console.log("\n================================");
  console.log("          STUDYCARDS");
  console.log("================================");

  console.log("\nFLASHCARDS");

  console.log("1 - Cadastrar flashcard");
  console.log("2 - Listar flashcards");
  console.log("3 - Buscar flashcard por ID");
  console.log("4 - Atualizar flashcard");
  console.log("5 - Remover flashcard");

  console.log("\nESTUDO");

  console.log("6 - Listar por matéria");
  console.log("7 - Listar por dificuldade");
  console.log("8 - Estudar flashcard");
  console.log("9 - Ver desempenho");

  console.log("\nRELATÓRIOS");

  console.log("10 - Flashcard com mais erros");
  console.log("11 - Estatísticas gerais");
  console.log("12 - Listar matérias");

  console.log("\n0 - Sair");

  rl.question(
    "\nEscolha uma opção: ",
    (opcao) => {

      if (opcao === "1") {

        cadastrarFlashcard();

      } else if (opcao === "2") {

        listarFlashcards();

      } else if (opcao === "3") {

        buscarFlashcardPorId();

      } else if (opcao === "4") {

        atualizarFlashcard();

      } else if (opcao === "5") {

        removerFlashcard();

      } else if (opcao === "6") {

        listarPorMateria();

      } else if (opcao === "7") {

        listarPorDificuldade();

      } else if (opcao === "8") {

        estudarFlashcard();

      } else if (opcao === "9") {

        verDesempenho();

      } else if (opcao === "10") {

        flashcardComMaisErros();

      } else if (opcao === "11") {

        mostrarEstatisticas();

      } else if (opcao === "12") {

        listarMaterias();

      } else if (opcao === "0") {

        console.log("Programa encerrado.");

        rl.close();

      } else {

        console.log("Opção inválida.");

        mostrarMenu();

      }

    }
  );

}


// =====================================
// INICIAR
// =====================================

mostrarMenu();