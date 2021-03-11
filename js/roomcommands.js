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

function room5Commands(command) {
  switch(command) {
    case 'in':
    terminal.denyInput();
      terminal.print('You go inside and notice a pelicular portrait of a man wearing a robe which makes you kneel instinctively and out of muscle memory you look down and do particular sign with your hands which happen without realising and as you do items from around the room begin to circle you at high speeds as if you were in the eye of a storm.');
      setTimeout(function() {
        terminal.print('You feel sunlight touch your face which makes you look up and you  see the top half of the tower steadily float up, rotate and become a transparent blueish grey causing you to panic but as you looked up your heart stopped and your chest smashed on the wooden floor. You passed out but as you did you felt your heart stop and you remembered being young and playing with rocks and then the exact same man from the portrait walked past you.');
        setTimeout(function() {
          terminal.print('You then fell asleep and as you woke up the bright moon woke you up and as you stepped out of the tower in a confused haze the tower sunk down deep into the ground and you remembered Petram, a spell which was effective in combat with enemies and erected a rock wall which reduced damage taken. This simple but effective spell was taught to you at a very early age to protect the young.');
          newSpell(petram);
        }, 10000);
      }, 10000);
      return true;
      break;
    case 'take':
      terminal.print('You have gained a new spell: ' + petram.name);
      player.spell = petram;
      terminal.clear();
      player.room.enter(player);
      return true;
      break;
    default:
      return false;
  }
}

function newSpell(spell) {
  terminal.print('You have unlocked a new spell: ' + spell.name);
  terminal.print('Description and effects:');
  terminal.print(spell.description);
  terminal.print('<b>Do you want to take this spell? If so, type [take].</b>');
  terminal.allowInput();
}

var turn = 1;

function bossAI(encounter) {
  switch(turn) {
    case 1:
      turn++;
      return 'attack';
      break;
    case 2:
      turn++;
      return 'attack';
      break;
    case 3:
      turn++;
      return 'defend';
      break;
    default:
      turn = 2;
      return 'attack';
      break;
  }
}

function room6Commands(command) {
  switch(command) {
    case 'in':
    terminal.denyInput();
      terminal.print(' you hop into the house to investigate the strange building and discover that it has a strange see through floor where you can see magma bullbing. You look around trying to find a reason for it being here but you find a chest in a corner of the room.');
      setTimeout(function() {
        terminal.print('You open the chest and inside you find a new spell.');
        newSpell(cinis);
      }, 10000);
      return true;
      break;
    case 'take':
      terminal.print('You have gained a new spell: ' + petram.name);
      player.spell = cinis;
      terminal.clear();
      player.room.enter(player);
      return true;
      break;
    default:
      return false;
  }
}

function room8Commands(command) {
  console.log('yes');
  switch(command) {
    case 'in':
      room10.enter(player);
      startRoom.north = bossRoom;
      return true;
      break;
    default:
      return false;
  }
}

function roomCommands() {
  return false;
}

function room10Commands(command) {
  switch (command) {
    
  }
}