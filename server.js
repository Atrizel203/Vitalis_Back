const express = require('express');
const dotenv = require('dotenv');
const  sequelize  = require('./src/config/database.config');
const Paciente = require('./src/models/Paciente.js');
const Expediente = require('./src/models/Expediente');
const SignosVitales = require('./src/models/SignosVitales');
const pacienteRoutes = require('./src/routes/paciente.routes');
const expedienteRoutes = require('./src/routes/expediente.routes');
const signosVitalesRoutes = require('./src/routes/signosVitales.routes');
const authRoutes = require('./src/routes/auth.routes');
const analisisRoutes = require('./src/routes/analisis.routes.js');
const medicoRoutes = require('./src/routes/medico.routes.js');


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
    await Paciente.sync(); // Crear la tabla 'pacientes' primero
    await Medico.sync();    // Crear otros modelos independientes
    await Expediente.sync(); // Crear la tabla 'expedientes' después de 'pacientes'
    await Analisis.sync();  // Crear la tabla 'analisis' después de 'pacientes'
    console.log('Sincronización de modelos exitosa');
  } catch (error) {
    console.error('Error al sincronizar los modelos:', error);
  }
}

syncModels();



//Sincronización para los modelos
sequelize.sync().then(() => {
    console.log('Modelos sincronizados con la base de datos');
  }).catch(err => {
    console.error('Error al sincronizar los modelos:', err);
  });


// Conectar a la base de datos
sequelize.authenticate().then(() => {
  console.log('Conexión a la base de datos exitosa');
}).catch(err => {
  console.error('No se pudo conectar a la base de datos:', err);
});

// Ruta básica de prueba
app.get('/', (req, res) => {
  res.send('API de expediente médico');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
