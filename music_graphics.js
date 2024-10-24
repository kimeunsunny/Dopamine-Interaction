class MusicGraphic {
  // MusicGraphic 인스턴스를 static으로 저장
  static instance = null;

  constructor(music) {
    this.music = music;
    MusicGraphic.instance = this; // 인스턴스 설정
    this.initialize();
  }

  reset() {
    console.log("Music Graphic 초기화");
    this.initialize();

    // 음악을 처음부터 재생하도록 설정
    if (this.music.isPlaying()) {
      this.music.stop();
    }
    this.music.play();
  }

  initialize() {
    // 그래픽 관련 상태 초기화
    this.radius = min(width, height) / 2.5; // 화면 크기에 비례하여 원의 반지름 계산
    this.number = 100; // 원을 구성하는 포인트의 개수
    this.baseAngle = 0;
    this.angle = this.baseAngle;
    this.rec = 0;

    // FFT 및 Amplitude 객체 초기화
    this.fft = new p5.FFT();
    this.amplitude = new p5.Amplitude();

    // 사운드 설정
    this.sound = this.music; // 생성자에서 전달받은 음악 객체 사용
    this.setupSound();

    // Objct 객체 배열 및 색상 배열 추가
    this.objs = [];
    this.colors = [
      "#f70640",
      "#f78e2c",
      "#fdd903",
      "#63be93",
      "#ffffff",
      "#299dbf",
      "#f654a9",
    ];

    // Objct 객체 생성
    for (let i = 0; i < 10; i++) {
      this.objs.push(new this.Objct());
    }

    // 그림자 효과 설정
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowBlur = 20;
  }

  setupSound() {
    if (this.sound) {
      this.sound.stop(); // 기존 사운드 중지
      this.sound.play(); // 사운드 재생
      this.fft.setInput(this.sound); // FFT 입력 설정
      this.amplitude.setInput(this.sound); // Amplitude 입력 설정
    }
  }

  draw() {
    background(0, 180); // 알파 값을 조절하여 투명도 설정

    this.angle = this.baseAngle;

    let spectrum = this.fft.analyze(); // 스펙트럼 데이터 분석

    push(); // 변환 상태 저장
    // translate(width, 0);
    // scale(-1, 1);
    translate(width / 2.5, height / 2); // 캔버스 중심으로 이동
    for (let i = 0; i < this.number; i++) {
      let spec = spectrum[i * 2]; // 스펙트럼 데이터를 일부만 사용
      let size = sq(map(spec, 0, 255, 0, 1)); // 스펙트럼 데이터를 사용하여 크기 계산
      let level = this.amplitude.getLevel(); // 현재 볼륨 수준 가져오기

      let x1 = sin(this.angle) * this.radius;
      let y1 = cos(this.angle) * this.radius;
      let modifier = (1 + size / 2) * (1 + level / 10) + this.rec;
      let x2 = x1 * modifier;
      let y2 = y1 * modifier;

      strokeWeight((level + 1) * 5); // 볼륨에 따라 선의 두께 조정

      // 무지개 색상 계산 (RGB 모드)
      let r = map(sin(this.angle), -1, 1, 0, 255); // 빨강 값 계산
      let g = map(sin(this.angle + TWO_PI / 3), -1, 1, 0, 255); // 초록 값 계산
      let b = map(sin(this.angle + (2 * TWO_PI) / 3), -1, 1, 0, 255); // 파랑 값 계산
      stroke(r, g, b); // RGB 값을 기반으로 색상 설정

      line(x1, y1, x2, y2);
      this.angle += TWO_PI / this.number;
    }
    pop(); // 변환 상태 복원

    // Objct 객체 그리기
    for (let obj of this.objs) {
      obj.show();
      obj.move();
    }
  }

  // Objct 클래스를 MusicGraphic 클래스 내부에 정의
  Objct = class {
    constructor() {
      this.init();
    }

    show() {
      push();
      fill(this.col);
      drawingContext.shadowColor = this.col;
      noStroke();
      circle(this.x, this.y, this.d);
      pop();
    }

    move() {
      this.t++;
      if (0 < this.t && this.t < this.t1) {
        let n = norm(this.t, 0, this.t1 - 1);
        this.d = this.dMax * sin(n * PI);
      }
      if (this.t > this.t1) {
        this.init();
      }
      this.y -= this.yStep;
    }

    init() {
      this.t = 0;
      this.x = random(width);
      this.y = random(height);
      this.t1 = int(random(30, 50)); // 애니메이션 시간
      this.yStep = random(1, 4); // y축 이동 속도
      this.dMax = random(10, 20); // 크기
      this.col = random(this.parent.colors);
      this.d = 0; // 초기 크기 설정
    }

    // 부모 클래스의 참조를 가져오기 위한 getter
    get parent() {
      return MusicGraphic.instance;
    }
  };
}

