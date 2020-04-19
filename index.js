import dotenv from "dotenv";
import { bot } from "./bot.js";

dotenv.config();

bot(process.env.BOT_TOKEN);
