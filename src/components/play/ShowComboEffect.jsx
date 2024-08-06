import good from "@images/play/good.png";
import great from "@images/play/great.png";
import perfect from "@images/play/perfect.png";

const ShowComboEffect = ({ effect }) => {
  if (effect === "good") {
    return <img src={good} alt={effect} />;
  }

  if (effect === "great") {
    return <img src={great} alt={effect} />;
  }

  return <img src={perfect} alt={effect} />;
};

export default ShowComboEffect;
