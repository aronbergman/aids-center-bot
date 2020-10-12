module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");
  const stat = require("../controllers/stat.controller.js");
  const admin = require("../controllers/admin.controller.js");
  const sessions = require("../controllers/sessions.controller.js");
  const events = require("../controllers/events.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/buttons", tutorials.getButtons);
  router.post("/button/title", tutorials.getButtonTitle);
  router.post("/content", tutorials.getContent);
  router.post("/statistics/set", stat.setStat);
  router.post("/statistics/get", stat.getStat);

  router.post("/admin/buttons", admin.getButtons);
  router.post("/admin/content", admin.getContent);

  router.post("/sessions/get", sessions.getSession);
  router.post("/sessions/set", sessions.setSession);
  router.post("/sessions/destroy", sessions.destroySession);

  router.post("/events/last", events.getLastEvent);
  router.post("/events/add/1", events.addEventStepOne);

  app.use('/api', router);
};
