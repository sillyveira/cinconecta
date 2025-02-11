import React from "react";
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

const ultimosMeses = [

  { name: "Jul", entrada: 24},
  { name: "Ago", entrada: 31},
  { name: "Set", entrada: 15},
  { name: "Out", entrada: 37},
  { name: "Nov", entrada: 19},
  { name: "Dez", entrada: 30},
];
export default function ValorEstoque() {
  return (
    <motion.div
      className="text-black bg-gray-800 shadow-2xl bg-opacity-100 border backdrop-blur-md rounded-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <h2 className="text-white text-lg font-medium text-center">
        Gráfico do valor do estoque (R$)
      </h2>
      <div className="h-40 mb-0.5">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart data={ultimosMeses} margin={{ right: 40 }}>
            <CartesianGrid strokeDasharray={"3 3"} stroke="#FFFFFFFF" />
            <XAxis color="#FFFFFFF" stroke="#EDFFECFF" dataKey={"name"}></XAxis>
            <YAxis stroke="#EDFFECFF" dataKey={"entrada"}></YAxis>
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
            ></Line>
            <Line
              type="monotone"
              dataKey="saida"
              stroke="#F16363FF"
              strokeWidth={3}
              dot={{ fill: "#F16363FF", strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
            ></Line>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
