import { setCounter } from "@redux/slices/playSlice";
import store from "@redux/store";
import { calcLowerPoseAngles, calcUpperBodyAngle } from "../calcAngle";

let isLunge = false;
const minLungeAngle = 70; // 최소 각도
const maxLungeAngle = 110; // 최대 각도

const updateLungeCount = (landmarks) => {
  const { right_legAngle, left_legAngle } = calcLowerPoseAngles(landmarks);
  const upperBodyAngle = calcUpperBodyAngle(landmarks);

  // 각도 계산이 유효한지 확인
  if (
    right_legAngle === 0 ||
    right_legAngle === 180 ||
    left_legAngle === 0 ||
    left_legAngle === 180
  ) {
    return;
  }

  const averageLegAngle = (right_legAngle + left_legAngle) / 2;

  // 런지 자세가 내려간 상태인지 확인
  if (averageLegAngle <= minLungeAngle) {
    if (!isLunge) {
      isLunge = true;
      // 런지 품질 평가

      if (averageLegAngle > 65) {
        store.dispatch(setCounter(["Good"]));
      } else if (averageLegAngle <= 65 && averageLegAngle > 60) {
        store.dispatch(setCounter(["Great"]));
      } else {
        store.dispatch(setCounter(["Perfect"]));
      }
    }
  }
  // 런지 자세가 올라간 상태인지 확인
  else if (averageLegAngle >= maxLungeAngle) {
    // 상체가 펴져있으면 보통 40 / 구부러져있으면 115
    if (isLunge && upperBodyAngle < 80) {
      isLunge = false;
    }
  }
};

export default updateLungeCount;
