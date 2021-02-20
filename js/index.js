var terminal = new Terminal('log', 'terminal-input', 'handleCommand');
var input = document.getElementById('terminal-input');

var player = new Player('Xjarlie');
crematorium.enter(player);

var crematorium = new Room('the crematorium');
crematorium.description = 'It is a spooky place, filled with the rotting remains of people long gone.';

var street = new Room('a dusty street');
crematorium.north = street;
street.south = crematorium;


function handleCommand(command) {
    console.log(command);

    terminal.clearInput();
}



