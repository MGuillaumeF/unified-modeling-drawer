import { expect } from "chai";
import ConfigurationManager, { ConfigurationError } from "../../src/ConfigurationManager";
import path from "path";
import { existsSync, writeFileSync, unlinkSync } from "fs";

const INVALID_JSON_CONFIG = path.resolve(__dirname, ".invalid-configuration.json");

describe("ConfigurationManager Test Suite", function () {
  it("Call instance with not existing file in strict mode", function () {
    expect(function(){
      try {
        ConfigurationManager.getInstance({filename : "notExist", strict : true});
      } catch (e) {
        console.error("error raised", e);

        expect(e instanceof ConfigurationError).to.equal(
          true,
          "Test error is congiguration manager error instance"
        );
        if (e instanceof ConfigurationError) {
          console.error("error message", e.message);
          console.error("error stack", e.stack);
          console.error("error string", e.toString());
        }
        throw e;
      }
    }).to.throw('invalid configuration file reading');
  });
  it("Call instance with existing bad json file in strict mode", function () {
    before(() => {
      writeFileSync(INVALID_JSON_CONFIG, JSON.stringify({content : "no language"}, null, 2))
    });
    expect(function(){
      try {
        ConfigurationManager.getInstance({filename : "notExist", strict : true});
      } catch (e) {
        console.error("error raised", e);

        expect(e instanceof ConfigurationError).to.equal(
          true,
          "Test error is congiguration manager error instance"
        );
        if (e instanceof ConfigurationError) {
          console.error("error message", e.message);
          console.error("error stack", e.stack);
          console.error("error string", e.toString());
        }
        throw e;
      }
    }).to.throw('invalid configuration file content');
    after(() => {
      if (existsSync(INVALID_JSON_CONFIG)) {
        unlinkSync(INVALID_JSON_CONFIG)
      }
    });
  });
});
