const terminal = new Terminal('log', 'terminal-input', 'handleCommand');
const input = document.getElementById('terminal-input');

const player = new Player('Xjarlie');
player.attackStrength = 3;
player.blockStrength = 40;

const crematorium = new Room('the crematorium');
crematorium.description = 'It is a spooky place, filled with the rotting remains of people long gone.';
crematorium.textHandler = 'crematoriumCommands';

const street = new Room('a dusty street');
crematorium.north = street;
street.south = crematorium;
street.textHandler = 'streetCommands';

crematorium.enter(player);

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
          player.travel(command);
          break;
        default:
          terminal.print('You cannot do that here.');
          break;
      }
    }
  }
}

var beggar = new Enemy('the beggar');
beggar.health = 20;
beggar.attackStrength = 2;
beggar.blockStrength = 30;

var encounter = new Encounter(player, beggar);


const petram = new Spell('Petram');
petram.effect = function(encounter) {
  encounter.playerDefense = 45;
}
player.spell = petram;
