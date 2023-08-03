import { readFileSync } from "fs";
import path from "path";
import { Validator } from "jsonschema";

export interface Configuration {
  language : string;
}

export class ConfigurationError extends Error {
 constructor(message : string, options ?: {cause : Error}) {
   super(message, options);
 }
}


export default class ConfigurationManager {
  private _filepath : string;
  private _configuration : Configuration = { language : "fr"};
  private static _instance : ConfigurationManager | null = null;
  private constructor(params ?: {filename ?: string; strict?: boolean; onError ?: (error : ConfigurationError) => void}) {
    this._filepath = params?.filename !== undefined ? path.resolve(__dirname, params?.filename) : path.resolve(__dirname, "configuration.json")
    try {
      const configurationFileContent = JSON.parse(readFileSync(this._filepath).toString());
      if (ConfigurationManager.isValid(configurationFileContent)) {
        this._configuration = configurationFileContent;
      } else {
        const error new ConfigurationError("invalid configuration file content");
        if (params?.onError) {
          params.onError(error);
        }
        if (params?.strict) {
          throw error;
        }
      }
    } catch (e) {
      const error new ConfigurationError("invalid configuration file reading", {cause : e});
      if (params?.onError) {
        params.onError(error);
      }
      if (params?.strict) {
        throw error;
      }
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
    const schema = {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "https://example.com/configuration.schema.json",
      "title": "Configuration",
      "description": "The configuration of application",
      "type": "object",
      "properties": {
        "language": {
          "description": "The language to use in application",
          "type": "string"
        }
      },
      "required": [ "language" ]
    };
    const res = (validator.validate(data, schema));
    return res.valid;
  }
}
