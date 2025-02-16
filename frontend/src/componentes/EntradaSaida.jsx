import React, { useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import DataContext from "../contextos/DataContext";
const ultimosMeses = [
  { name: "Jan", entrada: 21, saida: 3 },
  { name: "Fev", entrada: 12, saida: 2 },
  { name: "Mar", entrada: 35, saida: 5 },
  { name: "Abr", entrada: 28, saida: 7 },
  { name: "Mai", entrada: 40, saida: 10 },
  { name: "Jun", entrada: 18, saida: 1 },
  { name: "Jul", entrada: 24, saida: 4 },
  { name: "Ago", entrada: 31, saida: 6 },
  { name: "Set", entrada: 15, saida: 2 },
  { name: "Out", entrada: 37, saida: 8 },
  { name: "Nov", entrada: 19, saida: 3 },
  { name: "Dez", entrada: 30, saida: 9 },
];
export default function EntradaSaida() {
  const {Grafico} = useContext(DataContext);
  return (
    <motion.div
      className="text-black bg-gray-800 shadow-2xl bg-opacity-100 border backdrop-blur-md rounded-md col-span-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <h2 className="text-white text-lg font-medium text-center">
        Gráfico de entrada e saída
      </h2>
      <div className="h-48">
      {(!Grafico || Grafico.length === 0) ? ( // Verifica se Grafico é null/undefined ou vazio
        <p>Sem gráfico disponível</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={Grafico} margin={{ right: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#FFFFFFFF" />
            <XAxis color="#FFFFFFF" stroke="#EDFFECFF" dataKey="name" />
            <YAxis domain={[0, 45]} stroke="#EDFFECFF" dataKey="entrada" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31,41,55,0.8)",
                borderColor: "#4B5563",
              }}
              labelStyle={{ color: "#FFFFFF" }}
              itemStyle={{ color: "#FFFFFF" }}
            />
            <Line
              type="monotone"
              dataKey="entrada"
              stroke="#76F163FF"
              strokeWidth={3}
              dot={{ fill: "#76F163FF", strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="saida"
              stroke="#F16363FF"
              strokeWidth={3}
              dot={{ fill: "#F16363FF", strokeWidth: 1, r: 6 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
      </div>
    </motion.div>
  );
}
