const mongoose=require('mongoose');

//schema general de produit enregister dans bd
const productSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true //true=obligatoire remplir nom
    },
    description:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
});

module.exports=Product=mongoose.model('product',productSchema);