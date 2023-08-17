import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar } from '../../components/Navbar/Navbar';
import './ReporteUserPage.css'

export const ReporteUserPage = () => {
  const [reportData, setReportData] = useState([]);

  const generateReport = async () => {
    try {
      const { data } = await axios.get('http://localhost:3021/user/report');
      setReportData(data.reportData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    generateReport();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Navbar />
      <div className='report-container'>
        <h2>Reporte de Estudiantes Inscritos</h2>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Carrera</th>
              <th>Edad</th>
              <th>Género de Poesía</th>
              <th>Fecha de Declaración</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.specialty}</td>
                <td>{student.age}</td>
                <td>{student.genrePoetry}</td>
                <td>{formatDate(student.reportDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
