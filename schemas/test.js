const Ajv = require('ajv')

const refParser = require('json-schema-ref-parser')

const ajv = new Ajv({
    allErrors: true,
    v5: true
})

require('ajv-merge-patch/keywords/merge')(ajv)

console.log('ajv', ajv)

ajv.addMetaSchema( require('ajv/lib/refs/json-schema-draft-04.json') )


const refSchema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "$merge":{
        "source": {
            "$ref": "./urlDef.json#",
        },
        "with": {
            "properties": {
                "img": { "type": "string" }
            }
        }
    }
}

refParser
.dereference(refSchema)
.then( schema => {

    console.log( ' logSchema::: ', JSON.stringify(schema, 1 ,1) )

    const validateUrl = ajv.compile( schema )
    
    const vc = validateUrl({
        url: 'http://www.localhost.com',
        id: 14253698574,
        img: "nice",
        tel: {
            dialCode: "+32"
        }
    })
    console.log(  'isValid', vc )
    console.log(  'error', validateUrl.errors )
})
.catch( console.log )


