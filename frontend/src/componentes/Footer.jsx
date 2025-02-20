import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Footer() {
  const listaTexto = ["por estudantes", "para ONGs", "pelo Recife"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % listaTexto.length);
    }, 3000); // Troca a cada 3 segundos

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="w-full flex-col place-items-center flex">
    
    <footer className="text-black flex items-center justify-center flex-row gap-10 p-4">
      <div>
        <a href="/" className="underline">Política de Privacidade</a>
      </div>

      <div>
        <p className="text-lg flex items-center gap-2">
          Feito com ❤
          <AnimatePresence mode="wait">
            <motion.span
              key={listaTexto[index]}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="ml-1 font-semibold"
            >
              {listaTexto[index]}
            </motion.span>
          </AnimatePresence>
        </p>
      </div>

      <div>
        <a href="/" className="underline">Contato</a>
      </div>
    </footer>
    </div>
  );
}

export default Footer;
