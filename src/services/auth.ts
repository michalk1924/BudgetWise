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
            await http.post('/forgot-password', { email });
        } catch (error) {
            console.error('Forgot password error:', error);
            throw error;
        }
    }
}

export default authService;
