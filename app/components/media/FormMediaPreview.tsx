import { useToggle } from "react-use";
import { useEffect, useState } from "react";
import { UiMediaUploader } from "@/ui/components/media-uploader";
import { getMediaUrlById } from "@/app/api/media/fetchMediaUrlById";
import { uploadMedia } from "@/app/api/media/uploadMedia";
import { UploadMediaOutput } from "@/api";
import { Icon } from "@/ui/components/icon";

export type FormMediaPreviewProps = {
  id: number;
  file?: File;
  type?: string;
  onRemove?(): void;
  onUpload?(params: UploadMediaOutput): void;
  hasError?: boolean;
  e2e?: string;
};

export default function FormMediaPreview({
  id,
  file,
  onRemove,
  onUpload,
  hasError,
  e2e,
  type,
}: FormMediaPreviewProps) {
  const [loading, toggleLoading] = useToggle(false);
  const [loaded, toggleLoaded] = useToggle(false);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    getMediaUrlById({ id }).then((res) => {
      if (!res.success) {
        return;
      }
      if (!res.data.preview || ["audio"].includes(res.data.type)) {
        return;
      }
      setPreview(res.data.preview);
    });
  }, [id]);

  useEffect(() => {
    if (loading || !file || id || loaded) {
      return;
    }

    toggleLoading(true);
    toggleLoaded(true);
    const data = new FormData();
    data.append("file", file);
    uploadMedia(data).then((res) => {
      if (!res.success) {
        return;
      }

      onUpload?.(res.data);
      toggleLoading(false);
    });
  }, [file, loading, id, loaded]);

  return (
    <UiMediaUploader
      e2e={e2e}
      hasError={hasError}
      loading={loading}
      onCancel={onRemove}
      preview={preview}
      icon={
        type
          ? {
              image: Icon.image,
              audio: Icon.music,
              video: Icon.video,
            }[type]
          : undefined
      }
    />
  );
}
