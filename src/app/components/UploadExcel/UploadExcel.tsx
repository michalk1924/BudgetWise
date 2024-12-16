import { useState } from "react";
import * as XLSX from "xlsx";
import useUserStore from "@/store/userStore";
import { v4 as uuidv4 } from "uuid";

type ExcelRow = {
    _id: string;
    category: string;
    type: 'income' | 'expense' | 'saved';
    amount: number;
    description: string;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
};

export default function UploadExcel() {
    const [data, setData] = useState<ExcelRow[]>([]);
    const { addTransactionsFromExcel } = useUserStore();

    const excelDateToJSDate = (excelDate: number) => {
        const epoch = new Date(1900, 0, 1);
        const daysOffset = excelDate - 2;
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

            const filteredData: ExcelRow[] = rawData.map((row: any) => {
                const amount = row["זכות"] ? row["זכות"] : row["חובה"] ? row["חובה"] : 0;
                const excelDate = row["תאריך ערך"];

                return {
                    _id: uuidv4(),
                    category: "General",
                    type: row["זכות"] ? "income" : row["חובה"] ? "expense" : "saved",
                    amount: amount,
                    description: row["פרטים"] || "No description",
                    date: typeof excelDate === "number" ? excelDateToJSDate(excelDate) : new Date(excelDate),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
            });

            setData(filteredData);
            addTransactionsFromExcel(filteredData);
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
