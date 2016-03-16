var config = module.exports;

config["lil_ node tests"] = {
  rootPath: "../",
  environment: "node",
  tests: [
    "test/*-test.js"
  ]
};

config["lil_ browser tests"] = {
  rootPath: "../",
  environment: "browser",
  sources: [
    "dist/lil_.js"
  ],
  tests: [
    "test/*-test.js"
  ]
};