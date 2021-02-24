/**
 * Acá dejamos las rutas internas (rutas que asumen que el usuario ya se logueo a nuestra App)
 */
const { Router } = require('express');
//const { Keeper } = require('../db');
const router = Router();

// Middleware: Verifica si el usuario está logueado.
// en caso de que no, lo mandamos al login
function checkLogin(req, res, next) {
  if(req.session.user){
   // res.redirect('/')
  }else{
    return res.redirect('/login');
  }
  console.log('verificando que el usuario está logueado');
  next();
}


function checkAdmin(req, res, next){
  console.log("el usuario es admin");
  if(req.session.user.rol != "ADMIN"){
    return res.redirect('/');
  }
  console.log("llego a next");
  next();
}

router.get('/', [checkLogin], async (req, res) => {
  res.render('index.ejs');
});

router.post('/', [checkLogin, checkAdmin], async (req, res) => {
  try {
    // acá coloco lo que intento hacer
    await Keeper.create(req.body);

  } catch (err) {
    // acá coloco lo que haré si ocurre algún error
    req.flash('errors', err.errors[key].message);
  }
  res.redirect('/');
});

router.get('/admin',[checkLogin, checkAdmin],async (req,res) => {
  console.log("entrando a ruta admin");
  res.render('Vadmin.ejs');
});


module.exports = router;