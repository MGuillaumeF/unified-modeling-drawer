import AttributeModelObject, {
  IAttributeModelObject,
  IFileAttributeModelEntry
} from "./AttributeModelObject";
import BooleanAttributeModelObject, {
  IBooleanAttributeModelObject
} from "./BooleanAttributeModelObject";
import DateAttributeModelObject, {
  IDateAttributeModelObject,
  IFileDateAttributeModelEntry
} from "./DateAttributeModelObject";
import DraggableModelObjet from "./DraggableModelObjet";
import NumberAttributeModelObject, {
  IFileNumberAttributeModelEntry,
  INumberAttributeModelObject
} from "./NumberAttributeModelObject";
import StringAttributeModelObject, {
  IFileStringAttributeModelEntry,
  IStringAttributeModelObject
} from "./StringAttributeModelObject";

export interface IClassModelObject {
  name: string;
  isAbstract: boolean;
  attributes: IAttributeModelObject[];
}

export interface IFileClassModelEntry {
  name: string;
  abstract: "true" | "false";
}

export default class ClassModelObject extends DraggableModelObjet {
  private _isAbstract = false;
  private _name: string;
  private _attributes: AttributeModelObject[] = [];
  constructor(params: IClassModelObject) {
    super();
    this._name = params.name;
    this._isAbstract = params.isAbstract;
    this._attributes = params.attributes.map((attribute) => {
      let result = new AttributeModelObject(attribute);
      switch (attribute.type) {
        case "boolean":
          result = new BooleanAttributeModelObject(attribute);
          break;
        case "string":
          result = new StringAttributeModelObject(attribute);
          break;
        case "date":
          result = new DateAttributeModelObject(attribute);
          break;
        case "int8":
        case "uint8":
        case "int16":
        case "uint16":
        case "int32":
        case "uint32":
        case "int64":
        case "uint64":
        case "short":
        case "long":
        case "double":
        case "number":
          result = new NumberAttributeModelObject(attribute);
          break;
      }
      return result;
    });
  }
  public get isAbstract(): boolean {
    return this._isAbstract;
  }
  public set isAbstract(isAbstract: boolean) {
    this._isAbstract = isAbstract;
  }
  public get attributes(): AttributeModelObject[] {
    return this._attributes;
  }
  public set attributes(attributes: AttributeModelObject[]) {
    this._attributes = attributes;
  }
  public get name(): string {
    return this._name;
  }
  public set name(name: string) {
    this._name = name;
  }
  public toObject(): IClassModelObject {
    return {
      name: this._name,
      isAbstract: this._isAbstract,
      attributes: this._attributes.map((attribute) => attribute.toObject())
    };
  }
  public toPrint(): {
    $: IFileClassModelEntry;
    attribute: Array<
      | { $: IFileAttributeModelEntry }
      | { $: IFileStringAttributeModelEntry }
      | { $: IFileNumberAttributeModelEntry }
      | { $: IFileDateAttributeModelEntry }
    >;
  } {
    return {
      $: {
        name: this._name,
        abstract: this._isAbstract ? "true" : "false"
      },
      attribute: this._attributes.map((attribute) => attribute.toPrint())
    };
  }

  public static parse = (entry: {
    $: IFileClassModelEntry;
    attribute: Array<
      | { $: IFileAttributeModelEntry }
      | { $: IFileStringAttributeModelEntry }
      | { $: IFileNumberAttributeModelEntry }
      | { $: IFileDateAttributeModelEntry }
    >;
  }): IClassModelObject => {
    const { $ } = entry;
    const mapped: IClassModelObject = {
      name: $.name,
      isAbstract: $.abstract === "true",
      attributes: entry.attribute.map(
        (
          attr:
            | { $: IFileAttributeModelEntry }
            | { $: IFileStringAttributeModelEntry }
            | { $: IFileNumberAttributeModelEntry }
            | { $: IFileDateAttributeModelEntry }
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
            | IDateAttributeModelObject = AttributeModelObject.parse(attr);
          if (attr.$.type === "string") {
            mapped = StringAttributeModelObject.parse(attr);
          } else if (attr.$.type === "boolean") {
            mapped = BooleanAttributeModelObject.parse(attr);
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
            mapped = NumberAttributeModelObject.parse(attr);
          } else if (attr.$.type === "date") {
            mapped = DateAttributeModelObject.parse(attr);
          }
          return mapped;
        }
      )
    };
    return mapped;
  };
}
