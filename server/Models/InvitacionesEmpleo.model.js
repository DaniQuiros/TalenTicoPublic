const mongoose = require('mongoose')

const schemaInvitacionEmpleo= new mongoose.Schema({
    
    candidato: {
        type: String,
        required: true,
      },
      detalles:[
        {
          puesto: {
            type: String,
            required: false,
          },
          remisor:{
            type: String,
            required: false
          },
          href:{
            type: String,
            required: false,

          }
        }
        
      ]
    
})

module.exports = mongoose.model('InvitacionEmpleo', schemaInvitacionEmpleo, 'invitacionEmpleos')