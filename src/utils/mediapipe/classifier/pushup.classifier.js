import { setCounter } from "@redux/slices/playSlice";
import store from "@redux/store";
import { calcPushupAngles, calcUpperBodyAngle } from "../calcAngle";

let isPushup = false;
const minPushupAngle = 90;
const maxPushupAngle = 100;

const updatePushupCount = (landmarks) => {
  const { right_armAngle, left_armAngle } = calcPushupAngles(landmarks);
  const upperBodyAngle = calcUpperBodyAngle(landmarks);

  if (
    right_armAngle === 0 ||
    right_armAngle === 180 ||
    left_armAngle === 0 ||
    left_armAngle === 180
  ) {
    return;
  }

  const averageArmAngle = (right_armAngle + left_armAngle) / 2;

  // 팔이 굽혀진 상태인지 확인
  if (averageArmAngle <= minPushupAngle) {
    if (!isPushup) {
      isPushup = true;

      if (averageArmAngle < 100) {
        store.dispatch(setCounter(["Good"]));
      } else if (averageArmAngle <= 90 && averageArmAngle > 90) {
        store.dispatch(setCounter(["Great"]));
      } else {
        store.dispatch(setCounter(["Perfect"]));
      }
    }
  } else if (averageArmAngle >= maxPushupAngle) {
    if (isPushup && upperBodyAngle < 80) {
      isPushup = false;
    }
  }
};

export default updatePushupCount;
