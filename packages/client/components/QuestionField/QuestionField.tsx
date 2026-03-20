import { QuestionType, Question } from '@/api-client/generated';
import { AnswerValue } from 'types/types'
import styles from './QuestionField.module.css';

interface Props {
  question: Question;
  value: AnswerValue;
  onChange: (value: AnswerValue) => void;
}

export const QuestionField = ({ question, value, onChange }: Props) => {
    const validOptions = (question.options?.filter((opt): opt is string => Boolean(opt))) || [];
    switch (question.type) {
        case QuestionType.Text:
            return (
                <input
                type="text"
                className={styles.textInput}
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Your answer"
                />
            );

        case QuestionType.MultipleChoice:
            return (
                <div className={styles.optionsStack}>
                {validOptions.map((opt) => (
                    <label key={opt} className={styles.label}>
                    <input
                        type="radio"
                        name={question.id}
                        checked={value === opt}
                        onChange={() => onChange(opt)}
                        className={styles.radio}
                    />
                    <span>{opt}</span>
                    </label>
                ))}
                </div>
            );

    case QuestionType.Checkbox:
        const currentValues = Array.isArray(value) ? value : [];
            
        const toggleCheckbox = (opt: string) => {
            const nextValue = currentValues.includes(opt)
            ? currentValues.filter((v) => v !== opt)
            : [...currentValues, opt];
            onChange(nextValue);
        };
        return (
            <div className={styles.optionsStack}>
            {validOptions.map((opt) => (
                <label key={opt} className={styles.label}>
                <input
                    type="checkbox"
                    checked={currentValues.includes(opt)}
                    onChange={() => toggleCheckbox(opt)}
                    className={styles.checkbox}
                />
                <span>{opt}</span>
                </label>
            ))}
            </div>
        );

    case QuestionType.Date:
        return (
            <input
            type="date"
            className={styles.dateInput}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            />
        );

    default:
        return <p className={styles.errorText}>Unknown question type</p>;
  }
};