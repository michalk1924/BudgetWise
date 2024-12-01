import { http } from './http';

const authService = {
    async login(data : {name : string, email : string, password: string}): Promise<string | null> {
        try {
            const {email, password} = data;
            const response = await http.post('/login', { email, password });
            if (response.data && response.data.token) {
                return response.data.token;
            }
            return null;
        } catch (error) {
            console.error('Login error:', error);
            return null;
        }
    },

    async signup(data : {email : string, password: string}): Promise<string | null> {
        try {
            const {email, password} = data;
            const response = await http.post('/signup', { email, password });
            if (response.data && response.data.token) {
                return response.data.token;
            }
            return null;
        } catch (error) {
            console.error('Signup error:', error);
            return null;
        }
    },
}

export default authService;
