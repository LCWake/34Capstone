const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var egg, eggImg, rope, ground;
var egg_con;
//var egg_con2
//var egg_con3

var BG_img;
var fryingPan;
var fryingPanImg;
var victoryPan_img;

var button;

var canH;
var canW;

function preload() {
  BG_img = loadImage("./assets/BG.png");
  eggImg = loadImage("./assets/egg.png");
  victoryPan_img = loadImage("./assets/eggPan.png");
  fryingPanImg = loadImage("./assets/pan.png");

}

function setup() {
  var isMoblie = /iPhone|iPad|Android/i.test(navigator.userAgent)
  if (isMoblie) {
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(canW, canH)
  } else {
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(canW, canH)
  }

  engine = Engine.create();
  world = engine.world;

  button = createImg('./assets/cut_btn.png');
  button.position(20, 30);
  button.size(50, 50);
  button.mouseClicked(drop);

  rope = new Rope(8, { x: 40, y: 30 });
  fryingPan = createSprite(170, canH - 80, 100, 100);
  fryingPan.addImage("frying pan", fryingPanImg)
  fryingPan.addImage("victory", victoryPan_img)
  fryingPan.changeImage("frying pan")
  fryingPan.scale = 0.25
  ground = new Ground(displayWidth / 2, canH, canW, 20);
  egg = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,egg);
  egg_con = new Link(rope,egg);

}


function draw() {
  background(51);
  image(BG_img, 0, 0, displayWidth + 80, displayHeight);
  Engine.update(engine);
  
  pop()
  rope.show();
  ground.show();

  drawSprites();
  if(collide(egg,fryingPan)==true)
  {
    fryingPan.changeImage('victory');
    fryingPan.scale = 0.15
  }
  push()
  if(egg!=null){
    image(eggImg,egg.position.x,egg.position.y,70,70)
  }
}

function drop() {
  rope.break();
  egg_con.detach();
  egg_con = null;
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,egg);
               egg = null;
               return true; 
            }
            else{
              return false;
            }
         }
}