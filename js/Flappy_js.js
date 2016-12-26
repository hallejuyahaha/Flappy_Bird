var cvs = document.getElementById("cvs");
var ctx = cvs.getContext("2d");
var img_Bird = document.getElementById("bird");
var img_Back1 = document.getElementById("back1");
var img_Back2 = document.getElementById("back2");


//Bird的构造函数
var Bird = function (img,x,y,speed,ctx){
    this.img = img;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.ctx = ctx;
}

Bird.prototype.draw = function (){
    this.ctx.drawImage(this.img,this.x,this.y,48,42);
}
var g = 0.001;
Bird.prototype.update = function(t){ 
   this.speed = g*t+this.speed;
   this.y += Math.floor(0.5*g*t*t+this.speed*t);;
    // this.speed = this.speed + this.g *t;
    // this.y = this.y + this.speed * t;
   
}
//Bird的构造函数结束

//背景的构造函数
var backGround = function(img1,img2,x,y,speed,ctx){
    this.img1 = img1;
    this.img2 = img2;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.ctx = ctx;
}
backGround.prototype.draw = function(){
    this.ctx.drawImage(this.img1,this.x,this.y,1200,600);
    this.ctx.drawImage(this.img2,this.x+1200,this.y,1200,600);
}
backGround.prototype.update = function(){
    if(this.x == -1200)
    {
      this.x = 0;
    }
    this.x = this.x - this.speed;
}

//背景的构造函数结束


//主函数
var preTime= Date.now();             //获取当前时间
var b = new Bird(img_Bird,cvs.width/2-80,cvs.height/2-35,0.0003,ctx);//创建小鸟
var back = new backGround(img_Back1,img_Back2,0,0,5,ctx);//创建背景
function run(){
       var now = Date.now();         //获取最新时间
       dt = now - preTime;            //获取时间间隔
       preTime = now;                  //更新当前时间
  	   ctx.clearRect(0,0,800,600);    //清空画布
//---------------------------------------------
       //画背景
       back.update();
       back.draw();
       //画背景结束

       //画小鸟
       b.update(dt);
       b.draw();
       //画小鸟结束
//-----------------------------------------------
   requestAnimationFrame(run);    //再次执行run函数
 }
 cvs.addEventListener("click",function(){
      b.speed = -0.8;
   });
requestAnimationFrame(run);   //首次执行run函数；
//主函数结束
