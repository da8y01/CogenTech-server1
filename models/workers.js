const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('cogentech1', 'root', '', {
    // dialect: 'mariadb',
    dialect: 'mysql',
    dialectOptions: {
      // Your mariadb options here
      connectTimeout: 1000
    },
});

const Worker = sequelize.define('employees', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  version: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  // Other model options go here
  timestamps: true
});

Worker.hasMany(Worker);
Worker.belongsTo(Worker);

// `sequelize.define` also returns the model
console.log('EVALUATE WORKER')
console.log(Worker === sequelize.models.Worker); // true

module.exports = Worker;