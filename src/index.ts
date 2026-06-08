import app from "./app";
import { env } from "./common/config/env";
import { initContainer } from "./container/container";

const PORT = env.PORT;

initContainer();

app.listen(PORT, () => {
  console.log(`Server is running in ${env.NODE_ENV} mode on port ${PORT}`);
});
