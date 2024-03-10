import { Sequelize } from "sequelize";

// Connect to SQLite db file
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database/database.sqlite",
});

// DB model
export const User = sequelize.define("User", {
  token: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  apiKey: {
    type: Sequelize.STRING,
  },
});

export const Chat = sequelize.define("Chat", {
  chatId: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  userToken: {
    type: Sequelize.STRING,
  },
  dataJson: {
    type: Sequelize.STRING,
  },
});

export const Template = sequelize.define("Template", {
  templateId: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  userToken: {
    type: Sequelize.STRING,
  },
  dataJson: {
    type: Sequelize.STRING,
  },
});

await sequelize.sync({force: false});
