import API from '.';
import { ILoginService } from '../ifaces/login';

export const loginService = async (data: ILoginService) => {
  return await API.post('/auth/login', data);
};

export const logoutService = async () => {
    return await API.get('/auth/logout')
}

export const checkAuthService = async () => {
    return await API.get('/auth/me')
}