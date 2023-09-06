import ModelObject, { IFileModelEntry, IModelObject } from "./ModelObject";
import ViewObject, { IFileViewEntry, IViewObject } from "./ViewObject";

export interface IProjectObject {
  name: string;
  description: string;
  version: string;
  creationDate: Date;
  lastUpdateDate: Date;
  sourcePath?: string;
  modelObject: IModelObject;
  viewObject: IViewObject;
}

export default class ProjectObject {
  private _name: string;
  private _description: string;
  private _version: string;
  private _sourcePath?: string;
  private _creationDate: Date;
  private _lastUpdateDate: Date;
  private _modelObject: ModelObject;
  private _viewObject: ViewObject;
  constructor(params: IProjectObject) {
    this._name = params.name;
    this._description = params.description;
    this._version = params.version;
    this._creationDate = params.creationDate;
    this._lastUpdateDate = params.lastUpdateDate;
    if (params.sourcePath) {
      this._sourcePath = params.sourcePath;
    }
    this._modelObject = new ModelObject(params.modelObject);
    this._viewObject = new ViewObject(params.viewObject);
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
  public get version(): string {
    return this._version;
  }
  public set version(version: string) {
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
  public get modelObject(): ModelObject {
    return this._modelObject;
  }
  public set modelObject(modelObject: ModelObject) {
    this._modelObject = modelObject;
  }
  public get viewObject(): ViewObject {
    return this._viewObject;
  }
  public set viewObject(viewObject: ViewObject) {
    this._viewObject = viewObject;
  }
  public toObject(): IProjectObject {
    return {
      name: this._name,
      description: this._description,
      version: this._version,
      creationDate: this._creationDate,
      lastUpdateDate: this._lastUpdateDate,
      sourcePath: this._sourcePath,
      modelObject: this._modelObject.toObject(),
      viewObject: this._viewObject.toObject()
    };
  }
  public toPrint() {
    return {
      name: this._name,
      description: this._description,
      version: this._version,
      creation_date: this._creationDate.getTime(),
      last_update_date: this._lastUpdateDate.getTime(),
      model: this._modelObject.toPrint(),
      view: this._viewObject.toPrint()
    };
  }
  public static parse = (entry: IFileProjectEntry): IProjectObject => {
    const modelObject: IProjectObject = {
      name: entry.name[0] ?? "",
      version: entry.version[0] ?? "1.0.0",
      description: entry.description[0] ?? "",
      lastUpdateDate: new Date(Number(entry.last_update_date)),
      creationDate: new Date(Number(entry.creation_date)),
      modelObject: ModelObject.parse(entry.model[0] ?? { class: [] }),
      viewObject: ViewObject.parse(entry.view[0] ?? { diagram: [] })
    };
    return modelObject;
  };
}

export interface IFileProjectEntry {
  name: string[];
  version: string[];
  description: string[];
  last_update_date: number;
  creation_date: number;
  model: IFileModelEntry[];
  view: IFileViewEntry[];
}
