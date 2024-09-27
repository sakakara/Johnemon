const JohnemonArena = require('./JohnemonArena')
const Johnemon = require('./Johnemon')


class JohnemonWorld {
  constructor() {
   this.Johnemon = [];
   this.day = 0;
  }

  oneDayPasses(johnemonIndex = null, newName = null, choice){
    this.day += 1;
    this.Johnemon.forEach(Johnemon => {
      Johnemon.rest();
    });
    console.log(` ${this.day} day has passed`);
    this.randomizeEvent();
  
  }
  
  randomizeEvent() {
   if (Math.random() < 0.5) {
    console.log("nothing happened")
   }
   else {
    console.log("a johnemon savage appeared")
    this.JohnemonArena.startBattle();
   }

  }

  addLog(newLog){
    
  }
}


module.exports = JohnemonWorld