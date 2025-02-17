import React, { useEffect, useState } from "react";
import { listEmployeeBenefits, searchBenefitsByEmployeeName } from "../../../api/benefitApi";
import EmployeeBenefitCreateModal from "../../../components/modal/benefit/EmployeeBenefitCreateModal";
import EmployeeBenefitDetailsModal from "../../../components/modal/benefit/EmployeeBenefitDetailsModal";
import { EmployeeBenefit } from "../../../interfaces/benefit-interface";

const Beneficios = () => {
  const [benefits, setBenefits] = useState<EmployeeBenefit[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedBenefit, setSelectedBenefit] = useState<EmployeeBenefit | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); // Estado do campo de pesquisa
  const [isSearching, setIsSearching] = useState(false);
  const limit = 10;

  const fetchBenefits = async () => {
    setIsLoading(true);
    try {
      let data;
      if (isSearching && searchTerm.trim() !== "") {
        data = await searchBenefitsByEmployeeName(searchTerm, page, limit);
      } else {
        data = await listEmployeeBenefits(page, limit);
      }
      setBenefits(data.benefits);
      setTotal(data.total);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBenefits();
  }, [page, isSearching]);

  const handleSearch = () => {
    setPage(1);
    setIsSearching(searchTerm.trim() !== "");
    fetchBenefits();
  };

  const openDetailsModal = (benefit: EmployeeBenefit) => {
    setSelectedBenefit(benefit);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Lista de Benefícios</h2>
        <button className="button cadastrar-beneficio" onClick={() => setIsCreateModalOpen(true)}>
          Cadastrar Benefício
        </button>
      </div>

      {/* Campo de pesquisa */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por nome do funcionário..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {isLoading ? (
        <p>Carregando...</p>
      ) : benefits.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Funcionário</th>
              <th>Benefício</th>
              <th>Período</th>
              <th>Valor Total</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {benefits.map((benefit) => (
              <tr key={benefit.id}>
                <td>{benefit.employeeCpf}</td>
                <td>{benefit.benefit}</td>
                <td>{benefit.referencePeriod}</td>
                <td>R$ {benefit.totalPrice}</td>
                <td>
                  <button
                    className="button detalhes-beneficio"
                    onClick={() => openDetailsModal(benefit)}
                  >
                    Visualizar Detalhes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum benefício encontrado.</p>
      )}

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Anterior</button>
        <span>Página {page}</span>
        <button disabled={page * limit >= total} onClick={() => setPage(page + 1)}>Próxima</button>
      </div>

      {isCreateModalOpen && <EmployeeBenefitCreateModal onClose={() => setIsCreateModalOpen(false)} />}
      {isDetailsModalOpen && selectedBenefit && (
        <EmployeeBenefitDetailsModal
          benefit={selectedBenefit}
          onClose={() => setIsDetailsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Beneficios;
