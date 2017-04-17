        function Invaders() {
            "use strict";

            this.canvas;
            this.ctx;
            this.background;

            this.player;
            this.alien;
            this.boom;
            this.fire;

            this.frame = 0;

            this.pointerX = 0;
            this.pointerY = 0;

            this.canvasWidth = window.outerWidth;
            this.canvasHeight = window.outerHeight;


            this.init = init;
            function init() {
                this.canvas = window.document.getElementById('canvas1');
                this.canvas.width = this.canvasWidth;
                this.canvas.height = this.canvasHeight;
                this.ctx = this.canvas.getContext('2d');
                this.background = new Background(this.ctx, this.canvasWidth, this.canvasHeight);
                this.preloadAssets();
            }

            this.preloadAssets = preloadAssets;
            function preloadAssets() {
                this.player = new Player(this.ctx, addImage("assets/ship.png"));
                this.alien = addImage("assets/alien.png");
                this.addSaucers();

                var _toPreload = 0;
                this.addImage = addImage;
                function addImage(src) {
                    var img = new Image();
                    img.src = src;
                    _toPreload++;
                    img.addEventListener('load', function () {
                        _toPreload--;
                    }, false);
                    return img;
                }

                this.checkResources = checkResources;
                function checkResources () {
                    if (_toPreload == 0) {
                        this.draw();
                    } else {
                        setTimeout(checkResources, 200);
                    }
                }

                this.checkResources();
            }

            this.saucers = new Array();

            this.addSaucers = addSaucers;
            function addSaucers() {
                this.saucers.push(new Enemy(this.ctx, this.alien, this.canvasWidth, this.canvasHeight));
            }

            this.drawSaucers = drawSaucers;
            function drawSaucers() {
                for (var i = 0; i < this.saucers.length; i++) {
                    this.saucers[i].draw();
                }
            }

            this.draw = draw;
            function draw() {
                this.frame += .1;
                this.background.draw();
                this.player.draw(this.pointerX - 24, this.pointerY - 24);
                this.drawSaucers();

                detectHits(this.player.bullets, this.saucers);
                this.drawStats();
                window.requestAnimationFrame(draw);
            }

            function detectHits(ary1, ary2) {
                for (var i = 0; i < ary1.length; i++) {
                    if (ary1[i].hit !== 1) {
                        for (var j = 0; j < ary2.length; j++) {
                            if (ary2[j].hit !== 1) {
                                if (detectHit(ary2[j], ary1[i])) {
                                    ary2[j].takeDamage();
                                    ary1[i].takeDamage();
                                }
                            }
                        }

                    }
                }
            }

            function detectHit(obj1, obj2) {
                if (obj1.x + (obj1.r) > obj2.x
                    && obj1.x - (obj1.r) < obj2.x
                    && obj1.y + (obj1.r) > obj2.y
                    && obj1.y - (obj1.r) < obj2.y) {
                    return true;
                } else {
                    return false;
                }
            }


            this.drawStats = drawStats;
            function drawStats() {
                var hits = 0;
                for (var i = 0; i < this.player.bullets.length; i++) {
                    hits += this.player.bullets[i].hit;
                }

                var servivors = this.saucers.length;
                for (var i = 0; i < this.saucers.length; i++) {
                    servivors -= this.saucers[i].hit;
                }

                if (servivors <= 0) {
                    for (var i = 0; i < this.saucers.length; i++) {
                        this.saucers[i].hit = 0;
                        this.saucers[i].r = 50;
                        this.saucers[i].y = 0;
                        this.saucers[i].ySpeed = 5;
                    }
                    addSaucers();
                }


                this.ctx.fillStyle = "#00ff00";
                this.ctx.font = "bold 25px Arial";
                this.ctx.fillText("Score: " + hits + "/" + this.player.bullets.length, 50, 50);
                this.ctx.fillText("Enemies: " + servivors, 50, 75);
                this.ctx.fillText("Hits: " + hits, 50, 100);
                this.ctx.fillText("Bullets Fired: " + this.player.bullets.length, 50, 125);
                this.ctx.fillText("Accuracy: " + Math.floor((hits / this.player.bullets.length) * 100) + "%", 50, 150);
            }


        }