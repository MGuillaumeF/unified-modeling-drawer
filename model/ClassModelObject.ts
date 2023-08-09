import AttributeModelObject, {
  IAttributeModelObject
} from "./AttributeModelObject";
import DraggableModelObjet from "./DraggableModelObjet";

export interface IClassModelObject {
  name: string;
  isAbstract: boolean;
  attributes: IAttributeModelObject[];
}

export default class ClassModelObjet extends DraggableModelObjet {
  private _isAbstract = false;
  private _name: string;
  private _attributes: AttributeModelObject[] = [];
  constructor(params: IClassModelObject) {
    super();
    this._name = params.name;
    this._isAbstract = params.isAbstract;
    this._attributes = params.attributes.map(
      (attribute) => new AttributeModelObject(attribute)
    );
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
