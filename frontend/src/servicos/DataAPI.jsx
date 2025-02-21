import toast from "react-hot-toast";
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
    if (
      error.message.includes("NetworkError") ||
      error.message.includes("Failed to fetch")
    ) {
      logout("Timeout");
    }

    throw error; // Deixa o erro ser tratado pelo contexto
  }
};

export const buscarEstoque = async (logout, query = "") => {
  try {
    const resposta = await fetch(`http://localhost:3000/produtos${query}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!resposta.ok) {
      console.log(resposta.json());
      logout("Timeout");
      throw new Error(
        `Erro na requisição: ${resposta.status}. ${resposta.message}. ${resposta.body}.`
      );
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
    console.log("Erro ao buscar estoque:", error.message);

    // Verifica se o erro está relacionado a falha de conexão (erro de rede)
    if (
      error.message.includes("NetworkError") ||
      error.message.includes("Failed to fetch")
    ) {
      logout("Timeout");
    }

    throw error; // Deixa o erro ser tratado pelo contexto
  }
};

export const buscarAuditoria = async (logout, query = "") => {
  try {
    const resposta = await fetch(
      `http://localhost:3000/auditoria/receber-logs${query}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`http://localhost:3000/auditoria/receber-logs${query}`);
    if (!resposta.ok) {
      console.log(resposta.json());
      logout("Timeout");
      throw new Error(
        `Erro na requisição: ${resposta.status}. ${resposta.message}. ${resposta.body}.`
      );
    }

    const dados = await resposta.json();

    if (
      dados.message === "Token não está presente na solicitação." ||
      dados.message === "O token é inválido ou está expirado."
    ) {
      logout("Expirado");
      return [];
    }

    return dados.logs;
  } catch (error) {
    console.log("Erro ao buscar estoque:", error.message);

    // Verifica se o erro está relacionado a falha de conexão (erro de rede)
    if (
      error.message.includes("NetworkError") ||
      error.message.includes("Failed to fetch")
    ) {
      logout("Timeout");
    }

    throw error; // Deixa o erro ser tratado pelo contexto
  }
};

/*id_categoria,
    nome,
    descricao,
    quantidade,
    validade,
    valor,
    codbarras,*/

export const buscarCategorias = async (logout) => {
  try {
    const resposta = await fetch(
      `http://localhost:3000/categorias/`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!resposta.ok) {
      console.log(resposta.json());
      logout("Timeout");
      throw new Error(
        `Erro na requisição: ${resposta.status}. ${resposta.message}. ${resposta.body}.`
      );
    }

    const dados = await resposta.json();

    if (
      dados.message === "Token não está presente na solicitação." ||
      dados.message === "O token é inválido ou está expirado."
    ) {
      logout("Expirado");
      return [];
    }

    return dados.categorias;
  } catch (error) {
    console.log("Erro ao buscar categorias:", error.message);

    // Verifica se o erro está relacionado a falha de conexão (erro de rede)
    if (
      error.message.includes("NetworkError") ||
      error.message.includes("Failed to fetch")
    ) {
      logout("Timeout");
    }

    throw error; // Deixa o erro ser tratado pelo contexto
  }
};

export const adicionarProduto = async (logout, produto, carregarEstoque) => {
  try {
    const resposta = await fetch(
      "http://localhost:3000/produtos/criar-produto",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produto),
      }
    );

    if (!resposta.ok) {
      toast.error("Ocorreu um erro ao adicionar um produto.");
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

    toast.success("O produto foi adicionado com sucesso.");
    await carregarEstoque();
    return dados.message;
  } catch (error) {
    console.error("Erro ao buscar estoque:", error);

    // Verifica se o erro está relacionado a falha de conexão (erro de rede)
    if (
      error.message.includes("NetworkError") ||
      error.message.includes("Failed to fetch")
    ) {
      logout("Timeout");
    }

    throw error; // Deixa o erro ser tratado pelo contexto
  }
};

