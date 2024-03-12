import { Sequelize } from "sequelize";
import { DATABASE_FILE } from "$env/dynamic/private";

if (!DATABASE_FILE) {
  throw new Error("DATABASE_FILE env file is not defined");
}

// Connect to SQLite db file
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: DATABASE_FILE,
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

await sequelize.sync({ alter: true });
