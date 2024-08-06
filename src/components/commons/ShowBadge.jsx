import cat from "@images/badge/cat.png";
import chick from "@images/badge/chick.png";
import chicken from "@images/badge/chicken.png";
import clover_four from "@images/badge/clover_four.png";
import clover_three from "@images/badge/clover_three.png";
import egg from "@images/badge/egg.png";
import lock from "@images/badge/lock.png";
import medal_bronze from "@images/badge/medal_bronze.png";
import medal_gold from "@images/badge/medal_gold.png";
import medal_silver from "@images/badge/medal_silver.png";
import rainbow from "@images/badge/rainbow.png";
import star from "@images/badge/star.png";
import star_big from "@images/badge/star_big.png";
import sun from "@images/badge/sun.png";
import sun_smile from "@images/badge/sun_smile.png";
import tiger from "@images/badge/tiger.png";

import editSvg from "@svgs/badge/edit.svg";

const ShowBadge = ({ name, edit, handler }) => {
  let badgeSrc;
  switch (name) {
    case "cat":
      badgeSrc = cat;
      break;
    case "chick":
      badgeSrc = chick;
      break;
    case "chicken":
      badgeSrc = chicken;
      break;
    case "clover_four":
      badgeSrc = clover_four;
      break;
    case "clover_three":
      badgeSrc = clover_three;
      break;
    case "egg":
      badgeSrc = egg;
      break;
    case "medal_bronze":
      badgeSrc = medal_bronze;
      break;
    case "medal_gold":
      badgeSrc = medal_gold;
      break;
    case "medal_silver":
      badgeSrc = medal_silver;
      break;
    case "rainbow":
      badgeSrc = rainbow;
      break;
    case "star_big":
      badgeSrc = star_big;
      break;
    case "star":
      badgeSrc = star;
      break;
    case "sun_smile":
      badgeSrc = sun_smile;
      break;
    case "sun":
      badgeSrc = sun;
      break;
    case "tiger":
      badgeSrc = tiger;
      break;
    default:
      badgeSrc = lock;
      break;
  }

  if (!badgeSrc) {
    return <p>Badge not found</p>;
  }
  if (edit) {
    return (
      <div
        className="relative flex items-center justify-center w-32 h-32 p-4 rounded-full cursor-pointer bg-white bg-opacity-45 border-4 border-white"
        onClick={handler}
      >
        <img src={badgeSrc} alt={name} />
        <img src={editSvg} alt="edit" className="absolute bottom-0 right-0" />
      </div>
    );
  }

  return (
    <img
      src={badgeSrc}
      alt={name}
      className="cursor-pointer"
      onClick={handler}
    />
  );
};

export default ShowBadge;
