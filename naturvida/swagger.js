const swagger = require('swaggest');

const swaggerDocument = {
    swagger: '2.0',
    info: {
        title: 'Documentacion ',
        version: '1.0.0',
        description: 'Documentacion Api',
    },
    host: 'localhost:3000',
    basePath: '/api',
    schemes: ['http'],
    paths: {
        '/login':{
            post: {
                summary: 'login vendedor',
                responses: {
                    200: {
                        description: '"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTUzMzAxMjg3ODQ3Y2M2ZDg5Zjg1YSIsImlhdCI6MTcyMTA5MDcyNCwiZXhwIjoxNzIxMTc3MTI0fQ.3IsE8BHcoOvRMYOyMMi68HSgjOJ2d63jfvaJ9AP9Ct0"'
                    }
                }
            }
        }
    },
    definitions: {
        login: {
            type: 'object',
            properties: {
                venUsername: {type: 'string'},
                venPassword: {type: 'string'}
            },
            required: ['venUsername','venPassword']
        }
    },
    paths: {
         '/clientes': {
            get: {
                summary: 'obtener clientes',
                responses: {
                    200: {
                       description: 'lista de clientes',
                       schema: {
                        type: 'array',
                        items: {
                            description: '...'
                        }
                       }
                    }
                }
            }
         }   
    },
    definitions: {
        clientes: {
            type: 'object',
            properties: {
                dNombre: {type: 'string'},
                dDireccion: {type: 'string'},
                dTelefono: {type: 'string'},
                dCorreo: {type: 'string'},
                dCedula : {type: 'string'},

            },
            required: ['dNombre','dDireccion','dTelefono','dCorreo','dCedula']
        }
    },
    Post: {
        summary: 'registrar clientes',
        responses: {
            200: {
               description: 'cliente registrado ',
               schema: {
                type: 'array',
                items: {
                    description: ' dNombre: juan, dDireccion: lara, dTelefono: 123141, dCorreo: victor2211@gmail.com'
                }
               }
            }
        }
    
 },
 Put: {
    summary: 'actualizar clientes',
    responses: {
        200: {
           description: 'lista de clientes',
           schema: {
            type: 'array',
            items: {
                description: ' dNombre: juan, dDireccion: lara, dTelefono: 123141, dCorreo: victor2211@gmail.com'
            }
           }
        }
    }

},      
delete: {
    summary: 'eliminar clientes',
    responses: {
        200: {
           description: 'cliente eliminado ',
           schema: {
            type: 'array',
            items: {
                description: ' cliente eliminado con exito'
            }
           }
        }
    }

},
paths: {
    '/facturas': {
       get: {
           summary: 'obtener facturas',
           responses: {
               200: {
                  description: 'lista de todas las facturas',
                  schema: {
                   type: 'array',
                   items: {
                       description: '...'
                   }
                  }
               }
           }
       }
    }   
},
definitions: {
   clientes: {
       type: 'object',
       properties: {
           facValorTotal: {type: 'string'},
           clicCedula: {type: 'string'},
           clicNombre: {type: 'string'},
           venUsername: {type: 'string'},

       },
       required: ['facValorTotal','clicCedula','clicNombre','venUsername', 'jwt']
   }
},   
}