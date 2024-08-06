import bigDummy from "@images/challenge/big-dummy.png";
import challenge from "@images/challenge/challenge.png";
import challenge1 from "@images/challenge/challenge1.png";
import running from "@images/challenge/running.png";

// ID에 따른 이미지 매핑
const images = {
  11: running,
  6: challenge,
  7: challenge1,
  // 필요한 만큼 추가
};

// ID에 해당하는 이미지를 반환하는 함수
export const getImageById = (id) => {
  return images[id] || bigDummy;
};
