import source from "../source/icons-map.html?raw";
import { UiIconsMapProps } from "../types/ui.icons-map.props";

export function UiIconsMap({ className, style, e2e }: UiIconsMapProps) {
  return (
    <div
      data-e2e={e2e}
      style={style}
      className={className}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        __html: source,
      }}
    />
  );
}
