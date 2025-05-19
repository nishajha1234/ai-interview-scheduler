"use client";

import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import FormContainer from './components/FormContainer';
import QuestionList from './components/QuestionList';
import { toast } from 'sonner';
import { useUser } from '@/app/provider';  // add this import

function CreateInterview() {
  const router = useRouter();
  const { user, loading } = useUser();  // get user and loading
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth');
    }
  }, [user, loading, router]);

  const onHandleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const onGoToNext = () => {
    if (!formData?.jobPosition || !formData?.jobDescription || !formData?.duration || !formData?.type?.length) {
      toast('Please enter all details!');
      return;
    }
    setIsGenerating(true);
    setStep(step + 1);
  };

  const handleBackClick = () => {
    if (isGenerating) {
      toast.error("Please wait, questions are still being generated.");
      return;
    }

    if (step === 1) {
      router.back();
    } else {
      setStep(step - 1);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div className="px-2 sm:px-4 md:px-6 lg:px-15 xl:px-55 pt-4">
      <div className="flex gap-5 items-center">
        <ArrowLeft onClick={handleBackClick} className="cursor-pointer" />
        <h2 className="font-bold text-2xl">Create New Interview</h2>
      </div>
      <Progress value={step * 33.33} className="my-5" />
      {step === 1 ? (
        <FormContainer onHandleInputChange={onHandleInputChange} GoToNext={onGoToNext} setIsGenerating={setIsGenerating} />
      ) : step === 2 ? (
        <QuestionList formData={formData} setIsGenerating={setIsGenerating} />
      ) : null}
    </div>
  );
}

export default CreateInterview;
