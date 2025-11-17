/**
 * API Client 설정
 * Axios 인스턴스 생성 및 인터셉터 설정
 */

import axios, { type AxiosError, type AxiosInstance } from 'axios';

import { env } from '@/lib/env';
import { toCamelCase, toSnakeCase } from '@/utils/api-transformers';

/**
 * Axios 인스턴스 생성
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request 인터셉터
 * 요청 전에 추가 설정 (인증 토큰 등)
 * camelCase 파라미터를 snake_case로 변환
 */
apiClient.interceptors.request.use(
  (config) => {
    // 추후 인증 토큰 추가 가능
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    // 요청 파라미터를 snake_case로 변환
    if (config.params) {
      config.params = toSnakeCase(config.params);
    }

    // POST/PUT 요청 body도 snake_case로 변환
    if (config.data && typeof config.data === 'object') {
      config.data = toSnakeCase(config.data);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * Response 인터셉터
 * 응답 후 에러 처리
 * snake_case 응답을 camelCase로 변환
 */
apiClient.interceptors.response.use(
  (response) => {
    // 응답 데이터를 camelCase로 변환
    if (response.data) {
      response.data = toCamelCase(response.data);
    }
    return response;
  },
  (error: AxiosError) => {
    // 에러 처리
    if (error.response) {
      // 서버가 응답을 반환한 경우
      const status = error.response.status;

      switch (status) {
        case 401:
          // 인증 실패
          console.error('인증 실패: 로그인이 필요합니다.');
          break;
        case 403:
          // 권한 없음
          console.error('권한 없음: 접근이 거부되었습니다.');
          break;
        case 404:
          // 리소스를 찾을 수 없음
          console.error('리소스를 찾을 수 없습니다.');
          break;
        case 500:
          // 서버 에러
          console.error('서버 에러가 발생했습니다.');
          break;
        default:
          console.error('알 수 없는 에러가 발생했습니다.');
      }
    } else if (error.request) {
      // 요청은 보냈지만 응답을 받지 못한 경우
      console.error('서버 응답 없음: 네트워크를 확인해주세요.');
    } else {
      // 요청 설정 중 에러 발생
      console.error('요청 설정 에러:', error.message);
    }

    return Promise.reject(error);
  },
);
