import { render, screen, fireEvent } from "@testing-library/react";
import Botao from "../../../src/componentes/Botao";
import { describe, test, expect, vi } from "vitest";

describe("Componente: Botao", () => {
  test("deve renderizar o texto corretamente", () => {
    render(<Botao texto="Clique Aqui" />);
    const botaoElement = screen.getByRole("button", { name: /clique aqui/i });
    expect(botaoElement).toBeInTheDocument();
  });

  test("deve aplicar a classe do TailwindCSS corretamente", () => {
    const { container } = render(<Botao texto="Teste" className="text-black" />);
    const botao = container.querySelector("button");
    expect(botao).toHaveClass("text-black");
  });

  test("deve chamar a função onClick ao ser clicado", () => {
    const onClickMock = vi.fn();
    render(<Botao texto="Clique" onClick={onClickMock} />);
    const botaoElement = screen.getByRole("button", { name: /clique/i });
    fireEvent.click(botaoElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test("não deve chamar onClick quando estiver desabilitado", () => {
    const onClickMock = vi.fn();
    render(<Botao texto="Não Clique" onClick={onClickMock} disabled />);
    const botaoElement = screen.getByRole("button", { name: /não clique/i });
    
    expect(botaoElement).toBeDisabled();
    fireEvent.click(botaoElement);
    expect(onClickMock).not.toHaveBeenCalled();
  });
  

  test("deve ter a classe 'cursor-not-allowed' quando estiver desabilitado", () => {
    const { container } = render(<Botao texto="Desativado" disabled />);
    const botao = container.querySelector("button");
    expect(botao).toHaveClass("cursor-not-allowed");
  });

  test("deve ter a classe 'bg-cor-primaria' quando estiver ativo", () => {
    const { container } = render(<Botao texto="Ativo" />);
    const botao = container.querySelector("button");
    expect(botao).toHaveClass("bg-cor-primaria");
  });
});