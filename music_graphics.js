class MusicGraphic {
  constructor() {
    this.initialize();
  }

  initialize() {
    // 그래픽 관련 상태 초기화
    this.radius = (height * 3) / 8; // 원의 반지름
    this.number = 100; // 원을 구성하는 포인트의 개수
    this.baseAngle = 0;
    this.angle = this.baseAngle;
    this.rec = 0;

    // FFT 및 Amplitude 객체 초기화
    this.fft = new p5.FFT();
    this.amplitude = new p5.Amplitude();

    // 사운드 설정
    this.sound = music; // 전역 `music` 객체 사용
    this.setupSound();
  }

  setupSound() {
    if (this.sound) {
      this.sound.stop(); // 기존 사운드 중지
      this.sound.play(); // 사운드 재생
      this.fft.setInput(this.sound); // FFT 입력 설정
      this.amplitude.setInput(this.sound); // Amplitude 입력 설정
    }
  }

  handleMusic() {
    if (!this.sound.isPlaying()) {
      console.log("음악 재생 시작");
      this.sound.play();
    }
  }

  reset() {
    console.log("Music Graphic 초기화");
    this.initialize(); // 내부 상태 초기화
  }

  draw() {
    background(0, 180); // 알파 값을 조절하여 투명도 설정

    this.angle = this.baseAngle;

    let spectrum = this.fft.analyze(); // 스펙트럼 데이터 분석

    push(); // 변환 상태 저장
    translate(width / 2, height / 2); // 캔버스 중심으로 이동
    for (let i = 0; i < this.number; i++) {
      let spec = spectrum[i * 2]; // 스펙트럼 데이터를 일부만 사용
      let size = sq(map(spec, 0, 255, 0, 1)); // 스펙트럼 데이터를 사용하여 크기 계산
      let level = this.amplitude.getLevel(); // 현재 볼륨 수준 가져오기

      let x1 = sin(this.angle) * this.radius;
      let y1 = cos(this.angle) * this.radius;
      let modifier = (1 + size / 2) * (1 + level / 10) + this.rec;
      let x2 = x1 * modifier;
      let y2 = y1 * modifier;

      strokeWeight((level + 1) * 10); // 볼륨에 따라 선의 두께 조정

      // 무지개 색상 계산 (RGB 모드)
      let r = map(sin(this.angle), -1, 1, 0, 255); // 빨강 값 계산
      let g = map(sin(this.angle + TWO_PI / 3), -1, 1, 0, 255); // 초록 값 계산
      let b = map(sin(this.angle + (2 * TWO_PI) / 3), -1, 1, 0, 255); // 파랑 값 계산
      stroke(r, g, b); // RGB 값을 기반으로 색상 설정

      line(x1, y1, x2, y2);
      this.angle += TWO_PI / this.number;
    }
    pop(); // 변환 상태 복원
  }
}
