class CuteGraphic {
  static instance = null; // static 변수 선언

  constructor(music) {
    this.music = music;
    CuteGraphic.instance = this; // 인스턴스 설정
    this.initialize();
  }

  reset() {
    console.log("Cute Graphic 초기화");
    this.initialize();

    // 음악을 처음부터 재생하도록 설정
    if (this.music.isPlaying()) {
      this.music.stop();
    }
    this.music.play();
  }

  initialize() {
    // FFT 및 Amplitude 객체 초기화
    this.fft = new p5.FFT();
    this.amplitude = new p5.Amplitude();

    // 사운드 설정
    this.sound = this.music; // 생성자에서 전달받은 음악 객체 사용
    this.setupSound();

    // 그래픽 관련 상태 초기화
    this.objs = [];

    // 꽃 색상 배열은 클래스 내부에 위치시킵니다.
    this.flowerColors = [
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
  }

  setupSound() {
    if (this.sound) {
      this.sound.stop(); // 기존 사운드 중지
      // this.sound.play(); // 사운드 재생 (자동 재생 방지)
      this.fft.setInput(this.sound); // FFT 입력 설정
      this.amplitude.setInput(this.sound); // Amplitude 입력 설정
    }
  }

  draw() {
    // 배경 없이 웹캠 영상 위에 꽃 애니메이션을 오버레이

    // 음악의 볼륨 레벨 가져오기
    let level = this.amplitude.getLevel();

    // 일정 볼륨 이상일 때 꽃 애니메이션 생성
    if (level > 0.15 && frameCount % 3 == 0) {
      if (this.objs.length < 20) this.addObj(level); // 최대 20개의 꽃 애니메이션 유지
    }

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
  }

  addObj(level) {
    // 볼륨 수준에 따라 꽃의 크기를 조절
    let flowerSize = map(level, 0, 1, 120, 180);
    this.objs.push(new this.ROK(random(width), random(height), flowerSize, 0));
  }

  // ROK 클래스를 CuteGraphic 클래스 내부에 정의
  ROK = class {
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

      this.col1 = random(this.parent.flowerColors);
      this.col2 = random(this.parent.flowerColors);

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
        this.w2 = lerp(this.bw2, this.ew2, this.parent.easeInOutQuart(n));
      }
      if (this.t1 < this.t && this.t < this.t3) {
        let n = norm(this.t, this.t1, this.t3 - 1);
        this.w1 = lerp(this.bw1, this.ew1, this.parent.easeInOutQuart(n));
      }
      this.y += this.ys;
      this.ys += 0.03;

      if (this.y > height + this.w) {
        this.isDead = true;
      }
      this.t++;
      this.ang += this.as;
      this.x += this.xs;
    }

    // 부모 클래스의 참조를 가져오기 위한 getter
    get parent() {
      return CuteGraphic.instance;
    }
  };

  // 보조 함수도 클래스 내부에 정의
  easeInOutQuart(x) {
    return x < 0.5
      ? 6 * x * x * x * x
      : 1 - Math.pow(-2 * x + 2, 7) / 5;
  }
}



// class CuteGraphic {
//   static instance = null; // static 변수 선언

//   constructor(music) {
//     this.music = music;
//     CuteGraphic.instance = this; // 인스턴스 설정
//     this.initialize();
//   }

//   reset() {
//     console.log("Cute Graphic 초기화");
//     this.initialize();

//     // 음악을 처음부터 재생하도록 설정
//     if (this.music.isPlaying()) {
//       this.music.stop();
//     }
//     this.music.play();
//   }

//   initialize() {
//     // FFT 및 Amplitude 객체 초기화
//     this.fft = new p5.FFT();
//     this.amplitude = new p5.Amplitude();

//     // 사운드 설정
//     this.sound = this.music; // 생성자에서 전달받은 음악 객체 사용
//     this.setupSound();

//     // 그래픽 관련 상태 초기화
//     this.objs = [];

//     // 꽃 색상 배열은 클래스 내부에 위치시킵니다.
//     this.flowerColors = [
//       "#D94E73",
//       "#F2E857",
//       "#F2BA52",
//       "#F27A5E",
//       "#2DA679",
//       "#F24B4B",
//       "#035AA6",
//       "#F24150",
//       "#387336",
//     ];
//   }

