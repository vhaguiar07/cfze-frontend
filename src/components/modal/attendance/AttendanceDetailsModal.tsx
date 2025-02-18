import React, { useState } from "react";
import { updateAttendanceRecord } from "../../../api/attendanceApi";
import { UpdateAttendanceRecord } from "../../../interfaces/attendance-interface";

interface AttendanceDetailsModalProps {
  record: UpdateAttendanceRecord & { id: string; employeeCpf: string; companyCnpj: string };
  onClose: () => void;
}

const AttendanceDetailsModal: React.FC<AttendanceDetailsModalProps> = ({ record, onClose }) => {
  const [formData, setFormData] = useState<UpdateAttendanceRecord>({
    referencePeriod: record.referencePeriod,
    area: record.area,
    jobTitle: record.jobTitle,
    absenceDescription: record.absenceDescription,
    situation: record.situation,
    workDays: record.workDays,
    absences: record.absences,
    medicalLeaveDays: record.medicalLeaveDays,
    extraDays: record.extraDays,
    justifiedAbsenceDays: record.justifiedAbsenceDays,
    workedDays: record.workedDays,
    comments: record.comments,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!record || !record.id) {
        throw new Error("ID do registro de frequência não encontrado.");
      }

      await updateAttendanceRecord(record.id, formData);
      alert("Registro de frequência atualizado com sucesso!");
      onClose();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao atualizar o registro");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Editar Registro de Frequência</h2>
        <form onSubmit={handleSubmit}>
          <label>CPF do Funcionário:</label>
          <input type="text" name="employeeCpf" value={record.employeeCpf} disabled />

          <label>CNPJ da Empresa:</label>
          <input type="text" name="companyCnpj" value={record.companyCnpj} disabled />

          <label>Período de Referência:</label>
          <input type="text" name="referencePeriod" value={formData.referencePeriod} onChange={handleChange} required />

          <label>Área:</label>
          <input type="text" name="area" value={formData.area} onChange={handleChange} />

          <label>Cargo:</label>
          <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />

          <label>Descrição da Falta:</label>
          <input type="text" name="absenceDescription" value={formData.absenceDescription} onChange={handleChange} />

          <label>Situação:</label>
          <input type="text" name="situation" value={formData.situation} onChange={handleChange} required />

          <label>Dias Trabalhados:</label>
          <input type="number" name="workDays" value={formData.workDays} onChange={handleChange} required />

          <label>Faltas:</label>
          <input type="number" name="absences" value={formData.absences} onChange={handleChange} required />

          <label>Dias de Afastamento Médico:</label>
          <input type="number" name="medicalLeaveDays" value={formData.medicalLeaveDays} onChange={handleChange} required />

          <label>Dias Extras:</label>
          <input type="number" name="extraDays" value={formData.extraDays} onChange={handleChange} required />

          <label>Faltas Justificadas:</label>
          <input type="number" name="justifiedAbsenceDays" value={formData.justifiedAbsenceDays} onChange={handleChange} required />

          <label>Dias Efetivamente Trabalhados:</label>
          <input type="number" name="workedDays" value={formData.workedDays} onChange={handleChange} required />

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

export default AttendanceDetailsModal;
