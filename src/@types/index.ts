export interface LayoutDefaultProps {
  children?: React.ReactElement;
}

export interface Block {
  id: string | number;
  html: string;
  tag: string;
}

export interface Category {
  id: number;
  name: string;
  label: string;
  count: number;
  subCategories: Category[];
}
