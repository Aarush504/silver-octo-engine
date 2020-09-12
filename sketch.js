var dog, happydog, ndog;
var food, foodstock;
var database;
var turn= 20;
var game= true;
function preload()
{
  //load images here
  ndog=loadImage("images/Dog.png");
  happydog=loadImage("images/happydog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(800, 700);
  foodstock=database.ref('food');
  foodstock.on("value",readStock);
  dog= createSprite(300,350,50,50);
  dog.addImage("normal", ndog);
  dog.scale= 0.5;
}


function draw() {  
  background(46, 139, 87);
  dog.scale= 0.5;
  if(turn=== 0){
    game= false;
  }
  if(turn=== 20){
    game= true;
  }
  if(game=== true){
if(keyWentDown(UP_ARROW)){
  writeStock(food);
  dog.addImage("normal",happydog);
  turn= turn-1;
}
if(keyWentDown(DOWN_ARROW)){
  
  dog.addImage("normal",ndog);
}
if(keyWentDown(LEFT_ARROW)){
  turn=20;
}
fill("white");
    text("Press up arrow to feed", 30,100);
  }
  else if(game=== false){
    if(keyWentDown(UP_ARROW)){
      writeStock(food);
      dog.addImage("normal",happydog);
      turn= turn-1;
    }
    if(keyWentDown(DOWN_ARROW)){
      
      dog.addImage("normal",ndog);
    }
    if(keyWentDown(LEFT_ARROW)){
      turn=20;
    }
    
  }

dog.display();
  drawSprites();
  //add styles here
  fill("white");
  text("press down arrow to pet me", 30,50);
  text("Unit of food left = "+ turn, 30,70);

if(turn=== 0){
  fill("black");
  textSize(20);
  text("Food is over, press left arrow to buy food",100, 500);
  dog.addImage("normal",ndog);
}
}
function readStock(data){
  food=data.val();

}
function writeStock(x){
  database.ref('/').update({food:x})
}



