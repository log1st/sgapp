import { clsx } from "@clsx";
import { UiImageFit, UiImageProps } from "..";

import styles from "./ui.image.module.scss";

export function UiImage({
  className,
  style,
  e2e,
  src,
  imageClassName,
  sizes,
  alt,
  fit = UiImageFit.cover,
  lazy,
  height,
  width,
}: UiImageProps) {
  const srcSets = Array.isArray(src)
    ? src
    : [
        {
          src,
        },
      ];

  const sizesString = sizes
    ?.map((size) => `(${size.query}) ${size.size}`)
    .join(", ");

  return (
    <picture
      className={clsx([styles.root, className])}
      data-e2e={e2e}
      style={style}
    >
      {srcSets.map((srcSet) => (
        <source
          key={srcSet.src}
          srcSet={`${srcSet.src} ${srcSet.width ? `${srcSet.width}w` : ""} ${
            srcSet.scale ? `${srcSet.scale}x` : ""
          }`.trim()}
          media={srcSet.media}
          sizes={sizesString}
        />
      ))}
      <img
        className={clsx([imageClassName, styles.image, styles[`${fit}Fit`]])}
        src={srcSets[0]?.src}
        alt={alt}
        loading={lazy ? "lazy" : undefined}
        sizes={sizesString}
        width={width}
        height={height}
        style={style}
      />
    </picture>
  );
}
