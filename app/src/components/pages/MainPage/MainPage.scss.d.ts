declare namespace MainPageScssNamespace {
  export interface IMainPageScss {
    projects: string;
    "tree-projects": string;
    "tree-projects-list": string;
  }
}

declare const MainPageScssModule: MainPageScssNamespace.IMainPageScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: MainPageScssNamespace.IMainPageScss;
};

export = MainPageScssModule;
