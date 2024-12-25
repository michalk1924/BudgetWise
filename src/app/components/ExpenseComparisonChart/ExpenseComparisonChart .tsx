
import React from 'react';
import styles from './ExpenseComparisonBars.module.css';
import { Colors } from '@/consts/enums'

interface ComparisonResult {
  category: string;
  year: number;
  userAmount: number;
  marketPrice: number;
}

interface ExpenseComparisonBarProps {
  comparisonResults: ComparisonResult[];
}

const ExpenseComparisonBars: React.FC<ExpenseComparisonBarProps> = ({ comparisonResults }) => {
  return (
    <div className={styles.container}>
      <div className={styles.explanationContainer}>
        <p className={styles.explanationText}>
          This comparison is made relative to others to give you a broader perspective on the situation.
        </p>
      </div>

      {comparisonResults.map((result, index) => {
        const relativeUsage = Math.min((result.userAmount / result.marketPrice) * 100, 200); // Limit to 200% for better visualization
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
