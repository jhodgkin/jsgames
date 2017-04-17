
function Bullet(ctx, x, y) {
    this.ctx = ctx;
    this.x = x+24;
    this.y = y+17;
    this.latDir = 1;
    this.horDir = 1;
    this.xSpeed = 15;
    this.ySpeed = 15;
    this.hit = 0;

    this.sound = new Audio();
    this.sound.canPlayType('audio/mp3');
    this.sound.setAttribute("src", "assets/fire.mp3");
    //this.sound.play();

    this.explosionSprite = new Image();
    this.explosionSprite.src = "assets/explosionSprite.png";

    this.takeDamage = takeDamage;
    function takeDamage() {
        this.hit = 1;
    }

    this.fire = fire;
    function fire(x,y){
        this.x = x+24;
        this.y = y+17;
        this.hit = 0;
        this.sound.offset = 0;
        this.sound.play();
        this.exploding = true;
    }

    this.exploding = true;
    this.frame = 0;
    this.draw = draw;
    function draw() {
        this.frame += .1;
        this.ctx.fillText(this.exploding, 50, 200);
        if (this.hit !== 1) {
            this.ctx.fillStyle = "#00FF00";
            this.ctx.strokeStyle = "#000000";

            this.y -= this.ySpeed;

/*
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
            this.ctx.fill();

*/
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
            this.ctx.fill();
        }else{
            if(this.exploding){
                this.ctx.drawImage(this.explosionSprite,
                    Math.floor(this.frame %5) * this.explosionSprite.width/5,
                    Math.floor(this.frame %5) * this.explosionSprite.height/5,
                    this.explosionSprite.width/5, this.explosionSprite.height/5,
                    this.x, this.y-70, this.explosionSprite.width/5, this.explosionSprite.height/5
                );
                if(Math.floor(this.frame %5) * this.explosionSprite.width/5 === this.explosionSprite.height/5 *4){
                    this.exploding = false;
                }
            }
        }
    }
}

function Player(ctx, img) {
    this.ctx = ctx;
    this.img = img;
    this.x = 0;
    this.y = 0;

    this.bullets = new Array();


    this.loadAmmo = loadAmmo;
    function loadAmmo() {
        for(var i=0; i< 10; i++){
            this.bullets.push(new Bullet(this.ctx, this.x, this.y));
        }
    }

    this.fireBullet = fireBullet;
    function fireBullet() {
        for(var i=0; i< this.bullets.length; i++){
            if(this.bullets[i].hit === 1 && !this.bullets.exploding
                || this.bullets[i].y < 0
                //|| this.bullets[i].hit === 0
                ){
                this.bullets[i].fire(this.x, this.y);
                break;
            }
        }
    }

    this.drawBullets = drawBullets;
    function drawBullets() {
        for (var i = 0; i < this.bullets.length; i++) {
            this.bullets[i].draw();
        }
    }

    this.takeDamage = takeDamage;
    function takeDamage() {
        this.hit = 1;
    }

    this.draw = draw;
    function draw(x, y) {
        this.x = x;
        this.y = y;
        this.ctx.drawImage(this.img, this.x, this.y);
        this.drawBullets();
    }
}


