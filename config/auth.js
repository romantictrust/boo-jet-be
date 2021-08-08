import jwt from "express-jwt";

const getTokenFromHeaders = (req) => {
  const {
    headers: { authorization },
  } = req;

  if (authorization && authorization.split(" ")[0] === "Token") {
    return authorization.split(" ")[1];
  }
  return null;
};

const auth = {
  required: [
    jwt({
      secret: "secret",
      userProperty: "payload",
      algorithms: ["HS256"],
      getToken: getTokenFromHeaders,
    }),
    function (err, req, res, next) {
      if (err.code === "invalid_token") {
        res.status(err.status).send({
          error: "Please refresh your session",
        });
      }
    },
  ],
  optional: jwt({
    secret: "secret",
    userProperty: "payload",
    algorithms: ["HS256"],
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};

export default auth;
