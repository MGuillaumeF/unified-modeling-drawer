declare namespace OpenProjectPageScssNamespace {
  export interface IOpenProjectPageScss {
    active: string;
    "open-project-method-selector": string;
    "open-project-page": string;
    unactive: string;
  }
}

declare const OpenProjectPageScssModule: OpenProjectPageScssNamespace.IOpenProjectPageScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: OpenProjectPageScssNamespace.IOpenProjectPageScss;
};

export = OpenProjectPageScssModule;
