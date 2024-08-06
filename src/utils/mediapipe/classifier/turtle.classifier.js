import { calcShoulderNoseAngle } from "../calcAngle";

const detectTurtleNeck = (landmarks) => {
  const turtleDetectionAngle = calcShoulderNoseAngle(landmarks);
  return turtleDetectionAngle;
};

export default detectTurtleNeck;
