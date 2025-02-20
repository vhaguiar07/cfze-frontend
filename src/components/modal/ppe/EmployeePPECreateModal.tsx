import React, { useState, useRef } from "react";
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
      await createEmployeePPERecord(formData);
      alert("Registro de EPI cadastrado com sucesso!");
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
        <h2 className="font-bold mb-30 color-orange ta-left">Cadastrar EPI</h2>
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
              <div className="campo-titulo">Descrição do EPI:</div>
              <div className="campo-div">
                <input
                  className="campo-input"
                  type="text"
                  name="ppeDescription"
                  placeholder="Descrição do EPI"
                  value={formData.ppeDescription}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Setor:</div>
              <div className="campo-div">
                <input
                  className="campo-input"
                  type="text"
                  name="department"
                  placeholder="Setor"
                  value={formData.department}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="input-container">
              <div className="campo-titulo">Mês de Referência:</div>
              <div className="campo-div">
                <input
                  className="campo-input"
                  type="text"
                  name="referenceMonth"
                  placeholder="Mês de Referência"
                  value={formData.referenceMonth}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Situação:</div>
              <div className="campo-div">
                <select
                  className="campo-select"
                  name="situation"
                  value={formData.situation}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione a Situação</option>
                  <option value="Aquisição">Aquisição</option>
                  <option value="Troca do EPI">Troca do EPI</option>
                  <option value="Saída">Saída</option>
                </select>
              </div>
            </div>
            <div className="input-container">
              <div className="campo-titulo">Quantidade:</div>
              <div className="campo-div">
                <input
                  className="campo-input"
                  type="number"
                  name="quantity"
                  placeholder="Quantidade"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Motivo da Troca:</div>
              <div className="campo-div">
                <input
                  className="campo-input"
                  type="text"
                  name="reasonForReplacement"
                  placeholder="Motivo da Troca (opcional)"
                  value={formData.reasonForReplacement}
                  onChange={handleChange}
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
                  placeholder="Comentários (opcional)"
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

export default EmployeePPECreateModal;
