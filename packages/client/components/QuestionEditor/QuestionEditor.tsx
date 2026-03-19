import { QuestionType } from '@/api-client/generated';
import { Question } from 'hooks/useFormBuilder';
import { OptionList } from 'components/OptionList/OptionList';

interface Props {
    question: Question;
    onUpdate: (id: string, updates: Partial<Question>) => void;
    onRemove: (id: string) => void;
    onAddOption: (questionId: string) => void;
    onUpdateOption: (questionId: string, optionId: string, text: string) => void;
    onRemoveOption: (questionId: string, optionId: string) => void;
}

export const QuestionEditor = ({ 
  question, 
  onUpdate, 
  onRemove,
  onAddOption,
  onUpdateOption,
  onRemoveOption 
}: Props) => {
  return (
    <div className="p-6 border rounded-lg bg-white shadow-sm mb-4">
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          value={question.title}
          placeholder="Запитання"
          onChange={(e) => onUpdate(question.id, { title: e.target.value })}
          className="flex-1 p-2 border-b focus:border-blue-500 outline-none"
        />

        <select
          value={question.type}
          onChange={(e) => onUpdate(question.id, { type: e.target.value as QuestionType })}
          className="p-2 border rounded bg-gray-50"
        >
          <option value={QuestionType.Text}>Текст</option>
          <option value={QuestionType.Date}>Дата</option>
          <option value={QuestionType.Checkbox}>Чекбокс</option>
          <option value={QuestionType.MultipleChoice}>Варіанти (Radio)</option>
        </select>
      </div>

      {(question.type === QuestionType.Checkbox || question.type === QuestionType.MultipleChoice) && (
        <OptionList 
          questionId={question.id}
          options={question.options || []}
          onAddOption={onAddOption}
          onUpdateOption={onUpdateOption}
          onRemoveOption={onRemoveOption}
        />
      )}

      <div className="flex justify-end mt-4 border-t pt-2">
        <button 
          onClick={() => onRemove(question.id)}
          className="text-red-500 hover:bg-red-50 px-3 py-1 rounded"
        >
          Видалити
        </button>
      </div>
    </div>
  );
};