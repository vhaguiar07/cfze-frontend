import React, { useEffect, useState } from "react";
import { listEmployeePPERecords, searchPPERecordsByEmployeeName } from "../../../api/ppeApi";
import EmployeePPECreateModal from "../../../components/modal/ppe/EmployeePPECreateModal";
import EmployeePPEDetailsModal from "../../../components/modal/ppe/EmployeePPEDetailsModal";
import { EmployeePPEControl } from "../../../interfaces/ppe-interface";

const PPERecords = () => {
  const [ppeRecords, setPpeRecords] = useState<EmployeePPEControl[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<EmployeePPEControl | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const limit = 10;

  const fetchPPERecords = async () => {
    setIsLoading(true);
    try {
      let data;
      if (isSearching && searchTerm.trim() !== "") {
        data = await searchPPERecordsByEmployeeName(searchTerm, page, limit);
      } else {
        data = await listEmployeePPERecords(page, limit);
      }
      setPpeRecords(data.records);
      setTotal(data.total);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPPERecords();
  }, [page, isSearching]);

  const handleSearch = () => {
    setPage(1);
    setIsSearching(searchTerm.trim() !== "");
    fetchPPERecords();
  };

  const openDetailsModal = (record: EmployeePPEControl) => {
    setSelectedRecord(record);
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
          <h2 className="font-bold">Lista de Registros de EPI</h2>
          <button className="button cadastrar-acidente" onClick={() => setIsCreateModalOpen(true)}>
            + Cadastrar EPI
          </button>
        </div>
        {isLoading ? (
          <p>Carregando...</p>
        ) : ppeRecords.length > 0 ? (
          <>
            <div className="wrap-table100">
              <div className="table">
                <div className="row header">
                  <div className="cell">Funcionário</div>
                  <div className="cell">Descrição do EPI</div>
                  <div className="cell">Setor</div>
                  <div className="cell">Quantidade</div>
                  <div className="cell">Situação</div>
                  <div className="cell">Ações</div>
                </div>
                {ppeRecords.map((record) => (
                  <div className="row" key={record.id}>
                    <div className="cell" data-title="Funcionário">
                      {record.employeeName}
                    </div>
                    <div className="cell" data-title="Descrição do EPI">
                      {record.ppeDescription}
                    </div>
                    <div className="cell" data-title="Setor">
                      {record.department}
                    </div>
                    <div className="cell" data-title="Quantidade">
                      {record.quantity}
                    </div>
                    <div className="cell" data-title="Situação">
                      {record.situation}
                    </div>
                    <div className="cell" data-title="Ações">
                      <button className="button" onClick={() => {openDetailsModal(record) }}>
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
            <p>Nenhum registro de EPI encontrado.</p>
          )}
        {isCreateModalOpen && <EmployeePPECreateModal onClose={() => setIsCreateModalOpen(false)} />}
        {isDetailsModalOpen && selectedRecord && (
          <EmployeePPEDetailsModal
            record={selectedRecord}
            onClose={() => setIsDetailsModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default PPERecords;
