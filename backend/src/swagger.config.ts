import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Government Data Buddy API',
    version: '1.0.0',
    description: 'Congress.gov API integration with caching and enhanced features',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'X-API-Key',
        description: 'API Key for Congress.gov API access',
      },
    },
    schemas: {
      ErrorResponse: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'Error message',
          },
        },
      },
      Bill: {
        type: 'object',
        properties: {
          congress: {
            type: 'integer',
            description: 'Congress number',
            example: 117,
          },
          latestAction: {
            type: 'object',
            properties: {
              actionDate: { type: 'string', format: 'date' },
              text: { type: 'string' },
            },
          },
          number: { type: 'string' },
          originChamber: { type: 'string', enum: ['house', 'senate'] },
          originChamberCode: { type: 'string' },
          title: { type: 'string' },
          type: { type: 'string' },
          updateDate: { type: 'string', format: 'date-time' },
          updateDateIncludingText: { type: 'string', format: 'date-time' },
          url: { type: 'string', format: 'uri' },
        },
      },
      BillsResponse: {
        type: 'object',
        properties: {
          bills: {
            type: 'array',
            items: { $ref: '#/components/schemas/Bill' },
          },
          pagination: {
            type: 'object',
            properties: {
              page: { type: 'integer' },
              limit: { type: 'integer' },
              total: { type: 'integer' },
              totalPages: { type: 'integer' },
            },
          },
        },
      },
      Committee: {
        type: 'object',
        properties: {
          chamber: { type: 'string', enum: ['house', 'senate', 'joint'] },
          committeeTypeCode: { type: 'string' },
          name: { type: 'string' },
          systemCode: { type: 'string' },
          url: { type: 'string', format: 'uri' },
        },
      },
      CommitteeResponse: {
        type: 'object',
        properties: {
          committees: {
            type: 'array',
            items: { $ref: '#/components/schemas/Committee' },
          },
          pagination: {
            type: 'object',
            properties: {
              page: { type: 'integer' },
              limit: { type: 'integer' },
              total: { type: 'integer' },
              totalPages: { type: 'integer' },
            },
          },
        },
      },
      Member: {
        type: 'object',
        properties: {
          bioguideId: { type: 'string' },
          birthYear: { type: 'integer' },
          deathYear: { type: 'integer' },
          familyName: { type: 'string' },
          givenName: { type: 'string' },
          middleName: { type: 'string' },
          honorificName: { type: 'string' },
          nickname: { type: 'string' },
          officialName: { type: 'string' },
          suffix: { type: 'string' },
          unmarriedName: { type: 'string' },
          updateDate: { type: 'string', format: 'date-time' },
        },
      },
      MembersResponse: {
        type: 'object',
        properties: {
          members: {
            type: 'array',
            items: { $ref: '#/components/schemas/Member' },
          },
          pagination: {
            type: 'object',
            properties: {
              page: { type: 'integer' },
              limit: { type: 'integer' },
              total: { type: 'integer' },
              totalPages: { type: 'integer' },
            },
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./src/controller/*.ts'], // Path to the API docs
};

export const swaggerSpec = swaggerJSDoc(options);
