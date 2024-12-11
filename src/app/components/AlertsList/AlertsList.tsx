import React from 'react';
import useUserStore from "@/store/userStore";
import Alerts from "../AlertComp/AlertComp";
import { Alert } from "../../../types/types";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import userService from '@/services/user';

const AlertsList: React.FC = () => {
    const { user, updateAlertStatus } = useUserStore();
    const queryClient = useQueryClient();
    const updateUserMutation = useMutation({
        mutationFn: async ({ id, alert }: { id: string; alert: Alert }) => {
            if (user) {
                const response = await userService.updateUser(id, { alerts: [...user?.alerts, alert] });
                updateAlertStatus(alert.alertId,false);
                return response;
            }
            return null;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: (error: Error) => {
            console.error('Error updating user:', error.message);
        },
    });

    const handleDeactivateAlert = (alert: Alert) => {
        console.log("Alert", alert, "deactivated");
        updateUserMutation.mutate({id:user?._id??'',alert});
        console.log("Updated alerts:", user?.alerts);
    };

    const handleMarkAsDone = (alert: Alert) => {
        console.log("Marking as done:", alert);
        // כאן ניתן להוסיף לוגיקה למחיקת ההתראה או טיפול אחר
    };

    return (
        <div>

            <section>
                {user?.alerts.map(alert => (
                    <Alerts
                        key={alert.alertId}
                        alert={alert}
                        onMarkAsDone={handleMarkAsDone}
                        onDeactivateAlert={handleDeactivateAlert}
                    />
                ))}
            </section>
        </div>
    );
};

export default AlertsList;
