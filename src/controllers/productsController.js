const {validationResult} = require("express-validator");
const db = require("../database/models");

const listAllProducts = async (req, res) => {
  try {
    const products = await db.Product.findAll();
    return res.render("products/index", {
      products,
    });
  } catch (error) {
    return console.log(error);
  }
};

const filterProducts = async (req, res) => {
  try {
    const products = await db.Product.findAll({
      where: {
        category_id: req.params.id,
      },
    });
    return res.render("products/index", {
      products,
    });
  } catch (error) {
    return console.log(error);
  }
};

const create = async (req, res) => {
  try {
    const products = await db.Product.findAll();
    const categories = await db.Category.findAll();
    return res.render("products/create", {
      products,
      categories,
    });
  } catch (error) {
    return console.log(error);
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = await db.Product.create({});
    return res.render("products/all");
  } catch (error) {
    return console.log(error);
  }
};
const controller ={
  //listar
  products: function(req,res) {
     db.Product.findAll({
      include :['categories']
     })
      .then(function(products){
        res.render('products/index',{products:products})

      })
  },
  //filtrar productos
  filterProducts:function(req,res){
    db.Product.findAll({
      where:{
        category_id:req.params.id,
      }
    })
    .then(function(products){
      res.render("products/index",{products:products})
    }) 
  },
 
  //detalle
  detail: function(req,res){
     db.Product.findByPk(req.params.id)
     .then(function(product){
      res.render("products/detail",{product:product})
     })
  },
  //crear
  create: function(req,res){
    let promCategories= db.Category.findAll();
    Promise
    .all([promCategories])
    .then(([allCategories])=>{
      
      return res.render( 'products/create',{allCategories}
    )})
    .catch(error => res.send(error))
  },
  store: function(req,res){
    //const inputFieldsValidation = validationResult(req);
  
      //if (inputFieldsValidation.errors.length > 0) {
       // return res.render("products/create", {
       //   errors: inputFieldsValidation.mapped(),
         // oldData: req.body,
     //   });
     // }
    //  let productAlreadyExists = db.Product.findOne({
   //     where: {
     //     name: req.body.name
     //   }
     // });

    //  if (productAlreadyExists) {
    //    return res.render("products/create", {
      //    errors: {
       //     name: {
        //      msg: "El Producto ya existe",
       //     },
        //  },
      //    oldData: req.body,
      //  });
    // }
    db.Product.create({
      name: req.body.name,
      price:req.body.price,
      presentation: req.body.presentation,
      description: req.body.description,
      stock:req.body.stock,
      on_sale:req.body.on_sale,
      category_id:req.body.category_id,
      image:req.body.image
    })
    
    .then(()=> {
      return res.redirect('/products/index')})            
  .catch(error => res.send(error))
    
  },
  //editar
  edit: function(req,res){
    let Products=db.Product;
    let productId=req.params.id;
    let promProducts=db.Product.findByPk(productId,{include:['category']})
    let promCategories= db.Category.findAll();
    Promise
    .all([promProducts,promCategories])
    .then(([Products, allCategories]) => {
      return res.render(path.resolve(__dirname, '..', 'views',  'edit'), {Products,allCategories})})
  .catch(error => res.send(error))
  },
 update: function(req,res){
  const inputFieldsValidation = validationResult(req);
  
  if (inputFieldsValidation.errors.length > 0) {
    return res.render("products/create", {
      errors: inputFieldsValidation.mapped(),
      oldData: req.body,
    });
  }
  db.Product.update({
    name: req.body.name,
    price:req.body.price,
    presentation: req.body.presentation,
    description: req.body.description,
    stock:req.body.stock,
    on_sale:req.body.on_sale,
    category_id:req.body.category_id,
    image:req.body.image
  },{
    where:{
   id: req.params.id
    }
  })
  .then(()=> {
    return res.redirect('/products/index')})            
.catch(error => res.send(error))
 },
 //eliminar
 delete: function(req,res){
  db.Product.findByPk(req.params.id)
  .then(Product => {
    return res.render(path.resolve(__dirname, '..', 'views',  'delete'), {Product})})
.catch(error => res.send(error))
 },
 destroy: function(req,res){
  db.Product.destroy({
    where:
      {id: req.params.id}
    , force: true}
  )
  .then(()=> {
    return res.redirect('/products/index')})            
.catch(error => res.send(error))
 } 
 
};
module.exports=controller;


