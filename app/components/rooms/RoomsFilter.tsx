import { RoomsListOutput, roomsListRequest, RoomStatus, RoomType } from "@/api";
import { Field, Form, Submit } from "@/app/components/form";
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
import { UiButton, UiButtonSize } from "@/ui/components/button";
import { getRoomTypesOptions } from "@/app/components/rooms/utils/getRoomTypesOptions";
import { getRoomStatusesOptions } from "@/app/components/rooms/utils/getRoomStatusesOptions";
import { getRoomPasswordOptions } from "@/app/components/rooms/utils/getRoomPasswordOptions";

export type RoomsFilterProps = RoomsListOutput;

export default async function RoomsFilter({
  total,
  page,
  limit,
}: RoomsFilterProps) {
  const { t } = await getServerTranslation("rooms");

  const typesOptions = await getRoomTypesOptions();

  const statusesOptions = await getRoomStatusesOptions();

  const passwordOptions = await getRoomPasswordOptions();

  return (
    <Form
      mutate={navigateToRoomsList}
      initialValues={getServerSearch(roomsListRequest)}
    >
      <UiRoomsFilterLayout
        type={
          <Field name="filter.type">
            <UiSelect
              placeholder={t("field.status")}
              options={typesOptions}
              multiple
              modifier={UiFieldModifier.noElevation}
            />
          </Field>
        }
        status={
          <Field name="filter.status">
            <UiSelect
              placeholder={t("field.status")}
              options={statusesOptions}
              multiple
              modifier={UiFieldModifier.noElevation}
            />
          </Field>
        }
        query={
          <Field name="filter.query">
            <UiInput
              placeholder={t("query")}
              modifier={UiFieldModifier.noElevation}
            />
          </Field>
        }
        password={
          <Field name="filter.password">
            <UiSelect
              placeholder={t("field.password")}
              options={passwordOptions}
              multiple
              modifier={UiFieldModifier.noElevation}
            />
          </Field>
        }
        submit={
          <Submit>
            <UiButton
              label={t("search")}
              size={UiButtonSize.large}
              after={Icon.chevronRight}
            />
          </Submit>
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
