const express=require('express');
const Client=require('./models/client'); 
const Product=require('./models/products');
const mongoose = require('mongoose');

const bodyParser =require('body-parser');

const app=express();

//bodyParser:utilise pour defined l'object de ajoute ou delete..de clients
app.use(bodyParser.urlencoded({extended:false}));
//parse application/json
app.use(bodyParser.json());

//localhost:8000/etudient ou quelque chose
app.listen(8000,()=>console.log("server en marche"));
 
//DeprecationWarning: Mongoose: the `strictQuery` option will be switched back
mongoose.set('strictQuery',true);

//connect to bd
mongoose.connect(
    'mongodb+srv://chaima:chaima@cluster0.tkrpdyx.mongodb.net/?retryWrites=true&w=majority', //lien de connect bd
    (error,done)=>{
        if (error)
            {
                console.log(error);
            }
        if(done)
            {
                console.log("base de donnée connecté avec succes !");
            }    
    }
);

//select clients
app.get('/clients',async(req,res)=>
{ 
    try{
//find():methode de mongoose mettre a trouver des choses correspondence a modele client
//find({}):sans charit lawij
//then():mettre tous les clients
await Client.find({}).then(result=>
       {
        res.send(result);
       })
    }
    catch(err)
    {console.log(err);}
});

//ajoute clients
app.post('/ajouter_client',async (req,res)=>
{
    try{
        let new_client = new Client({
            //champ client de model Client
            cin:req.body.cin,
            nom:req.body.nom,
            prenom:req.body.prenom,
            email:req.body.email,
        });
/*async ...await: mistarmlou7a bach yo9rad yistana lin tikmil 5idma
  save:une methode
*/
        await new_client.save()   
            res.send('save effectué client avec succes!');     
        }

    catch(err)
            {console.log(err);} 

});

//delete clients
app.delete('/delete/:id',async(req,res)=>
{try{
    await Client.findOneAndDelete({id:req.params.id})   
        res.send('supprimer client avec succes!');     
    }
catch(err)
        {console.log(err);} 

});

//modifier clients
app.put('/email/:id',async(req,res)=>
{
    try{
        await Client.findOneAndUpdate({id:req.params.id},
            {email:req.body.email})   
            res.send('modifier client avec succes!');     
        }
    catch(err)
            {console.log(err);} 
    
})

//ajoute product
app.post('/ajouter_product',async (req,res)=>
{
    try{
        let new_product = new Product({
            title:req.body.title,
            image:req.body.image,
            description:req.body.description,
            quantity:req.body.quantity,
        });
        await new_product.save()   
            res.send('save effectué product avec succes!');     
        }

    catch(err)
            {console.log(err);} 
});

//get one product
app.get('/product/:idProduct',async(req,res)=>
 {
    try{
        await Product.findById({idProduct:req.params.idProduct},
        {title:req.body.title,
            quantity:req.body.quantity
       
        })
    }
    catch(err)
    {console.log(err);}  

}

)
