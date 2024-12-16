import React from "react";
import Image from "next/image";
import styles from "./homePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      {/* Header Section */}
      <section className={styles.header}>
        
        <h1>Take control of your finances with ease!</h1>
        
        <div className={styles.headerText}>
          <h2>Welcome to BudgetWise!</h2>
          <h3>Smart App for Managing Your Personal Budget</h3>
        </div>
      </section>


      {/* Left Section */}
      <div className={styles.section}>
      <section className={styles.trans}>
        <section className={styles.left}>
          <div className={styles.infoBox}>
            <p>
              Track your expenses,
              <br />
              Monitor your income,
              <br />
              Reach your financial goals
              <br />
              efficiently and smartly.
            </p>
          </div>
        </section>
        

        {/* Right Section */}
        <section className={styles.right}>
          <div className={styles.item1}>
            <Image
              src="/trans-ex1.png"
              alt="brush_stain"
              width={700}
              height={200}
            />
          </div>
          <div className={styles.item2}>
            <Image
              src="/trans-ex2.png"
              alt="brush_stain"
              width={700}
              height={200}
            />
          </div>
          <div className={styles.item3}>
            <Image
              src="/trans-ex3.png"
              alt="brush_stain"
              width={700}
              height={200}
            />
          </div>
        </section>
      </section>
      </div>
      <div className={styles.section}>

      <section className={styles.save}>
        <section className={styles.saveLeft}>
          <div className={styles.item1}>
            <Image
              src="/save-ex1.png"
              alt="brush_stain"
              width={250}
              height={100}
            />
          </div>
          <div className={styles.item2}>
            <Image
              src="/save-ex2.png"
              alt="brush_stain"
              width={250}
              height={100}
            />
          </div>
          <div className={styles.item3}>
            <Image
              src="/save-ex1.png"
              alt="brush_stain"
              width={250}
              height={100}
            />
          </div>
        </section>
        <section className={styles.saveRight}>
          <div className={styles.infoBox}>
            <p>
              Reach your financial goals
              <br />
              efficiently and smartly.
            </p>
          </div>
        </section>
      </section>
</div>
<div className={styles.section}>

      <div className={styles.features}>
        <ul>
          <li>
            <strong>Expense & Income Categories:</strong> Easily add or edit
            categories.
          </li>
          <li>
            <strong>Budget Tracking:</strong> View your set budget vs. actual
            spending in detailed tables.
          </li>
          <li>
            <strong>Reports & Statistics:</strong> Interactive daily, weekly,
            and monthly reports.
          </li>
          <li>
            <strong>Smart Notifications:</strong> Personalized alerts to help
            you stay on track.
          </li>
          <li>
            <strong>Savings Goals:</strong> Visualize your progress and timeline
            for saving goals.
          </li>
        </ul>
      </div>
      </div>
      {/* Testimonials Section */}
      <div className={styles.section}>

      <section className={styles.testimonials}>
        <div className={styles.testimonialBox}>
          <p>
            "BudgetWise made it so easy to manage my finances. Amazing app!"
            <br /> - Yael
          </p>
        </div>
        <div className={styles.testimonialBox}>
          <p>
            "BudgetWise made it so easy to manage my finances. Amazing app!"
            <br /> - Yael
          </p>
        </div>
      </section>
    </div>
    </div>
  );
};

export default HomePage;
