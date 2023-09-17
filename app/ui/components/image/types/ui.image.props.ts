import { CSSProperties } from "react";

export type UiImageSrcSetItem = {
  src: string;
  scale?: number;
  width?: number;
  media?: string;
};

export type UiImageSize = {
  query: string;
  size?: string;
};

export enum UiImageFit {
  cover = "cover",
  contain = "contain",
}

export type UiImageProps = {
  style?: CSSProperties;
  className?: string;
  e2e?: string | boolean;
  imageClassName?: string;
  src: string | Array<UiImageSrcSetItem>;
  alt: string;
  sizes?: Array<UiImageSize>;
  fit?: UiImageFit;
  lazy?: boolean;
  width?: string | number;
  height?: string | number;
};
