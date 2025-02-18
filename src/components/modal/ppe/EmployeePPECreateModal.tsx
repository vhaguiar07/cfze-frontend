import React, { useState } from "react";
import { createEmployeePPERecord } from "../../../api/ppeApi";

interface EmployeePPECreateModalProps {
  onClose: () => void;
}

const EmployeePPECreateModal: React.FC<EmployeePPECreateModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    employeeCpf: "",
    ppeDescription: "",
    department: "",
    referenceMonth: "",
    situation: "",
    quantity: "",
    reasonForReplacement: "",
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
      await createEmployeePPERecord(formData);
      alert("Registro de EPI cadastrado com sucesso!");
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
        <h2>Cadastrar EPI</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="employeeCpf" placeholder="CPF do Funcionário" value={formData.employeeCpf} onChange={handleChange} required />
          <input type="text" name="ppeDescription" placeholder="Descrição do EPI" value={formData.ppeDescription} onChange={handleChange} required />
          <input type="text" name="department" placeholder="Setor" value={formData.department} onChange={handleChange} required />
          <input type="text" name="referenceMonth" placeholder="Mês de Referência" value={formData.referenceMonth} onChange={handleChange} required />

          <select name="situation" value={formData.situation} onChange={handleChange} required>
            <option value="">Selecione a Situação</option>
            <option value="Aquisição">Aquisição</option>
            <option value="Troca do EPI">Troca do EPI</option>
            <option value="Saída">Saída</option>
          </select>

          <input type="number" name="quantity" placeholder="Quantidade" value={formData.quantity} onChange={handleChange} required />
          <input type="text" name="reasonForReplacement" placeholder="Motivo da Troca (opcional)" value={formData.reasonForReplacement} onChange={handleChange} />
          <textarea name="comments" placeholder="Comentários (opcional)" value={formData.comments} onChange={handleChange} />

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

export default EmployeePPECreateModal;
