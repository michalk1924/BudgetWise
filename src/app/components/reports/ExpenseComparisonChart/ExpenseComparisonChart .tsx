
import React from 'react';
import styles from './ExpenseComparisonBars.module.css';
import { Colors } from '@/consts/enums'
import useUserStore from "@/store/userStore";
import fetchDataAndCompare from '@/services/stlouisfedApi';
import { useState, useEffect } from 'react';

const ExpenseComparisonBars: React.FC = () => {

  const { user } = useUserStore();

  const [comparisonResults, setComparisonResults] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchComparisonData = async () => {
      try {
        const data = await fetchDataAndCompare(user);
        if (data) {
          setComparisonResults(data);
        }
        else {
          setComparisonResults(null);
        }

      } catch (error) {
        console.error("Failed to fetch comparison results:", error);
      }
    };

    fetchComparisonData();
  }, [user]);

  return (
    <div className={styles.container}>
      <div className={styles.explanationContainer}>
        <p className={styles.explanationText}>
          This comparison is made relative to others to give you a broader perspective on the situation.
        </p>
      </div>

      {!comparisonResults && <div className={styles.loader} />}

      {comparisonResults && comparisonResults.map((result, index) => {
        const relativeUsage = Math.min((result.userAmount / result.marketPrice) * 100, 200);
        const isOverBudget = result.userAmount > result.marketPrice;

        return (
          <div key={index} className={styles.barContainer}>
            <div className={styles.barHeader}>
              <span className={styles.category}>{result.category}</span>
              <span className={styles.year}>{result.year}</span>
            </div>
            <div className={styles.barBackground}>
              <div
                className={styles.barFill}
                style={{
                  width: `${relativeUsage}%`,
                  backgroundColor: isOverBudget ? Colors.Primary : Colors.Success,
                }}
              ></div>
            </div>
            <div className={styles.barFooter}>
              <span className={styles.usageText}>
                {relativeUsage.toFixed(2)}% used ({result.userAmount} / {result.marketPrice})
              </span>
              {isOverBudget && (
                <span className={styles.overBudget}>
                  Over by {result.userAmount - result.marketPrice}!
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExpenseComparisonBars;
