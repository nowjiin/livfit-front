import { useEffect } from "react";
import { Routes as ReactRouters, Route, useLocation } from "react-router-dom";

import BadgePage from "@pages/badge/BadgePage";

import ChallengePage from "@pages/challenge/ChallengePage";
import DetailChallengePage from "@pages/challenge/DetailChallengePage";

import DetailExercisePage from "@pages/exercise/DetailExercisePage";
import ExercisePage from "@pages/exercise/ExercisePage";
import PlayPage from "@pages/exercise/PlayPage";
import ResultPage from "@pages/exercise/ResultPage";

import LungePage from "@pages/tutorial/LungePage";
import PushupPage from "@pages/tutorial/PushupPage";
import SquatPage from "@pages/tutorial/SquatPage";

import SquatDetailPage from "@pages/tutorial/SquatDetailPage";
import LungeDetailPage from "@pages/tutorial/LungeDetailPage";
import PushupDetailPage from "@pages/tutorial/PushupDetailPage";
import TutorialPage from "@pages/tutorial/TutorialPage";

import MyRankingPage from "@pages/turtle/MyRankingPage";
import RankingPage from "@pages/turtle/RankingPage";
import TurtleResultPage from "@pages/turtle/ResultPage";
import TurtlePage from "@pages/turtle/TurtlePage";
import TurtlePlayPage from "@pages/turtle/TurtlePlayPage";

import HomePage from "@pages/HomePage";
import FindpwPage from "@pages/login/FindpwPage";
import LoginPage from "@pages/login/LoginPage";
import SignupPage from "@pages/login/SignupPage";

import MyChallengePage from "@pages/profile/MyChallengePage";
import MyRecordsPage from "@pages/profile/MyRecordsPage";
import PointPage from "@pages/profile/PointPage";
import ProfilePage from "@pages/profile/ProfilePage";

import StorePage from "@pages/store/StorePage";
import ProductDetailPage from "@pages/store/ProductDetailPage";

import Footer from "@layouts/footer";
import Navbar from "@layouts/Navbar";

const Routes = () => {
  const location = useLocation();

  // 페이지 전환 시 path 변화 감지 -> 시점 (0, 0) 시작
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <ReactRouters>
      {/* 로그인 페이지 */}
      <Route path="/auth">
        <Route path="login" element={<LoginPage />} />
        <Route path="findpw" element={<FindpwPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      {/* 공통 푸터 적용입니다 */}
      <Route path="/" element={<Footer />}>
        <Route index element={<HomePage />} />
        {/* 운동 측정하기 페이지입니다   */}
        <Route path="/exercise" element={<Navbar closed />}>
          <Route index element={<ExercisePage />} />
        </Route>

        {/* 운동 튜토리얼 페이지 */}
        <Route path="/tutorial" element={<TutorialPage />} />
        <Route path="/tutorial/squat" element={<SquatPage />} />
        <Route path="/tutorial/lunge" element={<LungePage />} />
        <Route path="/tutorial/pushup" element={<PushupPage />} />

        <Route path="/tutorial/squat/:id" element={<SquatDetailPage />} />
        <Route path="/tutorial/lunge/:id" element={<LungeDetailPage />} />
        <Route path="/tutorial/pushup/:id" element={<PushupDetailPage />} />

        {/* 거북목  페이지 */}
        <Route path="/turtle" element={<TurtlePage />} />
        <Route path="/turtle/ranking" element={<RankingPage />} />
        <Route path="/turtle/my-ranking" element={<MyRankingPage />} />
        {/* 스토어 페이지입니다. */}
        <Route path="/store" element={<StorePage />} />
        <Route path="/store/:id" element={<ProductDetailPage />} />

        {/* 마이페이지입니다. */}
        <Route path="/profile" element={<Navbar closed mypage />}>
          <Route index element={<ProfilePage />} />
        </Route>
        <Route path="/profile/my-records" element={<MyRecordsPage />} />
        <Route path="/profile/myPoint" element={<PointPage />} />
      </Route>
      <Route path="/profile/my-challenges" element={<MyChallengePage />} />
      {/* 운동 옵션 선택 페이지 */}
      <Route path="/exercise/:name" element={<DetailExercisePage />} />

      {/* 실제 운동이 이행될 페이지입니다. */}
      <Route path="/play/:exercise" element={<PlayPage />} />
      <Route path="/:exercise/result" element={<ResultPage />} />

      {/* 거북목 측정 페이지 */}
      <Route path="/turtle/play" element={<TurtlePlayPage />} />
      <Route path="/turtle/result" element={<TurtleResultPage />} />

      {/* 배지 페이지 */}
      <Route path="/badge" element={<BadgePage />} />
      {/* 챌린지 페이지 */}
      <Route path="/challenge" element={<ChallengePage />} />
      <Route
        path="/challenge/:id"
        element={<Navbar closed bgColor={"#F6F6F6"} />}
      >
        <Route index element={<DetailChallengePage />} />
      </Route>
    </ReactRouters>
  );
};

export default Routes;
