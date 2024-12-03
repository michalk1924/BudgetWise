import Cookies from 'js-cookie';

export const saveToken = (token: string) => {
    Cookies.set('authToken', token, { expires: 7, path: '' });
};

export const getToken = () => {
    return Cookies.get('authToken');
};