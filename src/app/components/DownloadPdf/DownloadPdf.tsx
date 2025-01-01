"use client";

import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import useUserStore from "../../../store/userStore";
import { MonthlySummary, Transaction } from "@/types/types";
import { getMonthlySummaryByUserId } from "@/services/monthly-summary";
import { generatePDF } from "@/services/createPdf";
import { FaDownload } from "react-icons/fa";


const PdfGenerator = () => {
  const { user } = useUserStore();

  const handleDownload = async () => {
    console.log("Downloading");

    const userId = user?._id;
    if (!userId) {
      console.error("No user logged in");
      return;
    }

    const data: MonthlySummary = await getMonthlySummaryByUserId(userId);
    if (!data) {
      console.error("Failed to get monthly summary");
      return;
    }

    const { totalExpenses, totalIncomes, totalSaved, monthlyTransactions } = data;

    const doc = generatePDF(totalExpenses, totalIncomes, totalSaved, monthlyTransactions);

    doc.save("Monthly_Summary.pdf");
  };

  return (
      <button onClick={handleDownload} title="Download pdf of your transactions" >
        <FaDownload/>
      </button>
  );
};

export default PdfGenerator;