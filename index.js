/* -------------------------------------Readline-----------------------------------------*/
const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve)
  })
}

/*-------------------------------Gameplay Functions--------------------------------*/
//steralizes user inoput to check against command word bank
function cleanWords(word) {
  let steralize = word.toString().trim().toLowerCase();
  return steralize;
}
//function that counts down until the impeding zombie horde kills the player
function zombieHorde() {
  if (player.encroacment >= 0) {
    player.encroacment = player.encroacment - 1;
    if (player.encroacment === 12) {
      console.log(
        "You can hear the sound the zombie hoarde growing louder and louder"
      );
    }
    if (player.encroacment <= 6 && player.encroacment > 0) {
      console.log(
        "You can see the zombies slowly moving towards you, they are now focused on you!"
      );
    }
    if (player.encroacment === 0) {
      console.log(
        "The zombies have gotten you and added you to their ranks. Enjoy the brains!"
      );
      process.exit();
    }
  }
}

//uses item to create space from the horde
function hordeGain() {
  if (player.inventory.includes(word) && word === 'runningShoes') {
    encroachment = 20
    console.log("Your new kicks allow you to put some distance between yourself and the zombies!")
  } else {
    console.log("You can't use that")
  }
}

//picks up takeable items and stashes them in players array
function takeItem(word) {
  let pickUpItem = itemLookUp[word]
  if (pickUpItem.takeable === true && player.location.inv.includes(word)) {
    player.location.inv.splice(player.location.inv.indexOf(word), 1)
    player.inventory.push(word)
    console.log("You picked up " + word)
  }
  else {
    console.log("This is not your to take!")
  }
}

//unlocks final room so player can escape to safety
function unlock(word) {
  if (player.inventory.includes('key')) {
    currentState.locked = false
    console.log("You unlocked the padlock! Now quickly make your way into the tunnel and make your way to Paradise Cove")
  } else {
    console.log("You don't have a key to do that")

  }
}

//allows plater to examine item
function examine(word) {
  let lookAt = itemLookUp[word]
  if (player.location.inv.includes(word)) {
    console.log(lookAt.desc)
  }
}


/*----------------------------Player-------------------------------*/
//player state 
const player = {
  inventory: [],
  location: null,
  encroacment: 20,
};

/*-------------------------Constants----------------------------------*/
//word bank that triggers action functions
const actions = {
  move: ["move", "go", "walk", "run"],
  consume: ["eat", "consume", "use", "wear"],
  grab: ["grab", "take"],
  unlock: ["unlock"],
  examine: ["read", "examine"],
};

/*----------------------------------------Items---------------------------------------------------------------*/
//class constructor
class Item {
  constructor(name, desc, takable, action) {
    this.name = name;
    this.desc = desc;
    this.takable = takable;
    this.action = action;
  }
}

//items class
const note = new Item(
  "Note",
  'Hand written note that is attached the entry gate that reads ,"We have safety and supplies beyond the town through the tunnel, there is a key in one of the houses that will let get through the door at the end of the cul-de-sac and into the tunnel and make your way to Paradise Cove and make sure to throw the key into the corner for others to find and re-lock hatch the "',
  false)

const backpack = new Item(
  "Backpack",
  "A weathered but usable backpack blue",
  true);

const key = new Item("Key",
  "a standard padlock key",
  true);

const flashlight = new Item(
  "Flashlight",
  "A dim but functional flashlight. Just bright enough to lead the way!",
  true,
)

const runningShoes = new Item(
  "Running shoes",
  "A pair of blue PF Flyers, They're guaranteed to make you run faster and job higher!",
  true,
)

const rug = new Item(
  "Rug",
  "An out of place cheap looking throw rug about 3x6 in size.",
  true,
)

const padlock = new Item(
  "Padlock",
  "Just a standard pad lock.",
  true
  )

//lookup table
let itemLookUp = {
  'note': note,
  'backpack': backpack,
  'key': key,
  'flashlight': flashlight,
  'runningShoes': runningShoes,
  'rug': rug,
  'padlock': padlock,
};

/*----------------------------------Rooms---------------------------------------------*/
//room class constructor
class Room {
  constructor(name, desc, inv) {
    this.name = name;
    this.desc = desc;
    this.inv = inv;
    this.locked = false;
  }
}

