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

    // Prints what rooms are surrounding it
    if (this.north) {
      terminal.print('To the north is ' + this.north.name + '.');
    }
    if (this.east) {
      terminal.print('To the east is ' + this.east.name + '.');
    }
    if (this.south) {
      terminal.print('To the south is ' + this.south.name + '.');
    }
    if (this.west) {
      terminal.print('To the west is ' + this.west.name + '.');
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