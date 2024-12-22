import * as XLSX from "xlsx";
import { v4 as uuidv4 } from "uuid";
import { Transaction } from "@/types/types";


export const excelDateToJSDate = (excelDate: number): Date => {
    const epoch = new Date(1900, 0, 1);
    const daysOffset = excelDate - 2;
    epoch.setDate(epoch.getDate() + daysOffset);
    return epoch;
};

export const parseExcelFile = (file: File): Promise<Transaction[]> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
            const binaryStr = e.target?.result;
            if (typeof binaryStr !== "string") {
                reject("Invalid file content");
                return;
            }

            const workbook = XLSX.read(binaryStr, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const rawData = XLSX.utils.sheet_to_json(worksheet);

            const filteredData: Transaction[] = rawData.map((row: any) => {
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

            resolve(filteredData);
        };

        reader.onerror = () => reject("Error reading file");
        reader.readAsBinaryString(file);
    });
};