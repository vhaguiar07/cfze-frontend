import React, { useState } from "react";
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

      const { id, ...dataToUpdate } = formData; // Remove o ID do corpo da requisição
      await updateEmployeePPERecord(record.id, dataToUpdate);
      
      alert("Registro de EPI atualizado com sucesso!");
      onClose();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao atualizar o registro de EPI");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Editar Registro de EPI</h2>
        <form onSubmit={handleSubmit}>

          <label>Descrição do EPI:</label>
          <input type="text" name="ppeDescription" value={formData.ppeDescription} onChange={handleChange} required />

          <label>Setor:</label>
          <input type="text" name="department" value={formData.department} onChange={handleChange} required />

          <label>Mês de Referência:</label>
          <input type="text" name="referenceMonth" value={formData.referenceMonth} onChange={handleChange} required />

          <label>Situação:</label>
          <select name="situation" value={formData.situation} onChange={handleChange} required>
            <option value="Aquisição">Aquisição</option>
            <option value="Troca do EPI">Troca do EPI</option>
            <option value="Saída">Saída</option>
          </select>

          <label>Quantidade:</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />

          <label>Motivo da Troca:</label>
          <input type="text" name="reasonForReplacement" value={formData.reasonForReplacement} onChange={handleChange} />

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

export default EmployeePPEDetailsModal;
