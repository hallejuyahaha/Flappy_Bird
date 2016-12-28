var cvs = document.getElementById("cvs");
var ctx = cvs.getContext("2d");
var img_Bird = document.getElementById("bird");
var img_Back1 = document.getElementById("back1");
var img_Back2 = document.getElementById("back2");

//全局变量
var g = 0.002;//重力加速度
var fly_Power = -0.6;//飞行力度
var background_speed = 4;//背景移动速度
var between = 200;
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
   this.y += Math.floor(0.5*g*t*t+this.speed*t);
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
    this.x = this.x - background_speed;
}
//背景的构造函数结束

//木桶的构造函数
var bucket = function(x,long,ctx){
    this.x = x;
    this.long = long;
    this.ctx = ctx;
}
bucket.prototype.draw = function(){
    ctx.beginPath();
    ctx.fillStyle="#F75000";/*设置填充颜色*/
    //上桶
    ctx.fillRect(this.x,0,50,this.long);
    ctx.fillRect(this.x-5,this.long,60,10);
    //下桶
    ctx.fillRect(this.x-5,this.long+10+between,60,10);
    ctx.fillRect(this.x,this.long+10+between+10,50,600-(this.long+10+between+10));
    ctx.closePath();//可选步骤，关闭绘制的路径
    ctx.stroke(); //填充
}

bucket.prototype.update = function(){
    if(this.x == -300)
    {
      this.x = 1200;
      this.long = Math.floor(Math.random()*300+50);
      // console.log(this.long);
    }
    this.x = this.x -background_speed-2;
}
//木桶的构造函数结束

var preTime= Date.now();             //获取当前时间
var b = new Bird(img_Bird,cvs.width/5,cvs.height/8,0.0003,ctx);//创建小鸟
var back = new backGround(img_Back1,img_Back2,0,0,background_speed,ctx);//创建背景
var bucket_one = new bucket(1200,Math.floor(Math.random()*300+50),ctx);
var bucket_two = new bucket(1500,Math.floor(Math.random()*300+50),ctx);
var bucket_three = new bucket(1800,Math.floor(Math.random()*300+50),ctx);
var bucket_four = new bucket(2100,Math.floor(Math.random()*300+50),ctx);
var bucket_five = new bucket(2400,Math.floor(Math.random()*300+50),ctx);

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
       bucket_one.update();
       bucket_one.draw();
       bucket_two.update();
       bucket_two.draw();
       bucket_three.update();
       bucket_three.draw();
       bucket_four.update();
       bucket_four.draw();
       bucket_five.update();
       bucket_five.draw();
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
