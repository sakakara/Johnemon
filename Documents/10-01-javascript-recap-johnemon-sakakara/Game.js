const readline = require('readline');
const JohnemonMaster = require('./JohnemonMaster'); // Replace 'your_classes_filename' with the actual filename
const Johnemon = require('./Johnemon');
const JohnemonWorld = require('./JohnemonWorld');
const fs = require('fs');
const JohnemonArena = require('./JohnemonArena');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const johnemonArena = new JohnemonArena();
const johnemonWorld = new JohnemonWorld();
const johnemonMaster = new JohnemonMaster();
let playername = "";

function saveGameState() {
  rl.question('voulez vous sauvegarder oui/non\n', (answer) => {
    if (answer === "oui") {
      const gameState = {
        saved_on: new Date().toISOString(),
        johnemonMaster: {
          name: johnemonMaster.name,
          johnemonCollection: johnemonMaster.johnemonCollection.map(
            (johnemon) => ({
              name: johnemon.name,
              level: johnemon.level,
              healthPool: johnemon.healthPool,
              experienceMeter: johnemon.experienceMeter,
              attackRange: johnemon.attackRange,
              defenseRange: johnemon.defenseRange,
              catchPhrase: johnemon.catchPhrase,
        }))
      }
        
      };

      // Convertir l'objet en une chaîne JSON
      const gameStateJSON = JSON.stringify(gameState, null, 2);

      // Écrire la chaîne JSON dans un fichier
      fs.writeFile('gameState.json', gameStateJSON, (err) => {
        if (err) {
          console.error('Error saving game state:', err);
        } else {
          console.log('Game state saved successfully.');
        }
      });
    }
  });
}

function loadGame() {
  // Lire le fichier de sauvegarde
  fs.readFile('gameState.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error loading game state:', err);
      rl.question('Do you want to start a new game instead? (yes/no)\n', (answer) => {
        if (answer.toLowerCase() === 'yes') {
          proposeFirstJohnemon();
        } else {
          rl.close(); // Ferme l'interface si l'utilisateur ne veut pas continuer
        }
      });
      return;
    }

    // Si la lecture est réussie, parser le fichier JSON
    try {
      const gameState = JSON.parse(data);

      // Restaurer le johnemonMaster et sa collection
      johnemonMaster.name = gameState.johnemonMaster.name;
      johnemonMaster.johnemonCollection = gameState.johnemonMaster.johnemonCollection.map(j => {
        const johnemon = new Johnemon();
        johnemon.name = j.name;
        johnemon.level = j.level;
        johnemon.healthPool = j.healthPool;
        johnemon.experienceMeter = j.experienceMeter;
        johnemon.attackRange = j.attackRange;
        johnemon.defenseRange = j.defenseRange;
        johnemon.catchPhrase = j.catchPhrase;
        return johnemon;
      });

      console.log("Game loaded successfully!");
      mainGame(); // Continuer le jeu après avoir chargé l'état
    } catch (parseError) {
      console.error('Error parsing game state:', parseError);
      rl.close(); // Ferme l'interface en cas d'erreur de parsing
    }
  });
}


function askForName() {
  rl.question(`what is your name ? \n`, (answer) => {
    const lowerCaseAnswer = answer.toLocaleLowerCase();
    playername = answer.toLowerCase();
    console.log(`Votre nom est : ${playername}`);
    mainGame();
  });
}

function proposeFirstJohnemon() {
  const firstJohnemon = new Johnemon();
  console.log(`your first Johnemon is : ${firstJohnemon.name}`);
  johnemonMaster.johnemonCollection.push(firstJohnemon);
  rl.question('do you want to continue ? (yes/no) \n', (answer) => {
    if (answer.toLowerCase() === 'yes') {
      console.log('The game will start!');
      askForName();
    } else {
      proposeFirstJohnemon();
    }
  });
}

function startGame() {
  proposeFirstJohnemon();
}

function mainGame() {
  rl.question(`What do you want to do :\n 1:Heal\n 2:Revive\n 3:rename\n 4:show collection\n 5:release\n 6:To save\n`, (answer) => {
    if (answer === "1") {
      johnemonMaster.showCollection();
      if (johnemonMaster.johnemonCollection.length === 0) {
        console.log("you have no johnemon to heal");
        mainGame();
        return;
      }

      rl.question("Which Johnemon you want to heal ?", (index) => {
        const selectedIndex = parseInt(index) - 1; // Convertir l'entrée en indice, et ajuster pour correspondre à l'index du tableau
        if (selectedIndex >= 0 && selectedIndex < johnemonMaster.johnemonCollection.length) {
          const johnemonToHeal = johnemonMaster.johnemonCollection[selectedIndex];
          johnemonMaster.healJohnemon(johnemonToHeal);
        } else {
          console.log("invalid selection");
        }
        johnemonWorld.oneDayPasses();
        mainGame(); // Retour au menu principal après avoir soigné
      });
    } else if (answer === "2") {
      johnemonMaster.showCollection();
      if (johnemonMaster.johnemonCollection.length === 0) {
        console.log("you have no johnemon to heal");
        mainGame();
        return;
      }
      rl.question("wich johnemon do you want to revive?", (index) => {
        const selectedIndex = parseInt(index) - 1; // Convertir l'entrée en indice, et ajuster pour correspondre à l'index du tableau
        if (selectedIndex >= 0 && selectedIndex < johnemonMaster.johnemonCollection.length) {
          const johnemonToRevive = johnemonMaster.johnemonCollection[selectedIndex];
          johnemonMaster.reviveJohnemon(johnemonToRevive);
      }})
      johnemonWorld.oneDayPasses();
      mainGame(); // Retour au menu après action
    } else if (answer === "3") {
      johnemonMaster.showCollection();
      if (johnemonMaster.johnemonCollection.length === 0) {
        console.log("you have no johnemon to rename");
        mainGame();
        return;
      }
      rl.question("witch johnemon do you want to rename?", (index) => {
        const selectedIndex = parseInt(index) - 1; // Convertir l'entrée en indice, et ajuster pour correspondre à l'index du tableau
        if (selectedIndex >= 0 && selectedIndex < johnemonMaster.johnemonCollection.length) {
          const johnemonToRename = johnemonMaster.johnemonCollection[selectedIndex];
          johnemonMaster.renameJohnemon(johnemonToRename);
      }})
      johnemonMaster.renameJohnemon();
      mainGame(); // Retour au menu après action
    } else if (answer === "4") {
      johnemonMaster.showCollection();
      mainGame(); // Retour au menu après action
    } else if (answer === "5") {
      johnemonMaster.releaseJohnemon();
      johnemonMaster.showCollection();
      if (johnemonMaster.johnemonCollection.length === 0) {
        console.log("you have no johnemon to release");
        mainGame();
        return;
      }
      rl.question("wich johnemon do you want to release?", (index) => {
        const selectedIndex = parseInt(index) - 1; // Convertir l'entrée en indice, et ajuster pour correspondre à l'index du tableau
        if (selectedIndex >= 0 && selectedIndex < johnemonMaster.johnemonCollection.length) {
          const johnemonToRelease = johnemonMaster.johnemonCollection[selectedIndex];
          johnemonMaster.releaseJohnemon(johnemonToRelease);
          mainGame();
      }})
      mainGame(); // Retour au menu après action
    }
    else if(answer === "6") {
      saveGameState();
    }
  });
}

function ChooseState(){
  rl.question('Choice 1: New game\n 2: Load game\n', (answer) => {
    if(answer === "1") {
      proposeFirstJohnemon();
    }
    else {
      loadGame();
    }
  })
}

ChooseState();
