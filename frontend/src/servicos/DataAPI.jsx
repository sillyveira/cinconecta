export const analiseDados = async (logout) => {
  try {
    const resposta = await fetch("http://localhost:3000/analise-dados/dados", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!resposta.ok) {
      throw new Error(`Erro na requisição: ${resposta.status}`);
    }

    const dados = await resposta.json();

    if (
      dados.message === "Token não está presente na solicitação." ||
      dados.message === "O token é inválido ou está expirado."
    ) {
      logout("Expirado");
      return [];
    }

    return dados;
  } catch (error) {
      console.error("Erro ao buscar estoque:", error);
  
      // Verifica se o erro está relacionado a falha de conexão (erro de rede)
      if (error.message.includes("NetworkError") || error.message.includes("Failed to fetch")) {
        logout("Timeout");
      }
  
      throw error; // Deixa o erro ser tratado pelo contexto
    }
}

export const buscarEstoque = async (logout) => {
    try {
      const resposta = await fetch("http://localhost:3000/produtos/", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!resposta.ok) {
        throw new Error(`Erro na requisição: ${resposta.status}`);
      }
  
      const dados = await resposta.json();
  
      if (
        dados.message === "Token não está presente na solicitação." ||
        dados.message === "O token é inválido ou está expirado."
      ) {
        logout("Expirado");
        return [];
      }
  
      return dados.produtos;
    } catch (error) {
        console.error("Erro ao buscar estoque:", error);
    
        // Verifica se o erro está relacionado a falha de conexão (erro de rede)
        if (error.message.includes("NetworkError") || error.message.includes("Failed to fetch")) {
          logout("Timeout");
        }
    
        throw error; // Deixa o erro ser tratado pelo contexto
      }
  };
  
  // export const graficoEntradaSaida = async (logout) => {
  //   try {
  //     const resposta = await fetch(
  //       "http://localhost:3000/analise-dados/grafico-entrada-saida",
  //       {
  //         method: "GET",
  //         credentials: "include",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  
  //     if (!resposta.ok) {
  //       const errorData = await resposta.json();
  //       throw new Error(
  //         `Erro na requisição: ${resposta.status} - ${errorData.message || resposta.statusText}`
  //       );
  //     }
  
  //     const dados = await resposta.json();
  
  //     if (
  //       dados.message === "Token não está presente na solicitação." ||
  //       dados.message === "O token é inválido ou está expirado."
  //     ) {
  //       logout("Expirado");
  //       return [];
  //     }
  
  //     return dados.grafico;
  //   } catch (error) {
  //       console.error("Erro ao buscar estoque:", error);
    
  //       // Verifica se o erro está relacionado a falha de conexão (erro de rede)
  //       if (error.message.includes("NetworkError") || error.message.includes("Failed to fetch")) {
  //         logout("Timeout");
  //       }
    
  //       throw error; // Deixa o erro ser tratado pelo contexto
  //     }
  // };