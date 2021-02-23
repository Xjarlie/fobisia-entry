class Encounter {
    constructor(player, enemy) {
        this.player = player;
        this.enemy = enemy;
        this.enemyAI;
        this.playerDamage = 0;
        this.playerDefense = 0;
        this.enemyDamage = 0;
        this.enemyDefense = 0;
    }

    begin() {
        terminal.denyInput();

        this.player.encounter = this;
        terminal.print('\n-------------------');
        terminal.print('An Encounter has begun!');
        terminal.print('You are now in combat with ' + this.enemy.name + '.');
        
        this.beginTurn(this.player);
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
                this.player.useSpell(this);
                this.beginTurn(this.enemy);
                break;
            default:
                terminal.print('You cannot do that while in an encounter.');
                terminal.allowInput();
                break;
        }
    }

    beginTurn(turn) {
        switch (turn) {
            case this.enemy:
              terminal.denyInput();
              
              if (this.enemyAI) {
                switch (window[this.enemyAI](this.enemy, this.player)) {
                  case 'attack':
                    this.enemyDamage = this.enemy.attackStrength;
                    break;
                  case 'defend':
                    this.enemyDefense = this.enemy.blockStrength;
                    break;
                  default:
                    console.log('Enemy used invalid move');
                }
              } else {
                if (this.player.health < 4) {
                  // attack
                  this.enemyDamage = this.enemy.attackStrength;
                } else if (this.enemy.health < 3) {
                  // Defend
                  this.enemyDefense = this.enemy.blockStrength;
                } else {
                  // attack
                  this.enemyDamage = this.enemy.attackStrength;
                }
              }
              // Calculate damages:
              this.player.health -= this.playerDefense ? (1 - (this.playerDefense / 100)) * this.enemyDamage : this.enemyDamage;
              this.player.stamina--;
              
              this.enemy.health -= this.enemyDefense ? (1 - (this.enemyDefense / 100)) * this.playerDamage : this.playerDamage;
              console.log(this.enemyDefense);
              console.log(this.playerDamage);
              // Calculate dead:
              if (this.player.health <= 0 ) {
                terminal.print('Player died');
              } else if (this.player.stamina <= 0) {
                terminal.print('Player ran out of stamina');
              } else if (this.enemy.health <= 0) {
                terminal.print('Enemy died');
              } else {
                terminal.print('--Health: ' + this.player.health);
                terminal.print('--Stamina: ' + this.player.stamina);
                terminal.print('--Enemy Health: ' + this.enemy.health);
                
                this.beginTurn(this.player);
              }
              
              break;
            case this.player:
              this.playerDamage = 0;
              this.playerDefense = 0;
              this.enemyDefense = 0;
              this.enemyDamage = 0;
              terminal.print('It is your turn - type \'attack\', \'defend\' or \'spell\'');
              terminal.allowInput();
        }
    }

    end() {
      this.player.encounter = null;
      terminal.allowInput();
    }
}