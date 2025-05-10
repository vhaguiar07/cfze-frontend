import React, { useState, useRef } from "react";
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
      await createEmployeeBenefit(formData);
      alert("Benefício cadastrado com sucesso!");
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
        <h2 className="font-bold mb-30 color-orange ta-left">Cadastrar Benefício</h2>
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
              <div className="campo-titulo">Benefício:</div>
              <div className="campo-div">
                <input
                  className="campo-input"
                  type="text"
                  name="benefit"
                  placeholder="Benefício"
                  value={formData.benefit}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
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
          </div>
  
          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Tipo:</div>
              <div className="campo-div">
                <select
                  className="campo-select"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione o Tipo</option>
                  <option value="Alimentação">Alimentação</option>
                  <option value="Transporte">Transporte</option>
                </select>
              </div>
            </div>
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
                  required
                />
              </div>
            </div>
          </div>
  
          <div className="input-group">
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
            <div className="input-container">
              <div className="campo-titulo">Valor:</div>
              <div className="campo-div">
                <input
                  className="campo-input"
                  type="text"
                  name="mealVoucherPrice"
                  placeholder="Valor"
                  value={formData.mealVoucherPrice}
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
                  type="text"
                  name="workDays"
                  placeholder="Dias Trabalhados"
                  value={formData.workDays}
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
                  type="text"
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
                  type="text"
                  name="justifiedAbsenceDays"
                  placeholder="Faltas Justificadas"
                  value={formData.justifiedAbsenceDays}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="input-container">
              <div className="campo-titulo">Dias Pagos:</div>
              <div className="campo-div">
                <input
                  className="campo-input"
                  type="text"
                  name="paidDays"
                  placeholder="Dias Pagos"
                  value={formData.paidDays}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
  
          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Valor Total:</div>
              <div className="campo-div">
                <input
                  className="campo-input"
                  type="text"
                  name="totalPrice"
                  placeholder="Valor Total"
                  value={formData.totalPrice}
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

export default EmployeeBenefitCreateModal;
