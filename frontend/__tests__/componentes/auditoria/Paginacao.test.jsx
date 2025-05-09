import { render, screen, fireEvent } from "@testing-library/react";
import Paginacao from "../../../src/componentes/Paginacao";

describe("Componente Paginacao", () => {
  test("deve renderizar a paginação corretamente", () => {
    render(
      <Paginacao paginaAtual={1} paginasTotais={10} setPagina={() => {}} />
    );

    expect(screen.getByText("1/10")).toBeInTheDocument();
    expect(screen.getByText("pág")).toBeInTheDocument();
  });


  test("deve chamar setPagina ao clicar nos botões de navegação", () => {
    const setPaginaMock = vi.fn();
    render(
      <Paginacao paginaAtual={6} paginasTotais={11} setPagina={setPaginaMock} />
    );

    // Testar botão de avançar 1 página
    fireEvent.click(screen.getByRole("button", { name: "Avançar 1 Página" })); // Nos botões do componente de Paginação, coloquei aria-label para poder referenciar aqui.
    let funcaoAtualizacao = setPaginaMock.mock.calls[0][0];
    expect(funcaoAtualizacao(6)).toBe(7); // Simula a execução da função

    // Testar botão de voltar 1 página
    fireEvent.click(screen.getByRole("button", { name: "Voltar 1 Página" }));
    funcaoAtualizacao = setPaginaMock.mock.calls[1][0];
    expect(funcaoAtualizacao(6)).toBe(5);

    // Testar botão de avançar 5 páginas
    fireEvent.click(screen.getByRole("button", { name: "Avançar 5 Páginas" }));
    funcaoAtualizacao = setPaginaMock.mock.calls[2][0];
    expect(funcaoAtualizacao(6)).toBe(11); // Máximo é 11
    
    
    // Testar botão de voltar 5 páginas
    fireEvent.click(screen.getByRole("button", { name: "Voltar 5 Páginas" }));
    funcaoAtualizacao = setPaginaMock.mock.calls[3][0];
    expect(funcaoAtualizacao(6)).toBe(1); // Mínimo é 1

    // Testar botão de ir para a última página
    fireEvent.click(screen.getByRole("button", { name: "Última Página" }));
    expect(setPaginaMock).toHaveBeenCalledWith(11);

    // Testar botão de ir para a primeira página
    fireEvent.click(screen.getByRole("button", { name: "Primeira Página" }));
    expect(setPaginaMock).toHaveBeenCalledWith(1);
  });
});