import React, { useState, useRef } from "react";
import { createAccident } from "../../../api/acidenteApi";
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
  const modalRef = useRef<HTMLDivElement>(null);

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

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div className="modal-content" ref={modalRef}>
        <h2 className="font-bold mb-30 color-orange ta-left">Cadastrar Acidente</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <div className="font-bold">Afastamento por acidente?</div>
            <input type="checkbox" name="accidentsWithLeave" checked={formData.accidentsWithLeave} onChange={handleCheckboxChange} />
          </label>
          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">CPF</div>
              <div className="campo-div">
                <input className="campo-input" type="text" name="cpf" value={formData.cpf} onChange={handleChange} required />
              </div>
            </div>
            <div className="input-container">
              <div className="campo-titulo">Número do Acidente (CAT)</div>
              <div className="campo-div">
                <input className="campo-input" type="text" name="accidentNumber" value={formData.accidentNumber} onChange={handleChange} required />
              </div>
            </div>
          </div>
          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Data do Acidente</div>
              <div className="campo-div">
                <input className="campo-input" type="datetime-local" name="accidentDate" value={formData.accidentDate} onChange={handleChange} required />
              </div>
            </div>
            <div className="input-container">
              <div className="campo-titulo">Tipo do Acidente</div>
              <div className="campo-div">
                <input className="campo-input" type="text" name="accidentType" value={formData.accidentType} onChange={handleChange} required />
              </div>
            </div>
          </div>
          <div className="input-container">
            <div className="campo-titulo">Descrição do Acidente</div>
            <div className="campo-div">
              <textarea className="campo-input" name="accidentDescription" value={formData.accidentDescription} onChange={handleChange} required />
            </div>
          </div>
          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Parte do Corpo Atingida</div>
              <div className="campo-div">
                <input className="campo-input" type="text" name="bodyPartAffected" value={formData.bodyPartAffected} onChange={handleChange} required />
              </div>
            </div>
            <div className="input-container">
              <div className="campo-titulo">Gravidade da Lesão</div>
              <div className="campo-div">
                <input className="campo-input" type="text" name="injurySeverity" value={formData.injurySeverity} onChange={handleChange} required />
              </div>
            </div>
          </div>
          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Número de Atestados</div>
              <div className="campo-div">
                <input className="campo-input" type="text" name="medicalCertificates" value={formData.medicalCertificates} onChange={handleChange} required />
              </div>
            </div>
            <div className="input-container">
              <div className="campo-titulo">Dias de Afastamento</div>
              <div className="campo-div">
                <input className="campo-input" type="text" name="daysAway" value={formData.daysAway} onChange={handleChange} />
              </div>
            </div>
          </div>
          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Horas de Afastamento</div>
              <div className="campo-div">
                <input className="campo-input" type="text" name="hoursAway" value={formData.hoursAway} onChange={handleChange} />
              </div>
            </div>
            <div className="input-container">
              <div className="campo-titulo">Acidente ou Incidente</div>
              <div className="campo-div">
                <select className="campo-input" name="accidentOrIncident" value={formData.accidentOrIncident} onChange={handleChange} required>
                  <option value="">Selecione</option>
                  <option value="Acidente">Acidente</option>
                  <option value="Incidente">Incidente</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-container">
            <div className="campo-titulo">Comentários</div>
            <div className="campo-div">
              <textarea className="campo-input" name="comments" value={formData.comments} onChange={handleChange} />
            </div>
            <div className="modal-buttons">
              <button className="button" type="submit" disabled={isLoading}>
                {isLoading ? "Cadastrando..." : "Cadastrar"}
              </button>
              <button className="button-cancel" type="button" onClick={onClose}>
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccidentCreateModal;
