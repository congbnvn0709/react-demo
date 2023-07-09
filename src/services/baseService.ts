import interceptAuth from './axiosClient';

import { showMessage } from '../utils/helper/showMessage';
import { API_SUCCESS_STATUS } from '../utils/helper/constants';

const instanceDownloadFile = interceptAuth('application/json', 'blob');
const instanceFormData = interceptAuth('multipart/form-data');
const instance = interceptAuth();

const baseService = {
  get: async <T>(url: string = '', params?: Record<string, any>): Promise<T> => {
    try {
      const { data } = await instance.get<T>(url, { params });
      return data;
    } catch (error: any) {
      const { message } = error.response.data;
      showMessage.error(message);
      throw new Error(message);
    }
  },

  post: async <R = any, T = any>(url: string = '', body?: T, params?: Record<string, any>): Promise<R> => {
    try {
      const { data } = await instance.post<R>(url, body, { params });
      return data;
    } catch (error: any) {
      const { message } = error.response.data;
      showMessage.error(message);
      throw new Error(message);
    }
  },

  put: async <R = any, T = any>(url: string = '', body?: T, params?: Record<string, any>): Promise<R> => {
    try {
      const { data } = await instance.put<R>(url, body, { params });
      // const { message, status } = data;
      // if (status === API_SUCCESS_STATUS && message) {
      //   showMessage.success(message);
      // }
      return data;
    } catch (error: any) {
      const { message } = error.response.data;
      showMessage.error(message);
      throw new Error(message);
    }
  },

  delete: async <T = null>(url: string = '', params?: Record<string, any>): Promise<T> => {
    try {
      const { data } = await instance.delete<T>(url, { params });
      // const { message, status } = data;
      // if (status === API_SUCCESS_STATUS && message) {
      //   showMessage.success(message);
      // }
      return data;
    } catch (error: any) {
      const { message } = error.response.data;
      showMessage.error(message);
      throw new Error(message);
    }
  },

  downloadFile: (url: string = '', fileName: string = '') =>
    new Promise(async (resolve, reject) => {
      await instanceDownloadFile
        .get(url)
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();

          resolve(response.data);
        })
        .catch(async (error) => {
          const responseObj = await error.response.data.text();
          showMessage.error(JSON.parse(responseObj).message);
        });
    }),

  postFile: async <T = null>(url: string = '', body: FormData): Promise<T> => {
    try {
      const { data } = await instanceFormData.post<T>(url, body);
      return data;
    } catch (error: any) {
      const { message } = error.response.data;
      showMessage.error(message);
      throw new Error(message);
    }
  },

  putFile: async <T = null>(url: string = '', body: FormData): Promise<T> => {
    try {
      const { data } = await instanceFormData.put<T>(url, body);
      return data;
    } catch (error: any) {
      const { message } = error.response.data;
      showMessage.error(message);
      throw new Error(message);
    }
  },
};

export default baseService;
