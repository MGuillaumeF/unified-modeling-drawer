import AttributeModelObject, {
  IAttributeModelObject
} from "./AttributeModelObject";

export interface IBooleanAttributeModelObject extends IAttributeModelObject {
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
}
export default class BooleanAttributeModelObject extends AttributeModelObject {
  private _parentToObject: () => IAttributeModelObject;
  private _parentToPrint: () => {
    $: IAttributeModelObject;
  };

  constructor(params: IBooleanAttributeModelObject) {
    super(params);
    this._parentToObject = super.toObject;
    this._parentToPrint = super.toPrint;
  }

  public toObject(): IBooleanAttributeModelObject {
    return {
      ...this._parentToObject()
    };
  }
  public toPrint() {
    return {
      $: {
        ...this._parentToPrint().$
      }
    };
  }
}
