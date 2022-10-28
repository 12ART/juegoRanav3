var towerImg, tower;
var troncoImg, tronco, troncoGroup;
//var ramaImg, rama, ramaGroup;
var rana, ranaImg;
var invisibleBlockGroup, invisibleBlock;
var descansoBlock, descansoBlockGroup;
var gameState = "play"

function preload(){
  towerImg = loadImage("bg.png");
  troncoImg = loadImage("tronco.png");
  //ramaImg = loadImage("rama.png");
  ranaImg = loadImage("rana.png");

}
//climber
function setup(){
  createCanvas(600,600);

  tower = createSprite(300, 40);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  troncosGroup = new Group();
  invisibleBlockGroup = new Group();
  descansoBlockGroup = new Group();
  
  rana = createSprite(200,200,50,50);
  rana.scale = 0.2;
  rana.addImage("rana", ranaImg);
  rana.debug=true;
  rana.setCollider("circle", 0,0,120)
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      rana.x = rana.x - 3;
    }
    
    if(keyDown("right_arrow")){
      rana.x = rana.x + 3;
    }
    
    if(keyDown("space")){
      rana.velocityY = -10;
    }
    
    rana.velocityY = rana.velocityY + 0.8
    
    if(tower.y > 380){
      tower.y = 300
    }
    spawntronco();

   
  
    if(troncosGroup.isTouching(rana)){
      rana.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(rana) || rana.y > 600){
      rana.destroy();
      gameState = "end"
    }
 
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawntronco() {
  //escribir código aquí para aparecer puertas en la torre.
  if (frameCount % 150 === 0) {
    var tronco = createSprite(200, -50);
    tronco.scale = 0.7
    tronco.x = Math.round(random(20,580));
    tronco.addImage(troncoImg);
    tronco.velocityY = 1;
    tronco.lifetime = 800;

    var invisibleBlock = createSprite(200,15);
    invisibleBlock.height = 2;
    invisibleBlock.x = tronco.x;
    invisibleBlock.y = tronco.y+10;
    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = 800;
    invisibleBlock.debug = true;

    descansoBlock = createSprite(20,5);
    descansoBlock.height =2;
    descansoBlock.y = descansoBlock.y -75;
    descansoBlock.x= tronco.x;
    descansoBlock.velocityY= 1;
    descansoBlock.lifetime = 800;
    descansoBlock.debug=true;
    
   
    //climber
    rana.depth = tronco.depth;
    rana.depth +=1;
   
    //agregar cada puerta al grupo.
    troncosGroup.add(tronco);
   
    invisibleBlockGroup.add(invisibleBlock);
   
  }
}

