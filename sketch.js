// p5.js
// node server.js
//
//
// 음악 제어 코드 + 비디오1 표시
// let usbVideo1; // 첫 번째 USB 웹캠 (300x300) - 사물 인식용
// let usbVideo2; // 두 번째 USB 웹캠 (1280x720) - 그래픽 표시용
// let label = "waiting...";
// let classifier;
// const modelURL = "https://teachablemachine.withgoogle.com/models/4z3m_eZsb/"; // 모델 URL
// let graphicInstances = {};
// let music; // p5.Sound 객체

// // 두 개의 USB 웹캠의 deviceId를 직접 지정
// const deviceId1 =
//   "f09accbaf2b70bf66dc212579211f093129dedf0924382da9659917e08c2a9ee"; // USB2.0 PC CAMERA
// const deviceId2 =
//   "48648627558f97ed0e286b4bd3bd63b5e37f60235f3ec58d0494b8b0e8887815"; // SNAP U2

// function preload() {
//   // 사전 로드할 항목들 (필요에 따라 수정 가능)
//   classifier = ml5.imageClassifier(modelURL + "model.json");
//   music = loadSound("music.mp3", () => {
//     console.log("음악 파일이 로드되었습니다.");
//   });
// }

// function setup() {
//   createCanvas(1280, 720); // 캔버스 크기 설정

//   // 첫 번째 USB 웹캠 설정 (300x300)
//   usbVideo1 = createCapture(
//     {
//       video: {
//         deviceId: { exact: deviceId1 }, // 첫 번째 USB 웹캠의 deviceId 사용
//         width: 300,
//         height: 300,
//       },
//     },
//     () => {
//       console.log(`첫 번째 USB 웹캠 (USB2.0 PC CAMERA) 준비 완료`);
//     }
//   );
//   usbVideo1.size(300, 300);
//   usbVideo1.hide();

//   // 두 번째 USB 웹캠 설정 (1280x720)
//   usbVideo2 = createCapture(
//     {
//       video: {
//         deviceId: { exact: deviceId2 }, // 두 번째 USB 웹캠의 deviceId 사용
//         width: 1280,
//         height: 720,
//       },
//     },
//     () => {
//       console.log(`두 번째 USB 웹캠 (SNAP U2) 준비 완료`);
//     }
//   );
//   usbVideo2.size(1280, 720);
//   usbVideo2.hide();

//   // 그래픽 인스턴스 초기화
//   initializeGraphics();

//   // 사물 인식 시작
//   classifyVideo();
// }

// function initializeGraphics() {
//   graphicInstances["Cute"] = new CuteGraphic();
//   graphicInstances["Dark"] = new DarkGraphic();
//   graphicInstances["Music"] = new MusicGraphic();
//   graphicInstances["Travel"] = new TravelGraphic();
//   graphicInstances["Player"] = new PlayerGraphic();

//   console.log("Graphic instances initialized:", graphicInstances);
// }

// function classifyVideo() {
//   if (usbVideo1 && classifier) {
//     classifier.classify(usbVideo1, gotResults);
//   }
// }

// function gotResults(error, results) {
//   if (error) {
//     console.error("사물 인식 오류:", error);
//     return;
//   }

//   if (results && results.length > 0) {
//     let highestConfidenceResult = results[0];
//     label = highestConfidenceResult.label.trim();
//     console.log(`업데이트된 레이블: ${label}`);

//     // Player 레이블이면 음악 멈추기, 아니면 재생
//     if (graphicInstances[label]) {
//       graphicInstances[label].handleMusic(); // 각 인스턴스에서 음악 제어
//     }
//   }

//   classifyVideo(); // 연속적인 사물 인식 수행
// }

// function draw() {
//   background(0);

//   if (usbVideo2) {
//     push();
//     translate(width, 0);
//     scale(-1, 1);
//     image(usbVideo2, 0, 0, width, height);
//     pop();
//   }

//   if (usbVideo1) {
//     push();
//     translate(300, 0);
//     scale(-1, 1);
//     image(usbVideo1, 0, 0, 300, 300);
//     pop();
//   }

//   textSize(32);
//   textAlign(CENTER, CENTER);
//   fill(255);
//   text(label, width / 2, height - 32);

//   if (label !== "waiting..." && graphicInstances[label]) {
//     graphicInstances[label].draw();
//   }
// }

// let usbVideo1; // 첫 번째 USB 웹캠 (300x300) - 사물 인식용
// let usbVideo2; // 두 번째 USB 웹캠 (1280x720) - 그래픽 표시용
// let label = "waiting...";
// let previousLabel = ""; // 이전 레이블 추적
// let classifier;
// const modelURL = "https://teachablemachine.withgoogle.com/models/4z3m_eZsb/"; // 모델 URL
// let graphicInstances = {};
// let music; // p5.Sound 객체

// // 두 개의 USB 웹캠의 deviceId를 직접 지정
// const deviceId1 =
//   "f09accbaf2b70bf66dc212579211f093129dedf0924382da9659917e08c2a9ee"; // USB2.0 PC CAMERA
// const deviceId2 =
//   "48648627558f97ed0e286b4bd3bd63b5e37f60235f3ec58d0494b8b0e8887815"; // SNAP U2

// function preload() {
//   classifier = ml5.imageClassifier(modelURL + "model.json");
//   music = loadSound("music.mp3", () => {
//     console.log("음악 파일이 로드되었습니다.");
//   });
// }