// class MusicGraphic {
//   // MusicGraphic 인스턴스를 static으로 저장
//   static instance = null;

//   constructor(music) {
//     this.music = music;
//     MusicGraphic.instance = this; // 인스턴스 설정
//     this.initialize();
//   }

//   reset() {
//     console.log("Music Graphic 초기화");
//     this.initialize();

//     // 음악을 처음부터 재생하도록 설정
//     if (this.music.isPlaying()) {
//       this.music.stop();
//     }
//     this.music.play();
//   }

//   initialize() {
//     // 그래픽 관련 상태 초기화
//     this.radius = (height * 3) / 8; // 원의 반지름
//     this.number = 100; // 원을 구성하는 포인트의 개수
//     this.baseAngle = 0;
//     this.angle = this.baseAngle;
//     this.rec = 0;

//     // FFT 및 Amplitude 객체 초기화
//     this.fft = new p5.FFT();
//     this.amplitude = new p5.Amplitude();

//     // 사운드 설정
//     this.sound = this.music; // 생성자에서 전달받은 음악 객체 사용
//     this.setupSound();

//     // Objct 객체 배열 및 색상 배열 추가
//     this.objs = [];
//     this.colors = [
//       "#f70640",
//       "#f78e2c",
//       "#fdd903",
//       "#63be93",
//       "#ffffff",
//       "#299dbf",
//       "#f654a9",
//     ];

//     // Objct 객체 생성
//     for (let i = 0; i < 10; i++) {
//       this.objs.push(new this.Objct());
//     }

//     // 그림자 효과 설정
//     drawingContext.shadowOffsetX = 0;
//     drawingContext.shadowOffsetY = 0;
//     drawingContext.shadowBlur = 20;
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
//     background(0, 180); // 알파 값을 조절하여 투명도 설정

//     this.angle = this.baseAngle;

//     let spectrum = this.fft.analyze(); // 스펙트럼 데이터 분석

//     push(); // 변환 상태 저장
//     translate(width / 2, height / 2); // 캔버스 중심으로 이동
//     for (let i = 0; i < this.number; i++) {
//       let spec = spectrum[i * 2]; // 스펙트럼 데이터를 일부만 사용
//       let size = sq(map(spec, 0, 255, 0, 1)); // 스펙트럼 데이터를 사용하여 크기 계산
//       let level = this.amplitude.getLevel(); // 현재 볼륨 수준 가져오기

//       let x1 = sin(this.angle) * this.radius;
//       let y1 = cos(this.angle) * this.radius;
//       let modifier = (1 + size / 2) * (1 + level / 10) + this.rec;
//       let x2 = x1 * modifier;
//       let y2 = y1 * modifier;

//       strokeWeight((level + 1) * 10); // 볼륨에 따라 선의 두께 조정

//       // 무지개 색상 계산 (RGB 모드)
//       let r = map(sin(this.angle), -1, 1, 0, 255); // 빨강 값 계산
//       let g = map(sin(this.angle + TWO_PI / 3), -1, 1, 0, 255); // 초록 값 계산
//       let b = map(sin(this.angle + (2 * TWO_PI) / 3), -1, 1, 0, 255); // 파랑 값 계산
//       stroke(r, g, b); // RGB 값을 기반으로 색상 설정

