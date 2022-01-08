
const {Schema, model} = require('mongoose');

const MedicSchema = Schema({

    name: {
        type: String,
        required: true
    },
    img:{
        type: String,
    },
    user:{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    hospital:{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }
});

MedicSchema.method('toJSON', function() {
    const {__v, _id,...object } = this.toObject();

    object.medicID = _id;
    return object;
})

module.exports = model('Medic', MedicSchema);