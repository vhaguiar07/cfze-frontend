import React, { useState, useRef } from "react";
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
      if (!benefit || !benefit.id) {
        throw new Error("ID do benefício não encontrado.");
      }
      await updateEmployeeBenefit(benefit.id, formData);
      alert("Benefício atualizado com sucesso!");
      setIsEditing(false);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao atualizar o benefício");
    }
  };

  const handleCancelEdit = () => {
    setFormData({
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
    setIsEditing(false);
  };

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div className="modal-content" ref={modalRef}>
        <h2 className="font-bold mb-30 color-orange ta-left">Editar Benefício</h2>
        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">CPF do Funcionário</div>
              <div className="campo-div">
                <input
                  type="text"
                  name="employeeCpf"
                  value={formData.employeeCpf}
                  onChange={handleChange}
                  className="campo-input"
                  placeholder="Medicamentos"
                />
              </div>
            </div>
            <div className="input-container">
              <div className="campo-titulo">CNPJ da Empresa</div>
              <div className="campo-div">
                <input
                  type="text"
                  name="companyCnpj"
                  value={formData.companyCnpj}
                  onChange={handleChange}
                  className="campo-input"
                  placeholder="Alimentação"
                />
              </div>
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Benefício</div>
              <div className="campo-div">
                <input
                  type="text"
                  name="benefit"
                  value={formData.benefit}
                  onChange={handleChange}
                  required
                  disabled={!isEditing}
                  className="campo-input"
                  placeholder="Digite o Benefício"
                />
              </div>
            </div>
            <div className="input-container">
              <div className="campo-titulo">Período de Referência</div>
              <div className="campo-div">
                <input
                  type="text"
                  name="referencePeriod"
                  value={formData.referencePeriod}
                  onChange={handleChange}
                  required
                  disabled={!isEditing}
                  className="campo-input"
                  placeholder="Digite o Período de Referência"
                />
              </div>
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Tipo</div>
              <div className="campo-div">
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  disabled={!isEditing}
                  className="campo-input"
                >
                  <option value="Alimentação">Alimentação</option>
                  <option value="Transporte">Transporte</option>
                </select>
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
                  required
                  disabled={!isEditing}
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
                  disabled={!isEditing}
                  className="campo-input"
                  placeholder="Digite o Cargo"
                />
              </div>
            </div>
            <div className="input-container">
              <div className="campo-titulo">Valor do Vale Alimentação</div>
              <div className="campo-div">
                <input
                  type="number"
                  name="mealVoucherPrice"
                  value={formData.mealVoucherPrice}
                  onChange={handleChange}
                  required
                  disabled={!isEditing}
                  className="campo-input"
                  placeholder="Digite o Valor do Vale Alimentação"
                />
              </div>
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Dias Trabalhados</div>
              <div className="campo-div">
                <input
                  type="number"
                  name="workDays"
                  value={formData.workDays}
                  onChange={handleChange}
                  required
                  disabled={!isEditing}
                  className="campo-input"
                  placeholder="Digite os Dias Trabalhados"
                />
              </div>
            </div>
            <div className="input-container">
              <div className="campo-titulo">Dias Extras</div>
              <div className="campo-div">
                <input
                  type="number"
                  name="extraDays"
                  value={formData.extraDays}
                  onChange={handleChange}
                  required
                  disabled={!isEditing}
                  className="campo-input"
                  placeholder="Digite os Dias Extras"
                />
              </div>
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Faltas Justificadas</div>
              <div className="campo-div">
                <input
                  type="number"
                  name="justifiedAbsenceDays"
                  value={formData.justifiedAbsenceDays}
                  onChange={handleChange}
                  required
                  disabled={!isEditing}
                  className="campo-input"
                  placeholder="Digite as Faltas Justificadas"
                />
              </div>
            </div>
            <div className="input-container">
              <div className="campo-titulo">Dias Pagos</div>
              <div className="campo-div">
                <input
                  type="number"
                  name="paidDays"
                  value={formData.paidDays}
                  onChange={handleChange}
                  required
                  disabled={!isEditing}
                  className="campo-input"
                  placeholder="Digite os Dias Pagos"
                />
              </div>
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Valor Total</div>
              <div className="campo-div">
                <input
                  type="number"
                  name="totalPrice"
                  value={formData.totalPrice}
                  onChange={handleChange}
                  required
                  disabled={!isEditing}
                  className="campo-input"
                  placeholder="Digite o Valor Total"
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
                  placeholder="Comentários"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="modal-buttons">
            {isEditing ? (
              <>
                <button className="button" type="submit">Salvar</button>
                <button className="button-cancel" type="button" onClick={handleCancelEdit}>Cancelar Edição</button>
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

export default EmployeeBenefitDetailsModal;
