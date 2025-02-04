//checkbox/radiobutton
import { useState } from "react";

export default function CheckboxGroup() {
    const [checked, setChecked] = useState({
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
                name=""
                checked={checked}
                onChange={handleCheckboxChange}
                className="w-5 h-5 accent-blue-500"
                />
                <span className="text-gray-700">Conteudo</span>
            </label>
        </div>
      )
}