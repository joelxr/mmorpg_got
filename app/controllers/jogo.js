module.exports.jogo = function (application, req, res) {
  if (req.session.autorizado !== true) {
    res. send('Usuário precisa fazer o login!');
    return;
  }

  var msg = '';

  if(req.query.msg != '') {
    msg = req.query.msg;
  }

  var casa = req.session.casa;
  var usuario = req.session.usuario;
  var connection = application.config.dbConnection;
  var JogoDAO = new application.app.models.JogoDAO(connection);

  JogoDAO.iniciaJogo(res, usuario, casa, msg);
}

module.exports.sair = function (application, req, res) {
  req.session.destroy(function (err) {
    res.render('index', {validacao : {}});
  });
}

module.exports.suditos = function (application, req, res) {
  if (req.session.autorizado !== true) {
    res. send('Usuário precisa fazer o login!');
    return;
  }

  res.render('aldeoes', {validacao : {}});
}

module.exports.pergaminhos = function (application, req, res) {
  if (req.session.autorizado !== true) {
    res. send('Usuário precisa fazer o login!');
    return;
  }

  var conn = application.config.dbConnection;
  var JogoDAO = new application.app.models.JogoDAO(conn);
  var usuario = req.session.usuario;

  JogoDAO.getAcoes(usuario, res);
}

module.exports.ordenar_acao_sudito = function (application, req, res) {
  if (req.session.autorizado !== true) {
    res. send('Usuário precisa fazer o login!');
    return;
  }

  var dados = req.body;

  req.assert('acao', 'Acao deve ser informada!').notEmpty();
  req.assert('quantidade', 'Quantidade deve ser informada!').notEmpty();
  var erros = req.validationErrors ();

  if (erros) {
    res.redirect('jogo?msg=A');
    return;
  }

  var conn = application.config.dbConnection;
  var JogoDAO = new application.app.models.JogoDAO(conn);

  dados.usuario = req.session.usuario;
  JogoDAO.acao(dados);

  res.redirect('jogo?msg=B');

}

module.exports.revogar_acao = function (application, req, res) {
  var url_query = req.query;
  var conn = application.config.dbConnection;
  var JogoDAO = new application.app.models.JogoDAO(conn);

  var _id = url_query.id_acao;
  JogoDAO.revogarAcao(_id, res);
}
