import { http } from './http';
import { saveToken } from './cookies';

const authService = {
    async login(data: { email: string, password: string }) {
        try {
            const { email, password } = data;
            const response = await http.post('/login', { email, password });
            if (response.data && response.data.token) {
                const token = response.data.token;
                saveToken(token);
                return response.data.user;
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    async signup(data: { name: string, email: string, password: string }) {
        try {
            const { email, password } = data;
            const response = await http.post('/signup', { name, email, password });
            if (response.data && response.data.token) {
                const token = response.data.token;
                saveToken(token);
                return response.data.user;
            }
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        }
    },

    async forgotPassword(email: string) {
        try {
            const result = await http.post('/forgot-password', { email: email });
            if (result) return true;
            return false;
        } catch (error) {
            console.error('Forgot password error:', error);
            return false;
        }
    },

    async checkCodeFromEmail(email: string, code: string): Promise<{ userId: string, compareCode: boolean }> {
        try {
            const result = await http.post(`/check-code`, { email: email, code: code });
            const compareCode = result.data.compareCode;
            const userId = result.data.userId;
            return { userId, compareCode };
        } catch (error) {
            console.error('Check code error:', error);
            throw error;
        }
    },

    async CreateNewPassword(password: string) {
        try {
            const userId = localStorage.getItem('userId');
            const response = await http.post(`/new-password`, { userId: userId, newPassword: password });
            if (response.data && response.data.token) {
                const token = response.data.token;
                saveToken(token);
                return response.data.user;
            }
        } catch (error) {
            console.error('Create new password error:', error);
            throw error;
        }
    }
}

export default authService;
