import { ResponseLogin } from '../utils/model/payload';
import baseService from './baseService';

const API_END_POINT = '/auth/login-jwt';
export interface IUSER {
  username: string,
  password: string
}
const authService = {
  login: (body: IUSER) => {
    return baseService.post<ResponseLogin>(API_END_POINT, body)
  },
};

export default authService;
