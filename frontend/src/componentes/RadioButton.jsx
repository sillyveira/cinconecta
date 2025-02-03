// Checkbox
import { useState } from "react";

export default function CheckboxGroup() {
  const [checked, setChecked] = useState({
    rememberMe: false,
    forgotPassword: false,
  });
  
  const [selectedOption, setSelectedOption] = useState("option1");

  const handleCheckboxChange = (event) => {
    setChecked({ ...checked, [event.target.name]: event.target.checked });
  };

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-80 border border-gray-200">
      <h2 className="text-xl font-bold mb-3 text-gray-700">Checkbox & Radiobutton</h2>
      <label className="flex items-center space-x-2 py-2">
        <input
          type="checkbox"
          name="rememberMe"
          checked={checked.rememberMe}
          onChange={handleCheckboxChange}
          className="w-5 h-5 accent-blue-500"
        />
        <span className="text-gray-700">Lembre-se de mim</span>
      </label>
      <label className="flex items-center space-x-2 py-2">
        <input
          type="checkbox"
          name="forgotPassword"
          checked={checked.forgotPassword}
          onChange={handleCheckboxChange}
          className="w-5 h-5 accent-blue-500"
        />
        <span className="text-gray-700">Esqueci a senha</span>
      </label>
      
      <h3 className="text-lg font-semibold mt-4 text-gray-700">Escolha uma opção</h3>
      <label className="flex items-center space-x-2 py-2">
        <input
          type="radio"
          name="radioOptions"
          value="option1"
          checked={selectedOption === "option1"}
          onChange={handleRadioChange}
          className="w-5 h-5 accent-blue-500"
        />
        <span className="text-gray-700">Opção 1</span>
      </label>
      <label className="flex items-center space-x-2 py-2">
        <input
          type="radio"
          name="radioOptions"
          value="option2"
          checked={selectedOption === "option2"}
          onChange={handleRadioChange}
          className="w-5 h-5 accent-blue-500"
        />
        <span className="text-gray-700">Opção 2</span>
      </label>
    </div>
  );
}