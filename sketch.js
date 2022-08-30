const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var engine, world;
var ground, rope, fruit, conection, rabbit;
var fruitImg, rabbitEatingImg, rabbitImg, backgroundImg;
var button;
var eat, sad, blink;

function preload()
{
  fruitImg = loadImage("melon.png");
  rabbitImg = loadImage("rabbit_eating.png");
  backgroundImg = loadImage("background.png");

  eat = loadAnimation('eat_0.png', 'eat_1.png', 'eat_2.png', 'eat_3.png', 'eat_4.png');
  sad = loadAnimation('sad_1.png', 'sad_2.png', 'sad_3.png');
  blink = loadAnimation('blink_1.png', 'blink_2.png', 'blink_3.png');

  blink.playing = true;
  eat.playing = true;
  eat.looping = false;
  sad.playing = true;
  sad.looping = false;
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(200, 690, 600, 20);
  rope = new Rope(6,{x: 245, y:30});
  
  fruit = Bodies.circle(300, 300, 15, {density: 0.001});
  Composite.add(rope.body, fruit);
  conection = new Link(rope, fruit);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  rabbit = createSprite(250, 610, 100, 100);
  rabbit.addAnimation('blinking', blink);
  rabbit.addAnimation('eating', eat);
  rabbit.addAnimation('crying', sad);
  rabbit.changeAnimation('blinking');
  rabbit.scale = 0.2;

  
  button = createImg('cut_btn.png');
  button.position(220, 30);
  button.size(50, 50);
  button.mouseClicked(drop);


  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);

  imageMode(CENTER);
}


function draw() 
{
  background(51);
  image(backgroundImg, width/2, height/2, 500, 700);

  Engine.update(engine);
  
  rope.show();
  image(fruitImg, fruit.position.x, fruit.position.y, 60, 60);
  ground.show();

  drawSprites();

}

function drop(){
  rope.break();
  conection.break();
  conection = null;
}
