const terminal = new Terminal('log', 'terminal-input', 'handleCommand');
const input = document.getElementById('terminal-input');

const player = new Player('Player');
player.attackStrength = 3;
player.blockStrength = 40;


function handleCommand(command) {
  terminal.print('> ' + command);
  if (player.encounter) { // Checks to see if the player is in an encounter (eg, a battle)
    player.encounter.handleCommand(command); // If player is in an encounter, pass off the command to that encounter to deal with
  } else {
    if (!window[player.room.textHandler](command)) { // Checks to see if the command is room-specific
      switch (command) {
        case 'north':
        case 'east':
        case 'south':
        case 'west':
          console.log('here');
          player.travel(command);
          break;
        case 'win game':
          terminal.print('Congratulations! You have won the game!');
          setTimeout(function () {
            terminal.print('<iframe id="rick" width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
            document.getElementById('rick').click();
          }, 3000);
          break;
        default:
          terminal.print('You cannot do that here.');
          break;
      }
    }
  }

  terminal.focus();
}

function reload() {
  window.location.reload();  
}


// ENEMIES

const boss = new Enemy('The Boss');
boss.ai = 'bossAI';
boss.health = 40;
boss.attackStrength = 3;
boss.blockStrength = 50

boss.onDefeat = function() {
  terminal.clear();
  terminal.denyInput();
  terminal.print('Congratulations, you have defeated the boss and won the game!');
  setTimeout(function() {
    reload();
  }, 3000);
}


const grunt1 = new Enemy('a Servant of The Light');
grunt1.health = 10;
grunt1.blockStrength = 35;
grunt1.attackStrength = 2;

const grunt2 = new Enemy('a Servant of the Light');
grunt2.health = 10;
grunt2.blockStrength = 35;
grunt2.attackStrength = 2;

// SPELLS

const petram = new Spell('Petram');
petram.effect = function (encounter) {
  encounter.playerDefense = 60;
}
petram.repeat = 6;

const cinis = new Spell('Cinis');
cinis.effect = function (encounter) {
  encounter.enemyDefense = 0;
  encounter.playerDamage = 13;
}
cinis.repeat = 1;

const orbisFinnis = new Spell('Orbis Finnis');
orbisFinnis.effect = function (encounter) {

}



// ROOMS

const bossRoom = new Room('Room 1');
bossRoom.enemy = boss;
bossRoom.textHandler = 'roomCommands';

const startRoom = new Room('Room 3');
startRoom.description = 'You wake up in the middle of a strange intersection in front of a titanic gate made of two massive slabs of stone and giant sequoia wood which must span a few hundred metres. \n You have a strange buzz going through your head warning you of something you can\'t pinpoint, so you brush off the dust on your cloak and decide if you follow the road east or west.';
startRoom.textHandler = 'roomCommands';

const room2 = new Room('Room 2');
room2.description = "You went west and you are at a bend in the road. Off in the distance you see a ranch which is home to dozens of rotting cattle scattered across the glowing brown grass. You see a small house on the other side of the dead cows land and the doors seem to be smashed loose from the hinges. Do you go and investigate?";
room2.textHandler = 'roomCommands';

const room4 = new Room('Room 4');
room4.description = "You wake up in the middle of a strange intersection in front of a titanic gate made of two massive slabs of stone and giant sequoia wood which must span a few hundred metres. ";
room4.textHandler = 'roomCommands';

const room5 = new Room('Room 5');
room5.textHandler = 'room5Commands';
room5.description = 'you have walked for hours and you see a tower which seems familiar to you and you ponder over if you should continue or follow the road further south. [Type "in" or type "south"]';

const room6 = new Room('Room 6');
room6.description = "You have walked for hours at this point and you find yourself in a dense wooded area, as you continue down the path you encounter a deep hole going down to earth's mantle and floating at ground level there is a small stone house. Do you investigate or do you carry on going south on the road? [Type IN]";
room6.textHandler = 'room6Commands';

const room7 = new Room('Room 7');
room7.description = "as you walk the dirt road, you stop to  think about your motivation to walk onward but as you stop an angry servant of the light jumps out of the bushes to kill you.";
room7.textHandler = 'roomCommands';
room7.enemy = grunt2;

const room8 = new Room('Room 8');
room8.description = " After you defeated the servant of the light, you turned as the path did so and you saw a large opening with a city full of people, dogs, griffins, horses and minotaurs. You hastily ran to the city to look for clues. Most of the buildings were massive but one stook out because it was just like the structure you encountered earlier. Do you go inside [TYPE IN], or do you go east or west.";
room8.textHandler = 'room8Commands';

const room9 = new Room('Room 9');
room9.description = "You are still walking down the same dirt path bust as you do a servant of the light jumps down from a tree and tries to kill you for its master.";
room9.textHandler = 'roomCommands';
room9.enemy = grunt1;

const room10 = new Room('Room 10');
room10.description = "You enter  structure and you feel like you have been there once before. You look around and you seem to know the layout of the very peculiar room which seems to boggle your mind. You see a staircase and you go to it to see how far up it goes but as you look it seems to go on for an unimaginable height. As you walk up the stairs you wonder on how long it will take you to scale them. As that thought popped into you mind, in a blink of an eye you appear in a room. You panic and see a window so you look out of the window and you see yourself on the stairs. You figure that this is some sort of gateway. Out of nowhere, an old man in a robe with pale skin materializes in front of you. He whispers into you ear. Your eyes widen and you understand. Now you know what was behind that faithful gate. Something horrifying, something which has been forgotten in time. The old man told you two words which echoed through time. You could feel it in your bones. <b>Orbis finis.</b>";
room10.textHandler = 'room10Commands';



// ROOM DIRECTIONS

startRoom.north = bossRoom;
bossRoom.south = startRoom;
startRoom.east = room4;
room4.west = startRoom;
startRoom.west = room2;
room2.south = room5;
room5.north = room2;
room4.south = room6;
room6.north = room4;
room6.south = room9;
room9.north = room6;
room9.west = room8;
room8.east = room9;
room5.south = room7;
room7.north = room5;
room7.east = room8;
room8.west = room7;
room8.south = room10;



startRoom.enter(player);