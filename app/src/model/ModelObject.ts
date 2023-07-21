export default class ModelObject {
  private _name: string;
  private _version: number;
  private _sourcePath: string;
  private _creationDate: Date;
  private _lastUpdateDate: Date;
  constructor(name: string, version: number, sourcePath: string, creationDate: Date, lastUpdateDate: Date) {
    this._name = name;
    this._version = version;
    this._sourcePath = sourcePath;
    this._creationDate = creationDate;
    this._lastUpdateDate = lastUpdateDate;
  }
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
  public get version(): number {
    return this._version;
  }
  public set version(version: number) {
    this._version = version;
  }
  public get sourcePath(): string {
    return this._sourcePath
  }
  public set sourcePath(sourcePath: string) {
    this._sourcePath = sourcePath;
  }
  public get creationDate(): Date {
    return this._creationDate
  }
  public get lastUpdateDate(): Date {
    return this._lastUpdateDate
  }
  public set lastUpdateDate(lastUpdateDate: Date) {
    this._lastUpdateDate = lastUpdateDate;
  }
}
