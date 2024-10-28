class DarkGraphic {
  // DarkGraphic 인스턴스를 static으로 저장
  static instance = null;

  constructor(music) {
    this.music = music;
    DarkGraphic.instance = this; // 인스턴스 설정
    this.initialize();
  }

  reset() {
    console.log("Dark Graphic 초기화");
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
    this.fw = [];
    // 불꽃 색상 배열은 클래스 내부에 위치시킵니다.
    this.colors = [
      "#ff0000",
      "#00ff00",
      "#0000ff",
      "#ffff00",
      "#00ffff",
      "#ff00ff",
      "#ffffff",
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
    background(0, 170); // 알파 값을 조절하여 투명도 설정

    // 음악의 볼륨 레벨 가져오기
    let level = this.amplitude.getLevel();

    // 일정 볼륨 이상일 때 불꽃 생성, 볼륨 임계값 조절
    if (level > 0.25) {
      this.fw.push(new this.Fire());
    }

    // 불꽃 효과 그리기
    for (let i = this.fw.length - 1; i >= 0; i--) {
      let f = this.fw[i];
      f.run();
      if (f.isDead()) {
        this.fw.splice(i, 1);
      }
    }
  }

  // Fire 클래스를 DarkGraphic 클래스 내부에 정의
  Fire = class {
    constructor() {
      this.p1 = 0;
      this.p2 = 0;
      this.lifeSpan = 100;
      this.life = this.lifeSpan;
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
        strokeWeight(5); // 선 두께
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
    }

    sets() {
      this.num = Math.floor(Math.random() * 15) + 5;
      this.x = Math.random() * width * 1.2 - width * 0.1;
      this.y = Math.random() * height * 1.2 - height * 0.1;
      this.s = Math.random() * 230 + 100; // 불꽃의 크기 조절
      this.col = random(this.parent.colors);
    }

    run() {
      if (this.life > 0) {
        this.show();
        this.move();
      }
    }

    isDead() {
      return this.life <= 0;
    }

    // 부모 클래스의 참조를 가져오기 위한 getter
    get parent() {
      return DarkGraphic.instance;
    }
  };
}


// class DarkGraphic {
//   // DarkGraphic 인스턴스를 static으로 저장
//   static instance = null;

//   constructor(music) {
//     this.music = music;
//     DarkGraphic.instance = this; // 인스턴스 설정
//     this.initialize();
//   }

//   reset() {
//     console.log("Dark Graphic 초기화");
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
//     this.fw = [];
//     // 불꽃 색상 배열은 클래스 내부에 위치시킵니다.
//     this.colors = [
//       "#ff0000",
//       "#00ff00",
//       "#0000ff",
//       "#ffff00",
//       "#00ffff",
//       "#ff00ff",
//       "#ffffff",
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
//     background(0, 170); // 알파 값을 조절하여 투명도 설정

//     // 음악의 볼륨 레벨 가져오기
//     let level = this.amplitude.getLevel();

//     // 일정 볼륨 이상일 때 불꽃 생성, 볼륨 임계값 조절
//     if (level > 0.25) {
//       this.fw.push(new this.Fire());
//     }

//     // 불꽃 효과 그리기
//     for (let i = this.fw.length - 1; i >= 0; i--) {
//       let f = this.fw[i];
//       f.run();
//       if (f.isDead()) {
//         this.fw.splice(i, 1);
//       }
//     }
//   }

//   // Fire 클래스를 DarkGraphic 클래스 내부에 정의
//   Fire = class {
//     constructor() {
//       this.p1 = 0;
//       this.p2 = 0;
//       this.lifeSpan = 100;
//       this.life = this.lifeSpan;
//       this.ang = Math.random() * 10;
//       this.aStep = (Math.random() * 2 - 1) * 0.001;
//       this.sets();
//     }

//     show() {
//       push();
//       translate(this.x, this.y);
//       rotate(this.ang);
//       stroke(this.col);
//       for (let i = 0; i < this.num; i++) {
//         rotate(TAU / this.num);
//         stroke(this.col);
//         strokeWeight(5); // 선 두께
//         line(this.p1, 0, this.p2, 0);
//         stroke(255);
//         strokeWeight(1);
//         line(this.p1, 0, this.p2, 0);
//       }
//       pop();
//     }

//     move() {
//       this.life--;

//       if (this.lifeSpan > this.life && this.life > 0) {
//         let nrm = norm(this.life, this.lifeSpan, 1);
//         this.p1 = lerp(0, this.s / 2, Math.pow(nrm, 0.8));
//         this.p2 = lerp(0, this.s / 2, Math.pow(nrm, 2));
//         this.y += 0.5;
//         this.ang += this.aStep;
//       }
//     }

//     sets() {
//       this.num = Math.floor(Math.random() * 15) + 5;
//       this.x = Math.random() * width * 1.2 - width * 0.1;
//       this.y = Math.random() * height * 1.2 - height * 0.1;
//       this.s = Math.random() * 230 + 100; //볼륨이 높을수록 큰 불꽃의 크기조절
//       this.col = random(this.parent.colors);
//     }

//     run() {
//       if (this.life > 0) {
//         this.show();
//         this.move();
//       }
//     }

//     isDead() {
//       return this.life <= 0;
//     }

//     // 부모 클래스의 참조를 가져오기 위한 getter
//     get parent() {
//       return DarkGraphic.instance;
//     }
//   };
// }

