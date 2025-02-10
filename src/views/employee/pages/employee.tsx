import React, { useState } from 'react';
import { createEmployee } from '../../../api/employeeApi';
import { useNavigate } from 'react-router-dom';

const Employee = () => {
  const [formData, setFormData] = useState({
  fullName: '',
  cpf: '',
  rg: '',
  rgIssueDate: '',
  rgIssuingAgency: '',
  rgState: '',
  ctps: '',
  pisPasep: '',
  educationLevel: '',
  voterRegistration: '',
  reservist: '',
  fatherName: '',
  motherName: '',
  maritalStatus: '',
  sex: '',
  birthDate: '',
  birthPlace: '',
  admissionDate: '',
  salary: '',
  jobTitle: '',
  department: '',
  monthlyWorkloadHours: '',
  weeklyWorkloadHours: '',
  dayOff: '',
  transportDiscount: false,
  firstEntryWeekday: '',
  firstExitWeekday: '',
  secondEntryWeekday: '',
  secondExitWeekday: '',
  firstEntryWeekend: '',
  firstExitWeekend: '',
  secondEntryWeekend: '',
  secondExitWeekend: '',
  receivedPPE: false,
  pantsSize: '',
  shirtSize: '',
  bootSize: '',
  jacketSize: '',
  balaclavaSize: '',
  gogglesSize: '',
  glovesSize: '',
  ppeReceiptDate: '',
  tookVacation: false,
  vacationDate: '',
  terminationType: '',
  terminationDate: '',
  receivedIndemnity: false,
  indemnityDate: '',
  indemnityValue: '',
  admissionInterview: false,
  exitInterview: false,
  admissionAsoDates: [],
  periodicAsoDates: [],
  dismissalAsoDates: [],
  paternityLeaveDates: [],
  maternityLeaveDates: [],
  electoralLeaveDates: [],
  sufferedAccident: false,
  leaveOfAbsenceDates: [],
  hireDate: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const formattedData = {
        ...formData,
        hireDate: new Date(formData.hireDate).toISOString(),
      };
      
      await createEmployee(formattedData);
      alert('Funcionário cadastrado com sucesso!');
      navigate('/employees');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div style={styles.container}>
      <h2>Cadastro de Funcionário</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="fullName" placeholder="Nome Completo" value={formData.fullName} onChange={handleChange} required />
        <input type="text" name="cpf" placeholder="CPF" value={formData.cpf} onChange={handleChange} required />
        <input type="text" name="rg" placeholder="RG" value={formData.rg} onChange={handleChange} required />
        <input type="date" name="rgIssueDate" value={formData.rgIssueDate} onChange={handleChange} style={styles.inputDate} required />
        <input type="text" name="rgIssuingAgency" placeholder="Órgão Emissor do RG" value={formData.rgIssuingAgency} onChange={handleChange} required />
        <input type="text" name="rgState" placeholder="Estado do RG" value={formData.rgState} onChange={handleChange} required />
        <input type="text" name="ctps" placeholder="CTPS" value={formData.ctps} onChange={handleChange} required />
        <input type="text" name="pisPasep" placeholder="PIS/PASEP" value={formData.pisPasep} onChange={handleChange} required />
        <input type="text" name="educationLevel" placeholder="Nível de Escolaridade" value={formData.educationLevel} onChange={handleChange} required />
        <input type="text" name="voterRegistration" placeholder="Título de Eleitor" value={formData.voterRegistration} onChange={handleChange} required />
        <input type="text" name="reservist" placeholder="Reservista" value={formData.reservist} onChange={handleChange} required />
        <input type="text" name="fatherName" placeholder="Nome do Pai" value={formData.fatherName} onChange={handleChange} required />
        <input type="text" name="motherName" placeholder="Nome da Mãe" value={formData.motherName} onChange={handleChange} required />
        <input type="text" name="maritalStatus" placeholder="Estado Civil" value={formData.maritalStatus} onChange={handleChange} required />
        <input type="text" name="sex" placeholder="Sexo" value={formData.sex} onChange={handleChange} required />
        <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} style={styles.inputDate} required />
        <input type="text" name="birthPlace" placeholder="Naturalidade" value={formData.birthPlace} onChange={handleChange} required />
        <input type="date" name="admissionDate" value={formData.admissionDate} onChange={handleChange} style={styles.inputDate} required />
        <input type="number" name="salary" placeholder="Salário" value={formData.salary} onChange={handleChange} required />
        <input type="text" name="jobTitle" placeholder="Cargo" value={formData.jobTitle} onChange={handleChange} required />
        <input type="text" name="department" placeholder="Departamento" value={formData.department} onChange={handleChange} required />
        <input type="number" name="monthlyWorkloadHours" placeholder="Carga Horária Mensal" value={formData.monthlyWorkloadHours} onChange={handleChange} required />
        <input type="number" name="weeklyWorkloadHours" placeholder="Carga Horária Semanal" value={formData.weeklyWorkloadHours} onChange={handleChange} required />
        <input type="text" name="dayOff" placeholder="Dia de Folga" value={formData.dayOff} onChange={handleChange} required />
        <input type="checkbox" name="transportDiscount" checked={formData.transportDiscount} onChange={handleChange} />
        <input type="time" name="firstEntryWeekday" value={formData.firstEntryWeekday} style={styles.inputDate} onChange={handleChange} />
        <input type="time" name="firstExitWeekday" value={formData.firstExitWeekday} style={styles.inputDate} onChange={handleChange} />
        <input type="time" name="secondEntryWeekday" value={formData.secondEntryWeekday} style={styles.inputDate} onChange={handleChange} />
        <input type="time" name="secondExitWeekday" value={formData.secondExitWeekday} style={styles.inputDate} onChange={handleChange} />
        <input type="time" name="firstEntryWeekend" value={formData.firstEntryWeekend} style={styles.inputDate} onChange={handleChange} />
        <input type="time" name="firstExitWeekend" value={formData.firstExitWeekend} style={styles.inputDate} onChange={handleChange} />
        <input type="time" name="secondEntryWeekend" value={formData.secondEntryWeekend} style={styles.inputDate} onChange={handleChange} />
        <input type="time" name="secondExitWeekend" value={formData.secondExitWeekend} style={styles.inputDate} onChange={handleChange} />
        <input type="checkbox" name="receivedPPE" checked={formData.receivedPPE} style={styles.inputDate} onChange={handleChange} />
        <input type="text" name="pantsSize" placeholder="Tamanho de Calça" value={formData.pantsSize} onChange={handleChange} />
        <input type="text" name="shirtSize" placeholder="Tamanho de Camisa" value={formData.shirtSize} onChange={handleChange} />
        <input type="text" name="bootSize" placeholder="Tamanho de Bota" value={formData.bootSize} onChange={handleChange} />
        <input type="text" name="jacketSize" placeholder="Tamanho de Jaqueta" value={formData.jacketSize} onChange={handleChange} />
        <input type="text" name="balaclavaSize" placeholder="Tamanho de Balaclava" value={formData.balaclavaSize} onChange={handleChange} />
        <input type="text" name="gogglesSize" placeholder="Tamanho de Óculos" value={formData.gogglesSize} onChange={handleChange} />
        <input type="text" name="glovesSize" placeholder="Tamanho de Luvas" value={formData.glovesSize} onChange={handleChange} />
        <input type="date" name="ppeReceiptDate" value={formData.ppeReceiptDate} style={styles.inputDate} onChange={handleChange} />
        <input type="checkbox" name="tookVacation" checked={formData.tookVacation} onChange={handleChange} />
        <input type="date" name="vacationDate" value={formData.vacationDate} style={styles.inputDate} onChange={handleChange} />
        <input type="text" name="terminationType" placeholder="Tipo de Rescisão" value={formData.terminationType} onChange={handleChange} />
        <input type="date" name="terminationDate" value={formData.terminationDate} style={styles.inputDate} onChange={handleChange} />
        <input type="checkbox" name="receivedIndemnity" checked={formData.receivedIndemnity} onChange={handleChange} />
        <input type="date" name="indemnityDate" value={formData.indemnityDate} style={styles.inputDate} onChange={handleChange} />
        <input type="number" name="indemnityValue" placeholder="Valor da Indenização" value={formData.indemnityValue} onChange={handleChange} />
        <input type="checkbox" name="admissionInterview" checked={formData.admissionInterview} onChange={handleChange} />
        <input type="checkbox" name="exitInterview" checked={formData.exitInterview} onChange={handleChange} />
        <input type="date" name="ppeReceiptDate" value={formData.ppeReceiptDate} style={styles.inputDate} onChange={handleChange} />

        <button type="submit" disabled={isLoading} style={styles.button}>
          {isLoading ? 'Cadastrando...' : 'Cadastrar Funcionário'}
        </button>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
    overflowX: 'hidden',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '300px',
    maxHeight: '80vh',
    overflowY: 'auto',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  inputDate: {
    height: '36px', // Definindo uma altura normal para os campos de data
    padding: '5px',
    fontSize: '14px',
  },
};

  
export default Employee;
