declare namespace ClassObjectScssNamespace {
  export interface IClassObjectScss {
    ClassObject: string;
  }
}

declare const ClassObjectScssModule: ClassObjectScssNamespace.IClassObjectScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ClassObjectScssNamespace.IClassObjectScss;
};

export = ClassObjectScssModule;
