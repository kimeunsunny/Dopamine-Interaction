let colors = [
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#00ffff",
  "#ff00ff",
  "#ffffff",
];

class DarkGraphic {
  handleMusic() {
    if (!music.isPlaying()) {
      console.log("음악 재생 시작");
      music.play();
    }
  }
  reset() {
    console.log("Music Graphic 초기화");
    // 그래픽 관련 상태 초기화
  }
  constructor() {
    this.fw = [];
    for (let i = 0; i < 20; i++) {
      this.fw.push(new Fire());
    }
  }

  draw() {
    // 배경을 검정색으로 설정
    background(0);

    // Fireworks effects
    for (let f of this.fw) {
      f.run();
    }
  }
}

class Fire {
  constructor() {
    this.p1 = 0;
    this.p2 = 0;
    this.lifeSpan = 100;
    this.ang = Math.random() * 10;
    this.aStep = (Math.random() * 2 - 1) * 0.001;
    this.sets();
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.ang);
    stroke(this.col);
    for (let i = 0; i < this.num; i++) {
      rotate(TAU / this.num);
      stroke(this.col);
      strokeWeight(3);
      line(this.p1, 0, this.p2, 0);
      stroke(255);
      strokeWeight(1);
      line(this.p1, 0, this.p2, 0);
    }
    pop();
  }

  move() {
    this.life--;

    if (this.lifeSpan > this.life && this.life > 0) {
      let nrm = norm(this.life, this.lifeSpan, 1);
      this.p1 = lerp(0, this.s / 2, Math.pow(nrm, 0.8));
      this.p2 = lerp(0, this.s / 2, Math.pow(nrm, 2));
      this.y += 0.5;
      this.ang += this.aStep;
    }
    if (this.life === 0) {
      this.sets();
    }
  }

  sets() {
    this.life = this.lifeSpan + Math.floor(Math.random() * 200);
    this.num = Math.floor(Math.random() * 15) + 5;
    this.x = Math.random() * width * 1.2 - width * 0.1;
    this.y = Math.random() * height * 1.2 - height * 0.1;
    this.s = Math.random() * 230 + 120;
    this.col = random(colors);
  }

  run() {
    if (this.life < this.lifeSpan) this.show();
    this.move();
  }
}
