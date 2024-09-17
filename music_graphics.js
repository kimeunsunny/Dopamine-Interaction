//RGB컬러모드 적용해야 다른 레이블그래픽 영향없음. HSB는 안됨.
class MusicGraphic {
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
  constructor(musicFile) {
    this.radius = (height * 3) / 8; // 원의 반지름
    this.number = 100; // 원을 구성하는 포인트의 개수
    this.baseAngle = 0;
    this.angle = this.baseAngle;
    this.fft = new p5.FFT();
    this.amplitude = new p5.Amplitude();
    this.rec = 0;
    this.sound = null;
    this.loadSoundAndPlay(musicFile);
  }

  loadSoundAndPlay(filename) {
    if (this.sound != null) {
      this.sound.stop(); // 기존 사운드가 있다면 중지
    }
    this.sound = loadSound(filename, () => {
      this.sound.play(); // 사운드가 로드되면 자동 재생
      this.amplitude.setInput(this.sound); // 새로 로드된 사운드에 대해 amplitude 설정
    });
  }

  draw() {
    if (this.sound && this.sound.isLoaded()) {
      if (!this.sound.isPlaying() && !this.sound.isPaused()) {
        this.sound.play();
        this.fft = new p5.FFT();
        this.amplitude.setInput(this.sound);
      }
    } else if (this.sound) {
      this.sound.pause(); // 사운드가 로드되지 않았을 때 일시 정지
    }

    background(0); // 배경을 검정색으로 설정

    let magnitude = this.radius / 20;
    this.angle = this.baseAngle;

    let spectrum = this.fft.analyze(); // 스펙트럼 데이터 분석

    beginShape();
    translate(width / 2, height / 2);
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
    endShape();
  }
}
