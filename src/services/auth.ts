import { http } from './http';
import { saveToken } from './cookies';
import CreateNewPassword from '@/app/forgotpassword/page';

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
            await http.post('/forgot-password', { email : email });
            return true;
        } catch (error) {
            console.error('Forgot password error:', error);
            throw error;
        }
    },

    async checkCodeFromEmail(email: string, code: string) : Promise<boolean> {
        try {
            const result = await http.post(`/check-code`, { email: email, code: code });
            const compareCode = result.data.compareCode;
            return compareCode;;
        } catch (error) {
            console.error('Check code error:', error);
            throw error;
        }
    },

    async CreateNewPassword(email: string, password: string) {
        try {
            const response = await http.post(`/new-password`, { email: email, newPassword: password });
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
