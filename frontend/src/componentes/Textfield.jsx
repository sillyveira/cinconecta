import React from "react";

export default function Textfield({titulo, tipo, onChange}) {
  return (
    <input
    type={tipo}
    className="p-2 w-60 h-10 border-2xl border-[#B6B6B6] bg-[#B6B6B6] text-white rounded-xl placeholder-white focus:outline-none"
    placeholder={titulo}
    onChange={onChange}
    />
  );
}
