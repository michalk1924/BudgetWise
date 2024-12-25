import React from 'react';
import useUserStore from "@/store/userStore";
import {Alerts} from "../index";
import { Alert } from "../../../types/types";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import userService from '@/services/user';

interface AlertsListProps {
    alerts: Alert[];
}

const AlertsList: React.FC<AlertsListProps> = ({ alerts }) => {
    const { user, updateAlertStatus, removeAlert } = useUserStore();
    const queryClient = useQueryClient();

    const updateUserMutation = useMutation({
        mutationFn: async ({ id, alert }: { id: string; alert: Alert }) => {
            if (user) {
                const response = await userService.updateUser(id, {
                    alerts: user!.alerts.map((a) =>
                        a.alertId === alert.alertId ? { ...alert, isActive: false } : a
                    ),
                });
                updateAlertStatus(alert.alertId, false);
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
        updateUserMutation.mutate({ id: user?._id ?? '', alert });
    };

    const handleDeleteAlert = async (alertId: string) => {
        if (user) {
            try {
                await userService.updateUser(user._id, {
                    alerts: user.alerts.filter((alert) => alert.alertId !== alertId),
                });
                removeAlert(alertId);
                queryClient.invalidateQueries({ queryKey: ['users'] });
            } catch (error) {
                console.error('Error deleting alert:', (error as Error).message);
            }
        }
    };

    return (
        <div>
            <section>
                {alerts.map(alert => (
                    <Alerts
                        key={alert.alertId}
                        alert={alert}
                        onMarkAsDone={() => handleDeactivateAlert(alert)}
                        onDeleteAlert={() => handleDeleteAlert(alert.alertId)}
                    />
                ))}
            </section>
        </div>
    );
};

export default AlertsList;
