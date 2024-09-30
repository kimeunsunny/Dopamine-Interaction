class PlayerGraphic {
  constructor() {
    this.lastUpdateTime = 0;
    this.updateInterval = 1000; // 그래픽 업데이트 간격을 밀리초 단위로 설정 (1초)
    this.pg = createGraphics(width, height); // 오프스크린 그래픽 버퍼 생성
    this.updateGraphics(); // 그래픽 초기화
  }

  handleMusic() {
    console.log("Player 레이블에서 음악 중지");
    if (music.isPlaying()) {
      music.stop();
    }
  }

  reset() {
    console.log("Player Graphic 초기화");
    this.lastUpdateTime = millis(); // 타이밍 변수 초기화
    this.updateGraphics(); // 그래픽 초기화
  }

  updateGraphics() {
    // 오프스크린 버퍼에 그래픽 그리기
    this.pg.background(0);
    this.pg.clear(); // 버퍼 지우기
    this.pg.noFill();
    this.pg.strokeWeight(2);
    this.pg.strokeCap(ROUND);

    for (var i = 0; i < 10; i++) {
      this.pg.stroke(random(155, 255), random(155, 255), random(155, 255));

      var rayonList = [
        0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280,
        300, 320, 340, 360, 380, 400, 420, 440, 460, 480, 500, 520, 540,
      ];
      var a = round(random(27));
      var w = rayonList[a];

      var r = random(20, 140);
      var startAngle = random(TWO_PI);
      var endAngle = random(TWO_PI);
      this.pg.arc(width / 2, height / 2, w, w, startAngle, endAngle);
      this.pg.arc(width / 2, height / 2, r, r, startAngle, endAngle);
    }
    this.pg.smooth();
  }

  draw() {
    let currentTime = millis();
    if (currentTime - this.lastUpdateTime >= this.updateInterval) {
      this.lastUpdateTime = currentTime;
      this.updateGraphics(); // 그래픽 업데이트
    }

    // 오프스크린 버퍼를 메인 캔버스에 그리기
    image(this.pg, 0, 0);
  }
}
