import { clsx } from "@clsx";
import { UiTotpImageLayoutProps } from "..";

import styles from "./ui.totp-image-layout.module.scss";
import { Icon, UiIcon } from "@/ui/components/icon";
import { UiImage } from "@/ui/components/image";

export function UiTotpImageLayout({
  className,
  style,
  e2e,
  loading,
  secret,
  image,
}: UiTotpImageLayoutProps) {
  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([styles.root, className])}
    >
      {loading ? (
        <UiIcon icon={Icon.spinner} spin className={styles.loader} />
      ) : (
        <>
          {image && (
            <UiImage src={image} alt="secret" className={styles.image} />
          )}
          {secret && <div className={styles.secret}>{secret}</div>}
        </>
      )}
    </div>
  );
}
