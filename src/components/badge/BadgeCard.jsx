import { useState } from "react";

import ShowBadge from "@commons/ShowBadge";
import lockIcon from "@svgs/badge/lock.svg";
import BadgeModal from "./BadgeModal";

const BadgeCard = ({ name, desc, userBadge, category }) => {
  const [showModal, setShowModal] = useState(false);

  let userBadgeNames = userBadge.map((badge) => {
    return badge.badgeId;
  });

  let content;

  if (category === "성공배지") {
    console.log(category);
    content = (
      <div>
        {userBadgeNames.includes(name) ? (
          <div className="text-center" onClick={() => setShowModal(true)}>
            <ShowBadge name={name} />
            <p className="text-sm text-text400">{desc}</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center rounded-full shadow-lg w-24 h-24 bg-[#E8E7E7]">
              <img src={lockIcon} alt="Locked badge" />
            </div>
            <p className="text-sm text-text150">활동 배지</p>
          </>
        )}
      </div>
    );
  }

  if (category === "전체 배지") {
    content = (
      <div className="text-center" onClick={() => setShowModal(true)}>
        <ShowBadge name={name} />
        <p className="text-sm text-text400">{desc}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      {content}
      {showModal && (
        <BadgeModal modalOpen={showModal} setModalOpen={setShowModal} />
      )}
    </div>
  );
};

export default BadgeCard;
