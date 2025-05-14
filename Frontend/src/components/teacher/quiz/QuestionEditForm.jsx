import { useState } from "react";
import { Check, X, Plus, Trash } from "lucide-react";

function QuestionEditForm({ question, onSave, onCancel }) {
  const [editFormData, setEditFormData] = useState({
    ...question,
    choices: [...question.choices],
    correctAnswerIndex: question.correctAnswerIndex || 0,
  });

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: name === "points" ? parseInt(value) || 0 : value,
    });
  };

  const handleChoiceChange = (index, value) => {
    const updatedChoices = [...editFormData.choices];
    updatedChoices[index] = value;
    setEditFormData({
      ...editFormData,
      choices: updatedChoices,
    });
  };

  const handleAddChoice = () => {
    setEditFormData({
      ...editFormData,
      choices: [...editFormData.choices, ""],
    });
  };

  const handleCorrectAnswerChange = (index) => {
    setEditFormData({
      ...editFormData,
      correctAnswerIndex: index,
    });
  };

  const handleRemoveChoice = (index) => {
    const updatedChoices = [...editFormData.choices];
    updatedChoices.splice(index, 1);
    setEditFormData({
      ...editFormData,
      choices: updatedChoices,
    });
  };

  const handleSave = () => {
    onSave(editFormData);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Editing Question</h3>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={handleSave}
          >
            <Check size={16} />
            Save
          </button>
          <button
            type="button"
            className="btn btn-sm btn-ghost"
            onClick={onCancel}
          >
            <X size={16} />
            Cancel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Question Text:
          </label>
          <input
            type="text"
            name="question"
            value={editFormData.question}
            onChange={handleEditFormChange}
            className="input input-bordered w-full"
            placeholder="Enter question text"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Points:
          </label>
          <input
            type="number"
            name="points"
            value={editFormData.points}
            onChange={handleEditFormChange}
            className="input input-bordered w-full"
            min="1"
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Choices:
        </label>
        {editFormData.choices.map((choice, choiceIndex) => (
          <div key={choiceIndex} className="flex items-center mb-2">
            <input
              type="radio"
              name={`correct-answer-${question.id}`}
              className="radio radio-primary mr-2"
              checked={choiceIndex === editFormData.correctAnswerIndex}
              onChange={() => handleCorrectAnswerChange(choiceIndex)}
            />
            <input
              type="text"
              value={choice}
              onChange={(e) => handleChoiceChange(choiceIndex, e.target.value)}
              className="input input-bordered flex-1 mr-2"
              placeholder={`Option ${choiceIndex + 1}`}
            />
            <button
              type="button"
              className="btn btn-sm btn-ghost"
              onClick={() => handleRemoveChoice(choiceIndex)}
              disabled={editFormData.choices.length <= 2}
            >
              <Trash size={16} />
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-sm btn-outline mt-2"
          onClick={handleAddChoice}
        >
          <Plus size={16} className="mr-1" /> Add Choice
        </button>
      </div>
    </div>
  );
}

export default QuestionEditForm;
