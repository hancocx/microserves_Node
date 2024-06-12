const express = require('express');
const axios = require('axios');
const app = express();

// Middleware para analizar JSON en las solicitudes
app.use(express.json());

/**
 * Endpoint que recibe un parámetro 'folio' en el cuerpo de la solicitud,
 * invoca el servicio de Spring Boot y retorna el digest en un JSON.
 */
app.post('/invoke', async (req, res) => {
    const { folio } = req.body;

    try {
        // Llamar al microservicio de Spring Boot
        const response = await axios.get(`http://localhost:8080/digest?folio=${folio}`);
        
        // Retornar la respuesta del microservicio
        res.json(response.data);
    } catch (error) {
        // Manejar errores y retornar una respuesta con error
        res.status(500).json({ error: 'Error invoking the Spring Boot service' });
    }
});

// Definir el puerto y escuchar por conexiones entrantes
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Node service listening on port ${PORT}`);
});