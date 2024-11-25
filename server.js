const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Importar CORS
const sequelize = require('./src/config/database.config');
const Paciente = require('./src/models/Paciente');
const Expediente = require('./src/models/Expediente');
const SignosVitales = require('./src/models/SignosVitales');
const Analisis = require('./src/models/Analisis');
const Medico = require('./src/models/Medico');
const pacienteRoutes = require('./src/routes/paciente.routes');
const expedienteRoutes = require('./src/routes/expediente.routes');
const signosVitalesRoutes = require('./src/routes/signosVitales.routes');
const authRoutes = require('./src/routes/auth.routes');
const analisisRoutes = require('./src/routes/analisis.routes');
const medicoRoutes = require('./src/routes/medico.routes');
const Usuario = require('./src/models/usuario.model');

dotenv.config();
const app = express();

// Configuración de CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Cambia a la URL de tu frontend (e.g., http://localhost:3001)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Habilita el envío de cookies
};
app.use(cors(corsOptions)); // Usar CORS con las opciones definidas

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/expedientes', expedienteRoutes);
app.use('/api/signos-vitales', signosVitalesRoutes);
app.use('/api/analisis', analisisRoutes);
app.use('/api/medicos', medicoRoutes);

// Sincronización de modelos
async function syncModels() {
  try {
    await Paciente.sync();
    await Medico.sync();
    await Expediente.sync();
    await SignosVitales.sync();
    await Analisis.sync();
    await Usuario.sync();
    console.log('Sincronización de modelos exitosa');
  } catch (error) {
    console.error('Error al sincronizar los modelos:', error);
  }
}

// Conexión a la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
    syncModels();
  })
  .catch((err) => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de expediente médico');
});

// Inicio del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${PORT}`);
});
