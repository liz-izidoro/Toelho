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

function preload()
{
  fruitImg = loadImage("melon.png");
  rabbitImg = loadImage("rabbit_eating.png");
  backgroundImg = loadImage("background.png");
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(200, 690, 600, 20);
  rope = new Rope(6,{x: 245, y:30});
  console.log(rope);
  fruit = Bodies.circle(300, 300, 15, {density: 0.001});
  Composite.add(rope.body, fruit);
  conection = new Link(rope, fruit);

  rabbit = createSprite(250, 650, 100, 100);
  rabbit.addImage(rabbitImg);
  rabbit.scale = 0.2;



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

  drawSprites()

}

function drop(){
  rope.break();
  conection.break();
  conection = null;
}
