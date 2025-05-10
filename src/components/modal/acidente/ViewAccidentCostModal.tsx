import React, { useEffect, useState, useRef } from "react";
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
  const modalRef = useRef<HTMLDivElement>(null);
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

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div className="modal-content" ref={modalRef}>
        <h2 className="font-bold mb-30 color-orange ta-left">Detalhes dos Custos</h2>

        {isLoading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : costData ? (
          <div className="space-y-2">
            <div className="input-group">
              <div className="input-container">
                <div className="campo-titulo">Número do Acidente</div>
                <div className="campo-div">
                  <input
                    type="text"
                    name="accidentNumber"
                    value={costData.accident.accidentNumber}
                    className="campo-input"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="font-bold mt-20 mb-20">Custos</div>

            {isEditing ? (
              <>
                <div className="input-group">
                  <div className="input-container">
                    <div className="campo-titulo">Medicamentos</div>
                    <div className="campo-div">
                      <input
                        type="text"
                        name="medicationCost"
                        value={formData.medicationCost}
                        onChange={handleChange}
                        className="campo-input"
                        placeholder="Medicamentos"
                      />
                    </div>
                  </div>
                  <div className="input-container">
                    <div className="campo-titulo">Alimentação</div>
                    <div className="campo-div">
                      <input
                        type="text"
                        name="foodCost"
                        value={formData.foodCost}
                        onChange={handleChange}
                        className="campo-input"
                        placeholder="Alimentação"
                      />
                    </div>
                  </div>
                </div>

                <div className="input-group">
                  <div className="input-container">
                    <div className="campo-titulo">Materiais</div>
                    <div className="campo-div">
                      <input
                        type="text"
                        name="materialCost"
                        value={formData.materialCost}
                        onChange={handleChange}
                        className="campo-input"
                        placeholder="Materiais"
                      />
                    </div>
                  </div>
                  <div className="input-container">
                    <div className="campo-titulo">Custos Legais</div>
                    <div className="campo-div">
                      <input
                        type="text"
                        name="legalCost"
                        value={formData.legalCost}
                        onChange={handleChange}
                        className="campo-input"
                        placeholder="Custos Legais"
                      />
                    </div>
                  </div>
                </div>

                <div className="input-container">
                  <div className="campo-titulo">Comentários</div>
                  <div className="campo-div">
                    <textarea
                      name="comments"
                      value={formData.comments}
                      onChange={handleChange}
                      className="campo-input"
                      placeholder="Comentários"
                    ></textarea>
                  </div>
                </div>
              </>
            ) : (
              <>
                {costData === null ? (
                  <p className="text-red-500 font-bold">Custos ainda não adicionados</p>
                ) : (
                  <>

                    <div className="input-group">
                      <div className="input-container">
                        <div className="campo-titulo">Medicamentos</div>
                        <div className="campo-div">
                          <input
                            type="text"
                            name="medicationCost"
                            value={Number(costData.medicationCost || 0)}
                            className="campo-input"
                            disabled
                          />
                        </div>
                      </div>
                      <div className="input-container">
                        <div className="campo-titulo">Alimentação</div>
                        <div className="campo-div">
                          <input
                            type="text"
                            name="foodCost"
                            value={Number(costData.foodCost || 0)}
                            className="campo-input"
                            disabled
                          />
                        </div>
                      </div>
                    </div>

                    <div className="input-group">
                      <div className="input-container">
                        <div className="campo-titulo">Materiais</div>
                        <div className="campo-div">
                          <input
                            type="text"
                            name="materialCost"
                            value={Number(costData.materialCost || 0)}
                            className="campo-input"
                            disabled
                          />
                        </div>
                      </div>
                      <div className="input-container">
                        <div className="campo-titulo">Custos Legais</div>
                        <div className="campo-div">
                          <input
                            type="text"
                            name="legalCost"
                            value={Number(costData.legalCost || 0)}
                            className="campo-input"
                            disabled
                          />
                        </div>
                      </div>
                    </div>

                    <div className="input-container">
                      <div className="campo-titulo">Comentários</div>
                      <div className="campo-div">
                        <textarea
                          name="comments"
                          value={costData.comments || "Nenhum comentário"}
                          className="campo-input"
                          disabled
                        ></textarea>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        ) : (
          <p>Nenhum dado encontrado.</p>
        )}

        <div className="modal-buttons">
          {isEditing ? (
            <>
              <button
                className="button-cancel"
                type="button"
                onClick={() => setIsEditing(false)}
              >
                Cancelar Edição
              </button>
              <button
                className="button"
                type="submit"
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? "Salvando..." : "Salvar Alterações"}
              </button>
            </>
          ) : (
            <button
              className="button"
              type="button"
              onClick={() => setIsEditing(true)}
            >
              Editar
            </button>
          )}
          <button
            className="button-cancel"
            type="button"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};

export default ViewAccidentCostModal;
