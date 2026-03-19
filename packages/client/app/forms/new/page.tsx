'use client';

import { useRouter } from 'next/navigation';
import { useFormBuilder } from 'hooks/useFormBuilder';
import { QuestionEditor } from 'components/QuestionEditor/QuestionEditor';
import { QuestionType, useCreateFormMutation } from '@/api-client/generated';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

export default function NewFormPage() {
  const router = useRouter();
  const { 
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
    } = useFormBuilder();
    
    const [createForm, { isLoading: isSaving }] = useCreateFormMutation();

    const handleSave = async () => {
        if (!title.trim()) {
            alert("Будь ласка, введіть назву форми");
            return;
        }
        try {
            await createForm({
                input: {
                    title,
                    description: description || "",
                    questions: questions.map(q => ({
                        title: q.title,
                        type: q.type,
                        options: q.options?.map(opt => opt.text) || []
                }))
        }
        }).unwrap();

        alert("Форму успішно збережено!");
        router.push('/');
        
        } catch (err) {
            const error = err as FetchBaseQueryError | SerializedError;

            console.log("FULL ERROR OBJECT:", JSON.stringify(error, null, 2));

            console.error("Save error details:", error);
        
            let errorMessage = "не вдалося зберегти форму";

            if ('data' in error) {
                const errorData = error.data as { message?: string };
                errorMessage = errorData.message || errorMessage;
            } else if ('message' in error) {
                errorMessage = error.message || errorMessage;
            }
            
            alert(`Помилка: ${errorMessage}`);
        }
    };

    return (
        <main className="max-w-3xl mx-auto p-10 pb-32">
            <header className="mb-8 flex justify-between items-center">
                <button onClick={() => router.back()} className="text-gray-500 hover:underline">
                ← Back
                </button>
                <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className={`px-6 py-2 rounded-full font-medium transition ${
                        isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                    >
                    {isSaving ? 'Збереження...' : 'Save Form'}
                </button>
            </header>

            <section className="bg-white p-6 border-t-8 border-blue-600 rounded-lg shadow-md mb-6">
                <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Form Title"
                    className="text-3xl font-bold w-full outline-none border-b focus:border-gray-300 mb-4"
                />
                <textarea 
                    placeholder="Form description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full outline-none text-gray-600 resize-none"
                    rows={2}
                />
            </section>

            <div className="space-y-4">
                {questions.map((q) => (
                <QuestionEditor 
                    key={q.id}
                    question={q}
                    onUpdate={updateQuestion}
                    onRemove={removeQuestion}
                    onAddOption={addOption}
                    onUpdateOption={updateOption}
                    onRemoveOption={removeOption}
                />
                ))}
            </div>

            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white shadow-xl border rounded-full px-6 py-3 flex gap-4">
                <button 
                onClick={() => addQuestion(QuestionType.Text)}
                className="text-sm font-medium hover:text-blue-600"
                >
                + Text
                </button>
                <button 
                onClick={() => addQuestion(QuestionType.MultipleChoice)}
                className="text-sm font-medium hover:text-blue-600"
                >
                + Radio
                </button>
                <button 
                onClick={() => addQuestion(QuestionType.Checkbox)}
                className="text-sm font-medium hover:text-blue-600"
                >
                + Checkbox
                </button>
                <button 
                onClick={() => addQuestion(QuestionType.Date)}
                className="text-sm font-medium hover:text-blue-600"
                >
                + Date
                </button>
            </div>
        </main>
    );
}