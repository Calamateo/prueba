const createUserInitial = {
  usuario: 'SuperUser',
  rolId: 3,
  correo: 'superuser@yopmail.com',
  contrasena: '1234Qwerty@',
  actualizado: true,
  estatus: 1,
  persona: {
    nombre: 'Super',
    apellidoPaterno: 'User',
  },
};
const createUser = {
  usuario: 'Calamateo',
  rolId: 3,
  correo: 'calamate0@yopmail.com',
  contrasena: '1234Qwerty@',
  actualizado: true,
  estatus: 1,
  persona: {
    nombre: 'Daniel',
    apellidoPaterno: 'Calamateo',
  },
};
const loginUser = {
  usuario: 'Calamateo',
  contrasena: '1234Qwerty@',
};
const userPasswordIncorrect = {
  usuario: 'calamateo',
  contrasena: '34jifj3933wfA',
};
const errorPasswordUserCreate = {
  usuario: 'Calamateo1',
  rolId: 3,
  correo: 'calamate0@yopmail.com',
  contrasena: '1234Qwerty',
};
const errorUserCreate = {
  usuario: '',
  rolId: 3,
  correo: 'calamate0@yopmail.com',
  contrasena: '1234Qwerty@',
};

module.exports = {
  createUser,
  createUserInitial,
  loginUser,
  userPasswordIncorrect,
  errorPasswordUserCreate,
  errorUserCreate,
};
