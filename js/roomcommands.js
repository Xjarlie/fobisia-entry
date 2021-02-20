function crematoriumCommands(command) { // The function to handle crematorium-specific commands
    switch (command) {
        case 'say hello':
            terminal.print('You say hello to the beggar. He takes this as a personal attack, stands up, and punches you');
            var beggar = new Enemy('the beggar');
            return true;
    }
}

function streetCommands(command) {
    return false;
}