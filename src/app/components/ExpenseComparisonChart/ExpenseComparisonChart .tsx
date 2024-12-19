// import { useEffect, useRef } from 'react';
// import { Chart, ChartConfiguration, ChartData, ChartOptions } from 'chart.js';

// // Define the shape of the comparison results
// interface ComparisonResult {
//   category: string;
//   year: number; 
//   userAmount: number;
//   marketPrice: number;
// }

// // Define the component's props
// interface ExpenseComparisonChartProps {
//   comparisonResults: ComparisonResult[];
// }

// const ExpenseComparisonChart: React.FC<ExpenseComparisonChartProps> = ({ comparisonResults }) => {
//   const chartRef = useRef<HTMLCanvasElement | null>(null);

//   useEffect(() => {
//     if (!chartRef.current) return;

//     const ctx = chartRef.current.getContext('2d');
//     if (!ctx) return;

//     // Organize data to be grouped by category and year
//     const groupedData: { [key: string]: { userAmount: number; marketPrice: number } } = {};

//     comparisonResults.forEach(result => {
//       const key = `${result.category} - ${result.year}`;
//       if (!groupedData[key]) {
//         groupedData[key] = { userAmount: 0, marketPrice: 0 };
//       }
//       groupedData[key].userAmount += result.userAmount;
//       groupedData[key].marketPrice += result.marketPrice;
//     });

//     const labels = Object.keys(groupedData);
//     const userData = labels.map(label => groupedData[label].userAmount);
//     const marketData = labels.map(label => groupedData[label].marketPrice);

//     const chartConfig: ChartConfiguration = {
//       type: 'bar',
//       data: {
//         labels: labels,
//         datasets: [
//           {
//             label: 'User',
//             data: userData,
//             backgroundColor: "#FFF1DB",
//           },
//           {
//             label: 'Market',
//             data: marketData,
//             backgroundColor: "#D4BDAC",
//           }
//         ]
//       },
//       options: {
//         responsive: true,
//         scales: {
//           x: {
//             title: {
//               display: true,
//               text: 'Category - Year',
//             }
//           },
//           y: {
//             title: {
//               display: true,
//               text: 'Sum',
//             }
//           }
//         }
//       } as ChartOptions,
//     };

//     const chart = new Chart(ctx, chartConfig);

//     return () => {
//       chart.destroy();
//     };
//   }, [comparisonResults]);

//   return <canvas ref={chartRef}></canvas>;
// };

// export default ExpenseComparisonChart;

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
      {/* Explanation Container */}
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
