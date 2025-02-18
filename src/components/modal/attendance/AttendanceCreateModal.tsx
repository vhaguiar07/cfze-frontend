import React, { useState } from "react";
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

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Cadastrar Frequência</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="employeeCpf" placeholder="CPF do Funcionário" value={formData.employeeCpf} onChange={handleChange} required />
          <input type="text" name="companyCnpj" placeholder="CNPJ da Empresa" value={formData.companyCnpj} onChange={handleChange} required />
          <input type="text" name="area" placeholder="Área" value={formData.area} onChange={handleChange} />
          <input type="text" name="jobTitle" placeholder="Cargo" value={formData.jobTitle} onChange={handleChange} required />
          <input type="text" name="referencePeriod" placeholder="Período de Referência" value={formData.referencePeriod} onChange={handleChange} required />

          <input type="text" name="absenceDescription" placeholder="Descrição da Falta" value={formData.absenceDescription} onChange={handleChange} />
          <input type="text" name="situation" placeholder="Situação" value={formData.situation} onChange={handleChange} required />

          <input type="number" name="workDays" placeholder="Dias Trabalhados" value={formData.workDays} onChange={handleChange} required />
          <input type="number" name="absences" placeholder="Faltas" value={formData.absences} onChange={handleChange} required />
          <input type="number" name="medicalLeaveDays" placeholder="Dias de Afastamento Médico" value={formData.medicalLeaveDays} onChange={handleChange} required />
          <input type="number" name="extraDays" placeholder="Dias Extras" value={formData.extraDays} onChange={handleChange} required />
          <input type="number" name="justifiedAbsenceDays" placeholder="Faltas Justificadas" value={formData.justifiedAbsenceDays} onChange={handleChange} required />
          <input type="number" name="workedDays" placeholder="Dias Efetivamente Trabalhados" value={formData.workedDays} onChange={handleChange} required />

          <input type="date" name="date" placeholder="Data do Registro" value={formData.date} onChange={handleChange} required />

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

export default AttendanceCreateModal;
