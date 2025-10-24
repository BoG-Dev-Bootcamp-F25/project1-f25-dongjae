// components/Train.tsx
import React from "react";
import "./Train.css";

interface TrainProps {
  train: any;
  color: any;
}

export const Train = ({ train, color }: TrainProps) => {
  const isOnTime = train.DELAY === "T0S";

  return (
    <div className="train-card">

      <div className="train-logo">M</div>


      <div className="train-info">

        <p className="train-station">{train.STATION + "-->" + train.DESTINATION}</p>

        <div className="train-bottom-row">
          <p className={`color-box ${color}`}>{color}</p>
          <p className={`${isOnTime ? "on-time" : "delayed"} train-status`}>
            {isOnTime ? "On Time" : "Delayed"}
          </p>
          <p className="train-time">{train.WAITING_TIME}</p>
        </div>
      </div>
    </div>
  );
};

