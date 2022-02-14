var PLAY=1;
var END=0;

var gameState=PLAY;

var bg;
var bgimg;
var ninja,n;
var s;
var invisibleGround;
var starsGroup;


var gameOver,g;
var restart,r;
var score=0;
//localStorage["HighestScore"] = 0;
var j;

function preload (){
bg=loadImage("bg.jpg")
n=loadAnimation("image1.png","image2.png","image3.png","image4.png","image5.png")
s=loadImage("star.png")
g=loadImage("deathtext.png");
r=loadImage("death.png");
j=loadAnimation("image2.png");

}


//---------------------------------------------------------------------------


function setup() {
    createCanvas(windowWidth,windowHeight);
    bgimg=createSprite(width/2,height/2,width,height);
    bgimg.addImage(bg)
    
    ninja=createSprite(200,height-100,50,50);
    ninja.addAnimation("ninja",n);
    ninja.addAnimation("jump",j);

    gameOver = createSprite(width/2,100);
    gameOver.addImage(g)
    gameOver.scale=0.5;

    restart = createSprite(width/2,height/2);
    restart.addImage(r);
    restart.scale=0.4;

    invisibleGround = createSprite(width/2,height-30,width*2,10);
    invisibleGround.visible = false;

    starsGroup=new Group();

    score=0;
    
  }



//-------------------------------------------------------------------------------------------------



function draw() {
  background("white");
  drawSprites();
  fill("white");
  textSize(30);
  text("Score: "+ score, width-200,50);
  if (gameState===PLAY){
  score = score + Math.round(getFrameRate()/60);
  
  gameOver.visible = false;
  restart.visible = false;

  bgimg.velocityX=-8;
  
  if(bgimg.x<0){
  bgimg.x=width/2+4100;

  }
  console.log(invisibleGround.y)
  console.log(ninja.y)
  if(keyDown("space") ) {
    ninja.velocityY = -12;
    ninja.changeAnimation("jump",j);
  }

if(ninja.y >= height-100){
ninja.changeAnimation("ninja",n);
}


  ninja.velocityY = ninja.velocityY + 0.8

  ninja.collide(invisibleGround);

  if(starsGroup.isTouching(ninja)){
    gameState = END;
}
  spawnStars();
  }

  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    bgimg.velocityX = 0;
    ninja.velocityY = 0;
    starsGroup.setVelocityXEach(0);

    if(mousePressedOver(restart)) {
      reset();
    }

    

  
  }
}


//--------------------------------------------------
  
function spawnStars(){
if(frameCount%100===0){
  var star=createSprite(width+10,Math.round(random(height/2,height-100)));
star.addImage(s);
star.scale=0.3;
star.velocityX=-20;

starsGroup.setRotationEach(45);
starsGroup.add(star);
}
}





function reset(){
  gameState = PLAY;
  
  
  starsGroup.destroyEach();
  
  
  
  
  score = 0;
  
}


























