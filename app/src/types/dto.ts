export interface IProduct {
  sku: string;
  titlePlural: string;
  properties: IProperty[];
  excludes: IExclude[][];
}

export interface IProperty {
  locked: string;
  options: IOption[];
  slug: string;
  title: string;
  activeProperty: string
}

export interface IExclude {
  property: string;
  options: string[];
}

export interface IOption {
  name: string;
  nullable: boolean;
  slug: string;
  disabled: boolean;
}
