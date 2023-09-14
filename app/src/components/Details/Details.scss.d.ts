declare namespace DetailsScssNamespace {
  export interface IDetailsScss {
    mocor: string;
  }
}

declare const DetailsScssModule: DetailsScssNamespace.IDetailsScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DetailsScssNamespace.IDetailsScss;
};

export = DetailsScssModule;
