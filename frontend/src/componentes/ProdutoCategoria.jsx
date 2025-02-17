import React, { useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import DataContext from "../contextos/DataContext";
const produtosCategoria = [
  { nome: "Alimentos", quantidade: 24 },
  { nome: "Roupas", quantidade: 31 },
  { nome: "Móveis", quantidade: 15 },
  { nome: "Remédios", quantidade: 37 },
];


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function ProdutoCategoria() {
  const { Dados } = useContext(DataContext);

  // Verificação se há dados disponíveis
  if (!Dados || !Dados.produtoporcategoria || Dados.produtoporcategoria.length === 0) {
    return (
      <motion.div
        className="text-black bg-gray-800 shadow-2xl bg-opacity-100 border backdrop-blur-md rounded-md h-48"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-white text-lg font-medium text-center">
          Produtos por categoria
        </h2>
        <p className="text-white text-center">Sem dados disponíveis para o gráfico</p>
      </motion.div>
    );
  }

  // Se houver dados, realiza o cálculo do total de quantidade
  const totalQuantidade = Dados.produtoporcategoria.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  return (
    <motion.div
      className="text-black bg-gray-800 shadow-2xl bg-opacity-100 border backdrop-blur-md rounded-md h-48"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <h2 className="text-white text-lg font-medium text-center">
        Produtos por categoria
      </h2>
      <div className="flex gap-2 justify-center items-center h-40">
        <div className="h-28 w-28">
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Pie
                data={Dados.produtoporcategoria}
                dataKey="quantidade"
                nameKey="categoria"
                cx="50%"
                outerRadius={50}
                fill="#8884d8"
              >
                {Dados.produtoporcategoria.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                content={({ payload }) => {
                  if (payload && payload.length) {
                    const data = payload[0].payload;
                    const porcentagem = (
                      (data.quantidade / totalQuantidade) *
                      100
                    ).toFixed(2);
                    return (
                      <div className="bg-gray-800 text-white p-2 rounded shadow-md">
                        <p>{data.categoria}</p>
                        <p>Quantidade: {data.quantidade}</p>
                        <p>Porcentagem: {porcentagem}%</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-1/3 flex flex-col gap-2">
          {Dados.produtoporcategoria.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-4 h-4"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-white text-sm">{entry.categoria}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
