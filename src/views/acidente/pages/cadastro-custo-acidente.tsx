import React, { useState } from 'react';
import { createAccidentCost } from '../../../api/acidenteApi';
import { useNavigate } from 'react-router-dom';

const CadastroCustoAcidente = () => {
  const [formData, setFormData] = useState({
    accidentId: '',
    medicationCost: '',
    foodCost: '',
    materialCost: '',
    legalCost: '',
    leaveStartDate: '',
    comments: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
        leaveStartDate: formData.leaveStartDate ? new Date(formData.leaveStartDate).toISOString() : null, // ✅ Converte para ISO-8601
        totalCost,
      };

      await createAccidentCost(formattedData);
      alert('Custo de acidente cadastrado com sucesso!');
      navigate('/acidentes');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Cadastro de Custo do Acidente</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="accidentId" placeholder="ID do Acidente" value={formData.accidentId} onChange={handleChange} required />
        <input type="number" name="medicationCost" placeholder="Custo com Medicamentos" value={formData.medicationCost} onChange={handleChange} required />
        <input type="number" name="foodCost" placeholder="Custo com Alimentação" value={formData.foodCost} onChange={handleChange} required />
        <input type="number" name="materialCost" placeholder="Custo com Materiais" value={formData.materialCost} onChange={handleChange} required />
        <input type="number" name="legalCost" placeholder="Custo Legal" value={formData.legalCost} onChange={handleChange} required />
        <input type="datetime-local" name="leaveStartDate" placeholder="Data de Início do Afastamento" value={formData.leaveStartDate} onChange={handleChange} />
        <textarea name="comments" placeholder="Comentários" value={formData.comments} onChange={handleChange} />

        <button type="submit" disabled={isLoading} style={styles.button}>
          {isLoading ? 'Cadastrando...' : 'Cadastrar Custo'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '10px',
    width: '300px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default CadastroCustoAcidente;
