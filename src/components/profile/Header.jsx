import { privateApi } from "@api/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import ShowBadge from "@commons/ShowBadge";
import { useState } from "react";
import BadgeSelectModal from "../badge/BadgeSelectModal";

const Header = ({ nickname, badgeName }) => {
  const queryClient = useQueryClient();
  const [selectedMain, setSelectedMain] = useState(badgeName);
  const [showSelectBadgeModal, setShowSelectBadgeModal] = useState(false);

  const { data: hasBadges } = useQuery({
    queryKey: ["profile", "myBadge"],
    queryFn: () =>
      privateApi.get("/userbadges/mybadge").then((response) => response.data),
  });

  const mutation = useMutation({
    mutationFn: (body) => privateApi.post("/userbadges/set-main-badge", body),
    onSuccess: () => {
      setShowSelectBadgeModal(false);
      queryClient.invalidateQueries(["profile", "badge"]);
    },
  });
  return (
    <>
      <header className="flex flex-col items-center gap-2 mt-8">
        <ShowBadge
          name={badgeName}
          edit
          handler={() => setShowSelectBadgeModal(true)}
        />
        <p className="text-lg">{nickname}</p>
      </header>
      {showSelectBadgeModal && hasBadges && (
        <BadgeSelectModal
          modalOpen={showSelectBadgeModal}
          setModalOpen={setShowSelectBadgeModal}
          badges={hasBadges.map((badge) => {
            return badge.badgeId;
          })}
          selected={selectedMain}
          setSelected={setSelectedMain}
          submitHandler={() => mutation.mutate({ badgeId: selectedMain })}
        />
      )}
    </>
  );
};

export default Header;
