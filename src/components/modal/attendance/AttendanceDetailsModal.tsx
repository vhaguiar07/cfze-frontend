import React, { useState, useRef } from "react";
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

  const [isEditing, setIsEditing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

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
      setIsEditing(false);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao atualizar o registro");
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
        <h2 className="font-bold mb-30 color-orange ta-left">Editar Registro de Frequência</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">CPF do Funcionário</div>
              <div className="campo-div">
                <input
                  type="text"
                  name="employeeCpf"
                  value={record.employeeCpf}
                  disabled
                  className="campo-input"
                />
              </div>
            </div>
            <div className="input-container">
              <div className="campo-titulo">CNPJ da Empresa</div>
              <div className="campo-div">
                <input
                  type="text"
                  name="companyCnpj"
                  value={record.companyCnpj}
                  disabled
                  className="campo-input"
                />
              </div>
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Período de Referência</div>
              <div className="campo-div">
                <input
                  type="text"
                  name="referencePeriod"
                  value={formData.referencePeriod}
                  onChange={handleChange}
                  required
                  disabled={!isEditing} // Desabilita se não estiver em modo de edição
                  className="campo-input"
                  placeholder="Digite o Período de Referência"
                />
              </div>
            </div>
            <div className="input-container">
              <div className="campo-titulo">Área</div>
              <div className="campo-div">
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  disabled={!isEditing} // Desabilita se não estiver em modo de edição
                  className="campo-input"
                  placeholder="Digite a Área"
                />
              </div>
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Cargo</div>
              <div className="campo-div">
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  required
                  disabled={!isEditing} // Desabilita se não estiver em modo de edição
                  className="campo-input"
                  placeholder="Digite o Cargo"
                />
              </div>
            </div>
            <div className="input-container">
              <div className="campo-titulo">Descrição da Falta</div>
              <div className="campo-div">
                <input
                  type="text"
                  name="absenceDescription"
                  value={formData.absenceDescription}
                  onChange={handleChange}
                  disabled={!isEditing} // Desabilita se não estiver em modo de edição
                  className="campo-input"
                  placeholder="Digite a Descrição da Falta"
                />
              </div>
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Situação</div>
              <div className="campo-div">
                <input
                  type="text"
                  name="situation"
                  value={formData.situation}
                  onChange={handleChange}
                  required
                  disabled={!isEditing} // Desabilita se não estiver em modo de edição
                  className="campo-input"
                  placeholder="Digite a Situação"
                />
              </div>
            </div>
            <div className="input-container">
              <div className="campo-titulo">Dias Trabalhados</div>
              <div className="campo-div">
                <input
                  type="number"
                  name="workDays"
                  value={formData.workDays}
                  onChange={handleChange}
                  required
                  disabled={!isEditing} // Desabilita se não estiver em modo de edição
                  className="campo-input"
                  placeholder="Digite os Dias Trabalhados"
                />
              </div>
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Faltas</div>
              <div className="campo-div">
                <input
                  type="number"
                  name="absences"
                  value={formData.absences}
                  onChange={handleChange}
                  required
                  disabled={!isEditing} // Desabilita se não estiver em modo de edição
                  className="campo-input"
                  placeholder="Digite as Faltas"
                />
              </div>
            </div>
            <div className="input-container">
              <div className="campo-titulo">Dias de Afastamento Médico</div>
              <div className="campo-div">
                <input
                  type="number"
                  name="medicalLeaveDays"
                  value={formData.medicalLeaveDays}
                  onChange={handleChange}
                  required
                  disabled={!isEditing} // Desabilita se não estiver em modo de edição
                  className="campo-input"
                  placeholder="Digite os Dias de Afastamento Médico"
                />
              </div>
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Dias Extras</div>
              <div className="campo-div">
                <input
                  type="number"
                  name="extraDays"
                  value={formData.extraDays}
                  onChange={handleChange}
                  required
                  disabled={!isEditing} // Desabilita se não estiver em modo de edição
                  className="campo-input"
                  placeholder="Digite os Dias Extras"
                />
              </div>
            </div>
            <div className="input-container">
              <div className="campo-titulo">Faltas Justificadas</div>
              <div className="campo-div">
                <input
                  type="number"
                  name="justifiedAbsenceDays"
                  value={formData.justifiedAbsenceDays}
                  onChange={handleChange}
                  required
                  disabled={!isEditing} // Desabilita se não estiver em modo de edição
                  className="campo-input"
                  placeholder="Digite as Faltas Justificadas"
                />
              </div>
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Dias Efetivamente Trabalhados</div>
              <div className="campo-div">
                <input
                  type="number"
                  name="workedDays"
                  value={formData.workedDays}
                  onChange={handleChange}
                  required
                  disabled={!isEditing} // Desabilita se não estiver em modo de edição
                  className="campo-input"
                  placeholder="Digite os Dias Efetivamente Trabalhados"
                />
              </div>
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Comentários</div>
              <div className="campo-div">
                <textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  disabled={!isEditing} // Desabilita se não estiver em modo de edição
                  className="campo-input"
                  placeholder="Comentários"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="modal-buttons">
            {isEditing ? (
              <>
                <button className="button" type="submit">Salvar</button>
                <button className="button-cancel" type="button" onClick={() => setIsEditing(false)}>Cancelar</button>
              </>
            ) : (
              <button className="button" type="button" onClick={() => setIsEditing(true)}>Editar</button>
            )}
            <button className="button-cancel" type="button" onClick={onClose}>Fechar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AttendanceDetailsModal;