//rooms class
const gate = new Room(
  "Gate",
  "You quickly come upon a gated community that looks to overrun and long abandoned. The gate is loosely held together by some rusted chains with a note that reads: “We have safety and supplies beyond the town through the tunnel, there is a key in one of the houses that will let get through the door at the end of the cul-de-sac and into the tunnel and make your way to Paradise Cove. Hurry, once the gates are open there is no way to close them and ‘they’ will get in.",
  []
);
const outside = new Room(
  "Outside",
  "Once you open the chains and push through the large gates, you see what is left of what was a nice gated community, but is now run down, burnt out or worse. On the left side of the street is a burnt shell of a house next to a decrepit old house with boarded up windows and what looks like a working front door. On the right side of the street are two houses, one is boarded up and wrapped in barbed wire, while the other sits barely touched. At the end of the cul-de-sac stands a giant white mansion, with giant marble columns and red door. There is a weathered but usable backpack",
  [backpack]
);
const kitchen = new Room(
  "kitchen",
  "Is just off the main entrance to the south. Where in the main hall there is a grand stair-way that is blocked by the roof that has collapsed and there’re terracotta tiles broken and strewn about.  The kitchen is very large. There is wall to wall cabinets from floor to ceiling covering most of the wall space. The cabinets are white in color and there isn't a single drawer or door or a single door on any of the cabinets.The cabinets are on the east, north and west side walls  In the center there is a very large island containing the stainless steel stove and propane grill cook station.The west side wall contains an large archway opening to what appears to be a living room.The east side wall contains a small but solid wooden door that has been boarded up and the boards are unable to be removed.The north side wall contains only cabinets.High up on a shelf there is what appears to be a brand new pair of PF Flyers running shoes.They are, Guaranteed to make you run faster and jump higher!",
  [runningShoes, key]
);
const livingRoom = new Room(
  "Livingroom",
  "Enter through a large archway on the east of the room after going through the kitchen , sitting on the middle north side  of the room is an entertainment center with a smashed flat screen tv. The entertainment center is white in color and has 3 drawers across the top where the center drawer is missing,  the other 2 are tattered and worn looking. The west wall  there is a very large ornate oak wood door that is locked and there is a broken lamp in the middle of the doorway. The east wall contains a very large plate glass window that was broken and has since been boarded up with plywood.",
  []
);
const gazebo = new Room(
  "gazebo",
  "At the Center of the gated community and it is made out a white marble. All houses lead to the gazebo There are solid marble benches all the way around and odd on the south side bench there’s a random flashlight that actually still works just laying on the bench.",
  [flashlight]
);
const mansion = new Room(
  "mansion",
  "A mid-sized mansion that is white in color. There is what appears to be large iron doors over the entry doors and all the windows, the place looks like a fortress. It is completely in-penetrable",
  []
);
const ballRoom = new Room(
  "ballroom",
  "Enter through the north. The  Ballroom is a grand space. The walls are end to end dark cherry wood, that slope up and fade into a grand arched ceiling that is adorned with what appears to be an ornate copper dome much like you would see in old architecture. Due to the elemental exposure the copper has oxidized and turned a dull green color. There is a massive crystal chandelier that has smashed to the floor. The south wall is also empty but contains a glass wall that slides all the way across the room into a courtyard with an Olympic size swimming pool that disappears into the part of the house. The huge bank of glass appears to be covered in old blood.  The west wall is empty. The east wall contains 2 large cherry double doors, which open into a master bedroom and bathroom.",
  []
);
const bedRoom = new Room(
  "Bedroom",
  "Bedroom off of the Ballroom is quite possibly the biggest bedroom you’ve ever seen. It is bigger than some houses. The East wall is empty except for the doors and an outline of what was most likely a painting that's about 12 feet in size.On the south wall there is another wall of windows that can be opened up.Much like the windows in the Living room they are strewn with old dried up blood.The west wall contains the remnants of what used to be a bed.The mattress is all torn to shreds and is all black with mold.The north wall contains another set of cherry double doors which opens into a huge master bathroom.",
  []
);
const bathRoom = new Room(
  "bathroom",
  "You enter through the north and the bathroom is floor to ceiling White Italian Marble. On the east wall there's a large double sink coming out of the wall that’s long enough to lay down in.The west wall contains a single cherry door that is locked. Oddly there is no toilet in the bathroom.The whole south side of the bathroom is a massive glassed walk -in shower.There must be 100 wall and ceiling water jets in the shower room.On the floor there’s an out of place looking cheap throw rug.You move the throw to discover a grate in the floor just big enough for a man to fit in that’s padlocked shut. Use the key to open the lock and enter the tunnel to exit.",
  [rug, padlock]
);

