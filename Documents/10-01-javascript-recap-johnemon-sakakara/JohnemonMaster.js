const JohnemonWorld = require("./JohnemonWorld");

class JohnemonMaster {
  constructor(name) {
    this.name = name;
    this.johnemonCollection = [];
    this.healingItems = 5; // Initial number of healing items
    this.reviveItems = 3; // Initial number of revive items
    this.JOHNEBALLS = 10; // Initial number of JOHNEBALLS
  }


  renameJohnemon(johnemon, newName) {
    const johnemonIndex = this.johnemonCollection.indexOf(johnemon);
    if (johnemonIndex === -1) {
      console.error("Johnemon not found in the collection!");
      return;
    }
    this.johnemonCollection[johnemonIndex].name = newName;
    console.log(`Johnemon renamed to ${newName}`);
  }



  healJohnemon(johnemon) {
    const johnemonIndex = this.johnemonCollection.indexOf(johnemon);
    if (johnemonIndex === 0) {
      console.error("Johnemon not found in the collection!");
      return;
    }

     if (this.healingItems <= 0) {
      console.error("No healing items available!");
      return;
    }

    // Heal the Johnemon
    const johnemonToHeal = this.johnemonCollection[johnemonIndex];
    johnemonToHeal.actualHealthPool = johnemonToHeal.maxHealthPool;

    // Decrease the number of healing items
    this.healingItems--;

    console.log(`${johnemonToHeal.name} has been healed to full health!`);
    console.log(`Remaining healing items: ${this.healingItems}`);
  }

  

  reviveJohnemon(johnemon) {
    // Check if the Johnemon exists in the collection
    const johnemonIndex = this.johnemonCollection.indexOf(johnemon);
    if (johnemonIndex === -1) {
      console.error("Johnemon not found in the collection!");
      return;
    }
        // Check if there are revive items available
        if (this.reviveItems <= 0) {
          console.error("No revive items available!");
          return;
        }
        // Revive the Johnemon
        const johnemonToRevive = this.johnemonCollection[johnemonIndex];
        if (johnemonToRevive.actualHealthPool > 0) {
          console.error(`${johnemonToRevive.name} is not fainted and cannot be revived!`);
          return;
        }
        johnemonToRevive.actualHealthPool = johnemonToRevive.maxHealthPool / 2; // Revive with half health
    
        // Decrease the number of revive items
        this.reviveItems--;
        console.log(`${johnemonToRevive.name} has been revived with half health!`);
        console.log(`Remaining revive items: ${this.reviveItems}`);
      }
  


  releaseJohnemon(johnemon) {
     // Check if the Johnemon exists in the collection
     const johnemonIndex = this.johnemonCollection.indexOf(johnemon);
     if (johnemonIndex === -1) {
       console.error("Johnemon not found in the collection!");
       return;
     }
 
     // Remove the Johnemon from the collection
     this.johnemonCollection.splice(johnemonIndex, 1);
 
     console.log(`${johnemon.name} has been released!`);
   }
  

  showCollection() {
    if (this.johnemonCollection.length === 0) {
      console.log("Your Johnemon collection is empty.");
      return;
    }else {

    console.log("Your Johnemon collection:");
    this.johnemonCollection.forEach((johnemon, index) => {
      console.log(`${index + 1}. ${johnemon.name} - Health: ${johnemon.actualHealthPool}/${johnemon.maxHealthPool}`);
    });
    
  }


}
}

module.exports = JohnemonMaster
