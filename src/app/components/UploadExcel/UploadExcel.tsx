import { useState } from "react";
import * as XLSX from "xlsx";

type ExcelRow = {
    createdAt: Date;  
    amount: number;   
    income: string;  
    description: string; 
};

export default function UploadExcel() {
    const [data, setData] = useState<ExcelRow[]>([]);

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

            // המרת הנתונים לפורמט הרצוי
            const filteredData = rawData.map((row: any) => {
                const amount = row["זכות"] ? row["זכות"] : row["חובה"] ? row["חובה"] : 0;

                return {
                    createdAt: new Date(row["תאריך"]),  
                    amount: amount,
                    income: row["זכות"] ? "זכות" : "חובה",  
                    description: row["פרטים"]
                };
            });

            setData(filteredData);  // כאן הגדרת ה-state עם טיפוס חדש
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