//   setupSound() {
//     if (this.sound) {
//       this.sound.stop(); // 기존 사운드 중지
//       this.sound.play(); // 사운드 재생
//       this.fft.setInput(this.sound); // FFT 입력 설정
//       this.amplitude.setInput(this.sound); // Amplitude 입력 설정
//     }
//   }

//   draw() {
//     // 배경 없이 웹캠 영상 위에 꽃 애니메이션을 오버레이

//     // 음악의 볼륨 레벨 가져오기
//     let level = this.amplitude.getLevel();

//     // 일정 볼륨 이상일 때 꽃 애니메이션 생성
//     if (level > 0.15 && frameCount % 3 == 0) {
//       if (this.objs.length < 20) this.addObj(level); // 최대 20개의 꽃 애니메이션 유지
//     }

//     for (let i of this.objs) {
//       i.show();
//       i.move();
//     }

//     // 화면 밖으로 나간 객체를 배열에서 제거
//     for (let i = this.objs.length - 1; i >= 0; i--) {
//       if (this.objs[i].isDead) {
//         this.objs.splice(i, 1);
//       }
//     }
//   }

//   addObj(level) {
//     // 볼륨 수준에 따라 꽃의 크기를 조절
//     let flowerSize = map(level, 0, 1, 120, 180);
//     this.objs.push(new this.ROK(random(width), random(height), flowerSize, 0));
//   }

//   // ROK 클래스를 CuteGraphic 클래스 내부에 정의
//   ROK = class {
//     constructor(x, y, w, t) {
//       this.x = x;
//       this.y = y;
//       this.w = w;

//       this.bw1 = 0;
//       this.ew1 = w;
//       this.bw2 = 0;
//       this.ew2 = w * random(0.1, 0.3);
//       this.w1 = this.bw1;
//       this.w2 = this.bw2;

//       this.ptn = int(random(8, 30));
//       this.ewh = random(0.2, 0.35);
//       this.ehh = random(0.05, 0.1);
//       this.esh = random(0.25, 0.35);

//       this.t = t;
//       this.t1 = 20;
//       this.t2 = this.t1 + 30;
//       this.t3 = this.t2 + 20;

//       this.ang = random(10);

//       this.col1 = random(this.parent.flowerColors);
//       this.col2 = random(this.parent.flowerColors);

//       this.as = random(-1, 1) * 0.02;
//       this.ys = -width * 0.001;

//       this.xs = random(-1, 1) * width * 0.001;

//       this.isDead = false;
//     }

//     show() {
//       push();
//       translate(this.x, this.y);
//       rotate(this.ang);
//       noStroke();
//       fill(this.col1);
//       for (let i = 0; i < this.ptn; i++) {
//         rotate(TAU / this.ptn);
//         ellipse(this.w1 * this.esh, 0, this.w1 * this.ewh, this.w1 * this.ehh);
//       }
//       fill(this.col2);
//       circle(0, 0, this.w2);
//       pop();
//     }

//     move() {
//       if (0 < this.t && this.t < this.t2) {
//         let n = norm(this.t, 0, this.t2 - 1);
//         this.w2 = lerp(this.bw2, this.ew2, this.parent.easeInOutQuart(n));
//       }
//       if (this.t1 < this.t && this.t < this.t3) {
//         let n = norm(this.t, this.t1, this.t3 - 1);
//         this.w1 = lerp(this.bw1, this.ew1, this.parent.easeInOutQuart(n));
//       }
//       this.y += this.ys;
//       this.ys += 0.03;

//       if (this.y > height + this.w) {
//         this.isDead = true;
//       }
//       this.t++;
//       this.ang += this.as;
//       this.x += this.xs;
//     }

//     // 부모 클래스의 참조를 가져오기 위한 getter
//     get parent() {
//       return CuteGraphic.instance;
//     }
//   };

//   // 보조 함수도 클래스 내부에 정의
//   easeInOutQuart(x) {
//     return x < 0.5 ? 6 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 7) / 5;
//   }
// }

