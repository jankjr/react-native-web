/* eslint-disable react/prop-types */
import React from 'react';
import View from './View';
import styles from './dot-styles.css';

const Dot = ({ size, x, y, children, color }) => (
  <View
    className={styles.root}
    style={{
      borderBottomColor: color,
      borderRightWidth: `${size / 2}px`,
      borderBottomWidth: `${size / 2}px`,
      borderLeftWidth: `${size / 2}px`,
      left: `${x}px`,
      top: `${y}px`
    }}
  />
);

export default Dot;
