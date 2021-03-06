var Sequelize = require('sequelize');

module.exports = function Data(options) {

  var inSync = false;
  var db;

  if (options.url) {
    db = new Sequelize(options.url, { dialectOptions: { ssl: true } });
  } else {
    db = new Sequelize(options.database, options.username, options.password, {
      host: options.host,
      port: options.port,
      dialect: options.dialect
    });
  }

  var User = db.define('user', {
    id:     { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name:   Sequelize.STRING
  });

  var Crime = db.define('crime', {
    id:             { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    description:    Sequelize.STRING,
    type:           Sequelize.INTEGER,
    latitude:       Sequelize.DOUBLE,
    longitude:      Sequelize.DOUBLE
  });

  var Response = db.define('response', {
    id:     { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    code:   Sequelize.INTEGER
  });

  User.hasMany(Crime);

  Crime.belongsTo(User, {as: 'reporter'});
  Crime.hasMany(Response);

  Response.belongsTo(Crime);

  var models = {
    User: User,
    Crime: Crime,
    Response: Response
  };

  this.ready = function (cb) {
    if ((options.sync || options.forceSync) && !inSync) {
      db.sync({ force: options.forceSync }).then(function () {
        inSync = true;
        return models;
      }).then(cb);
    } else {
      cb(models);
    }
  };

};
