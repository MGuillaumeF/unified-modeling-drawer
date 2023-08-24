import AttributeModelObject, {
  IAttributeModelObject,
  IFileAttributeModelEntry
} from "./AttributeModelObject";

export interface INumberAttributeModelObject extends IAttributeModelObject {
  min?: number;
  max?: number;
}
export interface IFileNumberAttributeModelEntry
  extends IFileAttributeModelEntry {
  min?: number;
  max?: number;
}
export default class NumberAttributeModelObject extends AttributeModelObject {
  private _parentToObject: () => IAttributeModelObject;
  private _parentToPrint: () => {
    $: IFileNumberAttributeModelEntry;
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
  public toPrint(): { $: IFileNumberAttributeModelEntry } {
    let mapped: { $: IFileNumberAttributeModelEntry } = {
      $: {
        ...this._parentToPrint().$
      }
    };
    if (this._min !== undefined) {
      mapped.$.min = this._min;
    }
    if (this._max !== undefined) {
      mapped.$.max = this._max;
    }
    return mapped;
  }

  public static parse = (entry: {
    $: IFileNumberAttributeModelEntry;
  }): INumberAttributeModelObject => {
    const { $ } = entry;
    const mapped: INumberAttributeModelObject =
      AttributeModelObject.parse(entry);
    if ($.min !== undefined) {
      mapped.min = $.min;
    }
    if ($.max !== undefined) {
      mapped.max = $.max;
    }
    return mapped;
  };
}
