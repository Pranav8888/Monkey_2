
var ground;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage, backGround, backGroundImage;
var FoodGroup, obstacleGroup
var bananaScore = 0;
var spawnObstacles;
var gameState = 'play';
var restart;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png",
  "sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  backGroundImage = loadImage("jungle.jpg");
 
}



function setup() {
  createCanvas(800,600);
  
  backGround = createSprite(400, 300, 800, 600);
  backGround.addImage(backGroundImage);
  backGround.scale = 1;

  ground = createSprite(400,560, 900, 10);

  monkey = createSprite(200,500, 0, 0) 
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.2;

  FoodGroup = createGroup();
  obstacleGroup=createGroup();
  monkey.setCollider("rectangle", 20, 20, 360, 520);
  monkey.debug=true;
  
  restart = createSprite(400, 300, 80, 50)

}



function draw() {
  background(255);
  
  ground.velocityX = -4;
  ground.x = ground.width/2;
  //console.log(ground.x);
  

  if (gameState == 'play') {
    
    if (keyDown("space") && monkey.y >= 332) {
      monkey.velocityY = -17;
    
    }
    if (monkey.isTouching(obstacleGroup)){
      gameState = 'end';
      
    }
    
    if (FoodGroup.isTouching(monkey)) {
      bananaScore = bananaScore + 2;
      FoodGroup.destroyEach(0);
    }
    
    backGround.velocityX  = -4;
   

    if (backGround.x < 400){
      backGround.x = backGround.width/2;
    }

    
    monkey.velocityY = monkey.velocityY + 1;
    monkey.collide(ground);
    spawnFood();
    spawnObstacles();
    
    if (obstacleGroup.isTouching(monkey)) {
      monkey.scale = 0.2;
    }

    ground.visible = false;

      switch(bananaScore){
        case 10: monkey.scale = 0.24;
            break;
        case 20: monkey.scale = 0.26;
            break;
        case 30: monkey.scale = 0.28;
            break;
        case 40: monkey.scale = 0.3;
            break;
        default: break;
          
      }
    }
    if (gameState === 'end') {
      obstacleGroup.setVelocityXEach(0);
      FoodGroup.setVelocityXEach(0);

      obstacleGroup.setLifetimeEach(-1);
      FoodGroup.setLifetimeEach(-1);
      backGround.velocityX  = 0;
      monkey.destroy();
      }

    }
  

  drawSprites();
  
  textSize(18);
  fill("white");
  text('Bananas Collected: ' + bananaScore, 50, 70); 
  

 function spawnFood () {
  if (frameCount % 210 === 0) {
    let banana = createSprite(800, 200, 0, 0); 
    banana.addImage(bananaImage);
    banana.scale=0.2;
    banana.velocityX = -5;
    banana.lifetime = 160;
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth+1;
    banana.y = Math.round(random(280, 340));
    FoodGroup.add(banana);
  }

}

function spawnObstacles() {
 if (frameCount % 190 === 0) {
   let obstacle = createSprite(800, 520, 10, 10);
   obstacle.velocityX = -8;
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.2 ;
   obstacle.depth = monkey.depth;
   monkey.depth = monkey.depth+1;
   obstacleGroup.add(obstacle);
   
 }
}

 


