import { useState } from "react";
import StepperKuesioner from "@/components/kuesioner/StepperKuesioner";
import RespondentProfileForm from "@/components/respondent-profile-form";
import EvaluationLogForm from "@/components/evaluation-log-form";
import EvaluationExperienceForm from "@/components/evaluation-experience-form";

const Kuesioner = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3; // Sesuaikan dengan jumlah step

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return <RespondentProfileForm onNextStep={handleNextStep} />;
      case 2:
        return (
          <EvaluationLogForm
            onNextStep={handleNextStep}
            onPrevStep={handlePrevStep}
          />
        );
      case 3:
        return <EvaluationExperienceForm onPrevStep={handlePrevStep} />;
      default:
        return <RespondentProfileForm onNextStep={handleNextStep} />;
    }
  };

  return (
    <>
      <section className="w-full p-6 bg-white rounded-lg shadow">
        <StepperKuesioner currentStep={currentStep} totalSteps={totalSteps} />
        {renderFormStep()}
      </section>
    </>
  );
};

export default Kuesioner;
