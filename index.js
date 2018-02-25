const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const SECRET_THAT_SHOULD_BE_FROM_ENV_VAR = "Developed with ♥︎ in Krakow";

function protectedRoute(req, res, next) {
  const token =
    req.headers.authorization !== undefined
      ? req.headers.authorization.split(" ")[1]
      : null;
  try {
    const verified = verifiedToken(token);
    next();
  } catch (e) {
    res.send({
      error: "can't access that resource"
    });
    return;
  }
}

function createToken(payload) {
  return jwt.sign(payload, SECRET_THAT_SHOULD_BE_FROM_ENV_VAR, {
    expiresIn: "10m"
  });
}

function verifiedToken(token) {
  return jwt.verify(token, SECRET_THAT_SHOULD_BE_FROM_ENV_VAR);
}

server.use(middlewares);
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.post("/auth/login", (req, res) => {
  const { user, pass } = req.body;
  if (user === "jon" && pass === "snow") {
    res.send({ token: createToken(req.body) });
  } else {
    res.send({ error: "bad credentials" });
  }
});

server.use("/api", protectedRoute, router);

server.use((req, res, next) => {
  res.send("Not found");
});

server.listen(3000, () => {
  console.log("JSON Server is running");
});
