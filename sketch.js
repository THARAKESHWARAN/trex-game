var trex , ground , trexRunning , groundImage , invisibleGround , PLAY , END , gameState , obstacle01 , cloudImage,
obstacle02 , obstacle03 , obstacle04 , obstacle05 , obstacle06 ,
rand , obstacleGroup , cloudsGroup , gameOver1 , restartImage ,
score;
   
function preload() {
  
  trexRunning = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage =  loadImage("ground2.png");
  trexCollided = loadImage("trex_collided.png");
  obstacle01 = loadImage("obstacle1.png");
  obstacle02 = loadImage("obstacle2.png");
  obstacle03 = loadImage("obstacle3.png");
  obstacle04 = loadImage("obstacle4.png");
  obstacle05 = loadImage("obstacle5.png");
  obstacle06 = loadImage("obstacle6.png");
  cloudImage = loadImage("cloud.png");
  gameOver1 = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
  
}

function setup() {
  
  createCanvas(1000, 200);
  
  score = 0;
  
  trex = createSprite(40,140);
  trex.addAnimation("running",trexRunning);
  trex.addImage("collided",trexCollided);
  trex.scale = 0.5;
  
  ground = createSprite(200,160);
  ground.addImage("ground",groundImage); 
  ground.x = ground.width/2;
  
  invisibleGround = createSprite(200,170,400,15);
  invisibleGround.visible = false;
  
  obstacleGroup = new Group();
  cloudsGroup = new Group();
  
  PLAY = 1;
  END = 2;
  
  gameState = PLAY;
  
  gameOver = createSprite(500,50);
  gameOver.scale = 0.5;
  gameOver.addImage(gameOver1);
  gameOver.visible = false;
  
  restart = createSprite(500,90);
  restart.scale = 0.5;
  restart.addImage(restartImage);
  restart.visible = false;
}

function draw() {
  
  background(255,255,255);
  
 
 if(gameState === PLAY){ 
   
   score = score+Math.round(frameRate()/30);
   
   ground.velocityX = -(8+(score/100));
  
  if(ground.x < 0){
   ground.x = ground.width/2; 
  } 
  
  if(keyIsDown(32) && trex.y >= 135){
   trex.velocityY = -35;
  }
  
  trex.velocityY = trex.velocityY + 3;
  
  spawnObstacles();
  spawnClouds();
   
 }  
  
  if(trex.collide(obstacleGroup)){
    endState();
  }
  
  if(mousePressedOver(restart) && gameState === END) {
    reset(); 
    obstacleGroup.destroyEach();
    score = 0;
  }
  
  trex.collide(invisibleGround);
  
  drawSprites();
  
  text("SCORE : "+score,800,50);
}

function spawnObstacles(){
  
  rand = Math.round(random(50,100))
  
 if(frameCount % rand === 0){
   
   var ran = Math.round(random(1,6));
   
   var obstacle = createSprite(1020,140);
   obstacle.velocityX =        ground.velocityX;
   obstacle.lifetime = 150;
   obstacle.scale = 0.6;
   
   switch(ran){
     case 1:
       obstacle.addImage("obstacle1",obstacle01);
       break;
    case 2:
       obstacle.addImage("obstacle2",obstacle02);
       break; 
    case 3:
       obstacle.addImage("obstacle3",obstacle03);
       break;
    case 4:
       obstacle.addImage("obstacle4",obstacle04);
       break; 
    case 5:
       obstacle.addImage("obstacle5",obstacle05);
       break;   
    case 6:
       obstacle.addImage("obstacle6",obstacle06);
       break; 
    default:
       break;
   }
   
    obstacleGroup.add(obstacle);
 }
}

function spawnClouds(){
  
 if(frameCount % 80 === 0){
   
  var clouds = createSprite();
   clouds.x = 1020;
   clouds.y = random(50,100);
   clouds.velocityX = ground.velocityX;
   clouds.lifetime = 150;
   clouds.addImage("cloud",cloudImage);
   clouds.scale = 0.6;
   
   trex.depth = clouds.depth;
   trex.depth = trex.depth + 1
   
   cloudsGroup.add(clouds);
 }
}

function endState(){
  
  gameState = END;  
  
  cloudsGroup.destroyEach();
  obstacleGroup.setVelocityXEach(0);
  
  ground.velocityX = 0;
  
  trex.changeImage("collided");
  
  trex.velocityX = 0;
  trex.velocityY = 0;
  
  obstacleGroup.setLifetimeEach(-1);
  
  gameOver.visible = true;
  restart.visible = true;
  
}

function reset(){
  
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  trex.changeAnimation("running");
  ground.velocityX = -8;
  trex.x = 40;
  trex.y =140;
  
}