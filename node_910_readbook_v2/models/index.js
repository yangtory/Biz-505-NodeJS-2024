import Sequelize from "sequelize";
import process from "process";
import initModel from "./init-models.js";

const env = process.env.NODE_ENV || "development";
import configJS from "../config/db_config.js"; //데이터베이스 연결
const config = configJS[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
const db = { sequelize };
db.models = initModel(sequelize); //.models 테이블을 배열로 저장시켜줌
export default db;
