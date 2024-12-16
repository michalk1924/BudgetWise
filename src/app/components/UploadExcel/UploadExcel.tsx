import { useState } from "react";
import useUserStore from "@/store/userStore";
import { parseExcelFile } from "@/services/excelService";
import { Transaction } from "@/types/types";

export default function UploadExcel() {
    const [data, setData] = useState<Transaction[]>([]);
    const { addTransactionsFromExcel } = useUserStore();

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const filteredData = await parseExcelFile(file);
            setData(filteredData);
            addTransactionsFromExcel(filteredData);
        } catch (error) {
            console.error("Error parsing file:", error);
        }
    };

    return (
        <div>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}
