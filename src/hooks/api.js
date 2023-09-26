import serverapi from "../api/serverapi";

// get 방식의 axios 호출
export const getFetcher = async (url, headers, params) => {
  const response = await serverapi.get(url, {
    responseType: "json",
    headers: { ...headers, "Content-Type": "application/json" },
    params: params,
  });
  return response;
};

// post 방식의 axios 호출
export const postFetcher = async (url, data, headers) => {
  const response = await serverapi.post(
    url,
    { ...data },
    {
      responseType: "json",
      headers: { ...headers, "Content-Type": "application/json" },
    }
  );
  return response;
};

// put 방식의 axios 호출
export const putFetcher = async (url, data, headers) => {
  const response = await serverapi.put(
    url,
    { ...data },
    {
      responseType: "json",
      headers: { ...headers, "Content-Type": "application/json" },
    }
  );
  return response;
};

// delete 방식의 axios 호출
export const deleteFetcher = async (url, headers) => {
  const response = await serverapi.delete(url, {
    responseType: "json",
    headers: { ...headers, "Content-Type": "application/json" },
  });
  return response;
};

// delete 방식의 axios 호출
export const deleteDataFetcher = async (url, data, headers) => {
  const response = await serverapi.delete(url, {
    responseType: "json",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    data: data,
  });
  return response;
};

// accessToken 재발급을 위한 axios 호출
export const refresh = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const res = await serverapi.get("/user/token", {
      headers: {
        Authorization: `${refreshToken}`,
      },
    });
    return res.data.access_token;
  } catch (e) {
    // 401 : refresh token 만료
    if (e.status === 401) {
      localStorage.setItem("refreshToken", "");
      window.location.href("/");
    }
    return e;
  }
};
