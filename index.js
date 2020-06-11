/* --------------------------------Readline------------------------------------*/
const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);
function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

/*-------------------------Constants----------------------------------*/

/*--------------------------Rooms------------------------------------*/
class Room {
  constructor(name, desc, inv) {
    this.name = name
    this.desc = desc
    this.inv = inv
    this.locked = false
  }
}

/*------------------------Gameplay Functions-------------------------*/
function cleanWords(word) {
  let steralize = word.toString().trim().toLowerCase()
  return steralize
}

/*----------------------------Player-------------------------------*/
const player = {
  inventory: [],
  location: null
}

/*----------------------Look up tables and State Machine--------*/

/*----------------------------------Story--------------------------------------------*/
async function intro() {
  const introMessage = `Welcome to the Zombie Apocalypse! Zombies are all around and closing in fast! Please word your actions in a [action] + [Item/Room] format`
  let startPrompt = await ask(introMessage + '\n' + 'Do you understand?\n>_')
  let cleanStart = cleanWords(startPrompt)
  if (cleanStart === 'yes') {
    start();
  } else {
    console.log("Come back when you're ready then!")
    process.exit();
  }
}