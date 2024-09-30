// p5.js
// node server.js

let usbVideo1; // 첫 번째 USB 웹캠 (300x300) - 사물 인식용
let usbVideo2; // 두 번째 USB 웹캠 (1280x720) - 그래픽 표시용
let label = "waiting...";
let previousLabel = ""; // 이전 레이블 추적
let classifier;
const modelURL = "https://teachablemachine.withgoogle.com/models/4z3m_eZsb/"; // 모델 URL
let graphicInstances = {};
let music; // p5.Sound 객체

// 레이블 상태 관리 객체
let labelStates = {
  Cute: false,
  Dark: false,
  Music: false,
  Travel: false,
  Player: false,
};

// 두 개의 USB 웹캠의 deviceId를 직접 지정
const deviceId1 =
  "08094023da0370c72a8835b668d03f414b212803e733508e7443d561b2af9d4b"; //사물 USB2.0 PC CAMERA
const deviceId2 =
  "569bb77c7b077baaa7acd176a2c25d511295036f63595da13f4e0e788a5ca008"; //사람 SNAP U2

function preload() {
  classifier = ml5.imageClassifier(modelURL + "model.json");
  music = loadSound("music.mp3", () => {
    console.log("음악 파일이 로드되었습니다.");
  });
}

function setup() {
  createCanvas(1280, 720);

  // 장치 목록을 출력
  // navigator.mediaDevices
  //   .enumerateDevices()
  //   .then((devices) => {
  //     devices.forEach((device) => {
  //       console.log(`${device.kind}: ${device.label}, id = ${device.deviceId}`);
  //     });
  //   })
  //   .catch((err) => {
  //     console.error("장치 목록을 가져오는 중 오류 발생:", err);
  //   });

  usbVideo1 = createCapture(
    {
      video: { deviceId: { exact: deviceId1 }, width: 300, height: 300 },
    },
    () => console.log("첫 번째 USB 웹캠 준비 완료")
  );
  usbVideo1.size(300, 300);
  // usbVideo1.hide(); // 첫 번째 웹캠은 페이지에서 숨김 (사물 인식 용도)

  usbVideo2 = createCapture(
    {
      video: { deviceId: { exact: deviceId2 }, width: 1280, height: 720 },
    },
    () => console.log("두 번째 USB 웹캠 준비 완료")
  );
  usbVideo2.size(1280, 720);
  usbVideo2.hide(); // 일단 숨기지만 draw에서 다시 렌더링

  initializeGraphics();
  classifyVideo();
}

function initializeGraphics() {
  graphicInstances["Cute"] = new CuteGraphic();
  graphicInstances["Dark"] = new DarkGraphic();
  graphicInstances["Music"] = new MusicGraphic();
  graphicInstances["Travel"] = new TravelGraphic();
  graphicInstances["Player"] = new PlayerGraphic();

  console.log("Graphic instances initialized:", graphicInstances);
}

function classifyVideo() {
  if (usbVideo1 && classifier) {
    classifier.classify(usbVideo1, gotResults); // usbVideo1로 사물 인식
  }
}

function gotResults(error, results) {
  if (error) {
    console.error("사물 인식 오류:", error);
    return;
  }

  if (results && results.length > 0) {
    let highestConfidenceResult = results[0];
    let newLabel = highestConfidenceResult.label.trim();
    console.log(`업데이트된 레이블: ${newLabel}`);

    // 모든 레이블의 상태를 false로 초기화
    for (let key in labelStates) {
      labelStates[key] = false;
    }

    // 현재 인식된 레이블의 상태를 true로 설정
    if (labelStates.hasOwnProperty(newLabel)) {
      labelStates[newLabel] = true;
    }

    // 레이블 상태 변화 감지 및 그래픽 리셋
    for (let key in labelStates) {
      if (labelStates[key]) {
        if (key !== previousLabel) {
          // 이전 레이블 그래픽 초기화
          if (
            graphicInstances[previousLabel] &&
            typeof graphicInstances[previousLabel].reset === "function"
          ) {
            graphicInstances[previousLabel].reset();
          }
          // 새 레이블 그래픽 초기화
          if (
            graphicInstances[key] &&
            typeof graphicInstances[key].reset === "function"
          ) {
            graphicInstances[key].reset();
          }

          previousLabel = key;
        }
      }
    }

    label = newLabel;

    // 레이블에 해당하는 음악 제어
    if (graphicInstances[label]) {
      graphicInstances[label].handleMusic();
    }
  }

  classifyVideo(); // 연속적인 사물 인식 수행
}

function draw() {
  background(0);

  if (label !== "Player") {
    // 'Player' 레이블이 아닐 때만 웹캠 영상 그리기
    if (usbVideo2) {
      push();
      translate(width, 0);
      scale(-1, 1);
      image(usbVideo2, 0, 0, width, height);
      pop();
    }
  }

  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height - 32);

  if (label !== "waiting..." && graphicInstances[label]) {
    graphicInstances[label].draw();
  }
}