export const removerProduto = async (
  logout,
  idsRemovidos = [],
  carregarEstoque
) => {
  try {
    const resposta = await fetch(
      "http://localhost:3000/produtos/deletar-produto",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: idsRemovidos }),
      }
    );

    if (!resposta.ok) {
      toast.error("Ocorreu um erro ao adicionar um produto.");
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

    toast.success("Os produtos selecionados foram removidos.");
    await carregarEstoque();
    return dados.message;
  } catch (error) {
    console.error("Erro ao buscar estoque:", error);

    // Verifica se o erro está relacionado a falha de conexão (erro de rede)
    if (
      error.message.includes("NetworkError") ||
      error.message.includes("Failed to fetch")
    ) {
      logout("Timeout");
    }

    throw error; // Deixa o erro ser tratado pelo contexto
  }
};

export const adicionarCategoria = async (logout, nomeCategoria, carregarCategorias) => {
  if (!nomeCategoria){
    toast.error("A categoria precisa de um nome!")
    return;
  }

  try {
    const resposta = await fetch(
      "http://localhost:3000/categorias/criar-categoria",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome_categoria: nomeCategoria
        })
      }
    );

    if (!resposta.ok) {
      toast.error("Ocorreu um erro ao adicionar um produto.");
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

    toast.success("A categoria foi adicionada com sucesso.");
    await carregarCategorias();
    return dados.message;
  } catch (error) {
    console.error("Erro ao buscar estoque:", error);

    // Verifica se o erro está relacionado a falha de conexão (erro de rede)
    if (
      error.message.includes("NetworkError") ||
      error.message.includes("Failed to fetch")
    ) {
      logout("Timeout");
    }

    throw error; // Deixa o erro ser tratado pelo contexto
  }
};

export const atualizarCategoria = async (logout, idCategoria, nomeCategoria, carregarCategorias) => {
  try {
    const resposta = await fetch(
      `http://localhost:3000/categorias/atualizar-categoria/${idCategoria}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome_categoria: nomeCategoria
        })
      }
    );

    if (!resposta.ok) {
      toast.error("Ocorreu um erro ao adicionar um produto.");
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

    toast.success("A categoria foi editada com sucesso.");
    await carregarCategorias();
    return dados.message;
  } catch (error) {
    console.error("Erro ao buscar estoque:", error);

    // Verifica se o erro está relacionado a falha de conexão (erro de rede)
    if (
      error.message.includes("NetworkError") ||
      error.message.includes("Failed to fetch")
    ) {
      logout("Timeout");
    }

    throw error; // Deixa o erro ser tratado pelo contexto
  }
};

export const deletarCategoria = async (logout, idCategoria, carregarCategorias) => {
  try {
    const resposta = await fetch(
      `http://localhost:3000/categorias/deletar-categoria/${idCategoria}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

    if (!resposta.ok) {
      toast.error("Ocorreu um erro ao adicionar um produto.");
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

    toast.success("A categoria foi removida com sucesso.");
    await carregarCategorias();
    return dados.message;
  } catch (error) {
    console.error("Erro ao buscar estoque:", error);

    // Verifica se o erro está relacionado a falha de conexão (erro de rede)
    if (
      error.message.includes("NetworkError") ||
      error.message.includes("Failed to fetch")
    ) {
      logout("Timeout");
    }

    throw error; // Deixa o erro ser tratado pelo contexto
  }
};


  export const editarProduto = async (logout, produto, carregarEstoque) => {
    try {
      const resposta = await fetch(`http://localhost:3000/produtos/atualizar-produto/${produto._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produto)
      });

      if (!resposta.ok) {
        toast.error('Ocorreu um erro ao adicionar um produto.');
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
      
      toast.success('O produto foi atualizado com sucesso.')
      await carregarEstoque();
      return dados.message;
    } catch (error) {
        console.error("Erro ao buscar estoque:", error);
    
        // Verifica se o erro está relacionado a falha de conexão (erro de rede)
        if (error.message.includes("NetworkError") || error.message.includes("Failed to fetch")) {
          logout("Timeout");
        }
    
        throw error; // Deixa o erro ser tratado pelo contexto
      }
  };