//       line(x1, y1, x2, y2);
//       this.angle += TWO_PI / this.number;
//     }
//     pop(); // 변환 상태 복원

//     // Objct 객체 그리기
//     for (let obj of this.objs) {
//       obj.show();
//       obj.move();
//     }
//   }

//   // Objct 클래스를 MusicGraphic 클래스 내부에 정의
//   Objct = class {
//     constructor() {
//       this.x = random(width);
//       this.y = random(height);
//       this.d = 0;
//       this.col = random(this.parent.colors);
//       this.init();
//       this.t = -int(random(100));
//     }

//     show() {
//       push();
//       fill(this.col);
//       drawingContext.shadowColor = this.col;
//       noStroke();
//       circle(this.x, this.y, this.d);
//       pop();
//     }

//     move() {
//       this.t++;
//       if (0 < this.t && this.t < this.t1) {
//         let n = norm(this.t, 0, this.t1 - 1);
//         this.d = this.dMax * sin(n * PI);
//       }
//       if (this.t > this.t1) {
//         this.init();
//       }
//       this.y -= this.yStep;
//     }

//     init() {
//       this.t = 0;
//       this.x = random(width);
//       this.y = random(height);
//       this.t1 = int(random(30, 50)); //애니메이션 시간
//       this.yStep = random(4); //y축 이동 속도
//       this.dMax = random(10, 20); //크기
//       this.col = random(this.parent.colors); // 색상 초기화 추가
//     }

//     // 부모 클래스의 참조를 가져오기 위한 getter
//     get parent() {
//       return MusicGraphic.instance;
//     }
//   };
// }

// class MusicGraphic {
//   constructor() {
//     this.initialize();
//   }

//   reset() {
//     console.log("Music Graphic 초기화");
//     this.initialize();
//   }

//   initialize() {
//     // 그래픽 관련 상태 초기화
//     this.radius = (height * 3) / 8; // 원의 반지름
//     this.number = 100; // 원을 구성하는 포인트의 개수
//     this.baseAngle = 0;
//     this.angle = this.baseAngle;
//     this.rec = 0;

//     // FFT 및 Amplitude 객체 초기화
//     this.fft = new p5.FFT();
//     this.amplitude = new p5.Amplitude();

//     // 사운드 설정
//     this.sound = this.music; // 생성자에서 전달받은 음악 객체 사용
//     this.setupSound();
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
//     background(0, 180); // 알파 값을 조절하여 투명도 설정

//     this.angle = this.baseAngle;

//     let spectrum = this.fft.analyze(); // 스펙트럼 데이터 분석

//     push(); // 변환 상태 저장
//     translate(width / 2, height / 2); // 캔버스 중심으로 이동
//     for (let i = 0; i < this.number; i++) {
//       let spec = spectrum[i * 2]; // 스펙트럼 데이터를 일부만 사용
//       let size = sq(map(spec, 0, 255, 0, 1)); // 스펙트럼 데이터를 사용하여 크기 계산
//       let level = this.amplitude.getLevel(); // 현재 볼륨 수준 가져오기

//       let x1 = sin(this.angle) * this.radius;
//       let y1 = cos(this.angle) * this.radius;
//       let modifier = (1 + size / 2) * (1 + level / 10) + this.rec;
//       let x2 = x1 * modifier;
//       let y2 = y1 * modifier;

//       strokeWeight((level + 1) * 10); // 볼륨에 따라 선의 두께 조정

//       // 무지개 색상 계산 (RGB 모드)
//       let r = map(sin(this.angle), -1, 1, 0, 255); // 빨강 값 계산
//       let g = map(sin(this.angle + TWO_PI / 3), -1, 1, 0, 255); // 초록 값 계산
//       let b = map(sin(this.angle + (2 * TWO_PI) / 3), -1, 1, 0, 255); // 파랑 값 계산
//       stroke(r, g, b); // RGB 값을 기반으로 색상 설정

//       line(x1, y1, x2, y2);
//       this.angle += TWO_PI / this.number;
//     }
//     pop(); // 변환 상태 복원
//   }
// }
