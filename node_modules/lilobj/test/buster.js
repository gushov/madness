var config = module.exports;

config["lilobj node tests"] = {
  rootPath: "../",
  env: "node",
  tests: [
    "test/*-test.js"
  ]
};

config["lilobj browser tests"] = {
  rootPath: "../",
  environment: "browser",
  sources: [
    "dist/lilobj.js"
  ],
  tests: [
    "test/*-test.js"
  ]
};