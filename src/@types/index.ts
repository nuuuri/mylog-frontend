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

export interface SelectOption {
  text: string;
  value: string | number | null;
}

export interface PostCardItem {
  id: number;
  category: string;
  writer: string;
  title: string;
  preview: string;
  modified: string;
  look: number;
  thumbnail?: string;
}

export type PostCards = PostCardItem[];
