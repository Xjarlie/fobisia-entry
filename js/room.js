class Room {
  constructor(name) {
    this.name = name || '';
    this.description = '';
    this.textHandler;  // A custom text function for any room-specific commands
    this.commands = {};
    this.enemy;
    this.north;
    this.east;
    this.south;
    this.west;
    this.container;
  }

  enter(player) {
    player.room = this; // Updates the player's room property

    terminal.clear();

    terminal.print('\n-------------------')
    //terminal.print('You enter ' + this.name + '.');
    terminal.print(this.description);

    terminal.print('');

    // Prints what rooms are surrounding it
    if (this.north) {
      terminal.print('You can travel north.');
    }
    if (this.east) {
      terminal.print('You can travel east.');
    }
    if (this.south) {
      terminal.print('You can travel south.');
    }
    if (this.west) {
      terminal.print('You can travel west.');
    }


    if (this.enemy) {

      terminal.print('There is an enemy here: ' + this.enemy.name + '.');

      var encounter = new Encounter(player, this.enemy);
      terminal.denyInput();
      setTimeout(function() {
        encounter.begin();
      }, 3000)
    }
  }
}