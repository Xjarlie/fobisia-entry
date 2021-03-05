class Enemy {
  constructor(name) {
    this.name = name || '';
    this.defeated = false;
    this.health;
    this.attackStrength;
    this.blockStrength;
    this.room;
    this.ai;
  }

  onDefeat() { // We will add this per enemy

  }
}