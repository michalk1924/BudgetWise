import React from "react";
import { Colors } from "../../../consts/enums";
import styles from "../../styles/styles.module.css";

const Blog: React.FC = () => {
  return (
    <div className={styles.page} style={{ backgroundColor: Colors.Secondary }}>
      <h1>Blog</h1>
      <p>Explore the latest updates, articles, and insights on various topics.</p>
    </div>
  );
};

export default Blog;
