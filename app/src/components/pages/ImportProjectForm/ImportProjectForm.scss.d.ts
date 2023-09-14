declare namespace ImportProjectFormScssNamespace {
  export interface IImportProjectFormScss {
    "import-button": string;
    "import-model-form": string;
  }
}

declare const ImportProjectFormScssModule: ImportProjectFormScssNamespace.IImportProjectFormScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ImportProjectFormScssNamespace.IImportProjectFormScss;
};

export = ImportProjectFormScssModule;
