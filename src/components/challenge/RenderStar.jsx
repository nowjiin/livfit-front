import star from "@svgs/challenge/star.svg";

const RenderStar = ({ difficulty }) => {
  const stars = [];

  for (let i = 0; i < difficulty; i += 1) {
    stars.push(<img key={i} src={star} alt="star" />);
  }
  return stars;
};

export default RenderStar;
