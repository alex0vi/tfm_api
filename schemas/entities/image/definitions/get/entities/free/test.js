const Ajv = require('ajv')
const refParser = require('json-schema-ref-parser')
const Ru = require('rutils')

const entitySchema = require('./index.json')

const ajv = new Ajv({ allErrors: true})

process.chdir(`${__dirname}/../../../`) //Changing process.cwd()

require('ajv-merge-patch/keywords/merge')(ajv)

ajv.addMetaSchema( require('ajv/lib/refs/json-schema-draft-04.json') )

const validUrl = "https://latest.addaps.com/static/uploaded_images/646ad129-dc70-4d6e-8175-7f389efbb8be_200x200.jpg"
const invalidUrl = "https://latest"
const validUUID = "646ad129-dc70-4d6e-8175-7f389efbb8be"
const invalidUUID = "7f389efbb8be"



const entity = {
    valid: {
        withId: {
            "sm": validUrl,
            "m":  validUrl,
            "lm": validUrl,
            "free": validUrl,
            "id": validUUID
        },
        withIdNil: {
            "sm": validUrl,
            "m":  validUrl,
            "lm": validUrl,
            "free": validUrl,
            "id": null
        }
    },
    invalid:{
        withoutRequiredProp: {
            "m":  validUrl,
            "lm": validUrl,
            "free": validUrl,
            "id": validUUID
        },
        withWrongPropTypeFormat: {
            "sm": invalidUrl,
            "m":  invalidUrl,
            "lm": invalidUrl,
            "free": invalidUrl,
            "id": invalidUUID
        }
    }
}

refParser
.dereference(entitySchema)
.then( schema => {

    // console.log( ' logSchema::: ', JSON.stringify( schema, 1, 1 ) )

    const validate = ajv.compile( schema )
    
    const paths = [
        ['valid', 'withIdNil' ],
        ['valid', 'withoutId' ],
        ['invalid', 'withoutRequiredProp' ],
        ['invalid', 'withWrongPropTypeFormat' ]
    ]
    
    
    const goTests = Ru.forEach( p => {
            
        const isValid = validate( Ru.path( p, entity ) )
        
        console.log(  p , isValid )
        if ( !isValid ) {
            console.log(  'error', validate.errors )
        }
        
        console.log("\n")
    })
    
    goTests(paths)
    
})
.catch( e => {
    console.log('============error=============== ', e)
})

