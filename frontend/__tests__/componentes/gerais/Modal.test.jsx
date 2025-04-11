import { render, screen, fireEvent } from "@testing-library/react";
import ModalCC from "../../../src/componentes/Modal";
import Modal from "react-modal";
import { describe, test, expect, vi } from "vitest";

// Configuração necessária para o react-modal funcionar corretamente nos testes
Modal.setAppElement(document.body);

describe("Componente: ModalCC", () => {
  test("deve renderizar o título corretamente quando aberto", () => {
    render(<ModalCC titulo="Meu Modal" isOpen={true} onClose={() => {}} />);
    expect(screen.getByText(/Meu Modal/i)).toBeInTheDocument();
  });

  test("deve exibir o conteúdo do children quando aberto", () => {
    render(
      <ModalCC titulo="Teste" isOpen={true} onClose={() => {}}>
        <p>Conteúdo do Modal</p>
      </ModalCC>
    );
    expect(screen.getByText(/Conteúdo do Modal/i)).toBeInTheDocument();
  });

  test("não deve renderizar quando isOpen for false", () => {
    const { container } = render(<ModalCC titulo="Oculto" isOpen={false} onClose={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  test("deve chamar onClose ao clicar no botão de fechar", () => {
    const onCloseMock = vi.fn();
    render(<ModalCC titulo="Fechar Teste" isOpen={true} onClose={onCloseMock} />);
  
    // Busca pelo botão de fechar usando o texto "x"
    fireEvent.click(screen.getByText("x"));
  
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });  
});