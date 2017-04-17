
function Background(ctx, width, height) {

    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.x = 0;
    this.y = 0;

    this.addStars = addStars;
    function addStars() {
        var arr = new Array();
        for (var i = 0; i < width; i++) {
            arr.push({ x: Math.random() * this.width, y: Math.random() * this.height, r: Math.random() * 3 });
        }
        return arr;
    }

    this.stars = this.addStars();
   
    this.draw = draw;
    function draw(x, y) {
        this.ctx.clearRect;
        // Create gradient
        var grd = this.ctx.createLinearGradient(0, 0, 0, height);
        grd.addColorStop(0, "#000055");
        grd.addColorStop(1, "#0000FF");

        this.ctx.fillStyle = grd;//"#0000FF";
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.ctx.fillStyle = "#FFFFFF";
        for (var i = 0; i < this.stars.length; i++) {

/*          // make stars move with ship
            if(this.stars[i].y > this.height){
                this.stars[i].y = 0;
            }
            if(y < this.y){
            this.stars[i].y += this.stars[i].r/20;
            }else if(y > this.y){
                this.stars[i].y -= this.stars[i].r/20;
            }

            if(this.stars[i].x < 0){
                this.stars[i].x = this.width;
            }else if(this.stars[i].x > this.width){
                this.stars[i].x = 0;
            }
            if(x < this.x){
            this.stars[i].x += this.stars[i].r/20;
            }else if(x > this.x){
                this.stars[i].x -= this.stars[i].r/20;
            }
*/
            this.ctx.beginPath();
            this.ctx.arc(this.stars[i].x, this.stars[i].y, this.stars[i].r, 0, 2 * Math.PI);
            this.ctx.fill();
        }
        this.x = x;
        this.y = y;
    }
}
