import React from "react";
import { useLocation } from "react-router-dom";
import { Check } from "lucide-react";

const steps = [
  { path: "/dashboard/create-project", label: "Project Description" },
  {
    path: "/dashboard/create-project/keyword-crawling",
    label: "Keyword Crawling",
  },
  {
    path: "/dashboard/create-project/detail-of-topic",
    label: "Detail of Project",
  },
];

const Stepper = () => {
  const location = useLocation();

  const isStepCompleted = (stepPath: string) => {
    const currentStepIndex = steps.findIndex(
      (step) => step.path === location.pathname
    );
    const stepIndex = steps.findIndex((step) => step.path === stepPath);
    return stepIndex < currentStepIndex;
  };

  const isCurrentStep = (stepPath: string) => {
    return location.pathname === stepPath;
  };

  return (
    <div className="w-[1169px] h-24 py-8 rounded-2xl flex justify-between items-center gap-10 relative">
      {steps.map((step, index) => (
        <Step
          key={index}
          stepNumber={index + 1}
          isCompleted={isStepCompleted(step.path)}
          isCurrent={isCurrentStep(step.path)}
          label={step.label}
        />
      ))}
    </div>
  );
};

type StepProps = {
  stepNumber: number;
  isCompleted: boolean;
  isCurrent: boolean;
  label: string;
};

const Step: React.FC<StepProps> = ({
  stepNumber,
  isCompleted,
  isCurrent,
  label,
}) => {
  return (
    <div className="stepper-item w-[180px] justify-start items-center gap-3 flex relative">
      <div
        className={`circle p-2 rounded-full flex justify-center items-center ${
          isCurrent ? "bg-secondary" : "border border-gray-300"
        }`}
      >
        {isCompleted ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <p className="w-4 h-4 flex items-center justify-center text-white">
            {stepNumber}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <p className="text-base font-semibold">{label}</p>
      </div>
    </div>
  );
};

export default Stepper;