// function setup() {
//   createCanvas(1280, 720);

//   usbVideo1 = createCapture(
//     {
//       video: { deviceId: { exact: deviceId1 }, width: 300, height: 300 },
//     },
//     () => console.log("첫 번째 USB 웹캠 준비 완료")
//   );
//   usbVideo1.size(300, 300);
//   usbVideo1.hide();

//   usbVideo2 = createCapture(
//     {
//       video: { deviceId: { exact: deviceId2 }, width: 1280, height: 720 },
//     },
//     () => console.log("두 번째 USB 웹캠 준비 완료")
//   );
//   usbVideo2.size(1280, 720);
//   usbVideo2.hide();

//   initializeGraphics();
//   classifyVideo();
// }

// function initializeGraphics() {
//   graphicInstances["Cute"] = new CuteGraphic();
//   graphicInstances["Dark"] = new DarkGraphic();
//   graphicInstances["Music"] = new MusicGraphic();
//   graphicInstances["Travel"] = new TravelGraphic();
//   graphicInstances["Player"] = new PlayerGraphic();

//   console.log("Graphic instances initialized:", graphicInstances);
// }

// function classifyVideo() {
//   if (usbVideo1 && classifier) {
//     classifier.classify(usbVideo1, gotResults);
//   }
// }

// function gotResults(error, results) {
//   if (error) {
//     console.error("사물 인식 오류:", error);
//     return;
//   }

//   if (results && results.length > 0) {
//     let highestConfidenceResult = results[0];
//     label = highestConfidenceResult.label.trim();
//     console.log(`업데이트된 레이블: ${label}`);

//     if (label !== previousLabel) {
//       // 이전 레이블 그래픽 초기화
//       if (
//         graphicInstances[previousLabel] &&
//         typeof graphicInstances[previousLabel].reset === "function"
//       ) {
//         graphicInstances[previousLabel].reset();
//       }
//       // 새 레이블 그래픽 초기화
//       if (
//         graphicInstances[label] &&
//         typeof graphicInstances[label].reset === "function"
//       ) {
//         graphicInstances[label].reset();
//       }

//       previousLabel = label;
//     }

//     // Player 레이블이면 음악 멈추기, 아니면 재생
//     if (graphicInstances[label]) {
//       graphicInstances[label].handleMusic();
//     }
//   }

//   classifyVideo(); // 연속적인 사물 인식 수행
// }

// function draw() {
//   background(0);

//   if (usbVideo2) {
//     push();
//     translate(width, 0);
//     scale(-1, 1);
//     image(usbVideo2, 0, 0, width, height);
//     pop();
//   }

//   if (usbVideo1) {
//     push();
//     translate(300, 0);
//     scale(-1, 1);
//     image(usbVideo1, 0, 0, 300, 300);
//     pop();
//   }

//   textSize(32);
//   textAlign(CENTER, CENTER);
//   fill(255);
//   text(label, width / 2, height - 32);

//   if (label !== "waiting..." && graphicInstances[label]) {
//     graphicInstances[label].draw();
//   }
// }

let usbVideo1; // 첫 번째 USB 웹캠 (300x300) - 사물 인식용
let usbVideo2; // 두 번째 USB 웹캠 (1280x720) - 그래픽 표시용
let label = "waiting...";
let previousLabel = ""; // 이전 레이블 추적
let classifier;
const modelURL = "https://teachablemachine.withgoogle.com/models/4z3m_eZsb/"; // 모델 URL
let graphicInstances = {};
let music; // p5.Sound 객체

// 두 개의 USB 웹캠의 deviceId를 직접 지정
const deviceId1 =
  "f09accbaf2b70bf66dc212579211f093129dedf0924382da9659917e08c2a9ee"; // USB2.0 PC CAMERA
const deviceId2 =
  "48648627558f97ed0e286b4bd3bd63b5e37f60235f3ec58d0494b8b0e8887815"; // SNAP U2

function preload() {
  classifier = ml5.imageClassifier(modelURL + "model.json");
  music = loadSound("music.mp3", () => {
    console.log("음악 파일이 로드되었습니다.");
  });
}

function setup() {
  createCanvas(1280, 720);

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
    label = highestConfidenceResult.label.trim();
    console.log(`업데이트된 레이블: ${label}`);

    if (label !== previousLabel) {
      // 이전 레이블 그래픽 초기화
      if (
        graphicInstances[previousLabel] &&
        typeof graphicInstances[previousLabel].reset === "function"
      ) {
        graphicInstances[previousLabel].reset();
      }
      // 새 레이블 그래픽 초기화
      if (
        graphicInstances[label] &&
        typeof graphicInstances[label].reset === "function"
      ) {
        graphicInstances[label].reset();
      }

      previousLabel = label;
    }

    // Player 레이블이면 음악 멈추기, 아니면 재생
    if (graphicInstances[label]) {
      graphicInstances[label].handleMusic();
    }
  }

  classifyVideo(); // 연속적인 사물 인식 수행
}

function draw() {
  background(0);

  if (usbVideo2) {
    push();
    translate(width, 0);
    scale(-1, 1);
    image(usbVideo2, 0, 0, width, height); // usbVideo2는 페이지에 렌더링
    pop();
  }

  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height - 32);

  if (label !== "waiting..." && graphicInstances[label]) {
    graphicInstances[label].draw();
  }
}
