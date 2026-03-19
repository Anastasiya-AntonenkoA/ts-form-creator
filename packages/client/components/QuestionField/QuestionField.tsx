import { QuestionType, Question } from '@/api-client/generated';
import { AnswerValue } from 'types/types'

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
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Ваша відповідь"
                />
            );

        case QuestionType.MultipleChoice:
            return (
                <div className="space-y-2">
                {validOptions.map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name={question.id}
                        checked={value === opt}
                        onChange={() => onChange(opt)}
                        className="w-4 h-4 text-blue-600"
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
            <div className="space-y-2">
            {validOptions.map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                <input
                    type="checkbox"
                    checked={currentValues.includes(opt)}
                    onChange={() => toggleCheckbox(opt)}
                    className="w-4 h-4 text-blue-600 rounded"
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
            className="p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            />
        );

    default:
        return <p className="text-red-500">Unknown question type</p>;
  }
};