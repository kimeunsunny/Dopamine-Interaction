// p5.js
// node server.js
// http://localhost:3000

let usbVideo1; // 첫 번째 USB 웹캠 (300x300) - 사물 인식용
let usbVideo2; // 두 번째 USB 웹캠 (1280x720) - 그래픽 표시용
let label = "waiting...";
let previousLabel = ""; // 이전 레이블 추적
let classifier;
const modelURL = "https://teachablemachine.withgoogle.com/models/4z3m_eZsb/"; // 모델 URL
let graphicInstances = {};
let musicFiles = {}; // 음악 파일들을 저장할 객체
let travelImage; // TravelGraphic에서 사용할 이미지
// let music; // p5.Sound 객체
let labelChangeTimer = null; // 레이블 변경 타이머
const LABEL_CHANGE_DELAY = 300; // 레이블 변경 대기 시간(ms)
const CONFIDENCE_THRESHOLD = 0.75; // 레이블 신뢰도 임계값
let sameLabelCount = 0; // 동일 레이블 연속 인식 횟수
const SAME_LABEL_THRESHOLD = 3; // 동일 레이블 연속 인식 필요 횟수

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
  "075089b9c0f0f2ea6d02fa7e37aa6efd8584526af6e5a7134851c994189f9605"; //사물 C270 HD WEBCAM
const deviceId2 =
  "fdd634577df40fa9d3aa379b19965fb70d7728b3e7c824939651dc1bd3d2fa83"; //사람 SNAP U2

function preload() {
  classifier = ml5.imageClassifier(modelURL + "model.json");

  // 각 레이블에 해당하는 음악 파일 로드
  musicFiles["Cute"] = loadSound("cute_music.mp3");
  musicFiles["Dark"] = loadSound("dark_music.mp3");
  musicFiles["Music"] = loadSound("music_music.mp3");
  musicFiles["Travel"] = loadSound("travel_music.mp3");
  // 'Player' 레이블에 대한 음악 파일 로드 없음

  // TravelGraphic에서 사용할 이미지 로드
  travelImage = loadImage("assets/cloud1920.png");
  // playerImage = loadImage("assets/player.png");
}

function setup() {
  createCanvas(1920, 800);

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
      video: { deviceId: { exact: deviceId2 }, width: 1920, height: 800 },
    },
    () => console.log("두 번째 USB 웹캠 준비 완료")
  );
  usbVideo2.size(1920, 800);
  usbVideo2.hide(); // 일단 숨기지만 draw에서 다시 렌더링

  initializeGraphics();
  classifyVideo();
}

function initializeGraphics() {
  graphicInstances["Cute"] = new CuteGraphic();
  graphicInstances["Dark"] = new DarkGraphic();
  graphicInstances["Travel"] = new TravelGraphic();
  graphicInstances["Player"] = new PlayerGraphic();

  // MusicGraphic 인스턴스 생성
  graphicInstances["Music"] = new MusicGraphic(musicFiles["Music"]);
  // DarkGraphic 인스턴스 생성
  graphicInstances["Dark"] = new DarkGraphic(musicFiles["Dark"]);
  graphicInstances["Cute"] = new CuteGraphic(musicFiles["Cute"]);

  console.log("Graphic instances initialized:", graphicInstances);
}

function classifyVideo() {
  if (usbVideo1 && classifier) {
    classifier.classify(usbVideo1, gotResults); // usbVideo1로 사물 인식
  }
}

function stopAllMusic() {
  for (let key in musicFiles) {
    if (musicFiles[key].isPlaying()) {
      musicFiles[key].stop();
    }
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
    let confidence = highestConfidenceResult.confidence;
    console.log(`업데이트된 레이블: ${newLabel}, 신뢰도: ${confidence}`);

    // 신뢰도가 임계값 이상인 경우에만 레이블 변경 고려
    if (confidence >= CONFIDENCE_THRESHOLD) {
      if (newLabel === previousLabel) {
        sameLabelCount++;
      } else {
        sameLabelCount = 1; // 연속 인식 횟수 초기화
      }

      if (sameLabelCount >= SAME_LABEL_THRESHOLD) {
        if (label !== newLabel) {
          // 모든 음악 중지
          stopAllMusic();

          // 새 레이블에 해당하는 음악 재생
          if (musicFiles[newLabel]) {
            console.log(`${newLabel} 레이블 음악 재생 시작`);
            musicFiles[newLabel].play();
          }

          // 그래픽 인스턴스 리셋
          if (
            graphicInstances[newLabel] &&
            typeof graphicInstances[newLabel].reset === "function"
          ) {
            graphicInstances[newLabel].reset();
          }

          label = newLabel;
        }

        sameLabelCount = 0; // 연속 인식 횟수 초기화
      }

      previousLabel = newLabel;
    } else {
      console.log(`신뢰도 낮음: ${confidence}. 레이블 변경 없음.`);
      sameLabelCount = 0; // 신뢰도가 낮으면 연속 인식 횟수 초기화
    }
  }

  classifyVideo(); // 연속적인 사물 인식 수행
}

// 이전 규칙 코드
// function gotResults(error, results) {
//   if (error) {
//     console.error("사물 인식 오류:", error);
//     return;
//   }

//   if (results && results.length > 0) {
//     let highestConfidenceResult = results[0];
//     let newLabel = highestConfidenceResult.label.trim();
//     console.log(`업데이트된 레이블: ${newLabel}`);

//     // 모든 레이블의 상태를 false로 초기화
//     for (let key in labelStates) {
//       labelStates[key] = false;
//     }

//     // 현재 인식된 레이블의 상태를 true로 설정
//     if (labelStates.hasOwnProperty(newLabel)) {
//       labelStates[newLabel] = true;
//     }

//     // 레이블 상태 변화 감지 및 그래픽 리셋
//     if (newLabel !== previousLabel) {
//       // 모든 음악 중지
//       stopAllMusic();

//       // 새 레이블에 해당하는 음악 재생
//       if (musicFiles[newLabel]) {
//         console.log(`${newLabel} 레이블 음악 재생 시작`);
//         musicFiles[newLabel].play();
//       }

//       // 그래픽 인스턴스 리셋
//       if (
//         graphicInstances[newLabel] &&
//         typeof graphicInstances[newLabel].reset === "function"
//       ) {
//         graphicInstances[newLabel].reset();
//       }

//       previousLabel = newLabel;
//     }

//     label = newLabel;
//   }

//   classifyVideo(); // 연속적인 사물 인식 수행
// }

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

  // 레이블 텍스트
  // textSize(32);
  // textAlign(CENTER, CENTER);
  // fill(255);
  // text(label, width / 2, height - 32);

  if (label !== "waiting..." && graphicInstances[label]) {
    graphicInstances[label].draw();
  }
}
