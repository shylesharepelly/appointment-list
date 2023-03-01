'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
    
    static addappointment({ title, time}) {
      return this.create({ title: title, timeslot:time});
    }
    
    static getlist()
    {
      return this.findAll();
    }
  }
  List.init({
    title: DataTypes.STRING,
    timeslot: DataTypes.STRING,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'List',
  });
  return List;
};