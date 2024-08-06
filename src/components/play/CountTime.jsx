import one from "@images/play/one.png";
import three from "@images/play/three.png";
import two from "@images/play/two.png";

const CountTime = ({ time }) => {
  if (time === 1) {
    return <img src={one} alt={time} className="pb-20" />;
  }

  if (time === 2) {
    return <img src={two} alt={time} className="pb-20" />;
  }

  if (time === 3) {
    return <img src={three} alt={time} className="pb-20" />;
  }
};

export default CountTime;
