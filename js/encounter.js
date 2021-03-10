class Encounter {
  constructor(player, enemy) {
    this.player = player;
    this.enemy = enemy;
    this.enemyAI = enemy.ai;
    this.playerDamage = 0;
    this.playerDefense = 0;
    this.enemyDamage = 0;
    this.enemyDefense = 0;
    this.repeatingEffects = {};
    this.terminalBefore = ''; // The text that was in the terminal before the encounter began
    this.over = false;
  }

  begin() {
    terminal.denyInput();

    this.terminalBefore = terminal.getText();
    terminal.clear();

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
        console.log('here');
        if (this.player.useSpell(this)) {
          this.beginTurn(this.enemy);
          
        } else {
          terminal.print('You do not have a spell, or it is out of uses.')
          terminal.allowInput();
        }
        break;
      case 'proceed':

        if (this.over) {
          this.player.encounter = null;
          if (this.enemy = boss && this.enemy.defeated) {
            this.enemy.onDefeat();
          } else {
            if (this.player.room == bossRoom) {
              terminal.clear();
              startRoom.enter(player);
            } else {
              terminal.clear();
              terminal.setText(this.terminalBefore);  
            }
            
          }
          
        } else {
          terminal.print('The encounter is not yet over, you coward.');
        }
        terminal.allowInput();
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
          switch (window[this.enemyAI](this)) {
            case 'attack':
              this.enemyDamage = this.enemy.attackStrength;
              break;
            case 'defend':
              this.enemyDefense = this.enemy.blockStrength;
              break;
            default:
              console.log('Enemy did not attack or defend');
              break;
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

        // Calculate spell effects:
        for (const [key, value] of Object.entries(this.repeatingEffects)) {

          value.repeated++;
          if (value.repeated > value.repeat) {
            delete this.repeatingEffects[key];
          } else {
            value.effect(this);
          }
        }

        // Calculate damages:
        this.player.health -= this.playerDefense ? (1 - (this.playerDefense / 100)) * this.enemyDamage : this.enemyDamage;
        this.player.stamina--;

        this.enemy.health -= this.enemyDefense ? (1 - (this.enemyDefense / 100)) * this.playerDamage : this.playerDamage;

        // Round all health:
        this.player.health = Math.round(this.player.health);
        this.enemy.health = Math.round(this.enemy.health);



        // Calculate dead:
        if (this.player.health <= 0) {
          terminal.print('You were killed by ' + this.enemy.name + '.');
          this.player.kill();
          this.end();
        } else if (this.player.stamina <= 0) {
          terminal.print('You ran out of stamina.');
          this.player.kill();
          this.end();
        } else if (this.enemy.health <= 0) {
          terminal.print('You have defeated ' + this.enemy.name)
          this.enemy.defeated = true;
          // this.enemy.onDefeat();
          this.end();
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
        terminal.focus();
    }
  }

  end() {
    this.over = true;

    terminal.print('<b>This encounter has ended. Type "proceed" to exit.</b>')
    terminal.allowInput();
  }

  addRepeatingEffect(spell, repeats) {
    this.repeatingEffects[spell.name] = {
      effect: spell.effect,
      repeat: spell.repeat,
      repeated: 0
    }
  }
}