import {React} from 'react';
import './RegisterPage.css';
import { useNavigate } from 'react-router-dom'
import { NombreContexto } from '../../Index'
import axios from 'axios';
import Swal from 'sweetalert2';
import { Navbar } from '../../components/Navbar/Navbar';



export const RegisterPage = () => {



  const navigate = useNavigate();

  const registerAdmin = async () => {
    try {
      let register = {
        carne: document.getElementById('carne').value,
        name: document.getElementById('name').value,
        address: document.getElementById('address').value,
        gender: document.getElementById('gender').value,
        phone: document.getElementById('phone').value,
        birthdate: document.getElementById('birthdate').value,
        specialty: document.getElementById('specialty').value,
        genrePoetry: document.getElementById('genrePoetry').value,
      };

      const { data } = await axios.post('http://localhost:3021/user/add', register);

      console.log(data);

      if (data.message) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: data.message,
          confirmButtonText: 'OK'
        });
        navigate(`/report/${register.carne}`)
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
            <p>Register</p>
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
              <div className='user-box'>
                <input required type='text' id='address' />
                <label>Address</label>
              </div>

              <div className='flex' id='sel'>
                <div className='user-box'>
                  <select className='form-select' id='gender'>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                  </select>
                </div>

                <select className='form-select' id='genrePoetry'>
                  <option value='Lirica'>lirica</option>
                  <option value='epica'>epica</option>
                  <option value='dramatica'>dramatica</option>
                </select>
              </div>

              <div className='flex'>
                <div class='user-box'>
                  <input required type='date' id='birthdate' />
                </div>
                <div className='user-box'>
                  <input required type='text' id='specialty' />
                  <label>Specialty</label>
                </div>
              </div>
              <div className='user-box'>
                <input required type='text' id='phone' />
                <label>Phone</label>
              </div>

              <button type='button' onClick={registerAdmin}>
                Register
              </button>
            </form>
          </div>
        </div>
      </div>


    </>
  );
};
