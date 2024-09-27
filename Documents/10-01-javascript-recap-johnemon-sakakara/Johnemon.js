const students = [
  'oliv', 'via',
  'no', 'ra',
  'dia', 'na',
  'mo', 'hab',
  'ly', 'ne',
  'ja', 'son',
  'seba', 'stien',
  'cri', 'stelle',
  'fa', 'rid',
  'ju', 'lien',
  'ed', 'ouard',
  'mbo', 'gle',
  'ben', 'jamin',
  'mat', 'teo',
  're', 'da',
  'dona', 'tien',
  're', 'naud',
  'Antoi', 'ne',
  'nahi', 'mana',
  'ste', 'phen',
  'moha', 'med',
  'ha', 'kim',
  'pie', 're',
  'hu', 'go',
  'the', 'o',
  'max', 'ime',
]

class Johnemon {
  constructor() {
    this.name = this.generateRandomName();
    this.level = 1;
    this.experienceMeter = 0;
    this.attackRange = this.getRandomNumber(1, 8);
    this.defenseRange = this.getRandomNumber(1, 3);
    this.actualHealthPool = this.getRandomNumber(10, 30);
    this.maxHealthPool = this.actualHealthPool;
    this.catchPhrase = this.generateCatchPhrase();
  }

  generateRandomName() {
    const firstPart = students[Math.floor(Math.random() * students.length)];
    const secondPart = students[Math.floor(Math.random() * students.length)];
    const johnemonName = firstPart + secondPart;
    return johnemonName;
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateCatchPhrase() {
    const phrases = ["Johnemon getto daze", "Let the battle begin!", "Johnemon, go!"];
    return phrases[Math.floor(Math.random() * phrases.length)];
  }

  attack(defender) {
    const damage = this.getRandomNumber(this.attackRange * this.level, this.attackRange) - defender.defenseRange;
    defender.healthPool -= damage;
    console.log(`${this.name} attacked ${defender.name} and dealt ${damage} damage!`);
  }

  gainExperience(opponentLevel) {
    const experienceGain = this.getRandomNumber(1, 5) * opponentLevel;
    this.experienceMeter += experienceGain;
    console.log(`${this.name} gained ${experienceGain} experience points!`);
    if (this.experienceMeter >= this.level * 100) {
      this.evolve();
    }
  }

  evolve() {
    this.level += 1;
    const attackIncrease = this.getRandomNumber(1, 5);
    const defenseIncrease = this.getRandomNumber(1, 5);
    const healthIncrease = this.getRandomNumber(1, 5);

    this.attackRange += attackIncrease;
    this.defenseRange += defenseIncrease;
    this.healthPool += healthIncrease;

    console.log(`${this.name} evolved into a higher level! New stats: Level ${this.level}, Attack Range ${this.attackRange}, Defense Range ${this.defenseRange}, Health Pool ${this.healthPool}`);
  }

  sayCatchPhrase() {
    console.log(`${this.name} says: "${this.catchPhrase}"`);
  }
}

module.exports = Johnemon
