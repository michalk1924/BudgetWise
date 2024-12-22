import React from "react";
import styles from "../footerPages.module.css";

const ContentPolicyPage = () => {
    return (
      <div className={styles.page}>
        <h1>Content Policy</h1>
        <p>
          Our app encourages users to contribute responsibly. Any inappropriate content is strictly prohibited and may result in account suspension.
        </p>
      </div>
    );
  };
  
  export default ContentPolicyPage;