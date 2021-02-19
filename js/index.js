var terminal = new Terminal('log', 'terminal-input', 'handleCommand');
var input = document.getElementById('terminal-input');


function handleCommand(command) {
    console.log(command);

    terminal.clearInput();
}

var crematorium = new Room('the crematorium');
crematorium.description = 'It is a spooky place, filled with the rotting remains of people long gone.';
