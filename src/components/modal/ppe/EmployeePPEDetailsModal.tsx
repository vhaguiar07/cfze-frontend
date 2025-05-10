import React, { useState, useRef } from "react";
import { updateEmployeePPERecord } from "../../../api/ppeApi";
import { EmployeePPEUpdate } from "../../../interfaces/ppe-interface";

interface EmployeePPEDetailsModalProps {
  record: EmployeePPEUpdate;
  onClose: () => void;
}

const EmployeePPEDetailsModal: React.FC<EmployeePPEDetailsModalProps> = ({ record, onClose }) => {
  const [formData, setFormData] = useState<EmployeePPEUpdate>({
    id: record.id,
    ppeDescription: record.ppeDescription,
    department: record.department,
    referenceMonth: record.referenceMonth,
    situation: record.situation,
    quantity: record.quantity,
    reasonForReplacement: record.reasonForReplacement || "",
    comments: record.comments || "",
  });

  const [isEditing, setIsEditing] = useState(false);
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
      if (!record || !record.id) {
        throw new Error("ID do registro de EPI não encontrado.");
      }

      const { id, ...dataToUpdate } = formData;
      await updateEmployeePPERecord(record.id, dataToUpdate);

      alert("Registro de EPI atualizado com sucesso!");
      setIsEditing(false);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao atualizar o registro de EPI");
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
        <h2 className="font-bold mb-30 color-orange ta-left">Editar Registro de EPI</h2>
        <form onSubmit={handleSubmit} className="ppe-form">
          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Descrição do EPI</div>
              <div className="campo-div">
                <input
                  type="text"
                  name="ppeDescription"
                  value={formData.ppeDescription}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="campo-input"
                  required
                  placeholder="Digite a descrição do EPI"
                />
              </div>
            </div>

            <div className="input-container">
              <div className="campo-titulo">Setor</div>
              <div className="campo-div">
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="campo-input"
                  required
                  placeholder="Digite o setor"
                />
              </div>
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Mês de Referência</div>
              <div className="campo-div">
                <input
                  type="text"
                  name="referenceMonth"
                  value={formData.referenceMonth}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="campo-input"
                  required
                  placeholder="Digite o mês de referência"
                />
              </div>
            </div>

            <div className="input-container">
              <div className="campo-titulo">Situação</div>
              <div className="campo-div">
                <select
                  name="situation"
                  value={formData.situation}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="campo-input"
                  required
                >
                  <option value="Aquisição">Aquisição</option>
                  <option value="Troca do EPI">Troca do EPI</option>
                  <option value="Saída">Saída</option>
                </select>
              </div>
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Quantidade</div>
              <div className="campo-div">
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="campo-input"
                  required
                  placeholder="Digite a quantidade"
                />
              </div>
            </div>

            <div className="input-container">
              <div className="campo-titulo">Motivo da Troca</div>
              <div className="campo-div">
                <input
                  type="text"
                  name="reasonForReplacement"
                  value={formData.reasonForReplacement}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="campo-input"
                  placeholder="Digite o motivo da troca"
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
                  disabled={!isEditing}
                  className="campo-input"
                  placeholder="Digite os comentários"
                />
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

export default EmployeePPEDetailsModal;
