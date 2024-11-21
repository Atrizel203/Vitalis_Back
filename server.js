const express = require('express');
const dotenv = require('dotenv');
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
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/expedientes', expedienteRoutes);
app.use('/api/signos-vitales', signosVitalesRoutes); 
app.use('/api/analisis', analisisRoutes);
app.use('/api/medicos', medicoRoutes);

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

sequelize.authenticate().then(() => {
  console.log('Conexión a la base de datos exitosa');
  syncModels();
}).catch(err => {
  console.error('No se pudo conectar a la base de datos:', err);
});

app.get('/', (req, res) => {
  res.send('API de expediente médico');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${PORT}`);
});
