import AttributeModelObject, {
  IAttributeModelObject
} from "./AttributeModelObject";

export interface INumberAttributeModelObject extends IAttributeModelObject {
  min?: number;
  max?: number;
}
export default class NumberAttributeModelObject extends AttributeModelObject {
  private _parentToObject: () => IAttributeModelObject;
  private _parentToPrint: () => {
    $: IAttributeModelObject;
  };
  protected _min?: number;
  protected _max?: number;

  constructor(params: INumberAttributeModelObject) {
    super(params);
    this._parentToObject = super.toObject;
    this._parentToPrint = super.toPrint;
    this._min = params.min;
    this._max = params.max;
  }
  public get min(): number | undefined {
    return this._min;
  }
  public set min(min: number) {
    this._min = min;
  }
  public get max(): number | undefined {
    return this._max;
  }
  public set max(max: number) {
    this._max = max;
  }

  public toObject(): INumberAttributeModelObject {
    return {
      ...this._parentToObject(),
      min: this._min,
      max: this._max
    };
  }
  public toPrint() {
    return {
      $: {
        ...this._parentToPrint().$,
        min: this._min,
        max: this._max
      }
    };
  }
}
