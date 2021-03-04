var bg, bgimg
var boy,boyimg
var coin,coinimg
var badcoin,badcoinimg
var coingroup,badcoingroup
var invisibleright,invisibleleft
var score=0
var invisibleGround
var gameState=1
var gameSound
var over
var gameover
function preload(){
  bgimg=loadImage("background3.png")
  boyimg=loadAnimation("boy1.png","boy2.png","boy3.png","boy4.png","boy5.png","boy6.png")
  coinimg=loadAnimation("coins.png","coin2.png")
  badcoinimg=loadImage("badcoin.png")
  gameSound=loadSound("song.mp3")
  over=loadImage("game over.jpg")
}


function setup() {
  createCanvas(displayWidth-30,displayHeight-80);

  bg=createSprite(displayWidth/2,displayHeight/2, 50, 50);
  bg.addImage(bgimg)
  bg.velocityY=2
  bg.scale=1.5

  boy=createSprite(displayWidth/2,displayHeight/5)
  boy.addAnimation("boyrunning",boyimg)
  coingroup=new Group()
badcoingroup=new Group()
invisibleright=createSprite(displayWidth/2-190,displayHeight/5,20,70)
invisibleleft=createSprite(displayWidth/2+190,displayHeight/5,20,70)
invisibleright.visible=false
invisibleleft.visible=false
boy.debug=false
boy.setCollider("rectangle",0,0,50,boy.height)

invisibleGround=createSprite(displayWidth/2,displayHeight/5+60,600,10)
invisibleGround.visible=false
gameSound.play()
}

function draw() {
  background("white");
  textSize(30)
  fill("red")
text("SCORE  :  "+score,displayWidth-200,50)

  if(gameState===1){ 
  if(bg.y>displayHeight/2+20){
    bg.y=displayHeight/2-10
  } 
  if (keyDown(LEFT_ARROW) ){
boy.x=boy.x-6
  }
  if (keyDown(RIGHT_ARROW) ){
    boy.x=boy.x+6
      }
       
      if(keyDown(UP_ARROW)){
        boy.velocityY=-2
      }
boy.velocityY=boy.velocityY+0.5
      

      boy.collide(invisibleright)
      boy.collide(invisibleleft)
      boy.collide(invisibleGround)



  spawnCoins()
  spawnBadCoins()
  if(coingroup.isTouching(boy)){
    score=score+4
    coingroup.destroyEach()
  }
  if (badcoingroup.isTouching(boy)){
    gameState=0}}
    if (gameState===0){
      gameover=createSprite(displayWidth/2,displayHeight/2)
      gameover.addImage(over)
    badcoingroup.destroyEach()
    boy.velocityX=0
    bg.velocityY=0
    coingroup.setVelocityYEach(0)
    badcoingroup.setVelocityYEach(0)
    coingroup.setLifetimeEach(-1)
    badcoingroup.setLifetimeEach(-1)
    }
  
  drawSprites();
 
}
function spawnCoins(){
  
if (frameCount%100===0){
  coin=createSprite(Math.round(random(displayWidth/2-300,displayWidth/2+300)),displayHeight-300)
  coin.velocityY=-4
  coin.addAnimation("coins",coinimg)
  coin.scale=0.3
  coin.lifetime=150

coin.debug=true
coin.setCollider("rectangle",0,0,50,50)
  coingroup.add(coin)
}
}
function spawnBadCoins(){
  if(frameCount%200===0){
   badcoin=createSprite(Math.round(random(displayWidth/2-300,displayWidth/2+300)),Math.round(random(displayHeight/2-300,displayHeight/2+300)))
   
   badcoin.addImage("badcoins",badcoinimg)
   badcoin.velocityY=-6 
   badcoin.scale=0.3
   badcoin.lifetime=150
   badcoingroup.add(badcoin)

  } }