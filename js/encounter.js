class Encounter {
    constructor(player, enemy) {
        this.player = player;
        this.enemy = enemy;
    }

    begin() {
        terminal.denyInput();

        terminal.print('\n-------------------');
        terminal.print('An Encounter has begun!');
        terminal.print('You are now in combat with ' + this.enemy.name + '.');
        
        terminal.print('It is your turn - type \'attack\', \'defend\' or \'spell\'');
        terminal.allowInput();
    }

    handleCommand(command) {
        terminal.denyInput();
        switch (command) {
            case 'attack':
                this.playerDamage = this.player.attackStrength;
                this.beginTurn(this.enemy);
                break;
            case 'defend':
                this.playerDefense = this.player.blockStrength;
                this.beginTurn(this.enemy);
                break;
            case 'spell':
                this.player.useSpell(this.enemy);
                this.beginTurn(this.enemy);
                break;
            default:
                terminal.print('You cannot do that while in an encounter.');
                terminal.allowInput();
                break;
        }
        terminal.clearInput();
    }

    beginTurn(turn) {
        switch (turn) {
            case this.enemy:

        }
    }
}