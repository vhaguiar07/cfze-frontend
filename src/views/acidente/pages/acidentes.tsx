import React, { useEffect, useState } from "react";
import { listAccidents, searchAccidentsByEmployeeName } from "../../../api/acidenteApi";
import AccidentDetailsModal from "../../../components/modal/AccidentDetailsModal";
import { Accident } from "../../../interfaces/accident-interface";
import "./css/acidentes.css";

const Acidentes = () => {
  const [accidents, setAccidents] = useState<Accident[]>([]);
  const [selectedAccident, setSelectedAccident] = useState<Accident | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(10);

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const fetchAccidents = async () => {
    setIsLoading(true);
    try {
      let data;
      if (isSearching && searchTerm.trim() !== "") {
        data = await searchAccidentsByEmployeeName(searchTerm, page, limit);
      } else {
        data = await listAccidents(page, limit);
      }
      setAccidents(data.accidents);
      setTotal(data.total);
    } catch (error) {
      console.error("Erro ao buscar acidentes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAccidents();
  }, [page, limit, isSearching]);

  const handleSearch = async () => {
    setPage(1);
    setIsSearching(searchTerm.trim() !== "");
    fetchAccidents();
  };

  const openModal = (accident: Accident) => {
    setSelectedAccident(accident);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAccident(null);
  };

  return (
    <div className="acidentes-container">
      <h2>Lista de Acidentes</h2>

      {/* Campo de busca */}
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
      ) : accidents.length > 0 ? (
        <>
          <table className="acidentes-table">
            <thead>
              <tr>
                <th>Nome do Funcionário</th>
                <th>Cargo</th>
                <th>Dias Afastados</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {accidents.map((accident) => (
                <tr key={accident.id}>
                  <td>{accident.employee.fullName}</td>
                  <td>{accident.jobTitle}</td>
                  <td>{accident.daysAway}</td>
                  <td>
                    <button className="acidentes-button" onClick={() => openModal(accident)}>
                      Visualizar Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginação */}
          <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Anterior
            </button>
            <span>Página {page}</span>
            <button disabled={page * limit >= total} onClick={() => setPage(page + 1)}>
              Próxima
            </button>
          </div>
        </>
      ) : (
        <p>Nenhum acidente encontrado.</p>
      )}

      {isModalOpen && selectedAccident && (
        <AccidentDetailsModal accident={selectedAccident} onClose={closeModal} />
      )}
    </div>
  );
};

export default Acidentes;
