var config = module.exports;

config["lilprovider browser tests"] = {
  rootPath: "../",
  environment: "browser",
  sources: [
    "lib/lilprovider.js"
  ],
  tests: [
    "test/*-test.js"
  ]
};