const { log } = require('console');
const readline = require('readline');

class JohnemonArena {
  constructor(johnemon_1, johnemon_2) {
    this.johnemon_1 = johnemon_1;
    this.johnemon_2 = johnemon_2;
  }

  startBattle() {
    console.log(`The battle between ${this.johnemon_1.name} and ${this.johnemon_2.name} begins!`);

    while (this.johnemon_1.healthPool > 0 && this.johnemon_2.healthPool > 0) {
      this.johnemon_1.attack(this.johnemon_2);
      if (this.johnemon_2.healthPool <= 0) {
        console.log(`${this.johnemon_2.name} has been defeated! ${this.johnemon_1.name} wins!`);
        break;
      }

      this.johnemon_2.attack(this.johnemon_1);
      if (this.johnemon_1.healthPool <= 0) {
        console.log(`${this.johnemon_1.name} has been defeated! ${this.johnemon_2.name} wins!`);
        break;
      }
    }
  }

  chooseJohnemon() {
    const johnemonList = [];
    for (let i = 0; i < 5; i++) {
      johnemonList.push(new Johnemon());
    }

    console.log('Choose your Johnemon:');
    johnemonList.forEach((johnemon, index) => {
      console.log(`${index + 1}. ${johnemon.name} (Level: ${johnemon.level}, Attack: ${johnemon.attackRange}, Defense: ${johnemon.defenseRange}, Health: ${johnemon.healthPool})`);
    });

    rl.question('Enter the number of the Johnemon you choose: ', (answer) => {
      const chosenIndex = parseInt(answer) - 1;
      if (chosenIndex >= 0 && chosenIndex < johnemonList.length) {
        const chosenJohnemon = johnemonList[chosenIndex];
        console.log(`You chose ${chosenJohnemon.name}!`);
        rl.close();
        return chosenJohnemon;
      } else {
        console.log('Invalid choice. Please try again.');
        rl.close();
        return this.chooseJohnemon();
      }
    });
  }

  startRound(selectedJohnemon) {
    if (!selectedJohnemon) {
      console.error("No Johnemon selected!");
      return;
    }

    // Initialize Johnemon stats for the new round
    selectedJohnemon.health = selectedJohnemon.maxHealth;
    selectedJohnemon.energy = selectedJohnemon.maxEnergy;

    // Update game state to indicate a new round has started
    this.currentRound++;
    this.isRoundActive = true;

    console.log(`Round ${this.currentRound} started with ${selectedJohnemon.name}!`);
  }

  playerAction(selectedJohnemon) {
    // Display available actions to the player
    console.log("Choose an action:");
    console.log("1. Attack");
    console.log("2. Defend");
    console.log("3. Use Item");

    const playerChoice = 0; // Initialize with a default value

    switch (playerChoice) {
      case 1:
        this.attack(selectedJohnemon);
        break;
      case 2:
        this.defend(selectedJohnemon);
        break;
      case 3:
        this.useItem(selectedJohnemon);
        break;
      default:
        console.error("Invalid action selected!");
    }
  }

  attack(selectedJohnemon) {
    const opponentJohnemon = this.getOpponentJohnemon();
    if (!opponentJohnemon) {
      console.error("No opponent Johnemon found!");
      return;
    }
    const damage = selectedJohnemon.attackPower;
    opponentJohnemon.health -= damage;

    if (opponentJohnemon.health < 0) {
      opponentJohnemon.health = 0;
    }
    console.log(`${selectedJohnemon.name} attacks ${opponentJohnemon.name} for ${damage} damage!`);
    console.log(`${opponentJohnemon.name} has ${opponentJohnemon.health} health remaining.`);

    // Check if the opponent is defeated
    if (opponentJohnemon.health === 0) {
      console.log(`${opponentJohnemon.name} is defeated!`);
      this.endRound();
      this.endBattle();
    }
  }

  tryToCatch() {
    // Implementation for tryToCatch
  }

  calculateDamage(attackRange, defenseRange) {
    const randomDamage = Math.floor(Math.random() * 8) + 1;

    // Calculer les dégâts en soustrayant defenseRange
    let damage = randomDamage - defenseRange;

    // S'assurer que les dégâts ne sont pas négatifs
    if (damage < 0) {
      damage = 0;
    }
    return damage;
  }

  wildJohnemonAction() {
    const ennemyAttack = opponentJohnemon.attackPower;
    selectedJohnemon.health -= ennemyAttack; //diminue les hp de notre johnemon
    if (selectedJohnemon.health === 0) {
      selectedJohnemon.health = 0;
    }
    console.log(`${selectedJohnemon.name} is defeated`);
    this.endRound();
    this.endBattle();
    if (selectedJohnemon.health > 0) {
      console.log(`${opponentJohnemon.name} attacked ${selectedJohnemon.name} for ${damage} damage`);
      console.log(`your ${selectedJohnemon.name} has ${selectedJohnemon.health} health left`);
    }
  }

  checkBattleStatus() {
    // Implementation for checkBattleStatus
  }

  startNewRound() {
    // Implementation for startNewRound
  }

  endBattle() {
    if (selectedJohnemon.health === 0) {
      console.log(`your ${selectedJohnemon.name} has been defeated`);
    } else if (opponentJohnemon.health === 0) {
      console.log(`Congratulation you have defeated ${opponentJohnemon.name}`);
    }
  }
}

module.exports = JohnemonArena;