class CuteGraphic {
  constructor() {
    this.initialize();
  }

  handleMusic() {
    if (!music.isPlaying()) {
      console.log("음악 재생 시작");
      music.play();
    }
  }

  reset() {
    console.log("Cute Graphic 초기화");
    this.initialize();
  }

  initialize() {
    // 그래픽 관련 상태 초기화
    this.objs = [];
  }

  draw() {
    // 배경 없이 웹캠 영상 위에 꽃 애니메이션을 오버레이
    for (let i of this.objs) {
      i.show();
      i.move();
    }

    // 화면 밖으로 나간 객체를 배열에서 제거
    for (let i = this.objs.length - 1; i >= 0; i--) {
      if (this.objs[i].isDead) {
        this.objs.splice(i, 1);
      }
    }

    // 새로운 객체 추가
    if (frameCount % 3 == 0) {
      if (this.objs.length < 20) this.addObj(); // 최대 20개의 꽃 애니메이션 유지
    }
  }

  addObj() {
    this.objs.push(new ROK(random(width), random(width), random(60, 120), 0));
  }
}

// 꽃 애니메이션에 필요한 클래스와 함수들을 CuteGraphic 클래스 내로 이동하거나 별도로 관리
class ROK {
  // 기존 코드 유지
  constructor(x, y, w, t) {
    this.x = x;
    this.y = y;
    this.w = w;

    this.bw1 = 0;
    this.ew1 = w;
    this.bw2 = 0;
    this.ew2 = w * random(0.1, 0.3);
    this.w1 = this.bw1;
    this.w2 = this.bw2;

    this.ptn = int(random(8, 30));
    this.ewh = random(0.2, 0.35);
    this.ehh = random(0.05, 0.1);
    this.esh = random(0.25, 0.35);

    this.t = t;
    this.t1 = 20;
    this.t2 = this.t1 + 30;
    this.t3 = this.t2 + 20;

    this.ang = random(10);

    this.col1 = random(flowerColors);
    this.col2 = random(flowerColors);

    this.as = random(-1, 1) * 0.02;
    this.ys = -width * 0.001;

    this.xs = random(-1, 1) * width * 0.001;

    this.isDead = false;
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.ang);
    noStroke();
    fill(this.col1);
    for (let i = 0; i < this.ptn; i++) {
      rotate(TAU / this.ptn);
      ellipse(this.w1 * this.esh, 0, this.w1 * this.ewh, this.w1 * this.ehh);
    }
    fill(this.col2);
    circle(0, 0, this.w2);
    pop();
  }

  move() {
    if (0 < this.t && this.t < this.t2) {
      let n = norm(this.t, 0, this.t2 - 1);
      this.w2 = lerp(this.bw2, this.ew2, easeInOutQuart(n));
    }
    if (this.t1 < this.t && this.t < this.t3) {
      let n = norm(this.t, this.t1, this.t3 - 1);
      this.w1 = lerp(this.bw1, this.ew1, easeInOutQuart(n));
    }
    this.y += this.ys;
    this.ys += 0.02;

    if (this.y > height + this.w) {
      this.isDead = true;
    }
    this.t++;
    this.ang += this.as;
    this.x += this.xs;
  }
}

// 꽃 애니메이션에 필요한 보조 함수
function easeInOutQuart(x) {
  return x < 0.5 ? 6 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 7) / 5;
}

// 꽃 색상 배열은 전역 또는 클래스 내부에 위치시킵니다.
let flowerColors = [
  "#D94E73",
  "#F2E857",
  "#F2BA52",
  "#F27A5E",
  "#2DA679",
  "#F24B4B",
  "#035AA6",
  "#F24150",
  "#387336",
];
