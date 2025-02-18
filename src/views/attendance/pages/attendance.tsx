import React, { useEffect, useState } from "react";
import { listAttendanceRecords, searchAttendanceRecordsByEmployeeName } from "../../../api/attendanceApi";
import AttendanceCreateModal from "../../../components/modal/attendance/AttendanceCreateModal";
import AttendanceDetailsModal from "../../../components/modal/attendance/AttendanceDetailsModal";
import { AttendanceRecord } from "../../../interfaces/attendance-interface";

const Attendance = () => {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const limit = 10;

  const fetchAttendanceRecords = async () => {
    setIsLoading(true);
    try {
      const data = isSearching && searchQuery.trim()
        ? await searchAttendanceRecordsByEmployeeName(searchQuery, page, limit)
        : await listAttendanceRecords(page, limit);

      setRecords(data.attendanceRecords);
      setTotal(data.total);
    } catch (error) {
      console.error("Erro ao buscar registros de frequência:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceRecords();
  }, [page, isSearching, searchQuery]);

  const handleSearch = () => {
    setSearchQuery(searchTerm);
    setIsSearching(searchTerm.trim() !== "");
    setPage(1);
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Lista de Frequências</h2>
        <button className="button cadastrar-frequencia" onClick={() => setIsCreateModalOpen(true)}>
          Cadastrar Frequência
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por nome do funcionário..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {isLoading ? (
        <p>Carregando...</p>
      ) : records.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Funcionário</th>
              <th>Período</th>
              <th>Faltas</th>
              <th>Dias Trabalhados</th>
              <th>Situação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.employeeFullName}</td>
                <td>{record.referencePeriod}</td>
                <td>{record.absences}</td>
                <td>{record.workedDays}</td>
                <td>{record.situation}</td>
                <td>
                  <button
                    className="button detalhes-frequencia"
                    onClick={() => {
                      setSelectedRecord(record);
                      setIsDetailsModalOpen(true);
                    }}
                  >
                    Visualizar Detalhes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum registro de frequência encontrado.</p>
      )}

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Anterior</button>
        <span>Página {page}</span>
        <button disabled={page * limit >= total} onClick={() => setPage(page + 1)}>Próxima</button>
      </div>

      {isCreateModalOpen && <AttendanceCreateModal onClose={() => setIsCreateModalOpen(false)} />}
      {isDetailsModalOpen && selectedRecord && (
        <AttendanceDetailsModal record={selectedRecord} onClose={() => setIsDetailsModalOpen(false)} />
      )}
    </div>
  );
};

export default Attendance;
