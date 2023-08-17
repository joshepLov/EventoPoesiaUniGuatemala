import {React} from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom'
import { NombreContexto } from '../../Index'
import axios from 'axios';
import Swal from 'sweetalert2';
import { Navbar } from '../../components/Navbar/Navbar';

export const LoginPage = () => {


  const navigate = useNavigate();

  const registerAdmin = async () => {
    try {
      let register = {
        carne: document.getElementById('carne').value,
        name: document.getElementById('name').value,

      };

      const { data } = await axios.post('http://localhost:3021/user/login', register);

      console.log(data);

      if (data.message) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: data.message,
          confirmButtonText: 'OK'
        });
        navigate('/reportUser')
      }
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: e.response.data.message,
        confirmButtonText: 'OK'
      });
      console.error(e);
    }
  };


  return (
    <>
      <Navbar />
      <div className='body'>
        <div className='container'>
          <div className='login-box'>
            <p>Login</p>
            <form>
              <div className='flex'>
                <div className='user-box'>
                  <input required type='text' id='carne' />
                  <label>Carne</label>
                </div>
                <div className='user-box'>
                  <input required type='text' id='name' />
                  <label>Name</label>
                </div>
              </div>

              <button type='button' onClick={registerAdmin}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>


    </>
  );
};
