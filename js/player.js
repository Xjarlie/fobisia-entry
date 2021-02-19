class Player {
    constructor(name) {
        this.name = name || '';
        this.deaths = 0;
        this.health = 20;
        this.stamina = 10;
        this.attackStrength;
        this.blockStrength;
        this.room;
    }

    kill() {
        this.deaths++;
        //restartGame();
    }
}