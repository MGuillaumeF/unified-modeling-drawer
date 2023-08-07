import { expect } from "chai";
import ConfigurationManager, { ConfigurationError } from "../../src/ConfigurationManager";
import path from "path";
import { existsSync, writeFileSync, unlinkSync, readFileSync } from "fs";

const INVALID_JSON_CONFIG = path.resolve(process.cwd(), "invalid_configuration.json");
const VALID_JSON_CONFIG = path.resolve(process.cwd(), "invalid_configuration.json");


describe("ConfigurationManager Test Suite", function () {
  it("Call instance with not existing file in strict mode", function () {
    expect(function(){
      try {
        ConfigurationManager.getInstance({filename : "notExist", strict : true});
      } catch (e) {
        expect(e instanceof ConfigurationError).to.equal(
          true,
          "Test error is congiguration manager error instance"
        );
        if (e instanceof ConfigurationError) {
          expect(e?.cause instanceof ConfigurationError).to.equal(
          true,
            "Test cause error is congiguration manager error instance"
          );
          if (e?.cause instanceof ConfigurationError) {
            const cause :ConfigurationError = e?.cause;
            expect(function(){
              throw cause;
            }).to.throw(`configuration file not found: ${path.resolve(process.cwd(), "notExist")}`);
          }
          throw e;
        }
      }
    }).to.throw('invalid configuration file reading');
  });
  it("Call instance with existing bad json file in strict mode", function () {
    writeFileSync(INVALID_JSON_CONFIG, JSON.stringify({content : "no language"}, null, 2))
    expect(function(){
      try {
        ConfigurationManager.getInstance({filename : INVALID_JSON_CONFIG, strict : true});
      } catch (e) {
        expect(e instanceof ConfigurationError).to.equal(
          true,
          "Test error is congiguration manager error instance"
        );
        if (e instanceof ConfigurationError) {
          expect(e?.cause instanceof ConfigurationError).to.equal(
          true,
            "Test cause error is congiguration manager error instance"
          );
          if (e?.cause instanceof ConfigurationError) {
            throw e.cause;
          }
        }
      }
    }).to.throw('invalid configuration file content');
    if (existsSync(INVALID_JSON_CONFIG)) {
      unlinkSync(INVALID_JSON_CONFIG)
    }
  });
  it("Call instance with existing json file", function () {
    writeFileSync(VALID_JSON_CONFIG, JSON.stringify({language : "en"}, null, 2))
        expect(ConfigurationManager.getInstance().configuration.language).to.equal(
          "fr",
          "Test language configuration"
        );
    const configurationManager = ConfigurationManager.getInstance({filename : VALID_JSON_CONFIG});
    expect(configurationManager.configuration.language).to.equal(
          "en",
          "Test language configuration"
        );
    expect(ConfigurationManager.getInstance().configuration.language).to.equal(
          "en",
          "Test language configuration"
        );
    if (existsSync(VALID_JSON_CONFIG)) {
      unlinkSync(VALID_JSON_CONFIG)
    }
  });
});
