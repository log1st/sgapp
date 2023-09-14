import { CSSProperties, PropsWithChildren } from "react";

export enum UiTypographyType {
  largePlusCompact = "largePlusCompact",
  compactLarge = "compactLarge",
  compactMediumPlus = "compactMediumPlus",
  compactMedium = "compactMedium",
  compactSmallPlus = "compactSmallPlus",
  compactSmall = "compactSmall",
  compactXSmallPlus = "compactXSmallPlus",
  compactXSmall = "compactXSmall",
  xLargePlus = "xLargePlus",
  xLarge = "xLarge",
  largePlus = "largePlus",
  large = "large",
  mediumPlus = "mediumPlus",
  medium = "medium",
  coreH1 = "coreH1",
  coreH2 = "coreH2",
  coreH3 = "coreH3",
  websH1 = "websH1",
  websH2 = "websH2",
  websH3 = "websH3",
  websH4 = "websH4",
  docsH1 = "docsH1",
  docsH2 = "docsH2",
  docsH3 = "docsH3",
  codeBlocksLabel = "codeBlocksLabel",
  codeBlocksBody = "codeBlocksBody",
}

export type UiTypographyProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
  e2e?: string;

  type?: UiTypographyType;
  color?: string;
}>;
