import { useState } from 'react';
import { QuestionType } from '@/api-client/generated';

export interface Option {
    id: string;
    text: string;
}

export interface Question {
    id: string;
    type: QuestionType;
    title: string;
    isRequired: boolean;
    options?: Option[];
}

export const useFormBuilder = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [title, setTitle] = useState('Untitled Form');
    const [description, setDescription] = useState('');

    const addQuestion = (type: QuestionType) => {
        const newQuestion: Question = {
        id: crypto.randomUUID(),
        type,
        title: '',
        isRequired: false,
        options: (type === QuestionType.Checkbox || type === QuestionType.MultipleChoice) 
            ? [{ id: crypto.randomUUID(), text: 'Option 1' }] 
            : [],
        };
        setQuestions([...questions, newQuestion]);
    };

    const removeQuestion = (id: string) => {
        setQuestions(questions.filter((q) => q.id !== id));
    };

    const updateQuestion = (id: string, updates: Partial<Question>) => {
        setQuestions(
        questions.map((q) => (q.id === id ? { ...q, ...updates } : q))
        );
    };

    const addOption = (questionId: string) => {
        setQuestions(questions.map(q => {
        if (q.id === questionId && q.options) {
            return {
            ...q,
            options: [...q.options, { id: crypto.randomUUID(), text: `Option ${q.options.length + 1}` }]
            };
        }
        return q;
        }));
    };

    const updateOption = (questionId: string, optionId: string, text: string) => {
        setQuestions(questions.map(q => {
        if (q.id === questionId && q.options) {
            return {
            ...q,
            options: q.options.map(opt => opt.id === optionId ? { ...opt, text } : opt)
            };
        }
        return q;
        }));
        };
    
    const removeOption = (questionId: string, optionId: string) => {
        setQuestions(questions.map(q => {
        if (q.id === questionId && q.options) {
            return {
            ...q,
            options: q.options.filter(opt => opt.id !== optionId)
            };
        }
        return q;
        }));
    };

  return {
    questions,
    title,
    setTitle,
    description,
    setDescription,
    addQuestion,
    removeQuestion,
    updateQuestion,
    addOption,
    updateOption,
    removeOption
  };
};