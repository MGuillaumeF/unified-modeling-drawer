import { IFileAttributeModelEntry } from "./AttributeModelObject";
import ClassModelObject, {
  IClassModelObject,
  IFileClassModelEntry
} from "./ClassModelObject";
import { IFileDateAttributeModelEntry } from "./DateAttributeModelObject";
import { IFileNumberAttributeModelEntry } from "./NumberAttributeModelObject";
import { IFileStringAttributeModelEntry } from "./StringAttributeModelObject";

export interface IModelObject {
  classModelObjects: IClassModelObject[];
}

export default class ModelObject {
  private _classModelObjects: ClassModelObject[] = [];
  constructor(params: IModelObject) {
    this._classModelObjects = params.classModelObjects.map(
      (classModelObject) => new ClassModelObject(classModelObject)
    );
  }
  public get classModelObjects(): ClassModelObject[] {
    return this._classModelObjects;
  }
  public set classModelObjects(classModelObjects: ClassModelObject[]) {
    this._classModelObjects = classModelObjects;
  }
  public toObject(): IModelObject {
    return {
      classModelObjects: this._classModelObjects.map(
        (classModelObject: ClassModelObject): IClassModelObject =>
          classModelObject.toObject()
      )
    };
  }
  public toPrint(): IFileModelEntry {
    return {
      class: this._classModelObjects.map((classModelObject) =>
        classModelObject.toPrint()
      )
    };
  }
  public static parse = (entry: IFileModelEntry): IModelObject => {
    const modelObject: IModelObject = {
      classModelObjects: entry.class.map(
        (classItem: {
          $: IFileClassModelEntry;
          attribute: Array<
            | { $: IFileAttributeModelEntry }
            | { $: IFileStringAttributeModelEntry }
            | { $: IFileNumberAttributeModelEntry }
            | { $: IFileDateAttributeModelEntry }
          >;
        }): IClassModelObject => ClassModelObject.parse(classItem)
      )
    };
    return modelObject;
  };
}

export interface IFileModelEntry {
  class: Array<{
    $: IFileClassModelEntry;
    attribute: Array<
      | { $: IFileAttributeModelEntry }
      | { $: IFileStringAttributeModelEntry }
      | { $: IFileNumberAttributeModelEntry }
      | { $: IFileDateAttributeModelEntry }
    >;
  }>;
}
