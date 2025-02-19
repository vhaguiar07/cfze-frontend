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
    <div className="main-containt-tables">
      <div className="container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar por nome do funcionário..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="button" onClick={handleSearch}>Buscar</button>
        </div>
        <div className="header">
          <h2 className="font-bold">Lista de Frequências</h2>
          <button className="button cadastrar-acidente" onClick={() => setIsCreateModalOpen(true)}>
            + Cadastrar Frequência
          </button>
        </div>
        {isLoading ? (
          <p>Carregando...</p>
        ) : records.length > 0 ? (
          <>
            <div className="wrap-table100">
              <div className="table">
                <div className="row header">
                  <div className="cell">Funcionário</div>
                  <div className="cell">Período</div>
                  <div className="cell">Faltas</div>
                  <div className="cell">Dias Trabalhados</div>
                  <div className="cell">Situação</div>
                  <div className="cell">Ações</div>
                </div>
                {records.map((record) => (
                  <div className="row" key={record.id}>
                    <div className="cell" data-title="Funcionário">
                      {record.employeeFullName}
                    </div>
                    <div className="cell" data-title="Período">
                      {record.referencePeriod}
                    </div>
                    <div className="cell" data-title="Faltas">
                      {record.absences}
                    </div>
                    <div className="cell" data-title="Dias Trabalhados">
                      {record.workedDays}
                    </div>
                    <div className="cell" data-title="Situação">
                      {record.situation}
                    </div>
                    <div className="cell" data-title="Ações">
                      <button className="button" onClick={() => {setSelectedRecord(record); setIsDetailsModalOpen(true); }}>
                        Visualizar Detalhes
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pagination">
              <button className="button" disabled={page === 1} onClick={() => setPage(page - 1)}>
                Anterior
              </button>
              <span className="font">Página {page}</span>
              <button className="button" disabled={page * limit >= total} onClick={() => setPage(page + 1)}>
                Próxima
              </button>
            </div>
          </>
          ) : (
            <p>Nenhum registro de frequência encontrado.</p>
          )}
        {isCreateModalOpen && <AttendanceCreateModal onClose={() => setIsCreateModalOpen(false)} />}
        {isDetailsModalOpen && selectedRecord && (
          <AttendanceDetailsModal record={selectedRecord} onClose={() => setIsDetailsModalOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default Attendance;
