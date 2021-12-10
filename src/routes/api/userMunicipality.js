const schema = require("../../schemas/userMunicipality");
const { validate } = require("../middlewares");
const { UserMunicipalityController } = require("../../controllers");

module.exports = (router) => {
  router.post("/create", validate(schema), UserMunicipalityController.create);
  router.get("/fetchall", UserMunicipalityController.fetchAll);
  router.delete("/delete", UserMunicipalityController.deleteUser);
  router.post("/update", UserMunicipalityController.update);
  router.get("/search/:id", UserMunicipalityController.fetchById);
  return router;
};
