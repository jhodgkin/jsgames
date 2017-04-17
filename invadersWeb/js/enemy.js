
function Enemy(ctx, img, canvasWidth, canvasHeight) {
    this.ctx = ctx;
    this.img = img;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = Math.random() * canvasWidth;
    this.y = 200;
    this.xDir = 1;
    this.yDir = 1;
    this.xSpeed = 5;
    this.ySpeed = 5;//Math.random() * 15;
    this.r = 50;
    this.hit = 0;

    this.sound = new Audio();
    this.sound.canPlayType('audio/mp3');
    this.sound.setAttribute("src", "assets/aliensound.mp3");
    //fire1.currentTime = .5;
    this.sound.loop = "loop";
    //this.sound.play();

    this.boom = new Audio();
    this.boom.canPlayType('audio/mp3');
    this.boom.setAttribute("src", "assets/boom.mp3");

    this.explosionSprite = new Image();
    this.explosionSprite.src = "assets/explosionSprite.png";
    this.explode1 = new Image();
    this.explode1.src = "assets/explosion.png";
    this.explode2 = new Image();
    this.explode2.src = "assets/explosion2.png";

    this.takeDamage = takeDamage;
    function takeDamage() {
        if (this.r > 15 && this.ySpeed > 0) {
            this.ySpeed -= 2;
            this.yDir = 0;
            this.r -= 5;
        } else {
            this.hit = 1;
            this.frame = 0;
            this.sound.pause();
        }
        this.boom.play();
    }

    this.frame = 0;
    this.exploding = true;
    this.draw = draw;
    function draw() {
        this.frame += .1;
        if (this.hit === 0) {
            this.ctx.fillStyle = "#FF0000";
            this.ctx.strokeStyle = "#000000";

            if (this.x > this.canvasWidth - 150 && this.xDir === 1) {
                this.xDir = 0;
            } else if (this.x < 50 && this.xDir === 0) {
                this.xDir = 1;
            }

            if (this.xDir === 1) {
                this.x += this.xSpeed;
            } else {
                this.x -= this.xSpeed;
            }

            if (this.y > this.canvasHeight / 2 && this.yDir === 1) {
                this.yDir = 0;
            } else if (this.y < 50 && this.yDir === 0) {
                this.yDir = 1;
            }

            if (this.yDir === 1) {
                this.y += this.ySpeed;
            } else {
                this.y -= this.ySpeed;
            }

            this.ctx.drawImage(this.img,
                Math.floor(this.frame %4) * this.img.width/4, 0, this.img.width/4, this.img.height,
                this.x - this.r, this.y - 50, this.img.width/4, this.img.height
            );

        }else{
            if(this.exploding){
                this.ctx.drawImage(this.explosionSprite,
                    Math.floor(this.frame %5) * this.explosionSprite.width/5,
                    Math.floor(this.frame %5) * this.explosionSprite.height/5,
                    this.explosionSprite.width/5, this.explosionSprite.height/5,
                    this.x - this.r, this.y - 50, this.explosionSprite.width/5, this.explosionSprite.height/5
                );
                if(Math.floor(this.frame %5) * this.explosionSprite.width/5 === this.explosionSprite.height/5 *4){
                    this.exploding = false;
                }
            }
        }

        this.reset = reset;
        function reset(){
            this.exploding = true;
            this.hit = 0;
            this.r = 50;
            this.y = 0;
            this.x = Math.random() * canvasWidth;
            this.ySpeed = 5;
        }
    }
}
