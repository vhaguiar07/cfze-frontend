import React, { useState, useRef } from "react";
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
  
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

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
  
  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div className="modal-content" ref={modalRef}>
        <h2 className="font-bold mb-30 color-orange ta-left">Editar Acidente</h2>
        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Número do Acidente:</div>
              <div className="campo-div">
                <input className="campo-input" type="text" name="accidentNumber" value={formData.accidentNumber} onChange={handleChange} disabled />
              </div>
            </div>
          </div>

          <label>Afastamento:</label>
          <input type="checkbox" name="accidentsWithLeave" checked={formData.accidentsWithLeave} onChange={() => setFormData({ ...formData, accidentsWithLeave: !formData.accidentsWithLeave })} />

          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Tipo do Acidente:</div>
              <div className="campo-div">
                <input className="campo-input" type="text" name="accidentType" value={formData.accidentType} onChange={handleChange} disabled />
              </div>
            </div>
            <div className="input-container">
              <div className="campo-titulo">Data do Acidente:</div>
              <div className="campo-div">
                <input className="campo-input" type="text" name="accidentDate" value={formData.accidentDate} onChange={handleChange} required />
              </div>
            </div>
          </div>

          <div className="input-container">
            <div className="campo-titulo">Descrição:</div>
            <div className="campo-div">
              <textarea className="campo-input" name="accidentDescription" value={formData.accidentDescription} onChange={handleChange} disabled />
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Parte do Corpo Atingida:</div>
              <div className="campo-div">
                <input className="campo-input" type="text" name="bodyPartAffected" value={formData.bodyPartAffected} onChange={handleChange} disabled />
              </div>
            </div>
            <div className="input-container">
              <div className="campo-titulo">Gravidade:</div>
              <div className="campo-div">
                <input className="campo-input" type="text" name="injurySeverity" value={formData.injurySeverity} onChange={handleChange} disabled />
              </div>
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Tipo:</div>
              <div className="campo-div">
                <select className="campo-select" name="accidentOrIncident" value={formData.accidentOrIncident} onChange={handleChange}>
                  <option value="Acidente">Acidente</option>
                  <option value="Incidente">Incidente</option>
                </select>
              </div>
            </div>
            <div className="input-container">
              <div className="campo-titulo">Atestados Médicos:</div>
              <div className="campo-div">
                <input className="campo-input" type="text" name="medicalCertificates" value={formData.medicalCertificates} onChange={handleChange} disabled />
              </div>
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Horas Afastado:</div>
              <div className="campo-div">
                <input className="campo-input" type="text" name="hoursAway" value={formData.hoursAway} onChange={handleChange} disabled />
              </div>
            </div>
            <div className="input-container">
              <div className="campo-titulo">Dias Afastado:</div>
              <div className="campo-div">
                <input className="campo-input" type="text" name="daysAway" value={formData.daysAway} onChange={handleChange} required />
              </div>
            </div>
          </div>

          <div className="input-container">
            <div className="campo-titulo">Comentários:</div>
            <div className="campo-div">
              <input className="campo-input" type="text" name="comments" value={formData.comments} onChange={handleChange} disabled />
            </div>
          </div>

          <div className="modal-buttons">
            <button className="button" type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar"}
            </button>
            <button className="button-cancel" type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AccidentDetailsModal;
