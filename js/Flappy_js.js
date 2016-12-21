var cvs = document.getElementById("cvs");
var ctx = cvs.getContext("2d");
var img=document.getElementById("bird");



//Bird的构造函数
var Bird = function (img,x,y,speed,ctx){
    this.img = img;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.ctx = ctx;
}

Bird.prototype.draw = function (){
    this.ctx.drawImage(img,this.x,this.y,70,70);
}
var g = 0.01;
Bird.prototype.update = function(g,t){
   this.y +=Math.floor(0.5*g*t*t);
}





var preTime= Date.now();             //获取当前时间
var b = new Bird(img,350,250,0,ctx);
function run(){
       var now = Date.now();         //获取最新时间
       dt = now - preTime;            //获取时间间隔
       preTime = now;                  //更新当前时间
  	   ctx.clearRect(0,0,800,600);    //清空画布
//---------------------------------------------
       b.update(g,dt);
       b.draw();
//-----------------------------------------------
   requestAnimationFrame(run);    //再次执行run函数
 }
requestAnimationFrame(run);   //首次执行run函数；

