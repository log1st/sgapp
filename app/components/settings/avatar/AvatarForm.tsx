"use client";

import { useFormikContext } from "formik";
import { TFunction } from "i18next";
import AvatarEditor from "react-avatar-editor";
import { useEffect, useRef, useState } from "react";
import { Field, Form, FormError, Submit, useForm } from "@/app/components/form";
import { UiDropZone } from "@/ui/components/drop-zone";
import { Icon } from "@/ui/components/icon";
import { useClientTranslation } from "@/i18n/useClientTranslation";
import { UiAvatarEditor } from "@/ui/layouts/avatar-editor";
import {
  UiButton,
  UiButtonModifier,
  UiButtonVariant,
} from "@/ui/components/button";
import { UiAvatar, UiAvatarSize } from "@/ui/components/avatar";
import { UiActiveActions } from "@/ui/components/active-actions";
import { changeAvatarAction } from "@/app/api/settings/changeAvatarAction";
import { usePending } from "@/hooks";
import { deleteCurrentAvatarAction } from "@/app/api/settings/deleteCurrentAvatar";

export type AvatarFormProps = {
  lng?: string;
  hasAvatar?: boolean;
};

type DropZoneProps = {
  t: TFunction;
};

type AvatarFormPayload = {
  files: Array<File>;
  file: File | null;
  confirmed: boolean;
};

function DropZone({ t }: DropZoneProps) {
  const {
    values: { confirmed, files, file },
    setFieldValue,
  } = useFormikContext<AvatarFormPayload>();

  if (confirmed) {
    return null;
  }

  const [src, setSrc] = useState<string | null>();
  useEffect(() => {
    const imageFile = files.find((f) => f.type.startsWith("image"));

    if (!imageFile) {
      setSrc(null);
      return;
    }
    setSrc(URL.createObjectURL(imageFile));
  }, [files]);

  const avatarEditorRef = useRef<AvatarEditor | null>(null);

  const confirm = () => {
    avatarEditorRef.current?.getImage().toBlob((blob) => {
      if (!blob) {
        return;
      }
      setFieldValue("file", blob);
    });
  };

  const rekate = () => {
    if (file) {
      setFieldValue("file", null);
      return;
    }

    if (files) {
      setFieldValue("files", []);
    }
  };

  const { submitting } = useForm();

  if (file) {
    return (
      <UiAvatarEditor
        error={<FormError />}
        action={
          !submitting && (
            <UiActiveActions
              actions={[
                {
                  key: "back",
                  label: t("retake"),
                  onClick: rekate,
                  before: Icon.arrowUturnLeft,
                  variant: UiButtonVariant.transparent,
                },
                {
                  key: "submit",
                  label: t("submit"),
                  wrap: Submit,
                  after: Icon.cloudArrowUp,
                },
              ]}
            />
          )
        }
      >
        <UiAvatar
          size={UiAvatarSize.editor}
          image={URL.createObjectURL(file)}
        />
      </UiAvatarEditor>
    );
  }

  if (src) {
    return (
      <UiAvatarEditor
        action={
          <UiActiveActions
            actions={[
              {
                key: "back",
                label: t("retake"),
                onClick: rekate,
                before: Icon.arrowUturnLeft,
                variant: UiButtonVariant.transparent,
              },
              {
                key: "confirm",
                label: t("confirm"),
                onClick: confirm,
                after: Icon.checkMini,
                variant: UiButtonVariant.secondary,
              },
            ]}
          />
        }
      >
        <AvatarEditor
          image={src}
          width={250}
          height={250}
          ref={avatarEditorRef}
        />
      </UiAvatarEditor>
    );
  }

  return (
    <Field name="files">
      <UiDropZone
        label={t("field.file.label")}
        hint={t("field.file.hint")}
        icon={Icon.cloudArrowUp}
      />
    </Field>
  );
}

const mutate = (payload: AvatarFormPayload) => {
  const data = new FormData();

  if (payload.file) {
    data.append("file", payload.file);
  }

  return changeAvatarAction(data);
};

export default function AvatarForm({ lng = "en", hasAvatar }: AvatarFormProps) {
  const { t } = useClientTranslation(
    "settings",
    {
      keyPrefix: "avatar",
    },
    lng,
  );

  const { run: deleteAvatar, pending } = usePending(deleteCurrentAvatarAction);

  return (
    <Form
      initialValues={{
        files: [],
        confirmed: false,
        file: null,
      }}
      mutate={mutate}
      keyPrefix="avatar"
      namespace="settings"
      resetOnSuccess
    >
      <DropZone t={t} />
      {hasAvatar && (
        <UiButton
          variant={UiButtonVariant.danger}
          label={t("delete")}
          modifier={UiButtonModifier.block}
          onClick={deleteAvatar}
          loading={pending}
          style={{
            marginBlockStart: "20px",
          }}
        />
      )}
    </Form>
  );
}
