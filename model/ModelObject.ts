import ClassModelObject, { IClassModelObject } from "./ClassModelObject";

export interface IModelObject {
  name: string;
  description: string;
  version: number;
  creationDate: Date;
  lastUpdateDate: Date;
  sourcePath?: string;
  classModelObjects: IClassModelObject[];
}

export default class ModelObject {
  private _name: string;
  private _description: string;
  private _version: number;
  private _sourcePath?: string;
  private _creationDate: Date;
  private _lastUpdateDate: Date;
  private _classModelObjects: ClassModelObject[] = [];
  constructor(params: IModelObject) {
    this._name = params.name;
    this._description = params.description;
    this._version = params.version;
    this._creationDate = params.creationDate;
    this._lastUpdateDate = params.lastUpdateDate;
    if (params.sourcePath) {
      this._sourcePath = params.sourcePath;
    }
    this._classModelObjects = params.classModelObjects.map(
      (classModelObject) => new ClassModelObject(classModelObject)
    );
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
  public get sourcePath(): string | undefined {
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
      sourcePath: this._sourcePath,
      classModelObjects: this._classModelObjects.map((classModelObject) =>
        classModelObject.toObject()
      )
    };
  }
  public toPrint() {
    return {
      name: this._name,
      description: this._description,
      version: this._version,
      creationDate: this._creationDate.getTime(),
      lastUpdateDate: this._lastUpdateDate.getTime(),
      class: this._classModelObjects.map((classModelObject) =>
        classModelObject.toPrint()
      )
    };
  }
}
