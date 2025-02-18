import React, { useState } from "react";
import { updateEmployeeBenefit } from "../../../api/benefitApi";
import { EmployeeBenefit } from "../../../interfaces/benefit-interface";

interface EmployeeBenefitDetailsModalProps {
  benefit: EmployeeBenefit;
  onClose: () => void;
}

const EmployeeBenefitDetailsModal: React.FC<EmployeeBenefitDetailsModalProps> = ({ benefit, onClose }) => {
  const [formData, setFormData] = useState<EmployeeBenefit>({
    id: benefit.id,
    employeeCpf: benefit.employeeCpf,
    companyCnpj: benefit.companyCnpj,
    benefit: benefit.benefit,
    referencePeriod: benefit.referencePeriod,
    type: benefit.type,
    area: benefit.area,
    jobTitle: benefit.jobTitle,
    mealVoucherPrice: benefit.mealVoucherPrice,
    workDays: benefit.workDays,
    extraDays: benefit.extraDays,
    justifiedAbsenceDays: benefit.justifiedAbsenceDays,
    paidDays: benefit.paidDays,
    totalPrice: benefit.totalPrice,
    comments: benefit.comments,
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
      if (!benefit || !benefit.id) {
        throw new Error("ID do benefício não encontrado.");
      }
  
      await updateEmployeeBenefit(benefit.id, formData);
      alert("Benefício atualizado com sucesso!");
      onClose();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao atualizar o benefício");
    }
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Editar Benefício</h2>
        <form onSubmit={handleSubmit}>
          <label>CPF do Funcionário:</label>
          <input type="text" name="employeeCpf" value={formData.employeeCpf} onChange={handleChange} disabled />

          <label>CNPJ da Empresa:</label>
          <input type="text" name="companyCnpj" value={formData.companyCnpj} onChange={handleChange} disabled />

          <label>Benefício:</label>
          <input type="text" name="benefit" value={formData.benefit} onChange={handleChange} required />

          <label>Período de Referência:</label>
          <input type="text" name="referencePeriod" value={formData.referencePeriod} onChange={handleChange} required />

          <label>Tipo:</label>
          <select name="type" value={formData.type} onChange={handleChange} required>
            <option value="Alimentação">Alimentação</option>
            <option value="Transporte">Transporte</option>
          </select>

          <label>Área:</label>
          <input type="text" name="area" value={formData.area} onChange={handleChange} required />

          <label>Cargo:</label>
          <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />

          <label>Valor do Vale Alimentação:</label>
          <input type="number" name="mealVoucherPrice" value={formData.mealVoucherPrice} onChange={handleChange} required />

          <label>Dias Trabalhados:</label>
          <input type="number" name="workDays" value={formData.workDays} onChange={handleChange} required />

          <label>Dias Extras:</label>
          <input type="number" name="extraDays" value={formData.extraDays} onChange={handleChange} required />

          <label>Faltas Justificadas:</label>
          <input type="number" name="justifiedAbsenceDays" value={formData.justifiedAbsenceDays} onChange={handleChange} required />

          <label>Dias Pagos:</label>
          <input type="number" name="paidDays" value={formData.paidDays} onChange={handleChange} required />

          <label>Valor Total:</label>
          <input type="number" name="totalPrice" value={formData.totalPrice} onChange={handleChange} required />

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

export default EmployeeBenefitDetailsModal;
