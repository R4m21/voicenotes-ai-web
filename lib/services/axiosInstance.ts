import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const DataService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

DataService.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

DataService.interceptors.response.use(
  (resposne: AxiosResponse) => {
    return resposne;
  },
  (error: AxiosError) => {
    console.log(error.response?.status);
    if (
      error.response?.status === 401 &&
      typeof window !== undefined &&
      window.location.pathname !== "/login"
    ) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const message =
      error.response?.data?.message || error.message || "An API error occurred";
    console.error(`API Error [${error.response?.status}]:`, message);
    throw new Error(message);
  }
  console.error("Unexpected Error:", error);
  throw new Error("An unexpected error occurred");
};

export default DataService;
