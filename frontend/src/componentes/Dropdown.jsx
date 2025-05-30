import { useState } from "react";

/**
 *
 * @param {variant} string "gray" or qualquer coisa
 * @returns gray box or white dropdown menu
 * @param {label} string do seu agrado
 * @returns default option
 * @param {opcoes} array de objetos das opcoes e seus valores
 * @returns opcoes do dropdown menu
 */

function DropDownMenu({
  variant,
  largura,
  label,
  opcoes,
  onChange,
  className,
  isValorC = null,
  valorC = null,
  setValorC = null,
}) {
  const [valor, setValor] = useState("");

  const handleChange = (event) => {
    const newValue = event.target.value;
    if (!isValorC) {
      setValor(newValue);
    } else {
      setValorC(newValue)
    }
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <select
      id="opcoes"
      value={isValorC ? valorC : valor}
      onChange={handleChange}
      className={
        variant === "gray"
          ? `appearance-none p-2 bg-[#B6B6B6] w-[${largura}] ${className} h-[46px] text-[#F7F7F7] text-left pt-2 border rounded-[15px]`
          : `appearance-none p-2 bg-[#F7F7F7] w-[${largura}] ${className} h-[46px] text-[#B6B6B6] text-left pt-2 border rounded-[15px]`
      }
    >
      <option value=""> {label} </option>
      {Array.isArray(opcoes) ? opcoes.map((optione) => (
        <option key={optione.title} value={optione.value}>
          {optione.title}
        </option>
      )) : []}
    </select>
  );
}

export default DropDownMenu;
