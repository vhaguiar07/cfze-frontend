import React, { useEffect, useState } from "react";
import { getAccidentCostById, updateAccidentCost } from "../../../api/acidenteApi";

interface ViewAccidentCostModalProps {
  isOpen: boolean;
  onClose: () => void;
  accidentId: string;
}

const ViewAccidentCostModal: React.FC<ViewAccidentCostModalProps> = ({ isOpen, onClose, accidentId }) => {
  const [costData, setCostData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    medicationCost: "",
    foodCost: "",
    materialCost: "",
    legalCost: "",
    comments: "",
  });

  useEffect(() => {
    if (isOpen && accidentId) {
      fetchCostData();
    }
  }, [isOpen, accidentId]);

  const fetchCostData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAccidentCostById(accidentId);
      if (!data) {
        setCostData(null);
      } else {
        setCostData(data);
        setFormData({
          medicationCost: data.medicationCost || "",
          foodCost: data.foodCost || "",
          materialCost: data.materialCost || "",
          legalCost: data.legalCost || "",
          comments: data.comments || "",
        });
      }
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        setCostData(null);
      } else {
        setError("Erro ao buscar os custos do acidente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await updateAccidentCost(accidentId, formData);
      alert("Custos atualizados com sucesso!");
      setIsEditing(false);
      fetchCostData();
    } catch (err) {
      alert("Erro ao atualizar os custos.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Detalhes do Custo</h2>
          <button onClick={onClose} className="text-red-500 font-bold">X</button>
        </div>

        {isLoading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : costData ? (
          <div className="space-y-2">
            <p><strong>Acidente:</strong> {costData.accident.accidentNumber}</p>
            <p><strong>Data:</strong> {new Date(costData.accident.accidentDate).toLocaleDateString()}</p>
            <p><strong>Tipo:</strong> {costData.accident.accidentType}</p>
            <p><strong>Funcionário:</strong> {costData.accident.employee.fullName}</p>
            <p><strong>Departamento:</strong> {costData.accident.employee.department}</p>
            <hr />
            <p><strong>Custos:</strong></p>
            {isEditing ? (
              <>
                <input type="number" name="medicationCost" value={formData.medicationCost} onChange={handleChange} className="border p-2 rounded w-full" placeholder="Medicamentos" />
                <input type="number" name="foodCost" value={formData.foodCost} onChange={handleChange} className="border p-2 rounded w-full" placeholder="Alimentação" />
                <input type="number" name="materialCost" value={formData.materialCost} onChange={handleChange} className="border p-2 rounded w-full" placeholder="Materiais" />
                <input type="number" name="legalCost" value={formData.legalCost} onChange={handleChange} className="border p-2 rounded w-full" placeholder="Custos Legais" />
                <textarea name="comments" value={formData.comments} onChange={handleChange} className="border p-2 rounded w-full" placeholder="Comentários"></textarea>
              </>
            ) : (
              <>
                {costData === null ? (
                  <p className="text-red-500 font-bold">Custos ainda não adicionados</p>
                ) : (
                  <>
                    <p>Medicamentos: R$ {Number(costData.medicationCost || 0).toFixed(2)}</p>
                    <p>Alimentação: R$ {Number(costData.foodCost || 0).toFixed(2)}</p>
                    <p>Materiais: R$ {Number(costData.materialCost || 0).toFixed(2)}</p>
                    <p>Custos Legais: R$ {Number(costData.legalCost || 0).toFixed(2)}</p>
                    <p className="font-bold">Total: R$ {Number(costData.totalCost || 0).toFixed(2)}</p>
                    <p><strong>Comentários:</strong> {costData.comments || "Nenhum comentário"}</p>
                  </>
                )}
              </>
            )}
          </div>
        ) : (
          <p>Nenhum dado encontrado.</p>
        )}

        <div className="mt-4 flex justify-between">
          {isEditing ? (
            <>
              <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-400 text-white rounded">
                Cancelar
              </button>
              <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
                Salvar Alterações
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-yellow-500 text-white rounded">
              Editar
            </button>
          )}
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewAccidentCostModal;
