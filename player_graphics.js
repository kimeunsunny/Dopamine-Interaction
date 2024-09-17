// class PlayerGraphic {
//   draw() {
//     createCanvas(1280, 720);
//     noFill();
//     strokeWeight(2);
//     strokeCap(ROUND);
//     frameRate(2); // nb de frames par seconde

//     background(0);

//     for (var i = 0; i < 15; i++) {
//       stroke(random(155, 255), random(155, 255), random(155, 255));

//       var rayonList = [
//         0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280,
//         300, 320, 340, 360, 380, 400, 420, 440, 460, 480, 500, 520, 540,
//       ]; // liste de rayons
//       var a = round(random(27)); // nb aléatoire > nb de cases du tableau
//       var w = rayonList[a]; //taille rayon case aléatoire a du tableau rayonList

//       var r = Math.random() * (140 - 20) + 20; // (max - min) + min  // nb aléatoire entre 20 et 140
//       arc(width / 2, height / 2, w, w, random(500), random(500)); // arc (x,y,rayon,debutAngle,finAngle,counterclockwise)
//       arc(width / 2, height / 2, r, r, random(500), random(500));

//       smooth(); // bords plus lisses
//     }
//   }
// }

class PlayerGraphic {
  handleMusic() {
    // Player 레이블일 때 음악 멈춤
    console.log("Player 레이블에서 음악 중지");
    if (music.isPlaying()) {
      music.stop(); // 음악이 재생 중일 때만 중지
    }
  }
  reset() {
    console.log("Music Graphic 초기화");
    // 그래픽 관련 상태 초기화
  }

  draw() {
    createCanvas(1280, 720);
    noFill();
    strokeWeight(2);
    strokeCap(ROUND);
    frameRate(1); // nb de frames par seconde

    background(0);

    for (var i = 0; i < 10; i++) {
      stroke(random(155, 255), random(155, 255), random(155, 255));

      var rayonList = [
        0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280,
        300, 320, 340, 360, 380, 400, 420, 440, 460, 480, 500, 520, 540,
      ]; // liste de rayons
      var a = round(random(27)); // nb aléatoire > nb de cases du tableau
      var w = rayonList[a]; //taille rayon case aléatoire a du tableau rayonList

      var r = Math.random() * (140 - 20) + 20; // (max - min) + min  // nb aléatoire entre 20 et 140
      arc(width / 2, height / 2, w, w, random(500), random(500)); // arc (x,y,rayon,debutAngle,finAngle,counterclockwise)
      arc(width / 2, height / 2, r, r, random(500), random(500));

      smooth(); // bords plus lisses
    }
  }
}
