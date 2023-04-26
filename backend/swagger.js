const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const app = express();

const options = {
    swaggerDefinition: {
      info: {
        title: 'Student APIs',
        version: '1.0.0',
        description: 'Student apis',
      },
    },
    apis: ['./routes/*.js'], // Replace with the path to your API routes
  };
  
  const swaggerSpec = swaggerJsdoc(options);