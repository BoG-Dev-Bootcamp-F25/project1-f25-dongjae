// components/Train.tsx
import React from "react";
import "./Train.css";

interface TrainProps {
  train: any;
}

export const Train = ({ train }: TrainProps) => {
  const isOnTime = train.DELAY === "T0S";

  return (
    <div className={`train-card`}>
      <p><strong>Station:</strong> {train.STATION}</p>
      <p><strong>Destination:</strong> {train.DESTINATION}</p>
      <p><strong>Direction:</strong> {train.DIRECTION}</p>
      <p><strong>Waiting Time:</strong> {train.WAITING_TIME}</p>
      <p className={`${isOnTime ? "on-time" : "delayed"}`}><strong>Status:</strong> {isOnTime ? "On Time" : "Delayed"}</p>
    </div>
  );
};
