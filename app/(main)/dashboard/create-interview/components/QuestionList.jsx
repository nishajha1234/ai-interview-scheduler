import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Loader2, Loader2Icon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner';
import QuestionListContainer from './QuestionListContainer';
import { supabase } from '@/Services/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@/app/provider';
import { useRouter } from 'next/navigation';

function QuestionList({ formData, setIsGenerating }) {
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState();
  const { user } = useUser();
  const [saveLoading, setSaveLoading] = useState(false);
  const lastFormDataRef = useRef(null);
  const router = useRouter();
  useEffect(() => {
    if (formData) {
      const isEqual = JSON.stringify(formData) === JSON.stringify(lastFormDataRef.current);
      if (formData && !isEqual) {
        lastFormDataRef.current = formData;
        GenerateQuestionList();
      }
    }
  }, [formData]);

  const GenerateQuestionList = async () => {
    setLoading(true);
    setIsGenerating(true);
    console.log(formData);
    try {
      const result = await axios.post('/api/ai-model', {
        ...formData,
      });
      console.log(result.data.content);
      const Content = result.data.content;
      const match = Content.match(/\[\s*{[\s\S]*?}\s*\]/);

      if (!match) {
        toast.error("AI response was malformed. Try different inputs.");
        setQuestionList(null);
        return;
      }

      const FINAL_CONTENT = match[0];

      try {
        const parsed = JSON.parse(FINAL_CONTENT);
        setQuestionList(parsed);
      } catch (jsonError) {
        console.error("JSON Parse Error:", jsonError);
        toast.error("There is some Problem. Please try again.");
        setQuestionList(null);
      }

    } catch (e) {
      console.error('Server Error:', e);
      toast('Server Error, Try Again!');
    } finally {
      setLoading(false);
      setIsGenerating(false);
    }
  };

  const onFinish = async () => {
    setSaveLoading(true);
    const interview_id = uuidv4();
    const { data, error } = await supabase
      .from('Interviews')
      .insert([
        {
          ...formData,
          questionList: questionList,
          userEmail: user?.email,
          interview_id: interview_id,
        },
      ])
      .select()
    setSaveLoading(false);
    console.log(data);
    toast.success('Questions Generated successfully!');
    router.push('/dashboard');
  }


  return (
    <div>
      {loading && <div className='p-5 bg-blue-50 rounded-xl border border-primary flex gap-5 items-center'>
        <Loader2Icon className='animate-spin' />
        <div>
          <h2 className='font-medium'>Generating Interview Questions</h2>
          <p className='text-primary'>Our AI is crafting personalized questions based on your job position</p>
        </div>

      </div>
      }
      {questionList?.length > 0 &&
        <div>
          <QuestionListContainer questionList={questionList} />
        </div>
      }

      <div className='flex justify-end mt-10 mb-[0px]'>
        <Button onClick={() => onFinish()} className="cursor-pointer" disabled={saveLoading || !questionList?.length}>
          {saveLoading && <Loader2 className='animate-spin' />}
          Finish</Button>
      </div>

    </div>
  )
}

export default QuestionList
