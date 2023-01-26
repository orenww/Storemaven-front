import React from "react";
import classes from "./Indicator.module.css";

const Indicator: React.FC<{ direction: string }> = (props: any) => {
  return (
    <div className={`${classes.square} ${classes[props.direction]}`}></div>
  );
};

export default Indicator;
