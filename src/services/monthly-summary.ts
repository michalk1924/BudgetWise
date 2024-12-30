import { http } from './http';
import { MonthlySummary } from '@/types/types';

export const getMonthlySummaryByUserId = async (userId: string) : Promise<MonthlySummary> => {
    try {
        const response  = await http.get<MonthlySummary>(`/monthly-summary/${userId}`);
        return response.data;
    }
    catch (error) {
        console.error('Error getting monthly summary for user:', error);
        throw error;
    }
};