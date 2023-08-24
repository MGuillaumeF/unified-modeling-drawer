import AttributeModelObject, {
  IAttributeModelObject,
  IFileAttributeModelEntry
} from "./AttributeModelObject";

export interface IBooleanAttributeModelObject extends IAttributeModelObject {}
export default class BooleanAttributeModelObject extends AttributeModelObject {
  private _parentToObject: () => IAttributeModelObject;
  private _parentToPrint: () => {
    $: IFileAttributeModelEntry;
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
