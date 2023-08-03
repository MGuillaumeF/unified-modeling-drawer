import { expect } from "chai";
import ConfigurationManager, { ConfigurationManagerError } from "../../src/ConfigurationManager";

describe("ConfigurationManager Test Suite", function () {
  it("Call instance with not existing file in strict mode", function () {
    try {
      ConfigurationManager.getInstance({filename : "notExist", strict : true});
    } catch (e) {
      console.error("error raised un catch", e);

      expect(e instanceof ConfigurationManagerError).to.equal(
        true,
        "Test error is congiguration manager error instance"
      );
      if (e instanceof ConfigurationManagerError) {
        console.error("error message", e.message);
        console.error("error stack", e.stack);
        console.error("error string", e.toString());
        expect(e.message).to.equal(
          "configuration file not exist",
          "test message of custom error"
        );
      }
    }
  });
});
