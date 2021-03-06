
const cellWidth = 101;
const cellHeight = 83;
let winGameNum=0;
let endGameNum=0;

class Enemy {
    
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.sprite = 'images/enemy-bug.png';
        this.speed = 1 + (Math.random()*2);
        this.height = 76;
        this.width = 101;
    }

    update(dt) {
        if (this.x > 505){
            this.x = -100;
            this.speed = 1 + (Math.random()*(2));
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
        this.height = 97;
        this.width = 75;
    }

    update() {
        endGame();
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // this function moves the player in different directions according to keys pressed
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

// create new player and enemy objects;
const player = new Player(202, 403, 'images/char-boy.png');
const enemy1 = new Enemy (-100, 62);
const enemy2 = new Enemy (-300, 147);
const enemy3 = new Enemy (-500, 230);

// put all enemy objects in an array; 
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

// this function checks if the player reaches the water; 
// if true, it moves the player to starting position and alerts
// the number of successful attemps;  
function winGame (){
    if (player.y<0) {

        player.x = 202;
        player.y = 403;
        winGameNum+=1;
        if (winGameNum!=1){
            alert(`Player reaches the water ${winGameNum} times`);    
        } else {
            alert(`Player reaches the water ${winGameNum} time`);
        }
        
    };
};

// this function checks for collision with any bug;
// if true, returns the player to starting position;
function endGame (){
    allEnemies.forEach(function(enemy){
        if  ((Math.abs(player.y - enemy.y) < enemy.height)&&(Math.abs(player.x - enemy.x) < player.width)) {
            player.x = 202;
            player.y = 403;
            endGameNum+=1;
        };
    })       
};  

