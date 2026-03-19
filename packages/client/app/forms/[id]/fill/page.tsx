'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGetFormQuery, useSubmitResponseMutation } from '@/api-client/generated';
import { QuestionField } from 'components/QuestionField/QuestionField';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { AnswerValue } from 'types/types'

export default function FormFillerPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const { data, isLoading } = useGetFormQuery({ id });
    const [submitResponse, { isLoading: isSubmitting }] = useSubmitResponseMutation();

    const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});

    const handleAnswerChange = (questionId: string, value: AnswerValue) => {
        setAnswers((prev) => ({ ...prev, [questionId]: value }));
    };

    const handleSubmit = async () => {
        if (!data?.form) {
            alert('Form not found');
            return;
        }
        for (const question of data.form.questions) {
            const answer = answers[question.id];

            if (answer === undefined || (Array.isArray(answer) && answer.length === 0) || (!Array.isArray(answer) && !answer)) {
                alert(`Please answer the question: "${question.title}"`);
                return;
            }

        if (question.type === 'DATE' && answer) {
        const isValidDate = !isNaN(new Date(answer as string).getTime());
        if (!isValidDate) {
            alert(`Invalid date format for question: "${question.title}"`);
            return;
        }
        }

        if (question.type === 'TEXT' && answer) {
            if ((answer as string).length > 200) {
                alert(`Answer too long for question: "${question.title}" (max 200 chars)`);
                return;
            }
        }

        if (question.type === 'MULTIPLE_CHOICE' || question.type === 'CHECKBOX') {
            if (answer && Array.isArray(answer)) {
                if (answer.length === 0) {
                alert(`Please select at least one option for question: "${question.title}"`);
                return;
                }
            }
        }
    }
    try {
        const formattedAnswers = Object.entries(answers)
            .filter(([, value]) => value !== undefined)
            .map(([questionId, value]) => ({
            questionId,
            value: Array.isArray(value) ? value : [String(value)],
            }));

        await submitResponse({
            input: {
            formId: id,
            answers: formattedAnswers,
            },
        }).unwrap();

        alert('Thank you! The form has been submitted.');
        router.push('/');
        } catch (err) {
            const error = err as FetchBaseQueryError | SerializedError;
            console.error('Submission error:', error);
            
            let message = 'Failed to send reply.';
            if ('data' in error) {
                const errorData = error.data as { message?: string; errors?: Array<{message: string}> };
                message = errorData.errors?.[0]?.message || errorData.message || message;
            }
        
            alert(message);
        }
    };

  if (isLoading) return <div className="p-10 text-center">Loading form...</div>;
  if (!data?.form) return <div className="p-10 text-center text-red-500">Form not found</div>;

  return (
    <main className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md border-t-8 border-purple-600 p-6 mb-6">
        <h1 className="text-3xl font-bold">{data.form.title}</h1>
        {data.form.description && (
          <p className="text-gray-600 mt-2">{data.form.description}</p>
        )}
      </div>

      <div className="space-y-6">
        {data.form.questions.map((q) => (
          <div key={q.id} className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-medium mb-4">{q.title}</h3>
            <QuestionField
              question={q}
              value={answers[q.id]}
              onChange={(val) => handleAnswerChange(q.id, val)}
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className={`mt-8 w-full py-3 rounded-lg font-bold transition flex justify-center items-center ${
          isSubmitting 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg'
        }`}
      >
        {isSubmitting ? (
          <>
            <span className="animate-pulse">Sending...</span>
          </>
        ) : 'Send reply'}
      </button>
    </main>
  );
}