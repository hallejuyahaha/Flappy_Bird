var cvs = document.getElementById("cvs");
var ctx = cvs.getContext("2d");
var img_Bird = document.getElementById("bird");
var img_Back1 = document.getElementById("back1");
var img_Back2 = document.getElementById("back2");

//全局变量
var g = 0.002;//重力加速度
var fly_Power = -0.6;//飞行力度
var background_speed = 4;//背景移动速度
//全局变量结束

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

//木桶的构造函数
var bucket = function(x,y,speed,ctx){
    
}
bucket.prototype.draw = function(){
    ctx.beginPath();
    ctx.fillStyle="#F00";/*设置填充颜色*/ 
    ctx.fillRect(0,0,50,100);
    ctx.closePath();//可选步骤，关闭绘制的路径
    ctx.stroke(); //填充
}

bucket.prototype.update = function(){
   
}
//木桶的构造函数结束

var preTime= Date.now();             //获取当前时间
var b = new Bird(img_Bird,cvs.width/5,cvs.height/8,0.0003,ctx);//创建小鸟
var back = new backGround(img_Back1,img_Back2,0,0,background_speed,ctx);//创建背景
var bucket_one = new bucket(0,0,background_speed,ctx);


//主函数
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
       bucket_one.draw();
       //画小鸟
       b.update(dt);
       b.draw();
       //画小鸟结束
//-----------------------------------------------
   requestAnimationFrame(run);    //再次执行run函数
 }
 cvs.addEventListener("click",function(){
      b.speed = fly_Power;
   });
requestAnimationFrame(run);   //首次执行run函数；
//主函数结束
