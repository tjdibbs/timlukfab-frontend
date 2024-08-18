import React from "react";
import { Step, StepButton, Stepper } from "@mui/material";

const steps = ["Shopping Bag", "Checkout", "Order Complete"];

function ShopStepper(props: { completed: number[]; activeStep: number }) {
  return (
    <Stepper nonLinear activeStep={props.activeStep ?? 0}>
      {steps.map((label, index) => (
        <Step key={label} completed={props.completed.includes(index)}>
          <StepButton color="inherit">{label}</StepButton>
        </Step>
      ))}
    </Stepper>
  );
}

export default ShopStepper;
