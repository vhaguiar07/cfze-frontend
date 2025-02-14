import React, { useEffect, useState } from 'react';
import { createAccidentCost } from '../../../api/acidenteApi';
import { Accident } from '../../../interfaces/accident-interface';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  accident: Accident | null;
}

const CreateAccidentCostModal: React.FC<ModalProps> = ({ isOpen, onClose, accident }) => {
  const [formData, setFormData] = useState({
    medicationCost: '',
    foodCost: '',
    materialCost: '',
    legalCost: '',
    leaveStartDate: '',
    comments: '',
  });

  const [accidentId, setAccidentId] = useState<string>(''); // Armazena o ID sem exibir
  const [isLoading, setIsLoading] = useState(false);

  // Atualiza os dados sempre que um novo acidente for passado
  useEffect(() => {
    if (accident) {
      setAccidentId(accident.id || '');
    }
  }, [accident]);

  if (!isOpen || !accident) return null; // Se o modal estiver fechado, não renderiza nada

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? Number(value) : value,
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
        accidentId, // Inclui o ID na requisição sem mostrar no formulário
        leaveStartDate: formData.leaveStartDate ? new Date(formData.leaveStartDate).toISOString() : null,
        totalCost,
      };

      await createAccidentCost(formattedData);
      alert('Custo de acidente cadastrado com sucesso!');
      onClose(); // Fecha o modal após o sucesso
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="text-xl font-bold mb-4">Editar Custos do Acidente</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <span>Custo com Medicamentos</span>
          <input
            type="number"
            name="medicationCost"
            placeholder="Custo com Medicamentos"
            value={formData.medicationCost}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <span>Custo com Alimentação</span>
          <input
            type="number"
            name="foodCost"
            placeholder="Custo com Alimentação"
            value={formData.foodCost}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <span>Custo com Materiais</span>
          <input
            type="number"
            name="materialCost"
            placeholder="Custo com Materiais"
            value={formData.materialCost}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <span>Custo Legal</span>
          <input
            type="number"
            name="legalCost"
            placeholder="Custo Legal"
            value={formData.legalCost}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <span>Comentários</span>
          <textarea
            name="comments"
            placeholder="Comentários"
            value={formData.comments}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <div className="flex justify-between mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">
              Cancelar
            </button>
            <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-500 text-white rounded">
              {isLoading ? 'Cadastrando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccidentCostModal;
