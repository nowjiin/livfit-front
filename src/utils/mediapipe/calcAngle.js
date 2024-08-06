import {
  POSE_LANDMARKS_CENTER,
  POSE_LANDMARKS_LEFT,
  POSE_LANDMARKS_RIGHT,
} from "@constants/poseNumber";

function angleBetweenLines(landmark1, landmark2, landmark3) {
  const { x: x1, y: y1 } = landmark1;
  const { x: x2, y: y2 } = landmark2;
  const { x: x3, y: y3 } = landmark3;

  let angle = Math.atan2(y3 - y2, x3 - x2) - Math.atan2(y1 - y2, x1 - x2);
  angle = Math.abs((angle * 180) / Math.PI);

  if (angle > 180) {
    angle = 360 - angle;
  }

  return angle;
}

function calcLowerPoseAngles(landmarks) {
  // 오른쪽 엉덩이 - 무릎 - 발목 각도 계산
  const right_legAngle = angleBetweenLines(
    landmarks[POSE_LANDMARKS_RIGHT.RIGHT_HIP],
    landmarks[POSE_LANDMARKS_RIGHT.RIGHT_KNEE],
    landmarks[POSE_LANDMARKS_RIGHT.RIGHT_ANKLE]
  );

  // 왼쪽 엉덩이 - 무릎 - 발목 각도 계산
  const left_legAngle = angleBetweenLines(
    landmarks[POSE_LANDMARKS_LEFT.LEFT_ANKLE],
    landmarks[POSE_LANDMARKS_LEFT.LEFT_KNEE],
    landmarks[POSE_LANDMARKS_LEFT.LEFT_HIP]
  );

  return { right_legAngle, left_legAngle };
}

function calcPushupAngles(landmarks) {
  // 오른쪽 어깨 - 팔꿈치 - 손목 각도 계산
  const right_armAngle = angleBetweenLines(
    landmarks[POSE_LANDMARKS_RIGHT.RIGHT_SHOULDER],
    landmarks[POSE_LANDMARKS_RIGHT.RIGHT_ELBOW],
    landmarks[POSE_LANDMARKS_RIGHT.RIGHT_WRIST]
  );

  const left_armAngle = angleBetweenLines(
    landmarks[POSE_LANDMARKS_LEFT.LEFT_SHOULDER],
    landmarks[POSE_LANDMARKS_LEFT.LEFT_ELBOW],
    landmarks[POSE_LANDMARKS_LEFT.LEFT_WRIST]
  );

  return { right_armAngle, left_armAngle };
}

function calcUpperBodyAngle(landmarks) {
  // 오른쪽 어깨 - 엉덩이 - 왼쪽 어깨 각도 계산
  const rightShoulderHipAngle = angleBetweenLines(
    landmarks[POSE_LANDMARKS_RIGHT.RIGHT_SHOULDER],
    landmarks[POSE_LANDMARKS_RIGHT.RIGHT_HIP],
    landmarks[POSE_LANDMARKS_RIGHT.RIGHT_SHOULDER]
  );

  // 왼쪽 어깨 - 엉덩이 - 오른쪽 어깨 각도 계산
  const leftShoulderHipAngle = angleBetweenLines(
    landmarks[POSE_LANDMARKS_LEFT.LEFT_SHOULDER],
    landmarks[POSE_LANDMARKS_LEFT.LEFT_HIP],
    landmarks[POSE_LANDMARKS_LEFT.LEFT_SHOULDER]
  );

  return (rightShoulderHipAngle + leftShoulderHipAngle) / 2;
}

function calcShoulderNoseAngle(landmarks) {
  const turtleDetectAngle = angleBetweenLines(
    landmarks[POSE_LANDMARKS_CENTER.NOSE],
    landmarks[POSE_LANDMARKS_LEFT.LEFT_SHOULDER],
    landmarks[POSE_LANDMARKS_RIGHT.RIGHT_SHOULDER]
  );

  return turtleDetectAngle;
}

function simplifyPoseLandmarks(results) {
  return results.poseLandmarks.map((landmark) => {
    return {
      x: Math.min(
        Math.floor(landmark.x * results.image.width),
        results.image.width - 1
      ),
      y: Math.min(
        Math.floor(landmark.y * results.image.height),
        results.image.height - 1
      ),
      visibility: landmark.visibility, // 가시성 값을 포함
    };
  });
}

export {
  calcLowerPoseAngles,
  calcPushupAngles,
  calcShoulderNoseAngle,
  calcUpperBodyAngle,
  simplifyPoseLandmarks,
};
