import React from "react";
import { Accident } from "../../interfaces/accident-interface"; 
import "./css/AccidentDetailsModal.css";

interface AccidentDetailsModalProps {
  accident: Accident;
  onClose: () => void;
}

const AccidentDetailsModal: React.FC<AccidentDetailsModalProps> = ({ accident, onClose }) => {
  if (!accident) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Detalhes do Acidente</h2>
        <p><strong>Número do Acidente (CAT):</strong> {accident.accidentNumber}</p>
        <p><strong>Data do Acidente:</strong> {new Date(accident.accidentDate).toLocaleString()}</p>
        <p><strong>Nome do Funcionário:</strong> {accident.employee.fullName}</p>
        <p><strong>Cargo:</strong> {accident.jobTitle}</p>
        <p><strong>Tipo do Acidente:</strong> {accident.accidentType}</p>
        <p><strong>Descrição:</strong> {accident.accidentDescription}</p>
        <p><strong>Afastamento:</strong> {accident.accidentsWithLeave ? "Sim" : "Não"}</p>
        <p><strong>Parte do Corpo Atingida:</strong> {accident.bodyPartAffected}</p>
        <p><strong>Gravidade da Lesão:</strong> {accident.injurySeverity}</p>
        <p><strong>Tipo:</strong> {accident.accidentOrIncident}</p>
        <p><strong>Atestados Médicos:</strong> {accident.medicalCertificates}</p>
        <p><strong>Dias Afastado:</strong> {accident.daysAway}</p>
        <p><strong>Comentários:</strong> {accident.comments || "Nenhum"}</p>
        <button className="modal-button" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default AccidentDetailsModal;