//setting mansion to locked
mansion.locked = true;

//room lookup table
let roomLookUp = {
  'outside': outside,
  'kitchen': kitchen,
  'livingRoom': livingRoom,
  'gazebo': gazebo,
  'mansion': mansion,
  'ballRoom': ballRoom,
  'bedRoom': bedRoom,
  'bathRoom': bathRoom,
};


/*---------------------------------State Machine------------------------------------------------- */
//actual state machine
let enterRooms = {
  'outside': {
    canChangeTo: ['kitchen']
  },
  'kitchen': {
    canChangeTo: ['outside', 'livingRoom', 'gazebo']
  },
  'livingRoom': {
    canChangeTo: ['kitchen']
  },
  'gazebo': {
    canChangeTo: ['mansion', 'kitchen', 'ballRoom']
  },
  'mansion': {
    canChangeTo: ['gazebo']
  },
  'ballRoom': {
    canChangeTo: ['bedRoom', 'gazebo']
  },
  'bedRoom': {
    canChangeTo: ['bathRoom', 'ballRoom']
  }
}

//game start location
let currentRoom = 'outside'

//fumction that allows room transitions
function changeRooms(newRoom) {
  let roomTransitions = enterRooms[currentRoom].canChangeTo;
  if (roomLookUp[newRoom].locked === true) {
    console.log('The door is locked, move along!');
  } else if (roomTransitions.includes(newRoom)) {
    currentRoom = newRoom;
    let stateForTable = roomLookUp[currentRoom]
    console.log(stateForTable.desc);
    zombieHorde()
    console.log("You better hurry up they're getting closer!" + player.encroacment);
    player.location = roomLookUp[currentRoom]
  } else {
    console.log('You can not make that move from' + currentRoom + 'to' + newRoom)
  }
}

/*----------------------------------Story--------------------------------------------*/
//intro asking if the player would like to play
async function intro() {
  const introMessage = `Welcome to the Zombie Apocalypse! Zombies are all around and closing in fast! Please word your actions in a [action] + [Item/Room] format`;
  let startPrompt = await ask(introMessage + "\n" + "Do you understand?\n>_");
  let cleanStart = cleanWords(startPrompt);
  if (cleanStart === "yes") {
    start();
  } else {
    console.log("Come back when you're ready then!");
    process.exit();
  }
}

intro();
// game start
async function start() {
  const startMessage = `After some time running through woods, you come upon a gated community that looks overrun and long abandoned. The gate is losely held together by some rusted chains with a note that reads: “We have safety and supplies beyond the town through the tunnel, there is a key in one of the houses that will unlock the mansion at the end of the cul-de-sac and will give you access to the tunnel and make your way to Paradise Cove. Hurry, once the gates are open there is no way to close them and ‘they’ will get in!
  
  What would like you to do?`;

  console.log(startMessage);
  player.location = outside
  while (player.encroachment > 0) {
    let dirtyInput = await ask('>_')
    let cleanInput = cleanWords(dirtyInput)
    let cleanArray = cleanInput.split(' ')
    let command = cleanArray[0]
    let activity = cleanArray[cleanArray.length - 1]
    if (cleanInput === 'i') {
      if (player.location.inv.length === 0) {
        console.log("There is nothing here")
      } else {
        player.location.inv.forEach(function (obj) {
          console.log(obj)
        })
      }
    } else if (cleanInput === 'c') {
      if (player.inventory.length === 0) {
        console.log("There is nothing in your pockets.")
      } else {
        player.inventory.forEach(function (obj) {
          console.log(obj)
        })
      }
    } else if (actions.move.includes(command)) {
      changeRooms(activity)
    } else if (actions.grab.includes(word)) {
      takeItem(activity)
    } else if (actions.consume.includes(word)) {
      hordeGain(activity)
    } else if (actions.unlock.includes(word)) {
      unlock(activity)
    } else if (actions.examine.includes(word)) {
      examine(activity)
    } else {
      console.log("I'm not too sure how to do " + cleanInput + ". Care to try again?")
    }
  }
}