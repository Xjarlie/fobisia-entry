class Encounter {
    constructor(player, enemy) {
        this.player = player;
        this.enemy = enemy;
        this.textHandler;
    }

    begin() {
        terminal.print('\n-------------------');
        terminal.print('An Encounter has begun!');
        terminal.print('You are now in combat with ' + this.enemy.name + '.');
        
        while (this.player.health != 0 && this.enemy.health != 0 && this.player.stamina != 0) {
            terminal.print()
        }
    }

    handleCommand(command) {
        switch (command) {
            case 'attack':
        }
    }
}