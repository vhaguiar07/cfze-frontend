import React, { useState } from "react";
import { updateAccident } from "../../../api/acidenteApi";
import { UpdateAccidentControl } from "../../../interfaces/accident-interface"; 
import "./css/AccidentDetailsModal.css";

interface AccidentDetailsModalProps {
  accident: UpdateAccidentControl;
  onClose: () => void;
}

const AccidentDetailsModal: React.FC<AccidentDetailsModalProps> = ({ accident, onClose }) => {
  const [formData, setFormData] = useState<UpdateAccidentControl>({
    id: accident.id,
    accidentNumber: accident.accidentNumber,
    accidentDate: accident.accidentDate ? accident.accidentDate.slice(0, 16) : "",
    accidentType: accident.accidentType,
    accidentDescription: accident.accidentDescription,
    accidentsWithLeave: accident.accidentsWithLeave,
    bodyPartAffected: accident.bodyPartAffected,
    injurySeverity: accident.injurySeverity,
    accidentOrIncident: accident.accidentOrIncident,
    medicalCertificates: accident.medicalCertificates,
    daysAway: accident.daysAway,
    hoursAway: accident.hoursAway,
    comments: accident.comments,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      if (!accident || !accident.id) {
        throw new Error("ID do acidente não encontrado.");
      }
  
      const formattedData: UpdateAccidentControl = {
        ...formData,
        accidentDate: formData.accidentDate 
          ? new Date(formData.accidentDate).toISOString() 
          : undefined,
      };
      
      await updateAccident(accident.id, formattedData);
      alert("Acidente atualizado com sucesso!");
      onClose();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao atualizar o acidente");
    }
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Editar Acidente</h2>
        <form onSubmit={handleSubmit}>
          <label>Número do Acidente:</label>
          <input type="text" name="accidentNumber" value={formData.accidentNumber} onChange={handleChange} disabled />

          <label>Data do Acidente:</label>
          <input type="datetime-local" name="accidentDate" value={formData.accidentDate} onChange={handleChange} />

          <label>Tipo do Acidente:</label>
          <input type="text" name="accidentType" value={formData.accidentType} onChange={handleChange} />

          <label>Descrição:</label>
          <textarea name="accidentDescription" value={formData.accidentDescription} onChange={handleChange} />

          <label>Afastamento:</label>
          <input type="checkbox" name="accidentsWithLeave" checked={formData.accidentsWithLeave} onChange={() => setFormData({ ...formData, accidentsWithLeave: !formData.accidentsWithLeave })} />

          <label>Parte do Corpo Atingida:</label>
          <input type="text" name="bodyPartAffected" value={formData.bodyPartAffected} onChange={handleChange} />

          <label>Gravidade:</label>
          <input type="text" name="injurySeverity" value={formData.injurySeverity} onChange={handleChange} />

          <label>Tipo:</label>
          <select name="accidentOrIncident" value={formData.accidentOrIncident} onChange={handleChange}>
            <option value="Acidente">Acidente</option>
            <option value="Incidente">Incidente</option>
          </select>

          <label>Atestados Médicos:</label>
          <input type="number" name="medicalCertificates" value={formData.medicalCertificates} onChange={handleChange} />

          <label>Dias Afastado:</label>
          <input type="number" name="daysAway" value={formData.daysAway} onChange={handleChange} />

          <label>Horas Afastado:</label>
          <input type="number" name="hoursAway" value={formData.hoursAway} onChange={handleChange} />

          <label>Comentários:</label>
          <textarea name="comments" value={formData.comments} onChange={handleChange} />

          <div className="modal-buttons">
            <button type="submit">Salvar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccidentDetailsModal;
