import { Option } from 'hooks/useFormBuilder';

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
    <div className="space-y-2 mt-2">
      {options.map((option, index) => (
        <div key={option.id} className="flex items-center gap-2">
          <span className="text-gray-400">{index + 1}.</span>
          <input
            type="text"
            value={option.text}
            onChange={(e) => onUpdateOption(questionId, option.id, e.target.value)}
            placeholder={`Варіант ${index + 1}`}
            className="flex-1 p-1 border-b focus:border-blue-400 outline-none text-sm"
          />
            <button
                onClick={() => onRemoveOption(questionId, option.id)}
                disabled={options.length <= 1}
                className="disabled:opacity-20 text-gray-400 hover:text-red-500"
                >
                x
            </button>
        </div>
      ))}
      
      <button
        onClick={() => onAddOption(questionId)}
        className="text-sm text-blue-600 hover:underline mt-2"
      >
        + Додати варіант
      </button>
    </div>
  );
};