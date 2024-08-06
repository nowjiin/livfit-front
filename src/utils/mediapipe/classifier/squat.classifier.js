import { setCounter } from "@redux/slices/playSlice";
import store from "@redux/store";
import { calcLowerPoseAngles, calcUpperBodyAngle } from "../calcAngle";

let isSquat = false;
const minSquatAngle = 75; // 최소 각도, 엉덩이가 내려간 상태
const maxSquatAngle = 100; // 최대 각도, 엉덩이가 올라간 상태

const updateSquatCount = (landmarks) => {
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

  // 엉덩이가 내려간 상태인지 확인
  if (averageLegAngle <= minSquatAngle) {
    if (!isSquat) {
      isSquat = true;
      // 스쿼트 품질 평가

      if (averageLegAngle > 70) {
        store.dispatch(setCounter(["Good"]));
      } else if (averageLegAngle <= 70 && averageLegAngle > 65) {
        store.dispatch(setCounter(["Great"]));
      } else {
        store.dispatch(setCounter(["Perfect"]));
      }
    }
  }
  // 엉덩이가 올라간 상태인지 확인
  else if (averageLegAngle >= maxSquatAngle) {
    // 상체가 펴져있으면 보통 40 / 구부러져있으면 115
    if (isSquat && upperBodyAngle < 80) {
      isSquat = false;
    }
  }
};

export default updateSquatCount;
