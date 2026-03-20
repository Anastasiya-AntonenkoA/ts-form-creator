import { Option } from 'hooks/useFormBuilder';
import styles from './OptionList.module.css';

interface Props {
  questionId: string;
  options: Option[];
  onUpdateOption: (questionId: string, optionId: string, text: string) => void;
  onAddOption: (questionId: string) => void;
  onRemoveOption: (questionId: string, optionId: string) => void;
}

export const OptionList = ({ 
  questionId, 
  options, 
  onUpdateOption, 
  onAddOption, 
  onRemoveOption 
}: Props) => {
  return (
    <div className={styles.container}>
      {options.map((option, index) => (
        <div key={option.id} className={styles.optionRow}>
          <span className={styles.index}>{index + 1}.</span>
          <input
            type="text"
            value={option.text}
            onChange={(e) => onUpdateOption(questionId, option.id, e.target.value)}
            placeholder={`Option ${index + 1}`}
            className={styles.input}
          />
          <button
            onClick={() => onRemoveOption(questionId, option.id)}
            disabled={options.length <= 1}
            className={styles.removeButton}
            title="Delete option"
            >
            x
          </button>
        </div>
      ))}
      
      <button
        onClick={() => onAddOption(questionId)}
        className={styles.addButton}
      >
        + Add option
      </button>
    </div>
  );
};