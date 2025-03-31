export const loginRequest = async (email, password) => {
  try {
    const response = await fetch('/server/usuarios/login', {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Erro ao fazer login");
    }

    return data; // Retorna os dados do usuário se a requisição for bem-sucedida
  } catch (error) {
    throw error; // Lança o erro para ser tratado na interface
  }
};

export const logoutRequest = async () => {
  try {
    const response = await fetch('/server/usuarios/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao fazer logout');
    }
    return response.ok;
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    throw error; // Propaga o erro para ser tratado no componente
  }
};

export const getMembers = async () => {
  try {
    const response = await fetch('/server/usuarios/membros', {
      method: 'GET',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Erro ao fazer login");
    }

    return data.membros; // Retorna os usuários se bem-sucedido
  } catch (error) {
    throw error; // Lança o erro para ser tratado na interface
  }
};