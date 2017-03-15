function UsuariosDAO(conn) {
    this._conn = conn();
}

UsuariosDAO.prototype.inserirUsuario = function (usuario) {
    this._conn.open(function(err, mongoclient) {
        mongoclient.collection("usuarios", function(err, collection) {
            collection.insert(usuario);
            mongoclient.close();
        });
    });
}

module.exports = function () {
    return UsuariosDAO;
}
