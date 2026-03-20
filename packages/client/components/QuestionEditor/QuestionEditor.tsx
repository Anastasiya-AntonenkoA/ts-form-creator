import { QuestionType } from '@/api-client/generated';
import { Question } from 'hooks/useFormBuilder';
import { OptionList } from 'components/OptionList/OptionList';
import styles from "./QuestionEditor.module.css";

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
    <div className={styles.card}>
      <div className={styles.row}>
        <input
          type="text"
          value={question.title}
          placeholder="Question"
          onChange={(e) => onUpdate(question.id, { title: e.target.value })}
          className={styles.inputTitle}
        />

        <select
          value={question.type}
          onChange={(e) => onUpdate(question.id, { type: e.target.value as QuestionType })}
          className={styles.selectType}
        >
          <option value={QuestionType.Text}>Text</option>
          <option value={QuestionType.Date}>Date</option>
          <option value={QuestionType.Checkbox}>Checkbox</option>
          <option value={QuestionType.MultipleChoice}>Radio</option>
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

      <div className={styles.footer}>
        <button 
          onClick={() => onRemove(question.id)}
          className={styles.deleteButton}
        >
          Delete
        </button>
      </div>
    </div>
  );
};