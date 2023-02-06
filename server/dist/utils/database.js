var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
import RequestError from "./requestError.js";
mongoose.set('strictQuery', false);
export default function dbConnect() {
    return __awaiter(this, void 0, void 0, function* () {
        const dbUser = process.env.DATABASE_USERNAME;
        const dbPass = process.env.DATABASE_PASSWORD;
        const dbStr = process.env.DATABASE_STRING;
        try {
            if (dbUser && dbPass && dbStr) {
                const uri = `mongodb+srv://${encodeURIComponent(dbUser)}:${encodeURIComponent(dbPass)}@${dbStr}`;
                yield mongoose.connect(uri);
                console.log('connected to database.');
            }
        }
        catch (err) {
            throw new RequestError();
        }
    });
}
