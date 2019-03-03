
const cellWidth = 101;
const cellHeight = 83;
let winGameNum=0;
let endGameNum=0;

class Enemy {
    
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.sprite = 'images/enemy-bug.png';
        this.speed = 1 + (Math.random()*3);
    }

    update(dt) {
        if (this.x > 505){
            this.x = -100;
            this.speed = 1 + (Math.random()*(3));
        } else {
            this.x = this.x + 100*dt*this.speed;
        };
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};


class Player {
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }

    update() {

    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(direction) {
        if ((direction === 'left') && (this.x-101>=0)){
            this.x -= 101; 
        } else if ((direction === 'up') && (this.y-83>-50)) {
            this.y -= 83;
            winGame();
        } else if ((direction === 'right') && (this.x+101<505)) {
            this.x += 101;
        } else if ((direction === 'down')&& (this.y+83<450)) {
            this.y += 83;
        };
    };  
};

const player = new Player(202, 403, 'images/char-boy.png');
const enemy1 = new Enemy (-100, 62);
const enemy2 = new Enemy (-300, 147);
const enemy3 = new Enemy (-500, 230);

let allEnemies = [enemy1, enemy2, enemy3];

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function winGame (){
    if (player.y<0) {
        player.x = 202;
        player.y = 403;
        winGameNum+=1;
    };
};

// function endGame (){
//     if () {
//         player.x = 202;
//         player.y = 403;
//         endGameNum+=1;
//     };
// };