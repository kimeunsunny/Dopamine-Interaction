class TravelGraphic {
  constructor() {
    this.initialize();
  }

  reset() {
    console.log("Travel Graphic 초기화");
    this.initialize();
  }

  initialize() {
    console.log("TravelGraphic instance initialized");
    this.objs = [];
    this.colors = [
      "#F2BBEF",
      "#CDC1D9",
      "#F2EFBD",
      "#A7EBF2",
      "#F2F2F2",
      "#49B9E3",
      "#F280AA",
      "#0583F2",
      "#F9107D",
      "#F91F0E",
      "#FA7610",
    ];
    
    this.addObj();
    // 배경 이미지를 캔버스에 그리기 (필요 시)
    // if (travelImage) {
    //   image(travelImage, 0, 0, 1600, 800);
    // }
    // 배경 패턴 그리기 (필요 시)
    // this.bkgd();
  }

  draw() {
    if (travelImage) {
      image(travelImage, 0, 0, 1600, 800); // 이미지 배경 설정
    }
    // 배경 패턴 그리기 주석 처리 또는 필요 시 적용
    // this.bkgd();

    for (let i of this.objs) {
      i.show();
      i.move();
    }

    if (frameCount % 20 === 0) {
      this.addObj();
    }

    for (let i = this.objs.length - 1; i >= 0; i--) {
      if (this.objs[i].isDead) {
        this.objs.splice(i, 1);
      }
    }
  }

  addObj() {
    let num = int(random(1, 10)); // 객체 생성 수 감소
    for (let i = 0; i < num; i++) {
      this.objs.push(new OBR(random(width), height, this.colors));
    }
  }

  bkgd() {
    let wid = width * 1.2;
    let c = 30; // 반복 횟수 감소
    let w = wid / c;

    noStroke();
    for (let i = 0; i < c; i++) {
      for (let j = 0; j < c; j++) {
        let x = i * w + w / 2 + (width - wid) / 2;
        let y = j * w + w / 2 + (height - wid) / 2;
        fill(255, 30);
        circle(x, y, width * 0.001);
      }
    }
  }
}

class OBR {
  constructor(x, y, colors) {
    this.x = x;
    this.y = y;
    this.d = 0;
    this.sw = width * 0.005;
    this.isDead = false;
    this.dStep = random(0.2, 0.7);
    this.swStep = random(0.009, 0.05); // 매개변수 순서 수정
    this.col = color(random(colors));
    this.t1 = random(TWO_PI); // 초기값 범위 조정
    this.t2 = random(TWO_PI);
    this.xStep = random(-2, 2); // 이동 속도 조정
    this.yStep = random(5, 13);
    this.t1Step = random(0.01, 0.05);
    this.t2Step = random(0.01, 0.05);
    this.aStep = random(2, 5); // 알파 감소 속도 증가
    this.rnd = int(random(2));
    this.alp = 255;
  }

  show() {
    if (this.rnd) {
      noFill();
      stroke(this.col);
      strokeWeight(this.sw);
    } else {
      noStroke();
      this.col.setAlpha(this.alp);
      fill(this.col);
    }
    circle(this.x, this.y, this.d);
  }

  move() {
    this.d += this.dStep;
    if (this.rnd) this.sw -= this.swStep;
    else this.alp -= this.aStep;
    if (this.sw <= 0 || this.alp <= 0) {
      this.isDead = true;
    }
    this.x += this.xStep * sin(this.t1);
    this.y -= abs(this.yStep) * cos(this.t2);
    this.t1 += this.t1Step;
    this.t2 += this.t2Step;
  }
}


// class TravelGraphic {
//   constructor() {
//     this.initialize();
//   }

//   reset() {
//     console.log("Travel Graphic 초기화");
//     this.initialize();
//   }

//   initialize() {
//     console.log("TravelGraphic instance initialized");
//     this.objs = [];
//     this.colors = [
//       "#F2BBEF",
//       "#CDC1D9",
//       "#F2EFBD",
//       "#A7EBF2",
//       "#F2F2F2",
//       "#49B9E3",
//       "#F280AA",
//       "#0583F2",
//       "#F9107D",
//       "#F91F0E",
//       "#FA7610",
//     ];
//     this.addObj();
//   }

//   draw() {
//     if (travelImage) {
//       image(travelImage, 0, 0, 1600, 800); // 이미지 배경 설정
//     }
//     this.bkgd();
//     for (let i of this.objs) {
//       i.show();
//       i.move();
//     }

//     if (frameCount % 50 === 0) {
//       this.addObj();
//     }

//     for (let i = this.objs.length - 1; i >= 0; i--) {
//       if (this.objs[i].isDead) {
//         this.objs.splice(i, 1); // 하나의 요소만 제거
//       }
//     }
//   }

//   addObj() {
//     let num = int(random(5, 50));
//     for (let i = 0; i < num; i++) {
//       this.objs.push(new OBR(random(width), height, this.colors)); // 캔버스 하단에서 시작
//     }
//   }

//   bkgd() {
//     let wid = width * 1.2;
//     let c = 90;
//     let w = wid / c;

//     noStroke();
//     for (let i = 0; i < c; i++) {
//       for (let j = 0; j < c; j++) {
//         let x = i * w + w / 2 + (width - wid) / 2;
//         let y = j * w + w / 2 + (height - wid) / 2;
//         fill(255, 30);
//         circle(x, y, width * 0.001);
//       }
//     }
//   }
// }

// class OBR {
//   constructor(x, y, colors) {
//     this.x = x;
//     this.y = y;
//     this.d = 0;
//     this.sw = width * 0.005;
//     this.isDead = false;
//     this.dStep = random(0.2, 0.7);
//     this.swStep = random(0.05, 0.009);
//     this.col = color(random(colors));
//     this.t1 = random(23904);
//     this.t2 = random(43894);
//     this.xStep = random(-1, 1) * 2;
//     this.yStep = random(5, 10); // 위로 이동 속도값
//     this.t1Step = random(0.1) * random();
//     this.t2Step = random(0.1) * random();
//     this.aStep = random(1, 2);
//     this.rnd = int(random(2));
//     this.alp = 255;
//   }

//   show() {
//     if (this.rnd) {
//       noFill();
//       stroke(this.col);
//       strokeWeight(this.sw);
//     } else {
//       noStroke();
//       this.col.setAlpha(this.alp);
//       fill(this.col);
//     }
//     circle(this.x, this.y, this.d);
//   }

//   move() {
//     this.d += this.dStep;
//     if (this.rnd) this.sw -= this.swStep;
//     else this.alp -= this.aStep;
//     if (this.sw <= 0 || this.alp <= 0) {
//       this.isDead = true;
//     }
//     this.x += this.xStep * sin(this.t1);
//     this.y -= abs(this.yStep) * cos(this.t2); // y 좌표를 감소시키도록 수정
//     this.t1 += this.t1Step;
//     this.t2 += this.t2Step;
//   }
// }
