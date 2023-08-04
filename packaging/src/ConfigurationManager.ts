import { readFileSync, existsSync } from "fs";
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

interface ConfigurationManagerParams {filename ?: string; strict?: boolean; onError ?: (error : ConfigurationError) => void}

export default class ConfigurationManager {
  private _filepath : string;
  private _configuration : Configuration = { language : "fr"};
  private _strict = false;
  private _onError ?: (error : ConfigurationError) => void;
  private static _instance : ConfigurationManager | null = null;
  private constructor(params ?: ConfigurationManagerParams ) {
    this._filepath = path.resolve(process.cwd(), params?.filename !== undefined ? params.filename : "configuration.json");
    this._strict = params?.strict ?? false;
    this._onError = params?.onError;
    try {
      if (existsSync(this._filepath)) {
        const configurationFileContent = JSON.parse(readFileSync(this._filepath).toString());
        if (ConfigurationManager.isValid(configurationFileContent)) {
          this._configuration = configurationFileContent;
        } else {
          this.manageError(new ConfigurationError("invalid configuration file content"));
        }
      } else if (params?.filename) {
        this.manageError(new ConfigurationError("configuration file not found"))
      }
    } catch (e) {
      let option : {cause : Error} | undefined;
      if (e instanceof Error) {
        option = {cause : e};
      }
      this.manageError(new ConfigurationError("invalid configuration file reading", option));
    }
  }
  public static getInstance(params ?: ConfigurationManagerParams) : ConfigurationManager  {
    if (this._instance === null) {
      this._instance = new ConfigurationManager(params)
    }
    return this._instance;
  }

  private manageError(error : ConfigurationError) : void {
    if (this._onError) {
        this._onError(error);
    }
    if (this._strict) {
        throw error;
    }
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
