import React, { useState } from "react";
import { createEmployeeBenefit } from "../../../api/benefitApi";

interface EmployeeBenefitCreateModalProps {
  onClose: () => void;
}

const EmployeeBenefitCreateModal: React.FC<EmployeeBenefitCreateModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    employeeCpf: "",
    companyCnpj: "",
    benefit: "",
    referencePeriod: "",
    type: "",
    area: "",
    jobTitle: "",
    mealVoucherPrice: "",
    workDays: "",
    extraDays: "",
    justifiedAbsenceDays: "",
    paidDays: "",
    totalPrice: "",
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
      await createEmployeeBenefit(formData);
      alert("Benefício cadastrado com sucesso!");
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
        <h2>Cadastrar Benefício</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="employeeCpf" placeholder="CPF do Funcionário" value={formData.employeeCpf} onChange={handleChange} required />
          <input type="text" name="companyCnpj" placeholder="CNPJ da Empresa" value={formData.companyCnpj} onChange={handleChange} required />
          <input type="text" name="benefit" placeholder="Benefício" value={formData.benefit} onChange={handleChange} required />
          <input type="text" name="referencePeriod" placeholder="Período de Referência" value={formData.referencePeriod} onChange={handleChange} required />
          
          <select name="type" value={formData.type} onChange={handleChange} required>
            <option value="">Selecione o Tipo</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Transporte">Transporte</option>
          </select>

          <input type="text" name="area" placeholder="Área" value={formData.area} onChange={handleChange} required />
          <input type="text" name="jobTitle" placeholder="Cargo" value={formData.jobTitle} onChange={handleChange} required />

          <input type="number" name="mealVoucherPrice" placeholder="Valor do Vale Alimentação" value={formData.mealVoucherPrice} onChange={handleChange} required />
          <input type="number" name="workDays" placeholder="Dias Trabalhados" value={formData.workDays} onChange={handleChange} required />
          <input type="number" name="extraDays" placeholder="Dias Extras" value={formData.extraDays} onChange={handleChange} required />
          <input type="number" name="justifiedAbsenceDays" placeholder="Faltas Justificadas" value={formData.justifiedAbsenceDays} onChange={handleChange} required />
          <input type="number" name="paidDays" placeholder="Dias Pagos" value={formData.paidDays} onChange={handleChange} required />
          <input type="number" name="totalPrice" placeholder="Valor Total" value={formData.totalPrice} onChange={handleChange} required />

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

export default EmployeeBenefitCreateModal;
