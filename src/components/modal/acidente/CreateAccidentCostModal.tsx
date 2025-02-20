import React, { useEffect, useState, useRef } from 'react';
import { createAccidentCost } from '../../../api/acidenteApi';
import { Accident } from '../../../interfaces/accident-interface';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  accident: Accident | null;
}

const CreateAccidentCostModal: React.FC<ModalProps> = ({ isOpen, onClose, accident }) => {
  const [formData, setFormData] = useState({
    accidentsWithLeave: false,
    leaveStartDate: '',
    medicationCost: '',
    foodCost: '',
    materialCost: '',
    legalCost: '',
    comments: '',
  });

  const [accidentId, setAccidentId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (accident) {
      setAccidentId(accident.id || '');
      setFormData({
        accidentsWithLeave: false,
        leaveStartDate: '',
        medicationCost: '',
        foodCost: '',
        materialCost: '',
        legalCost: '',
        comments: '',
      });
    }
  }, [accident]);

  if (!isOpen || !accident) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const totalCost =
        (Number(formData.medicationCost) || 0) +
        (Number(formData.foodCost) || 0) +
        (Number(formData.materialCost) || 0) +
        (Number(formData.legalCost) || 0);

      const formattedData = {
        ...formData,
        accidentId,
        leaveStartDate: formData.leaveStartDate ? new Date(formData.leaveStartDate).toISOString() : null,
        totalCost,
      };

      await createAccidentCost(formattedData);
      alert('Custo de acidente cadastrado com sucesso!');
      onClose();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Erro desconhecido');
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
        <h2 className="font-bold mb-30 color-orange ta-left">Informar Custos do Acidente</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Custo com Medicamentos</div>
              <div className="campo-div">
                <input className="campo-input" type="text" name="medicationCost" value={formData.medicationCost} onChange={handleChange} />
              </div>
            </div>
            <div className="input-container">
              <div className="campo-titulo">Custo com Alimentação</div>
              <div className="campo-div">
                <input className="campo-input" type="text" name="foodCost" value={formData.foodCost} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Custo com Materiais</div>
              <div className="campo-div">
                <input className="campo-input" type="text" name="materialCost" value={formData.materialCost} onChange={handleChange} />
              </div>
            </div>
            <div className="input-container">
              <div className="campo-titulo">Custo Legal</div>
              <div className="campo-div">
                <input className="campo-input" type="text" name="legalCost" value={formData.legalCost} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Comentários</div>
              <div className="campo-div">
                <input className="campo-input" type="text" name="comments" value={formData.comments} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <div className="campo-titulo">Início da Licença</div>
              <div className="campo-div">
                <input className="campo-input" type="date" name="leaveStartDate" value={formData.leaveStartDate} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <label htmlFor="accidentsWithLeave">
                <input
                  type="checkbox"
                  id="accidentsWithLeave"
                  name="accidentsWithLeave"
                  checked={formData.accidentsWithLeave}
                  onChange={handleChange}
                />
                Acidente com licença?
              </label>
            </div>
          </div>

          <div className="modal-buttons">
            <button className="button" type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar"}
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

export default CreateAccidentCostModal;
