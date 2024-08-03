import { DataSource } from "typeorm";
import { makeApp } from "./api";
import { AppDataSource } from "./data-source";
import { User } from "./model/user.model";

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
const PORT = 3000;

AppDataSource.initialize().then((dataSource: DataSource) => {
  const app = makeApp(dataSource);
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
