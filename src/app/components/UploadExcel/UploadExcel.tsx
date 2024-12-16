import { useState } from "react";
import * as XLSX from "xlsx";
import useUserStore from "@/store/userStore";

type ExcelRow = {
    createdAt: Date;
    amount: number;
    income: string;
    description: string;
};

export default function UploadExcel() {
    const [data, setData] = useState<ExcelRow[]>([]);
    const { addTransactionsFromExcel } = useUserStore(); 


    const excelDateToJSDate = (excelDate: number) => {
        const epoch = new Date(1900, 0, 1); // אקסל מתחיל ב-1 בינואר 1900
        const daysOffset = excelDate - 2; // התאמה לאי דיוק באקסל
        epoch.setDate(epoch.getDate() + daysOffset);
        return epoch;
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
            const binaryStr = e.target?.result;
            if (typeof binaryStr !== "string") return;

            const workbook = XLSX.read(binaryStr, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const rawData = XLSX.utils.sheet_to_json(worksheet);

            const filteredData = rawData.map((row: any) => {
                const amount = row["זכות"] ? row["זכות"] : row["חובה"] ? row["חובה"] : 0;
                const excelDate = row["תאריך ערך"]; 

                return {
                    createdAt: typeof excelDate === "number" ? excelDateToJSDate(excelDate) : new Date(excelDate),
                    amount: amount,
                    income: row["זכות"] ? "income" : "expense",
                    description: row["פרטים"]
                };
            });

            setData(filteredData);
            // addTransactionsFromExcel(filteredData); // קריאה לפונקציה שב-store
        };

        reader.readAsBinaryString(file);
    };

    return (
        <div>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}
