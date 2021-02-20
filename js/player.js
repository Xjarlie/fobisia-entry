class Player {
    constructor(name) {
        this.name = name || '';
        this.deaths = 0;
        this.health = 20;
        this.stamina = 10;
        this.attackStrength;
        this.blockStrength;
        this.room;
        this.encounter = null;
        this.spell = '';
    }

    kill() {
        this.deaths++; // Increases the death counter
        //restartGame(); // Function not yet written
    }

    travel(direction) {
        var newRoom = this.room[direction]; // Gets the properties of the new room

        if (newRoom) {
            newRoom.enter(this); // Enters the new room, if it exists, passing the player as the argument
        } else {
            terminal.print('You cannot travel to the ' + direction); // Blocks player from travelling to nonexistent rooms Eg. 'You cannot travel to the north'
        }
    }

    useSpell(enemy) {
        
    }
}