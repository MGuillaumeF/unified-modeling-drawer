import { readFileSync } from "fs";
import path from "path";
import { Validator } from "jsonschema";

export interface Configuration {
  language : string;
}


export default class ConfigurationManager {
  private _filepath : string;
  private _configuration : Configuration = { language : "fr"};
  private static _instance : ConfigurationManager | null = null;
  private constructor(filename ?: string) {
    this._filepath = filename !== undefined ? path.resolve(__dirname, filename) : path.resolve(__dirname, "configuration.json")
    const configurationFileContent = JSON.parse(readFileSync(this._filepath).toString());
    if (ConfigurationManager.isValid(configurationFileContent)) {
      this._configuration = configurationFileContent;
    } else {
      throw new Error("invalid configuration file content")
    }
  }
  public static getInstance(filename ?: string) : ConfigurationManager  {
    if (this._instance === null) {
      this._instance = new ConfigurationManager(filename)
    }
    return this._instance;
  }

  private static isValid(data : unknown) : data is Configuration {
    const validator = new Validator();
    const schema = {"language": "string"};
    const res = (validator.validate(data, schema));
    return res.valid;
  }
}
