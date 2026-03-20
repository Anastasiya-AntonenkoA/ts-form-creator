'use client';

import { useRouter } from 'next/navigation';
import { useFormBuilder } from 'hooks/useFormBuilder';
import { QuestionEditor } from 'components/QuestionEditor/QuestionEditor';
import { QuestionType, useCreateFormMutation } from '@/api-client/generated';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import styles from './new.module.css';

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
            alert("Please enter a form name");
            return;
        }
        
        for (const q of questions) {
            if (!q.title.trim()) {
                alert(`Question cannot be empty`);
                return;
            }

            if (q.type === QuestionType.Checkbox || q.type === QuestionType.MultipleChoice) {
                if (!q.options || q.options.length === 0) {
                    alert(`Question "${q.title}" must have at least one option`);
                    return;
                }

                const hasEmptyOptions = q.options.some(opt => !opt.text.trim());
                if (hasEmptyOptions) {
                    alert(`All options in question "${q.title}" must be filled`);
                    return;
                }
            }
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

        alert("Form saved successfully!");
        router.push('/');
        
        } catch (err) {
            const error = err as FetchBaseQueryError | SerializedError;

            console.log("FULL ERROR OBJECT:", JSON.stringify(error, null, 2));

            console.error("Save error details:", error);
        
            let errorMessage = "Failed to save form";

            if ('data' in error) {
                const errorData = error.data as { message?: string };
                errorMessage = errorData.message || errorMessage;
            } else if ('message' in error) {
                errorMessage = error.message || errorMessage;
            }
            
            alert(`Error: ${errorMessage}`);
        }
    };

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <button onClick={() => router.back()} className={styles.backButton}>
                Back
                </button>
                <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className={`${styles.saveButton} ${
                        isSaving ? styles.saveButtonDisabled : styles.saveButtonEnabled
                    }`}
                >
                    {isSaving ? 'Saving...' : 'Save Form'}
                </button>
            </header>

            <section className={styles.formHeaderCard}>
                <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Form Title"
                    className={styles.titleInput}
                />
                <textarea 
                    placeholder="Form description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={styles.descriptionTextarea}
                    rows={2}
                />
            </section>

            <div className={styles.questionsList}>
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

            <div className={styles.toolbar}>
                <button 
                onClick={() => addQuestion(QuestionType.Text)}
                className={styles.toolbarButton}
                >
                + Text
                </button>
                <button 
                onClick={() => addQuestion(QuestionType.MultipleChoice)}
                className={styles.toolbarButton}
                >
                + Radio
                </button>
                <button 
                onClick={() => addQuestion(QuestionType.Checkbox)}
                className={styles.toolbarButton}
                >
                + Checkbox
                </button>
                <button 
                onClick={() => addQuestion(QuestionType.Date)}
                className={styles.toolbarButton}
                >
                + Date
                </button>
            </div>
        </main>
    );
}