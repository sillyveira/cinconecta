import { render, screen, fireEvent } from '@testing-library/react';
import AuditCard from "../../../src/componentes/AuditCard";
import { vi } from "vitest";

describe("Componente AuditCard", () => {
    test("deve renderizar o título, horário e data corretamente", () => {
      render(
        <AuditCard
            titulo="api teste2 logou em sua conta."
            horario="10:00"
            data="23/10/2025"
            funcaoClique={() => {}}
        />
      );
      expect(screen.getByText("api teste2 logou em sua conta.")).toBeInTheDocument();
      expect(screen.getByText("10:00")).toBeInTheDocument();
      expect(screen.getByText("23/10/2025")).toBeInTheDocument();
    });

    test ("deve chamar funcaoClique ao clicar no botão de info", () => {
        const funcaoCliqueMock = vi.fn();
        render(
            <AuditCard
            titulo="api teste2 logou em sua conta."
            horario="10:00"
            data="23/10/2025"
            funcaoClique={funcaoCliqueMock}
        />
        );
        const botaoInfo = screen.getByRole("button", { name: "Ativar Modal" });
        fireEvent.click(botaoInfo);
        expect(funcaoCliqueMock).toHaveBeenCalledTimes(1);
    });

});