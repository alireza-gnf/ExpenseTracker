import { app } from "./api";
const PORT = 3000;

if (process.env)
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
