import jsPDF from "jspdf";
import "jspdf-autotable";
import { Colors } from "@/consts/enums";
import { MonthlySummary, Transaction } from "@/types/types";

export const generatePDF = (
    totalExpenses: number,
    totalIncomes: number,
    totalSaved: number,
    monthlyTransactions: Transaction[]
) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Monthly Financial Summary", 20, 20);

    doc.setFontSize(12);
    doc.text(`Total Expenses: $${totalExpenses}`, 20, 30);
    doc.text(`Total Incomes: $${totalIncomes}`, 20, 35);
    doc.text(`Total Saved: $${totalSaved}`, 20, 40);

    const tableData = monthlyTransactions.map((transaction: Transaction) => {
        let rowColor;

        switch (transaction.type) {
            case "expense":
                rowColor = Colors.Primary;
                break;
            case "income":
                rowColor = Colors.Highlight;
                break;
            case "saved":
                rowColor = Colors.Success;
                break;
            default:
                rowColor = Colors.Accent;
                break;
        }

        return [
            transaction.category || "N/A",
            transaction.type,
            `$${transaction.amount}`,
            transaction.description || "N/A",
            new Date(transaction.date).toLocaleDateString(),
            rowColor,
        ];
    });

    (doc as any).autoTable({
        startY: 50,
        head: [["Category", "Type", "Amount", "Description", "Date"]],
        body: tableData.map((row: any) => [...row.slice(0, 5)]),
        theme: "striped",
        margin: { top: 10, left: 20, right: 20 },
        styles: {
            headStyles: {
                fillColor: Colors.Highlight,
                fontSize: 12,
                halign: "center",
                textColor: "#333",
                fontStyle: "bold",
            },
            bodyStyles: {
                fontSize: 10,
                halign: "center",
                textColor: "#333",
            },
        },
        alternateRowStyles: { fillColor: Colors.Secondary },
    });

    return doc;
};