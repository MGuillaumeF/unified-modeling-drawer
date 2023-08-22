import ClassModelObject, { IClassModelObject } from "./ClassModelObject";
import { IAttributeModelObject } from "./AttributeModelObject";
import { IBooleanAttributeModelObject } from "./BooleanAttributeModelObject";
import { IClassModelObject } from "./ClassModelObject";
import { IDateAttributeModelObject } from "./DateAttributeModelObject";
import ModelObject, { IModelObject } from "./ModelObject";
import { INumberAttributeModelObject } from "./NumberAttributeModelObject";
import { IStringAttributeModelObject } from "./StringAttributeModelObject";

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
  public get classModelObjects(): ClassModelObject[] {
    return this._classModelObjects;
  }
  public set classModelObjects(classModelObjects: ClassModelObject[]) {
    this._classModelObjects = classModelObjects;
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
      creation_date: this._creationDate.getTime(),
      last_update_date: this._lastUpdateDate.getTime(),
      class: this._classModelObjects.map((classModelObject) =>
        classModelObject.toPrint()
      )
    };
  }
  public static parse = (data : any) : IModelObject => {
           const modelObject: IModelObject = {
                        name: data.model.name[0],
                        version: data.model.version[0],
                        description: data.model.description[0],
                        lastUpdateDate: new Date(
                          Number(data.model.last_update_date)
                        ),
                        creationDate: new Date(
                          Number(data.model.creation_date)
                        ),
                        classModelObjects: data.model.class.map(
                          (classItem: any): IClassModelObject => ({
                            name: classItem.$.name,
                            isAbstract: classItem.$.abstract === "true",
                            attributes: classItem.attribute.map(
                              (
                                attr: any
                              ):
                                | IAttributeModelObject
                                | IStringAttributeModelObject
                                | IBooleanAttributeModelObject
                                | INumberAttributeModelObject
                                | IDateAttributeModelObject => {
                                let mapped:
                                  | IAttributeModelObject
                                  | IStringAttributeModelObject
                                  | IBooleanAttributeModelObject
                                  | INumberAttributeModelObject
                                  | IDateAttributeModelObject = {
                                  name: attr.$.name,
                                  type: attr.$.type,
                                  mandatory: attr.$.mandatory === "true",
                                  unique: attr.$.unique === "true",
                                  visibility: attr.$.visibility,
                                  defaultValue: attr.$.default_value
                                };

                                if (attr.$.type === "string") {
                                  mapped = {
                                    ...mapped,
                                    minLength: attr.$.min_length,
                                    maxLength: attr.$.max_length
                                  };
                                  if (attr.$.pattern) {
                                    mapped.pattern = new RegExp(attr.$.pattern);
                                  }
                                } else if (attr.$.type === "boolean") {
                                  mapped = {
                                    ...mapped
                                  };
                                } else if (
                                  [
                                    "int8",
                                    "uint8",
                                    "int16",
                                    "uint16",
                                    "int32",
                                    "uint32",
                                    "int64",
                                    "uint64",
                                    "double",
                                    "number"
                                  ].includes(attr.$.type)
                                ) {
                                  mapped = {
                                    ...mapped,
                                    min: attr.$.min,
                                    max: attr.$.max
                                  };
                                } else if (attr.$.type === "date") {
                                  const part: Partial<IDateAttributeModelObject> =
                                    {};
                                  if (attr.$.min) {
                                    part.min = new Date(attr.$.min);
                                  }
                                  if (attr.$.max) {
                                    part.max = new Date(attr.$.max);
                                  }
                                  mapped = {
                                    ...mapped,
                                    ...part
                                  };
                                }

                                return mapped;
                              }
                            )
                          })
                        )
                      };
    return modelObject;
  }
}
