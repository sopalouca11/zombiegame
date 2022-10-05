var bg, bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg, zombieGroup;
var bala, balaImg
var pessoas = ["ana", "maria", "jose"]
var balaGroup
var balas = 70;
var gameState = 'fight';
var life = 3; 
var heart1,heart2,heart3;
var heart1Img,heart2Img,heart3Img;
var lose,winning,explosionSound
var score = 0
var balaImg
function preload() {

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImg = loadImage("assets/zombie.png")
  bgImg = loadImage("assets/bg.jpeg")
  
  balaImg = loadImage("assets/bala.png")

  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  lose = loadSound("assets/lose.mp3")
  winning = loadSound("assets/win.mp3")
  explosionSound = loadSound("assets/explosion.mp3")
}

function setup() {


  createCanvas(windowWidth, windowHeight);

  //adicionando a imagem de fundo
  bg = createSprite(displayWidth / 2 - 20, displayHeight / 2 - 40, 20, 20)
  bg.addImage(bgImg)
  bg.scale = 1.1

  console.log(pessoas)
  //criando o sprite do jogador
  player = createSprite(displayWidth - 1150, displayHeight - 300, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
  player.debug = true
  player.setCollider("rectangle", 0, 0, 300, 300)


  balaGroup = new Group()
  zombieGroup = new Group()
  
  heart1 = createSprite (displayWidth -150,40,20,20)
  heart1.visible = false;
  heart1.addImage ('heart1',heart1Img)
  heart1.scale = 0.4;

  heart2 = createSprite (displayWidth -100,40,20,20)
  heart2.visible = false;
  heart2.addImage ('heart2',heart2Img)
  heart2.scale = 0.4;

  heart3 = createSprite (displayWidth -150,40,20,20)
  heart3.addImage ('heart3',heart3Img)
  heart3.scale = 0.4;
}

function draw() {
  background(0);

  if (gameState === 'fight') {

    if (life===3){

      heart3.visible = true
      heart1.visible = false
      heart2.visible = false
    }
    if (life===2){

      heart3.visible = false
      heart1.visible = false
      heart2.visible = true
    }
    if (life===1){

      heart3.visible = false
      heart1.visible = true
      heart2.visible = false
    }
    if(life===0){

      gameState='lost'

    }
    if(score==100){

      gameState= 'won'
      winning.play ()
    }
    //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando toques
    if (keyDown("UP_ARROW") || touches.length > 0) {
      player.y = player.y - 30
    }
    if (keyDown("DOWN_ARROW") || touches.length > 0) {
      player.y = player.y + 30
    }


    //solte balas e mude a imagem do atirador para a posição de tiro quando a tecla de espaço for pressionada
    if (keyWentDown("space")) {

      player.addImage(shooter_shooting)
      bala = createSprite(displayWidth - 1150, player.y - 25, 20, 5)
      bala.addImage (balaImg)
      bala.size = 0.5
      bala.velocityX = 20;
      balaGroup.add(bala);
      player.depth = bala.depth;
      player.depth = player.depth + 2;
      balas = balas - 1
      explosionSound.play ()
      

    }

    //o jogador volta à imagem original quando pararmos de pressionar a barra de espaço
    else if (keyWentUp("space")) {
      player.addImage(shooterImg)
    }
    if (balas == 0) {

      gameState = 'bala'
      lose.play ()

    }
    if (zombieGroup.isTouching(balaGroup)) {

      for (var i = 0; i < zombieGroup.length; i++) {

        if (zombieGroup[i].isTouching(balaGroup)) {

          balaGroup.destroyEach()
          zombieGroup[i].destroy()
          explosionSound.play ()
          score = score+2
        }

      }

    }
    if (zombieGroup.isTouching(player)) {
      lose.play ()
      for (var i = 0; i < zombieGroup.length; i++) {

        if (zombieGroup[i].isTouching(player)) {


          zombieGroup[i].destroy()
          life = life-1;
        }

      }

    }
    inimigo();
  }
  drawSprites();

  textSize (20);
  fill ('white');
  text ('balas = '+balas,displayWidth-210,displayHeight/2-250)
  text ('pontuação = '+score,displayWidth-200,displayHeight/2-220)
  text ('vidas = '+life,displayWidth-200,displayHeight/2-280)


  if (gameState == 'lost') {

    textSize(100)
    fill('red')
    text('perdeu playboy', 400, 400)
    zombieGroup.destroyEach()
    player.destroy()
    lose.play ()
  } else if (gameState == 'won') {
    textSize(100)
    fill('yellow')
    text('venceu playboy', 400, 400)
    zombieGroup.destroyEach()
    player.destroy()
    winning.play ()

  } else if (gameState == 'bala') {
    textSize(50)
    fill('yellow')
    text('acabou a munição mermão', windowWidth / 2 - 200, 400)
    zombieGroup.destroyEach()
    player.destroy()
    balaGroup.destroyEach()

  }
}
function inimigo() {
  if (frameCount % 50 === 0) {
    zombie = createSprite(random(1600, 1800), random(500, 700), 40, 40)
    zombie.addImage(zombieImg);
    zombie.scale = 0.15;
    zombie.velocityX = -3
    zombie.lifetime = 600
    zombieGroup.add(zombie)

  }

}