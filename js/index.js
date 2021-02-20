var terminal = new Terminal('log', 'terminal-input', 'handleCommand');
var input = document.getElementById('terminal-input');

var player = new Player('Xjarlie');


var crematorium = new Room('the crematorium');
crematorium.description = 'It is a spooky place, filled with the rotting remains of people long gone.';
crematorium.textHandler = 'crematoriumCommands';

var street = new Room('a dusty street');
crematorium.north = street;
street.south = crematorium;
street.textHandler = 'streetCommands';

crematorium.enter(player);

function handleCommand(command) {
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
            }
        }
    }
    terminal.clearInput();
}