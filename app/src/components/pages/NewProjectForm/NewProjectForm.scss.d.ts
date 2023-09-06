declare namespace NewProjectFormScssNamespace {
  export interface INewProjectFormScss {
    NewModelForm: string;
  }
}

declare const NewProjectFormScssModule: NewProjectFormScssNamespace.INewProjectFormScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: NewProjectFormScssNamespace.INewProjectFormScss;
};

export = NewProjectFormScssModule;
