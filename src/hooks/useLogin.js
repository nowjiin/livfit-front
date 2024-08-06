import { publicApi } from "@api/axios";

export const useLogin = () => {
  const signIn = async (data) => {
    if (data) {
      try {
        const response = await publicApi.post("/users/login", data);

        if (response.status === 200) {
          // 로그인 성공
          // 로그인 성공 후 로직 추가 (예: 토큰 저장, 리다이렉트 등)
          const { accessToken, refreshToken } = response.data;

          if (accessToken && refreshToken) {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
          }
          window.location.href = "/";
        } else if (response.status === 401) {
          // 로그인 실패 비번 일치 X
          alert("id 혹은 비밀번호 가 일치하지 않습니다.");
          console.log("id 혹은 비밀번호 가 일치하지 않습니다.");
        } else {
          // 로그인 실패
          console.log("로그인 실패:", response.data.message);
        }
      } catch (error) {
        console.error("로그인 요청 중 오류 발생:", error);
      }
    }
  };
  return { signIn };
};
