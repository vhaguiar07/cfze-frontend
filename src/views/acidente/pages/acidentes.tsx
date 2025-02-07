import React, { useEffect, useState } from "react";
import { listAccidents } from "../../../api/acidenteApi";
import AccidentDetailsModal from "../../../components/modal/AccidentDetailsModal";
import { Accident } from "../../../interfaces/accident-interface";
import "./css/acidentes.css";

const Acidentes = () => {
  const [accidents, setAccidents] = useState<Accident[]>([]);
  const [selectedAccident, setSelectedAccident] = useState<Accident | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAccidents = async () => {
      try {
        const data = await listAccidents();
        setAccidents(data.accidents);
      } catch (error) {
        console.error("Erro ao buscar acidentes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getAccidents();
  }, []);

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

      {isLoading ? ( 
        <p>Carregando...</p> 
      ) : accidents.length > 0 ? (
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
