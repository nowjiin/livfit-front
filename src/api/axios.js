import axios from "axios";

//토큰이 불필요한 경우
export const publicApi = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}/api`,
});

//토큰을 함께 보내는 instance
export const privateApi = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}/api`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

//리프레시토큰 요청 api
function postRefreshToken() {
  const response = publicApi.post("/api/users/refresh-token", {
    refreshToken: localStorage.getItem("refreshToken"),
  });
  return response;
}

//리프레시 토큰 구현
privateApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    if (status === 403) {
      if (error.response.data.message === "Unauthorized") {
        const originRequest = config;
        try {
          const tokenResponse = await postRefreshToken();
          if (tokenResponse.status === 201) {
            const newAccessToken = tokenResponse.data.accessToken;
            localStorage.setItem("accessToken", tokenResponse.data.token);
            localStorage.setItem(
              "refreshToken",
              tokenResponse.data.refreshToken
            );
            axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
            originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios(originRequest);
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (
              error.response?.status === 403 ||
              error.response?.status === 422
            )
              window.location.replace("/login");
          }
        }
      }
    }
    return Promise.reject(error);
  }
);
