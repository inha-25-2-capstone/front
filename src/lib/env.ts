type Env = {
  VITE_API_URL?: string;
  VITE_USE_MOCK_DATA?: string;
};

export const env: Env = {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_USE_MOCK_DATA: import.meta.env.VITE_USE_MOCK_DATA,
};
