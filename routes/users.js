var express = require('express');
var router = express.Router();
var hateoas = require("hateoas")({baseUrl: "http://localhost:3000"});

hateoas.registerLinkHandler("root", function() {
    return {
        "self": "/",
        "users": "/users"
    };
});

hateoas.registerLinkHandler("user", function(user) {
    var links = {
        "self": "/users/" + user.id
    };
    return links;
});

hateoas.registerCollectionLinkHandler("user", function(userCollection) {
    var links = {
        "self": "/users"
    };
    return links;
});

hateoas.link("user", {id: 123});


hateoas.link("user", [{id: 123}]);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(hateoas.link("user", {id: 123}));
  // console.log(hateoas.link("user", {id: 123}));
});

module.exports = router;
