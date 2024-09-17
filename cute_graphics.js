// class CuteGraphic {
//   constructor() {
//     this.colors = [
//       "#e6302b",
//       "#fd7800",
//       "#fbd400",
//       "#3bd89f",
//       "#0045e8",
//       "#f477c3",
//       "#70499c",
//     ];
//     this.objs = [];

//     for (let i = 0; i < 200; i++) {
//       this.objs.push(new SHP(this.colors));
//     }
//   }

//   draw() {
//     for (let i of this.objs) {
//       i.run();
//     }
//   }
// }

// class SHP {
//   constructor(colors) {
//     this.colors = colors;
//     this.x = random(width);
//     this.y = random(height);
//     this.s0 = 0;
//     this.s1 = width * random(0.005, 0.03);
//     this.cs = 0;
//     this.hs = random(0.5, 1.5);
//     this.yStep = map(this.y, 0, height, 0, 5) * random();
//     this.acc = random(0.005, 0.01);

//     this.num = int(random(8));
//     this.ang = random(10);
//     this.aStep = random(-1, 1) * 0.02;
//     this.sw = width * 0.001;
//     this.rvr01 = random() < 0.5 ? -1 : 1;
//     this.rvr02 = random() < 0.5 ? -1 : 1;

//     this.col = color(random(this.colors));
//     this.alph = 255;

//     this.cs = this.s1;
//     this.ln = this.s1 * 5;
//     this.ld = [this.ln, this.ln];
//   }

//   show() {
//     push();
//     drawingContext.setLineDash(this.ld);
//     drawingContext.lineDashOffset = this.ldo;
//     translate(this.x, this.y);
//     scale(this.rvr01, this.rvr02);
//     strokeWeight(this.sw);
//     rotate(this.ang);
//     this.col.setAlpha(this.alph);
//     fill(this.col);
//     this.col.setAlpha(255);
//     stroke(this.col);
//     if (this.cs > 1) this.sss();
//     pop();
//   }

//   move() {
//     this.y += this.yStep;
//     this.yStep += this.acc;
//     this.ang += this.aStep;

//     let n = map(this.y, 0, height, 0, 2);
//     if (n <= 1) {
//       this.ldo = lerp(-this.ln, 0, easeInOutQuart(n));
//       this.alph = lerp(0, 255, n ** 10);
//     } else {
//       this.ldo = 0;
//     }
//     if (this.y > height + this.cs) {
//       this.ldo = 0;
//       this.y = -this.cs;
//       this.yStep = random(0);
//     }
//   }

//   sss() {
//     if (this.num == 0) {
//       circle(0, 0, this.cs);
//     } else if (this.num == 1) {
//       rect(0, 0, this.cs, this.cs * this.hs);
//     } else if (this.num == 2) {
//       beginShape();
//       for (let i = 0; i < 3; i++) {
//         let r = this.cs / 2;
//         let a = map(i, 0, 3, 0, TAU);
//         vertex(r * cos(a), r * sin(a));
//       }
//       endShape(CLOSE);
//     } else if (this.num == 3) {
//       ellipse(0, 0, this.cs, this.cs * this.hs);
//     } else if (this.num == 4) {
//       square(0, 0, this.cs);
//     } else if (this.num == 5) {
//       beginShape();
//       for (let i = 0; i < 10; i++) {
//         let r = this.cs / 2;
//         let a = map(i, 0, 10, 0, TAU);
//         if (i % 2 == 0) r = this.cs * 0.25;
//         vertex(r * cos(a), r * sin(a));
//       }
//       endShape(CLOSE);
//     } else if (this.num == 6) {
//       beginShape();
//       for (let i = 0; i < 6; i++) {
//         let r = this.cs / 2;
//         let a = map(i, 0, 6, 0, TAU);
//         vertex(r * cos(a), r * sin(a));
//       }
//       endShape(CLOSE);
//     } else if (this.num == 7) {
//       beginShape();
//       for (let i = 0; i < 4; i++) {
//         let r = this.cs / 2;
//         let a = map(i, 0, 4, 0, TAU);
//         vertex(r * cos(a - QUARTER_PI / 4), r * sin(a - QUARTER_PI / 4));
//         vertex(r * cos(a + QUARTER_PI / 4), r * sin(a + QUARTER_PI / 4));
//         vertex(r * 0.25 * cos(a + QUARTER_PI), r * 0.25 * sin(a + QUARTER_PI));
//       }
//       endShape(CLOSE);
//     }
//   }

//   run() {
//     this.show();
//     this.move();
//   }
// }

// function easeInOutQuart(x) {
//   return x < 0 ? 5 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
// }

//꽃 애니메이션
let objs = [];
let flowerColors = [
  "#0065CB",
  "#FF0042",
  "#758FE4",
  "#FB4103",
  "#26A692",
  "#FAAB0C",
  "#FD9B85",
];

class CuteGraphic {
  handleMusic() {
    if (!music.isPlaying()) {
      console.log("음악 재생 시작");
      music.play();
    }
  }
  reset() {
    console.log("Travel Graphic 초기화");
    // 그래픽 관련 상태 초기화
  }

  constructor() {
    // 인스턴스를 생성할 때 초기화할 추가 설정이 필요할 경우 여기에 추가할 수 있습니다.
  }

  draw() {
    // 배경 없이 웹캠 영상 위에 꽃 애니메이션을 오버레이
    for (let i of objs) {
      i.show();
      i.move();
    }

    // 화면 밖으로 나간 객체를 배열에서 제거
    for (let i = 0; i < objs.length; i++) {
      if (objs[i].isDead) {
        objs.splice(i, 1);
      }
    }

    // 새로운 객체 추가
    if (frameCount % 3 == 0) {
      if (objs.length < 20) addObj(); // 최대 20개의 꽃 애니메이션 유지
    }
  }
}

function easeInOutQuart(x) {
  return x < 0.6 ? 6 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
}

function addObj() {
  objs.push(new ROK(random(width), random(width), random(60, 120), 0));
}

class ROK {
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
