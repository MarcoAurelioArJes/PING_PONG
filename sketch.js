//Varáveis para a bola
let posicionamentoXBola = 300;
let posicionamentoYBola = 200;
let diametroBola = 20;
let raio = diametroBola / 2;//Descobrindo raio da bola

//Varáveis para definir a velocidade
let velocidadeXBola = 6;
let velocidadeYBola = 6;

//Variáveis raquete
let posicaoXRaquete = 0;
let posicaoYRaquete = 160;

//Tamanho raquete
let comprimentoRaquete = 8;
let alturaRaquete = 90;

//Variável para movimentar raquete
let movimentoRaquete = 10;

//Variáveis raquete oponente
let posicaoXRaqueteOponente = 592;
let posicaoYRaqueteOponente = 160;

//Variável para movimentar raquete oponente
let movimentoRaqueteOponente = 0;

//Variável Pontuacao
let meusPontos = 0;
let pontosOponente = 0;

let colisao = false;

//Variável Placar
let placarComp = 50;
let placarAlt = 20;

//Variáveis sons
let trilha;
let ponto;
let raquetada;

//Variável para induzir o inimigo ao erro
let induzErro = 0;

function preload(){
    trilha = loadSound("trilhaSonora.wav");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  criacaoBola();
  movimentacaoBola();
  colisaoBordas();
  criacaoRaquete(posicaoXRaquete, posicaoYRaquete);
  movimentarRaquete();
  colisaoRaquete(posicaoXRaquete, posicaoYRaquete);
  criacaoRaquete(posicaoXRaqueteOponente, posicaoYRaqueteOponente);
  colisaoRaquete(posicaoXRaqueteOponente, posicaoYRaqueteOponente);
  movimentaRaqueteOponente();
  tabelaPlacar(25, 34, placarComp,placarAlt);
  tabelaPlacar(525, 34, placarComp,placarAlt);
  placarJogo(meusPontos, 50, 50);
  placarJogo(pontosOponente, 550,50);
  contabilizaPlacar();
}

function criacaoBola(){
  
  circle(posicionamentoXBola, posicionamentoYBola, diametroBola);
}

function movimentacaoBola(){
  
  posicionamentoXBola += velocidadeXBola;
  posicionamentoYBola += velocidadeYBola;
}

function colisaoBordas(){
  
  if(posicionamentoXBola + raio > width || posicionamentoXBola - raio < 0){
    velocidadeXBola *= -1;
  }
  
  if(posicionamentoYBola + raio > height || posicionamentoYBola - raio < 0){
    velocidadeYBola *= -1;
  }
}

function criacaoRaquete(x, y){
  rect(x, y, comprimentoRaquete, alturaRaquete);
}

function movimentarRaquete(){
  
  if(keyIsDown(UP_ARROW) && posicaoYRaquete > 0){
      posicaoYRaquete -= movimentoRaquete;
  }
  if(keyIsDown(DOWN_ARROW) && posicaoYRaquete + alturaRaquete < 400){
      posicaoYRaquete += movimentoRaquete;
  }
}

/*function colisaoRaquete(){
  if(posicionamentoXBola - raio < posicaoXRaquete + comprimentoRaquete && posicionamentoYBola - raio < posicaoYRaquete + alturaRaquete && posicionamentoYBola + raio > posicaoYRaquete){
      velocidadeXBola *= -1;
    }
}*/
  
function colisaoRaquete(x, y){
  colisao = collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, posicionamentoXBola, posicionamentoYBola, diametroBola);
  
  if(colisao){
    velocidadeXBola *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
   movimentoRaqueteOponente = posicionamentoYBola - posicaoYRaqueteOponente - comprimentoRaquete / 2 - 30;
  
  posicaoYRaqueteOponente += movimentoRaqueteOponente + induzErro;
  
  induzindoAoErro();
}

function induzindoAoErro(){
  if(pontosOponente >= meusPontos){
    induzErro++;
    if(induzErro >= 39){
      induzErro = 40;
    }
  }else{
    induzErro --;
    if(induzErro <= 35){
      induzErro = 35;
    }
  }
}

function placarJogo(pontos, x, y){
  textSize(16);
  textAlign(CENTER);
  fill(255);
  text(pontos, x, y);
  text(pontos, x, y);
}

function tabelaPlacar(x, y, comp, alt){
  stroke(255);
  fill(color(255, 120, 0));
  rect(x, y, comp, alt);
  rect(x, y, comp, alt);
}

function contabilizaPlacar(){
  if(posicionamentoXBola > 590){
     meusPontos ++;
     ponto.play();
  }
  if(posicionamentoXBola < 10){
     pontosOponente ++;
     ponto.play();
  }
}