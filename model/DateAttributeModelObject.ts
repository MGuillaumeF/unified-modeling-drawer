import AttributeModelObject, {
  IAttributeModelObject
} from "./AttributeModelObject";

export interface IDateAttributeModelObject extends IAttributeModelObject {
  min?: Date;
  max?: Date;
}
export default class DateAttributeModelObject extends AttributeModelObject {
  private _parentToObject: () => IAttributeModelObject;
  private _parentToPrint: () => any;
  protected _min?: Date;
  protected _max?: Date;

  constructor(params: IDateAttributeModelObject) {
    super(params);
    this._parentToObject = super.toObject;
    this._parentToPrint = super.toPrint;
    this._min = params.min;
    this._max = params.max;
  }
  public get min(): Date | undefined {
    return this._min;
  }
  public set min(min: Date) {
    this._min = min;
  }
  public get max(): Date | undefined {
    return this.max;
  }
  public set max(max: Date) {
    this._max = max;
  }

  public toObject(): IDateAttributeModelObject {
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
        ...this.toObject(),
        min: this._min ? this._min.getTime() : undefined,
        max: this._max ? this._max.getTime() : undefined
      }
    };
  }
}
