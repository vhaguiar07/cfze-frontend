import React, { useState } from "react";
import { createAccident } from "../../api/acidenteApi";
import "./css/AccidentCreateModal.css";

interface AccidentCreateModalProps {
  onClose: () => void;
}

const AccidentCreateModal: React.FC<AccidentCreateModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    cpf: "",
    accidentNumber: "",
    accidentDate: "",
    accidentType: "",
    accidentDescription: "",
    accidentsWithLeave: false,
    bodyPartAffected: "",
    injurySeverity: "",
    accidentOrIncident: "",
    medicalCertificates: "",
    daysAway: "",
    hoursAway: "",
    comments: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      accidentsWithLeave: e.target.checked,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formattedData = {
        ...formData,
        accidentDate: new Date(formData.accidentDate).toISOString(),
      };

      await createAccident(formattedData);
      alert("Acidente cadastrado com sucesso!");
      onClose();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Cadastrar Acidente</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="cpf" placeholder="CPF do Funcionário" value={formData.cpf} onChange={handleChange} required />
          <input type="text" name="accidentNumber" placeholder="Número do Acidente (CAT)" value={formData.accidentNumber} onChange={handleChange} required />
          <input type="datetime-local" name="accidentDate" value={formData.accidentDate} onChange={handleChange} required />
          <input type="text" name="accidentType" placeholder="Tipo do Acidente" value={formData.accidentType} onChange={handleChange} required />
          <textarea name="accidentDescription" placeholder="Descrição do Acidente" value={formData.accidentDescription} onChange={handleChange} required />
          
          <label>
            <input type="checkbox" name="accidentsWithLeave" checked={formData.accidentsWithLeave} onChange={handleCheckboxChange} />
            Afastamento por acidente?
          </label>

          <input type="text" name="bodyPartAffected" placeholder="Parte do Corpo Atingida" value={formData.bodyPartAffected} onChange={handleChange} required />
          <input type="text" name="injurySeverity" placeholder="Gravidade da Lesão" value={formData.injurySeverity} onChange={handleChange} required />
          
          <select name="accidentOrIncident" value={formData.accidentOrIncident} onChange={handleChange} required>
            <option value="">Selecione</option>
            <option value="Acidente">Acidente</option>
            <option value="Incidente">Incidente</option>
          </select>

          <input type="number" name="medicalCertificates" placeholder="Número de Atestados" value={formData.medicalCertificates} onChange={handleChange} required />
          <input type="number" name="daysAway" placeholder="Dias de Afastamento" value={formData.daysAway} onChange={handleChange} />
          <input type="number" name="hoursAway" placeholder="Horas de Afastamento" value={formData.hoursAway} onChange={handleChange} />
          <textarea name="comments" placeholder="Comentários" value={formData.comments} onChange={handleChange} />

          <div className="modal-buttons">
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Cadastrando..." : "Cadastrar"}
            </button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccidentCreateModal;
