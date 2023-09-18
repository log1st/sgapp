import { clsx } from "@clsx";
import { UiMediaUploaderProps } from "..";

import styles from "./ui.media-uploader.module.scss";
import { Icon, UiIcon } from "@/ui/components/icon";
import { UiPureButton } from "@/ui/components/pure-button";
import { UiImage } from "@/ui/components/image";

export function UiMediaUploader({
  className,
  style,
  e2e,
  onCancel,
  loading,
  preview,
  hasError,
  icon,
}: UiMediaUploaderProps) {
  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([styles.root, className, hasError && styles.hasError])}
    >
      {preview && (
        <UiImage src={preview} alt="preview" className={styles.preview} />
      )}
      {loading && <UiIcon icon={Icon.spinner} spin className={styles.loader} />}
      {onCancel && (
        <UiPureButton span className={styles.cancel} onClick={onCancel}>
          <UiIcon icon={Icon.xMarkMini} className={styles.cancelIcon} />
        </UiPureButton>
      )}
      {icon && <UiIcon className={styles.icon} icon={icon} />}
    </div>
  );
}
