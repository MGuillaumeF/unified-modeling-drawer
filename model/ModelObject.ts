export interface IModelObject {
  name: string;
  description: string;
  version: number;
  creationDate: Date;
  lastUpdateDate: Date;
  sourcePath?: string;
}

export default class ModelObject {
  private _name: string;
  private _description: string;
  private _version: number;
  private _sourcePath: string | null = null;
  private _creationDate: Date;
  private _lastUpdateDate: Date;
  constructor({
    name,
    description,
    version,
    creationDate,
    sourcePath,
    lastUpdateDate
  }: IModelObject) {
    this._name = name;
    this._description = description;
    this._version = version;
    this._creationDate = creationDate;
    this._lastUpdateDate = lastUpdateDate;
    if (sourcePath) {
      this._sourcePath = sourcePath;
    }
  }
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
  public get description(): string {
    return this._description;
  }
  public set description(description: string) {
    this._description = description;
  }
  public get version(): number {
    return this._version;
  }
  public set version(version: number) {
    this._version = version;
  }
  public get sourcePath(): string | null {
    return this._sourcePath;
  }
  public set sourcePath(sourcePath: string) {
    this._sourcePath = sourcePath;
  }
  public get creationDate(): Date {
    return this._creationDate;
  }
  public get lastUpdateDate(): Date {
    return this._lastUpdateDate;
  }
  public set lastUpdateDate(lastUpdateDate: Date) {
    this._lastUpdateDate = lastUpdateDate;
  }
  public toObject(): IModelObject {
    return {
      name: this._name,
      description: this._description,
      version: this._version,
      creationDate: this._creationDate,
      lastUpdateDate: this._lastUpdateDate,
      sourcePath: this._sourcePath || undefined
    };
  }
}
