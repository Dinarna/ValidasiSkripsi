import React from "react";

type StepperProps = {
  currentStep: number;
  totalSteps: number;
};

const StepperKuesioner: React.FC<StepperProps> = () => {
  return (
    <div className="w-full h-24 py-8 rounded-2xl flex justify-center items-center relative">
      <p className="text-2xl font-semibold">Profil Responden</p>
    </div>
  );
};

export default StepperKuesioner;
