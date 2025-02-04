import React from 'react'
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFnsV3'
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { ptBR } from "date-fns/locale";

export default function FiltroAuditoria({dataInicial, setDataInicial, dataFinal, setDataFinal, className}) {
  return (
    <div className={`max-w-sm w-full flex flex-col items-center border rounded-xl shadow-lg h-fit pb-14 px-4 ${className}`}>
          <h1 className="text-2xl text-black">Filtro</h1>
          <hr className="border-t-2 border-gray-300 w-full" />
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <div className="flex gap-4 pt-4">
              <DatePicker
                label="Data de início"
                value={dataInicial}
                onChange={(newValue) => setDataInicial(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
              <DatePicker
                label="Data de término"
                value={dataFinal}
                onChange={(newValue) => setDataFinal(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
          </LocalizationProvider>
          <div className="w-72 pt-5">
            {/* Parte onde ficará o select */}
          </div>
        </div>
  )
}
