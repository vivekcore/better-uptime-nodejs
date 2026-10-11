import express from "express";
import RootRouter from "./routes/root.router";
import { errorHandler } from "./middleware/global.middlewar";
const app = express();
app.use(express.json());

app.use("/api/v1", RootRouter);
app.use(errorHandler);

app.listen(3002, () => {
  console.log("Listning at 3002...");
});
