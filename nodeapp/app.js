var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let pessoaRouter = require('./routes/pessoa');
let enominadoRouter = require ('./routes/enominado');
let eventoRouter = require ('./routes/evento');
let filmeRouter = require ('./routes/filme');
let filmenominadoRouter = require ('./routes/filmenominado');
let premioRouter = require ('./routes/premio');
const atorelencoRouter = require('./routes/atorelenco');
const atorprincipalRouter = require('./routes/atorprincipal');
const edicaoRouter = require('./routes/edicao');
const ediretorRouter = require('./routes/ediretor');
const ejuriRouter = require('./routes/ejuri');
const eprodutorRouter = require('./routes/eprodutor');
const eroteiristaRouter = require('./routes/eroteirista');
const localestreioRouter = require('./routes/localestreio');

//relatorios
const atoresMaisPremiadosRouter = require('./routes/atoresMaisPremiados');
const filmesMaisPremiadosRouter = require('./routes/filmesMaisPremiados');
const maiorArrecadacaoRouter = require('./routes/maiorArrecadacao');
const melhorAtorRouter = require('./routes/melhorAtor');
const premioDetalhesRouter = require('./routes/premioDetalhes');

var app = express();

// view engine setup
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pessoa', pessoaRouter);
app.use('/enominado', enominadoRouter);
app.use('/evento', eventoRouter);
app.use('/filme', filmeRouter);
app.use('/filmenominado', filmenominadoRouter);
app.use('/premio', premioRouter);
app.use('/atorelenco', atorelencoRouter);
app.use('/atorprincipal', atorprincipalRouter);
app.use('/edicao', edicaoRouter);
app.use('/ediretor', ediretorRouter);
app.use('/ejuri', ejuriRouter);
app.use('/eprodutor', eprodutorRouter);
app.use('/eroteirista', eroteiristaRouter);
app.use('/localestreio', localestreioRouter);

//Rotas dos relatorios
app.use('/atoresMaisPremiados', atoresMaisPremiadosRouter);
app.use('/filmesMaisPremiados', filmesMaisPremiadosRouter);
app.use('/maiorArrecadacao', maiorArrecadacaoRouter);
app.use('/melhorAtor', melhorAtorRouter);
app.use('/premioDetalhes', premioDetalhesRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
