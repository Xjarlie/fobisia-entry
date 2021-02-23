function crematoriumCommands(command) { // The function to handle crematorium-specific commands
    switch (command) {
        case 'say hello':
            terminal.print('You say hello to the beggar. He takes this as a personal attack, stands up, and punches you');
            return true;
        default:
          return false;
    }
}

function streetCommands(command) {
    return false;
}