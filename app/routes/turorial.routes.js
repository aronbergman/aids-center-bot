module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");
  const admin = require("../controllers/admin.controller.js");
  const sessions = require("../controllers/sessions.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/buttons", tutorials.getButtons);
  router.post("/content", tutorials.getContent);
  router.post("/statistics", tutorials.setStat);

  router.post("/admin/buttons", admin.getButtons);
  router.post("/admin/content", admin.getContent);

  router.post("/sessions/get", sessions.getSession);
  router.post("/sessions/set", sessions.setSession);
  router.post("/sessions/destroy", sessions.destroySession);

  app.use('/api', router);
};
