import { RoomsListOutput, roomsListRequest, RoomStatus, RoomType } from "@/api";
import { Field, Form } from "@/app/components/form";
import { UiRoomsFilterLayout } from "@/ui/layouts/rooms-filter-layout";
import { UiSelect } from "@/ui/components/select";
import { getServerTranslation } from "@/i18n/getServerTranslation";
import Pagination from "@/app/components/pagination/Pagination";
import { Icon, UiIcon } from "@/ui/components/icon";
import { UiInput } from "@/ui/components/input";
import { UiFieldModifier } from "@/ui/components/field";
import { getRoomTypeIcon } from "@/app/components/rooms/utils/getRoomTypeIcon";
import { navigateToRoomsList } from "@/app/api/rooms/navigateToRoomsList";
import { getServerSearch } from "@/session/getServerSearch";
import { UiTypography } from "@/ui/utils/typography";

export type RoomsFilterProps = RoomsListOutput;

export default async function RoomsFilter({
  total,
  page,
  limit,
}: RoomsFilterProps) {
  const { t } = await getServerTranslation("rooms");

  const typesOptions = Object.values(RoomType).map((value) => ({
    value,
    label: t(`type.${value}`),
    hint: <UiIcon icon={getRoomTypeIcon(value)} size={20} />,
  }));

  const statusesOptions = Object.values(RoomStatus).map((value) => ({
    value,
    label: t(`status.${value}`),
  }));

  const passwordOptions = Object.values([true, false]).map((value) => ({
    value,
    label: t(`password.${value}`),
    hint: (
      <UiTypography color={value ? "tag-red-text" : "tag-green-text"}>
        <UiIcon
          icon={value ? Icon.lockClosedSolid : Icon.lockOpenSolid}
          size={16}
        />
      </UiTypography>
    ),
  }));

  return (
    <Form
      mutate={navigateToRoomsList}
      initialValues={getServerSearch(roomsListRequest)}
    >
      <UiRoomsFilterLayout
        type={
          <Field name="filter.type" submitOnBlur>
            <UiSelect
              placeholder={t("field.status")}
              options={typesOptions}
              multiple
              modifier={UiFieldModifier.noElevation}
            />
          </Field>
        }
        status={
          <Field name="filter.status" submitOnBlur>
            <UiSelect
              placeholder={t("field.status")}
              options={statusesOptions}
              multiple
              modifier={UiFieldModifier.noElevation}
            />
          </Field>
        }
        query={
          <Field name="filter.query" submitOnBlur>
            <UiInput
              placeholder={t("query")}
              modifier={UiFieldModifier.noElevation}
            />
          </Field>
        }
        password={
          <Field name="filter.password" submitOnBlur>
            <UiSelect
              placeholder={t("field.password")}
              options={passwordOptions}
              multiple
              modifier={UiFieldModifier.noElevation}
            />
          </Field>
        }
        pagination={
          !!(limit && page) && (
            <Pagination totalPages={Math.max(Math.ceil(total / limit), 1)} />
          )
        }
      />
      <button aria-labelledby="hiddensubmit" type="submit" hidden />
    </Form>
  );
}
