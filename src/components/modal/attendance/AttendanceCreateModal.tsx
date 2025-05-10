import React, { useState, useRef } from "react";
import { createAttendanceRecord } from "../../../api/attendanceApi";

interface AttendanceCreateModalProps {
  onClose: () => void;
}

const AttendanceCreateModal: React.FC<AttendanceCreateModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    employeeCpf: "",
    companyCnpj: "",
    area: "",
    jobTitle: "",
    referencePeriod: "",
    absenceDescription: "",
    situation: "",
    workDays: 0,
    absences: 0,
    medicalLeaveDays: 0,
    extraDays: 0,
    justifiedAbsenceDays: 0,
    workedDays: 0,
    date: "",
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createAttendanceRecord(formData);
      alert("Registro de frequência cadastrado com sucesso!");
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
        <h2 className="font-bold mb-30 color-orange ta-left">Cadastrar Frequência</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">CPF do Funcionário:</div>
              <div className="campo-div">
                <input
                  className="campo-input"
                  type="text"
                  name="employeeCpf"
                  placeholder="CPF do Funcionário"
                  value={formData.employeeCpf}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="input-container">
              <div className="campo-titulo">CNPJ da Empresa:</div>
              <div className="campo-div">
                <input
                  className="campo-input"
                  type="text"
                  name="companyCnpj"
                  placeholder="CNPJ da Empresa"
                  value={formData.companyCnpj}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Área:</div>
              <div className="campo-div">
                <input
                  className="campo-input"
                  type="text"
                  name="area"
                  placeholder="Área"
                  value={formData.area}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="input-container">
              <div className="campo-titulo">Cargo:</div>
              <div className="campo-div">
                <input
                  className="campo-input"
                  type="text"
                  name="jobTitle"
                  placeholder="Cargo"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Período de Referência:</div>
              <div className="campo-div">
                <input
                  className="campo-input"
                  type="text"
                  name="referencePeriod"
                  placeholder="Período de Referência"
                  value={formData.referencePeriod}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="input-container">
              <div className="campo-titulo">Descrição da Falta:</div>
              <div className="campo-div">
                <input
                  className="campo-input"
                  type="text"
                  name="absenceDescription"
                  placeholder="Descrição da Falta"
                  value={formData.absenceDescription}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Situação:</div>
              <div className="campo-div">
                <input
                  className="campo-input"
                  type="text"
                  name="situation"
                  placeholder="Situação"
                  value={formData.situation}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Dias Trabalhados:</div>
              <div className="campo-div">
                <input
                  className="campo-input"
                  type="number"
                  name="workDays"
                  placeholder="Dias Trabalhados"
                  value={formData.workDays}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="input-container">
              <div className="campo-titulo">Faltas:</div>
              <div className="campo-div">
                <input
                  className="campo-input"
                  type="number"
                  name="absences"
                  placeholder="Faltas"
                  value={formData.absences}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Dias de Afastamento Médico:</div>
              <div className="campo-div">
                <input
                  className="campo-input"
                  type="number"
                  name="medicalLeaveDays"
                  placeholder="Dias de Afastamento Médico"
                  value={formData.medicalLeaveDays}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="input-container">
              <div className="campo-titulo">Dias Extras:</div>
              <div className="campo-div">
                <input
                  className="campo-input"
                  type="number"
                  name="extraDays"
                  placeholder="Dias Extras"
                  value={formData.extraDays}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Faltas Justificadas:</div>
              <div className="campo-div">
                <input
                  className="campo-input"
                  type="number"
                  name="justifiedAbsenceDays"
                  placeholder="Faltas Justificadas"
                  value={formData.justifiedAbsenceDays}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="input-container">
              <div className="campo-titulo">Dias Efetivamente Trabalhados:</div>
              <div className="campo-div">
                <input
                  className="campo-input"
                  type="number"
                  name="workedDays"
                  placeholder="Dias Efetivamente Trabalhados"
                  value={formData.workedDays}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Data do Registro:</div>
              <div className="campo-div">
                <input
                  className="campo-input"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Comentários:</div>
              <div className="campo-div">
                <textarea
                  className="campo-input"
                  name="comments"
                  placeholder="Comentários"
                  value={formData.comments}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="modal-buttons">
            <button className="button" type="submit" disabled={isLoading}>
              {isLoading ? "Cadastrando..." : "Cadastrar"}
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

export default AttendanceCreateModal;
