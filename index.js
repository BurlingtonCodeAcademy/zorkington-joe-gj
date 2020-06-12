/* --------------------------------Readline------------------------------------*/
const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

/*-------------------------Constants----------------------------------*/
const actions = {
  move: ["move", "go", "walk", "run"],
  consume: ["eat", "consume"],
  grab: ["grab", "take"],
  unlock: ["unlock", "use"],
  examine: ["read", "examine"],
};

/*--------------------------Rooms------------------------------------*/
class Room {
  constructor(name, desc, inv) {
    this.name = name;
    this.desc = desc;
    this.inv = inv;
    this.locked = false;
  }
}

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
const bedroom = new Room(
  "Bedroom",
  "Bedroom off of the Ballroom is quite possibly the biggest bedroom you’ve ever seen. It is bigger than some houses. The East wall is empty except for the doors and an outline of what was most likely a painting that's about 12 feet in size.On the south wall there is another wall of windows that can be opened up.Much like the windows in the Living room they are strewn with old dried up blood.The west wall contains the remnants of what used to be a bed.The mattress is all torn to shreds and is all black with mold.The north wall contains another set of cherry double doors which opens into a huge master bathroom.",
  []
);
const bathroom = new Room(
  "bathroom",
  "You enter through the north and the bathroom is floor to ceiling White Italian Marble. On the east wall there's a large double sink coming out of the wall that’s long enough to lay down in.The west wall contains a single cherry door that is locked.Oddly there is no toilet in the bathroom.The whole south side of the bathroom is a massive glassed walk -in shower.There must be 100 wall and ceiling water jets in the shower room.On the floor there’s an out of place looking cheap throw rug.You move the throw to discover a grate in the floor just big enough for a man to fit in that’s padlocked shut. Use the key to open the lock and enter the tunnel to exit.",
  [rug, padlock]
);

mansion.locked = true;

let roomLookUp = {
  gate: gate,
  outside: outside,
  livingRoom: livingRoom,
  kitchen: kitchen,
  gazebo: gazebo,
  ballRoom: ballRoom,
  bedRoom: bedRoom,
  bathRoom: bathRoom,
  mansion: mansion,
};

/*------------------------Gameplay Functions-------------------------*/
function cleanWords(word) {
  let steralize = word.toString().trim().toLowerCase();
  return steralize;
}

/*----------------------------Player-------------------------------*/
const player = {
  inventory: [],
  location: null,
};

/*----------------------Look up tables and State Machine--------*/
class Item {
  constructor(name, desc, takable, action) {
    this.name = name;
    this.desc = desc;
    this.takable = takable;
    this.action = action;
  }
}
const note = new Item(
  "Note",
  'Hand written note that is attached the entry gate that reads ,"We have safety and supplies beyond the town through the tunnel, there is a key in one of the houses that will let get through the door at the end of the cul-de-sac and into the tunnel and make your way to Paradise Cove and make sure to throw the key into the corner for others to find and re-lock hatch the "',
  false,
  () => {
    console.log(
      "Don't be greedy,leave this here for other people to come to safety"
    );
  }
);
const backpack = new Item(
  "Backpack",
  "A weathered but usable backpack blue",
  true,
  () => {
    /* write a function to take backpack*/
  }
);
const key = new Item("Key", "a standard padlock key", true, () => {
  /* write function here to unlock padlock */
});
const flashlight = new Item(
  "Flashlight",
  "A dim but functional flashlight. Just bright enough to lead the way!",
  true,
  () => {
    /* need to write a function for the use of the flashlight */
  }
);
const runningShoes = new Item(
  "Running shoes",
  "A pair of blue PF Flyers, They're guaranteed to make you run faster and job higher!",
  true,
  () => {
    /* write a function to take shoes and add time to timer*/
  }
);
const rug = new Item(
  "Rug",
  "An out of place cheap looking throw rug about 3x6 in size.",
  true,
  () => {
    /* write function to move rug*/
  }
);
const padlock = new Item("Padlock", "Just a standard pad lock.", true, () => {
  /* write a function to unlock padlock*/
});
//---------------------lookup table for Items------------------------------------------------- */
let itemLookUp = {
  note: note,
  backpack: backpack,
  key: key,
  flashlight: flashlight,
  runningShoes: runningShoes,
  rug: rug,
  padlock: padlock,
};
/*----------------------------------Story--------------------------------------------*/
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
