import { http } from './http';
import { User } from '../types/types'

const userService = {

    async getAllUsers() {
        try {            
            const response = await http.get('/users');
            if (Array.isArray(response.data)) {
                return response.data;
            } else {
                throw new Error("Expected an array but got something else.");
            }
        } catch (error) {
            throw error;
        }
    },

    async getUserById(id: string) {
        try {
            const response = await http.get(`/users/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async createUser(user: User) {
        try {
            const response = await http.post('/users', user);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async updateUser(id: string, body: Partial<User>) {
        try {
            const response = await http.patch(`/users/${id}`, body);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

};

export default userService;