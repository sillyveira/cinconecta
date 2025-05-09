import {render, screen} from "@testing-library/react";
import Header from "../../../src/componentes/Header";

describe("Componente: Header", () => {
    test("Deve renderizar o título corretamente", () => {
        render(<Header titulo="Meu Título" />);
        const tituloElement = screen.getByText(/Meu Título/i);
        expect(tituloElement).toBeInTheDocument();
      });
      
      test("deve aplicar a classe do TailwindCSS corretamente", () => {
        const { container } = render(<Header titulo="Teste" className="text-black" />);
        expect(container.firstChild).toHaveClass("text-black");
      });
})