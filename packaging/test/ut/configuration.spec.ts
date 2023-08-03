import { expect } from "chai";
import ConfigurationManager, { ConfigurationError } from "../../src/ConfigurationManager";

describe("ConfigurationManager Test Suite", function () {
  it("Call instance with not existing file in strict mode", function () {
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
        expect(e.message).to.equal(
          "invalid configuration file reading",
          "test message of custom error"
        );
      }
    }
  });
});
