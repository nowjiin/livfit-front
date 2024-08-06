import turtleFace from "@images/turtle/turtle-face.png";
import { useCallback, useEffect, useState } from "react";

// all -> 상반신까지 (거북목 측정을 위해)
// 아무 인자도 넘기지 않을시 -> 어깨 아래로만 (플레이를 위해 불필요한 얼굴은 그리지 않는다)

const useDrawLandmarks = (all) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = turtleFace;
    img.onload = () => setImage(img);
  }, []);

  const drawLandmarks = useCallback(
    (ctx, landmarks, connections) => {
      const startIdx = 11;

      // 얼굴 부분은 제외
      for (let i = startIdx; i < landmarks.length; i++) {
        const landmark = landmarks[i];
        ctx.beginPath();
        ctx.arc(
          landmark.x * ctx.canvas.width,
          landmark.y * ctx.canvas.height,
          20, // 점의 크기를 10로 변경
          0,
          2 * Math.PI
        );
        ctx.fillStyle = "red";
        ctx.fill();
      }

      if (connections) {
        ctx.strokeStyle = "white";
        ctx.lineWidth = 6; // 선의 두께를 6으로 변경
        for (let i = 9; i < connections.length; i++) {
          // 인덱스 10부터 시작
          const [startIdx, endIdx] = connections[i];
          const startLandmark = landmarks[startIdx];
          const endLandmark = landmarks[endIdx];
          ctx.beginPath();
          ctx.moveTo(
            startLandmark.x * ctx.canvas.width,
            startLandmark.y * ctx.canvas.height
          );
          ctx.lineTo(
            endLandmark.x * ctx.canvas.width,
            endLandmark.y * ctx.canvas.height
          );
          ctx.stroke();
        }
      }

      // 임의의 이미지를 얼굴 부분에 넣기
      // if (image && all) {
      //   const leftEar = landmarks[7]; // 왼쪽 귀
      //   const rightEar = landmarks[8]; // 오른쪽 귀
      //   const nose = landmarks[0]; // 코
      //   const leftEye = landmarks[2]; // 왼쪽 눈
      //   const rightEye = landmarks[5]; // 오른쪽 눈
      //   const mouthLeft = landmarks[9]; // 입 (왼쪽)
      //   const mouthRight = landmarks[10]; // 입 (오른쪽)

      //   const minX = Math.min(
      //     leftEar.x,
      //     rightEar.x,
      //     nose.x,
      //     leftEye.x,
      //     rightEye.x,
      //     mouthLeft.x,
      //     mouthRight.x
      //   );
      //   const maxX = Math.max(
      //     leftEar.x,
      //     rightEar.x,
      //     nose.x,
      //     leftEye.x,
      //     rightEye.x,
      //     mouthLeft.x,
      //     mouthRight.x
      //   );
      //   const minY = Math.min(
      //     leftEar.y,
      //     rightEar.y,
      //     nose.y,
      //     leftEye.y,
      //     rightEye.y,
      //     mouthLeft.y,
      //     mouthRight.y
      //   );
      //   const maxY = Math.max(
      //     leftEar.y,
      //     rightEar.y,
      //     nose.y,
      //     leftEye.y,
      //     rightEye.y,
      //     mouthLeft.y,
      //     mouthRight.y
      //   );

      //   const xOffset = 0.7 * (maxX - minX);
      //   const yOffset = 0.7 * (maxY - minY);

      //   const x = (minX - xOffset) * ctx.canvas.width;
      //   const y = (minY - yOffset) * ctx.canvas.height;
      //   const width = (maxX - minX + 2 * xOffset) * ctx.canvas.width;
      //   const height = (maxY - minY + 2 * yOffset) * ctx.canvas.height;

      //   // ctx.drawImage(image, x, y, width, height);
      // }
    },
    [all, image]
  );

  return drawLandmarks;
};

export default useDrawLandmarks;
