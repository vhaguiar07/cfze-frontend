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
  const [searchTerm, setSearchTerm] = useState("");
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
    <div className="main-containt-tables">
      <div className="container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar por nome do funcionário..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="button" onClick={handleSearch}>Buscar</button>
        </div>
        <div className="header">
          <h2 className="font-bold">Lista de Benefícios</h2>
          <button className="button cadastrar-acidente" onClick={() => setIsCreateModalOpen(true)}>
            + Cadastrar Benefício
          </button>
        </div>
        {isLoading ? (
          <p>Carregando...</p>
        ) : benefits.length > 0 ? (
          <>
            <div className="wrap-table100">
              <div className="table">
                <div className="row header">
                  <div className="cell">Funcionário</div>
                  <div className="cell">Benefício</div>
                  <div className="cell">Período</div>
                  <div className="cell">Valor Total</div>
                  <div className="cell">Ações</div>
                </div>
                {benefits.map((benefit) => (
                  <div className="row" key={benefit.id}>
                    <div className="cell" data-title="Funcionário">
                      {benefit.employeeCpf}
                    </div>
                    <div className="cell" data-title="Benefício">
                      {benefit.benefit}
                    </div>
                    <div className="cell" data-title="Período">
                      {benefit.referencePeriod}
                    </div>
                    <div className="cell" data-title="Valor Total">
                      R$ {benefit.totalPrice}
                    </div>
                    <div className="cell" data-title="Ações">
                      <button className="button" onClick={() => openDetailsModal(benefit)}>
                        Visualizar Detalhes
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pagination">
              <button className="button" disabled={page === 1} onClick={() => setPage(page - 1)}>
                Anterior
              </button>
              <span className="font">Página {page}</span>
              <button className="button" disabled={page * limit >= total} onClick={() => setPage(page + 1)}>
                Próxima
              </button>
            </div>
          </>
        ) : (
          <p>Nenhum benefício encontrado.</p>
        )}
        {isCreateModalOpen && <EmployeeBenefitCreateModal onClose={() => setIsCreateModalOpen(false)} />}
        {isDetailsModalOpen && selectedBenefit && (
          <EmployeeBenefitDetailsModal
            benefit={selectedBenefit}
            onClose={() => setIsDetailsModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Beneficios;
