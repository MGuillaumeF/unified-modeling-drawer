declare namespace ImportModelFormScssNamespace {
  export interface IImportModelFormScss {
    "import-button": string;
    "import-model-form": string;
  }
}

declare const ImportModelFormScssModule: ImportModelFormScssNamespace.IImportModelFormScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ImportModelFormScssNamespace.IImportModelFormScss;
};

export = ImportModelFormScssModule;
