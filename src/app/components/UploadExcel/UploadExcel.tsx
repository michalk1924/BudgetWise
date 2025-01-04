import { useState } from "react";
import useUserStore from "@/store/userStore";
import { parseExcelFile } from "@/services/excelService";
import { Transaction } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import userService from "@/services/user";
import { showSuccessAlert } from "@/services/alerts";
import styles from './UploadExcel.module.css'
import { FaUpload } from "react-icons/fa";

export default function UploadExcel() {
    const [isLoading, setIsLoading] = useState(false);
    const { addTransactionsFromExcel, user } = useUserStore();

    const queryClient = useQueryClient();

    const updateUserMutationAddTransactions = useMutation({
        mutationFn: async ({ id, transactions }: { id: string; transactions: Transaction[] }) => {
            if (user) {
                const response = await userService.updateUser(id, { transactions: [...user?.transactions, ...transactions] });
                return response;
            }
            return null;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: (error: Error) => {
            console.error("Error updating user transactions:", error.message);
        },
    });

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsLoading(true);

        try {
            const filteredData = await parseExcelFile(file);            
            if (user) {
                updateUserMutationAddTransactions.mutate({
                    id: user._id,
                    transactions: filteredData,
                });

                showSuccessAlert("Succses!", "The file has been loaded successfully!", 4000);
            }
            addTransactionsFromExcel(filteredData);
        } catch (error) {
            console.error("Error parsing file:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (

        <div className={styles.fileUploadWrapper}>
            <label htmlFor="file-upload" className={styles.customFileUpload} title="Select an Excel file to add transactions">
                <FaUpload/>

            </label>
            <input
                id="file-upload"
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
                className={styles.hiddenInput}
            />
        </div>
    );
}
