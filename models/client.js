//mongoose
const mongoose=require('mongoose');

//schema general de client enregister dans bd
const clientSchema=mongoose.Schema({
    cin:{
        type:Number,
        required:true
    },
    nom:{
        type:String,
        required:true //true=obligatoire remplir nom
    },
    prenom:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
});

module.exports=Client=mongoose.model('client',clientSchema);