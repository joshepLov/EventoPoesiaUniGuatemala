import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ReportePage.css';
import axios from 'axios';
import { Navbar } from '../../components/Navbar/Navbar';
import exampleImage from '../../assets/img/fondo.jpg';

export const ReportePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3021/user/get/${id}`);
      const userData = response.data.exitUser;
      setUser(userData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Navbar />
      {user && (
      <div className="card">
    <div className="card-img"><div className=""><img src={exampleImage}   style={{width: '90px'}}alt='Example' /></div></div>
    <div className="card-title">Your Name:  {user.name}</div>
    <div className="card-title">your day to declare: {formatDate(user.reportDate)}</div>
    <div className="card-subtitle">The University thanks you for declaring in your favorite genre</div>
    <hr className="card-divider"/>
    <div className="card-footer">
        <div className="card-price"> genre of poetry: {user.genrePoetry}</div>

    </div>
</div>
 )}
    </>
  );
};


