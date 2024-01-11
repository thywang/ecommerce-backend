const signupService = require("./service/signup");
const loginService = require("./service/login");
const verifyService = require("./service/verify");
const util = require("./utils/util");

const healthPath = "/health";
const signupPath = "/signup";
const loginPath = "/login";
const verifyPath = "/verify";

exports.handler = async (event) => {
  console.log("Request Event: ", event);
  let response;
  switch (true) {
    case event.httpMethod === "GET" && event.path === healthPath:
      response = util.buildResponse(200);
      break;
    case event.httpMethod === "POST" && event.path === signupPath:
      const signupBody = JSON.parse(event.body);
      response = signupService.signup(signupBody);
      break;
    case event.httpMethod === "POST" && event.path === loginPath:
      const loginBody = JSON.parse(event.body);
      response = loginService.login(loginBody);
      break;
    case event.httpMethod === "POST" && event.path === verifyPath:
      const verifyBody = JSON.parse(event.body);
      response = verifyService.verify(verifyBody);
      break;
    default:
      response = util.buildResponse(404, "404 Not Found");
  }

  return response;
};
