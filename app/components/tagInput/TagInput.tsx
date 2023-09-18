/* eslint-disable react/no-array-index-key */
import {
  ChangeEventHandler,
  CSSProperties,
  FocusEventHandler,
  KeyboardEventHandler,
  useState,
} from "react";
import {
  UiField,
  UiFieldCommonProps,
  UiFieldType,
} from "@/ui/components/field";
import { UiBadge, UiBadgeColor, UiBadgeSize } from "@/ui/components/badge";
import { UiInput } from "@/ui/components/input";
import { arrayFrom } from "@/utils";
import { UiPureButton } from "@/ui/components/pure-button";
import { Icon } from "@/ui/components/icon";
import { UiKbd } from "@/ui/components/kbd";

export type TagInputChangeHandler<Type> = {
  (e: {
    target: {
      name?: string;
      value?: Array<Type>;
    };
  }): void;
};

export type TagInputProps<Type> = UiFieldCommonProps & {
  value?: Array<Type>;
  onChange?: TagInputChangeHandler<Type>;
  style?: CSSProperties;
  className?: string;
  name?: string;
  placeholder?: string;
};

export default function TagInput<Type>({
  value,
  onChange,
  name,
  placeholder,
  ...fieldCommonProps
}: TagInputProps<Type>) {
  const [query, setQuery] = useState<Type>("" as Type);
  const handleQuery: ChangeEventHandler<HTMLInputElement> = (event) => {
    setQuery(event.target.value as Type);
  };
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Backspace" && !String(query).length && value?.length) {
      onChange?.({
        target: {
          name,
          value: arrayFrom(value).toSpliced(arrayFrom(value).length - 1, 1),
        },
      });
    }
    if (event.key === "Enter") {
      event.preventDefault();
      if (String(query).length) {
        onChange?.({
          target: {
            name,
            value: arrayFrom(value)
              .concat(query)
              .filter((c, i, s) => s.indexOf(c) === i) as Array<Type>,
          },
        });
      }
      setQuery("" as Type);
    }
  };

  const prevent: FocusEventHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const removeItem = (index: number) => () => {
    onChange?.({
      target: {
        name,
        value: arrayFrom(value).toSpliced(index, 1) as Array<Type>,
      },
    });
  };

  return (
    <UiField {...fieldCommonProps} div>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {value?.length
          ? value.map((val, index) => (
              <UiPureButton
                onClick={removeItem(index)}
                key={`item-${index}`}
                style={{
                  blockSize: "20px",
                }}
              >
                <UiBadge
                  interactive
                  size={UiBadgeSize.small}
                  after={Icon.xMarkMini}
                  color={UiBadgeColor.blue}
                >
                  {String(val)}
                </UiBadge>
              </UiPureButton>
            ))
          : null}
        <UiInput
          placeholder={placeholder}
          type={UiFieldType.pure}
          onChange={handleQuery}
          value={(query ?? "") as string}
          onKeyDown={handleKeyDown}
          onBlur={prevent}
          style={{ flexGrow: 1 }}
          after={<UiKbd>↵</UiKbd>}
        />
      </div>
    </UiField>
  );
}
