import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../lib/sequelize";

// Define attributes
interface ChatAttributes {
  id: string;
  sessionId: string;
  userMessage: string;
  botResponse: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Optional attributes for creation
interface ChatCreationAttributes extends Optional<ChatAttributes, "id"> {}

// Define the model
class Chat
  extends Model<ChatAttributes, ChatCreationAttributes>
  implements ChatAttributes
{
  declare id: string;
  declare sessionId: string;
  declare userMessage: string;
  declare botResponse: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

// Initialize model
Chat.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    sessionId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userMessage: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    botResponse: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Chat",
  }
);

export default Chat;
