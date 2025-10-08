type Env = {
  VITE_API_URL?: string;
};

export const env: Env = {
  VITE_API_URL: import.meta.env.VITE_API_URL,
};
