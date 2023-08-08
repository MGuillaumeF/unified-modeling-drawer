declare namespace NewModelFormScssNamespace {
  export interface INewModelFormScss {
    NewModelForm: string;
  }
}

declare const NewModelFormScssModule: NewModelFormScssNamespace.INewModelFormScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: NewModelFormScssNamespace.INewModelFormScss;
};

export = NewModelFormScssModule;
