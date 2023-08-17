'use strict'

const moment = require('moment/moment');
const User = require('./user.model');



exports.addUser= async (req, res) => {
    try {
        let data = req.body;
        let existUser = await User.findOne({ name: data.carne })
        if (existUser) return res.send({ message: `This username ${data.carne} already exists` });
        //Validacion que el carne sea de 6 digitos
        if (data.carne.length !== 6) return res.status(400).send({ message: 'You must enter 6 digits for this field to be valid' });
        // Validar que el primer caracter sea unicamente sea "A" mayuscula
        if (!/^A/.test(data.carne)) return res.status(400).send({ message: 'Your carne is not valid. Check that the first data is correct' });
        //Validar que el tercer caracter sea 5
        if (data.carne.charAt(2) !== '5') return res.status(400).send({ message: 'Your meat is not valid. Check that the third data is correct' });
        //validar que el ultimo caracter termine unicamente en 1, 3 o 9
        const ultimoDigito = data.carne.charAt(5);
        if (ultimoDigito !== '1' && ultimoDigito !== '3' && ultimoDigito !== '9') return res.status(400).json({ message: 'Your meat is not valid. Check that the last data is correct' });
        //validar que su edad no sea menor a 17 años
        const fechaNacimiento = moment(data.birthdate);
        const fechaActual = moment();
        const edad = fechaActual.diff(fechaNacimiento, 'years');
        if (edad < 17) return res.status(400).send({ message: 'your age is not allowed to complete this form' });
        let fechaDeDeclaracion;
        if (ultimoDigito === '1' && data.genrePoetry === 'dramatica') {
            // Calcula la fecha de declamación 5 días hábiles después de la inscripción
            fechaDeDeclaracion = moment().add(5, 'days');

            // Asegurarse de que los sábados y domingos no cuenten
            while (fechaDeDeclaracion.day() === 0 || fechaDeDeclaracion.day() === 6) {
                fechaDeDeclaracion.add(1, 'day');
            }
        } else if (ultimoDigito === '3' && data.genrePoetry === 'epica') {
            // Calcula la fecha de declamación como el último día del mes
            fechaDeDeclaracion = moment().endOf('month');
            while (fechaDeDeclaracion.day() === 0 || fechaDeDeclaracion.day() === 6) {
                // Si es sábado o domingo, resta un día
                fechaDeDeclaracion.subtract(1, 'days');
            }
        } else {
            // Calcula la fecha de declamación como el próximo viernes
            fechaDeDeclaracion = moment().day(5); // Viernes de la semana actual
            if (fechaDeDeclaracion.isBefore(moment(), 'day')) {
                fechaDeDeclaracion.add(1, 'week'); // Si ya pasó el viernes de esta semana, sumar una semana
            }
        }
        // Guarda la fecha de declamación en el objeto data
        data.reportDate = fechaDeDeclaracion.toDate();
        data.registrationDate = moment();
        // Crea y guarda el usuario en la base de datos
        let user = new User(data);
        await user.save();

        return res.send({ message: 'Account created successfully' });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error Server' });
    }
}

    exports.getUser = async (req, res) => {
        try {
            let params = req.params.carne;
            let exitUser = await User.findOne({ carne: params })
            if (!exitUser) return res.status(404).send({ message: 'User not found' });
            return res.send({ message: 'User found', exitUser })
        } catch (e) {
            console.error(e)
            return res.status(500).send({ message: 'Error Server' })
        }
    }


    function calculateAge(birthdate) {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }

        return age;
      }

    exports.generateReport = async (req, res) => {
        try {
          const students = await User.find();



          const reportData = students.map((student) => {
            const age = calculateAge(student.birthdate);
            return {
              name: student.name,
              career: student.career,
              age: age,
              genrePoetry: student.genrePoetry,
              reportDate: student.reportDate,
            };
          });

          return res.send({ reportData });
        } catch (error) {
          console.error(error);
          return res.status(500).send({ message: 'Error generating report' });
        }
      };




exports.createDefaultUser = async () => {
  try {
    const defaultUser = {
      carne: 'A12549',
      name: 'Usuario Por Defecto',
      role: 'ADMIN',
      address: 'Guatemala',
      gender: 'Dafult',
      phone: 'Default',
      birthdate: moment(),
      specialty: 'Defualt',
      genrePoetry: 'Default',
      registrationDate: moment(),
      reportDate: moment()

      // ... otros campos ...
    };

    // Verifica si ya existe un usuario con el mismo carné
    const existingUser = await User.findOne({ carne: defaultUser.carne });
    if (existingUser) {
      console.log('El usuario por defecto ya existe.');
      return;
    }

    // Crea el usuario por defecto
    const user = new User(defaultUser);
    await user.save();

    console.log('Usuario por defecto creado exitosamente.');
  } catch (error) {
    console.error('Error al crear el usuario por defecto:', error);
  }
};

exports.loging = async (req, res) => {
  try {
    const { carne, name } = req.body;
    const user = await User.findOne({ carne, name });
    if (!user) return res.status(400).send({ message: 'authenticating falied' });
    return res.send({ message: 'authenticating succefully' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error while authenticating' });
  }
};



