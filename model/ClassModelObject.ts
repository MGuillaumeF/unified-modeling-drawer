import AttributeModelObject, {
  IAttributeModelObject
} from "./AttributeModelObject";
import BooleanAttributeModelObject from "./BooleanAttributeModelObject";
import DateAttributeModelObject from "./DateAttributeModelObject";
import DraggableModelObjet from "./DraggableModelObjet";
import NumberAttributeModelObject from "./NumberAttributeModelObject";
import StringAttributeModelObject from "./StringAttributeModelObject";

export interface IClassModelObject {
  name: string;
  isAbstract: boolean;
  attributes: IAttributeModelObject[];
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
  public toPrint() {
    return {
      $: {
        name: this._name,
        abstract: this._isAbstract
      },
      attribute: this._attributes.map((attribute) => attribute.toPrint())
    };
  }
}
