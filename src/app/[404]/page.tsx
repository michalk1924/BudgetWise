"use client"

import Link from 'next/link';
import styles from './404.module.css';
import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import animationData from './Main Scene.json';
import { useRouter } from 'next/navigation';

const Custom404 = () => {
  const container = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (container.current) {
      const animation = lottie.loadAnimation({
        container: container.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData,
      });

      return () => {
        animation.destroy();
      };
    }
  }, []);

  const goHome = () => {
    router.push("/homePage");
  };

  return (
    <div ref={container} className={styles.animationContainer} onClick={goHome}></div>
  );
};

export default Custom404;
