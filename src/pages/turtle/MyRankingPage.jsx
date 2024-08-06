import { privateApi, publicApi } from "@api/axios";
import { useQueries } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FilterModal from "@components/profile/FilterModal";
import RecordsTable from "@components/turtle/RecordsTable";
import Navbar from "@layouts/Navbar";

import dots from "@svgs/profile/color-dots.svg";

const MyRankingPage = () => {
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/turtle/ranking");
  };
  const [selectedSort, setSelectedSort] = useState("최신순");
  const [selectedTerm, setSelectedTerm] = useState("");
  const results = useQueries({
    // TODO: 전체 거북목 기록과 접속한 회원의 닉네임을 얻자 queries로
    queries: [
      {
        queryKey: ["turtle", "records"],
        queryFn: () =>
          publicApi
            .get("/turtle/all-records")
            .then((response) => response.data),
      },
      {
        queryKey: ["nickname"],
        queryFn: () =>
          privateApi.get("/mainpage/getname").then((response) => response.data),
      },
    ],
  });

  const [allRecords, nickname] = results;

  return (
    <div className="relative w-full h-full pb-20 bg-text90">
      <Navbar closed />
      <section className="p-6">
        <p className="text-3xl">내 거북목 기록🐢</p>
        <h1 className="mt-2 text-xs text-text200">
          현재까지 저장된 기록을 모두를 확인할 수 있어요
        </h1>
      </section>
      <div
        className="flex items-center justify-end w-full pr-6 cursor-pointer mb-1"
        onClick={handleClick}
      >
        <p className="text-sm">전체기록 보러가기</p>
      </div>

      <div
        className="flex items-center justify-end w-full pb-3 pr-6 cursor-pointer"
        onClick={() => setShowFilter(true)}
      ></div>
      <section className="overflow-y-scroll scroll-smooth h-90 custom-scrollbar">
        {nickname.data && allRecords.data && allRecords.data.length > 0 && (
          <RecordsTable
            allRecords
            records={allRecords.data.filter(
              (record) => record.nickname === nickname.data
            )}
          />
        )}
      </section>
      {showFilter && (
        <FilterModal
          modalOpen={showFilter}
          setModalOpen={setShowFilter}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          selectedTerm={selectedTerm}
          setSelectedTerm={setSelectedTerm}
        />
      )}
    </div>
  );
};

export default MyRankingPage;
