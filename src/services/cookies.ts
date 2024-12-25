import Cookies from 'js-cookie';

export const saveToken = (token: string) => {
    const expiryTime = new Date().getTime() + 12 * 60 * 60 * 1000;
    Cookies.set('authToken', token, { expires: 12 / 24, path: '' });
    Cookies.set('authTokenExpiry', expiryTime.toString(), { expires: 12 / 24, path: '' });
};

export const getToken = () => {
    return Cookies.get('authToken');
};

export const getTokenExpiry = () => {
    const expiryTime = Cookies.get("authTokenExpiry");
    return expiryTime ? parseInt(expiryTime, 10) : null;
};