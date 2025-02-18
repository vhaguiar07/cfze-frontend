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
    <div className="container">
      <div className="header">
        <h2>Lista de Registros de EPI</h2>
        <button className="button cadastrar-epi" onClick={() => setIsCreateModalOpen(true)}>
          Cadastrar EPI
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
      ) : ppeRecords.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Funcionário</th>
              <th>Descrição do EPI</th>
              <th>Setor</th>
              <th>Quantidade</th>
              <th>Situação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {ppeRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.employeeName}</td>
                <td>{record.ppeDescription}</td>
                <td>{record.department}</td>
                <td>{record.quantity}</td>
                <td>{record.situation}</td>
                <td>
                  <button
                    className="button detalhes-epi"
                    onClick={() => openDetailsModal(record)}
                  >
                    Visualizar Detalhes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum registro de EPI encontrado.</p>
      )}

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Anterior</button>
        <span>Página {page}</span>
        <button disabled={page * limit >= total} onClick={() => setPage(page + 1)}>Próxima</button>
      </div>

      {isCreateModalOpen && <EmployeePPECreateModal onClose={() => setIsCreateModalOpen(false)} />}
      {isDetailsModalOpen && selectedRecord && (
        <EmployeePPEDetailsModal
          record={selectedRecord}
          onClose={() => setIsDetailsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PPERecords;
