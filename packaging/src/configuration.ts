import { readFileSync } from "fs";
import path from "path";

class ConfigurationManager {
  private _filepath : string;
  private _configuration : any;
  private static _instance : ConfigurationManager | null = null;
  private constructor(filename ?: string) {
    this._filepath = filename !== undefined ? path.resolve(__dirname, filename) : path.resolve(__dirname, "configuration.json")
    this._configuration = JSON.parse(readFileSync(this._filepath).toString());
  }
  public static getInstance(filename ?: string) : ConfigurationManager  {
    if (this._instance === null) {
      this._instance = new ConfigurationManager(filename)
    }
    return this._instance;
  }
}
