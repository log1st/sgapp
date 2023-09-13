import { CSSProperties, PropsWithChildren } from "react";
import { clsx } from "@clsx";
import { Icon, icons, UiIcon } from "../components/icon";

export type NodeOrIconProps = PropsWithChildren<{
  e2e?: string;
  className?: string;
  style?: CSSProperties;
  iconClassName?: string;
  noIconClassName?: string;
}>;

export function NodeOrIcon({
  e2e,
  className,
  iconClassName,
  noIconClassName,
  style,
  children,
}: NodeOrIconProps) {
  const isIcon = icons.includes(children as Icon);

  return children ? (
    <div
      data-e2e={e2e}
      className={clsx([className, !isIcon && noIconClassName])}
      style={style}
    >
      {isIcon ? (
        <UiIcon className={iconClassName} icon={children as Icon} />
      ) : (
        children
      )}
    </div>
  ) : null;
}
