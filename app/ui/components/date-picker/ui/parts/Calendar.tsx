import { Key, PropsWithChildren, useState } from "react";
import {
  addDays,
  addMonths,
  addYears,
  differenceInDays,
  endOfDecade,
  endOfMonth,
  endOfWeek,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isSameYear,
  startOfDecade,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";
import { clsx, filteredArray, formatDate } from "@/utils";
import styles from "../ui.date-picker.module.scss";
import { UiButton, UiButtonVariant } from "../../../button";
import { Icon, UiIcon } from "../../../icon";
import { UiPureButton } from "../../../pure-button";
import { UiDatePickerLevel } from "@/app/ui/components/date-picker";

export type CalendarProps = {
  className?: string;
  value?: Date;
  range?: [Date | undefined, Date | undefined];
  min?: Date;
  max?: Date;
  level?: UiDatePickerLevel;
  locale?: string;
  onChange?(date: Date): void;
};

enum CalendarView {
  month = "month",
  year = "year",
  years = "years",
}

type HeaderProps = PropsWithChildren<{
  onPrevious?(): void;
  onNext?(): void;
  onTitle?(): void;
}>;

function Header({ onPrevious, onNext, children, onTitle }: HeaderProps) {
  return (
    <div className={styles.header}>
      <UiButton
        variant={UiButtonVariant.secondary}
        className={clsx([styles.previous, !onPrevious && styles.disabled])}
        label={Icon.chevronLeftMini}
        onClick={onPrevious}
        disabled={!onPrevious}
      />
      <UiPureButton
        onClick={onTitle}
        className={clsx([styles.title, onTitle && styles.interactive])}
      >
        {children}
      </UiPureButton>
      <UiButton
        variant={UiButtonVariant.secondary}
        className={clsx([styles.next, !onNext && styles.disabled])}
        label={Icon.chevronRightMini}
        onClick={onNext}
        disabled={!onNext}
      />
    </div>
  );
}

type CommonViewProps = {
  currentDate: Date;
  handleView?(view: CalendarView): () => void;
  handleCurrentDate?(date: Date): () => void;
  locale?: string;
  range?: [Date | undefined, Date | undefined];
  min?: Date;
  max?: Date;
};

type MonthViewProps = CommonViewProps & {
  onChange?(date: Date): void;
};

type Day = {
  key: Key;
  date: Date;
  otherMonth?: boolean;
  disabled?: boolean;
  selected?: boolean;
  highlighted?: boolean;
  today?: boolean;
};

function MonthView({
  currentDate,
  handleCurrentDate,
  handleView,
  locale = "en",
  range = [undefined, undefined],
  min,
  max,
  onChange,
}: MonthViewProps) {
  const firstWeekDay = startOfWeek(currentDate);
  const weekDays = Array.from({ length: 7 }).map((_, day) => [
    day,
    formatDate(locale, addDays(firstWeekDay, day), {
      weekday: "narrow",
    }),
  ]);

  const firstMonthDay = startOfMonth(currentDate);
  const firstDay = startOfWeek(firstMonthDay);
  const lastMonthDay = endOfMonth(currentDate);
  const lastDay = endOfWeek(lastMonthDay);

  const diff = differenceInDays(lastDay, firstDay) + 1;

  const now = new Date();

  const filteredRange = filteredArray(range);

  const days: Array<Day> = Array.from({
    length: diff > 40 ? diff : diff + 7,
  })
    .map((_, i) => addDays(firstDay, i))
    .map((date) => ({
      key: +date,
      date,
      otherMonth: !isSameMonth(currentDate, date),
      today: isSameDay(now, date),
      selected: filteredRange.some((s) => isSameDay(s, date)),
      highlighted:
        filteredRange.length === 2 &&
        +date >= +filteredRange[0] &&
        +date <= +filteredRange[1],
      disabled:
        (min && isBefore(date, min) && !isSameDay(date, min)) ||
        (max && isAfter(date, max)),
    }));

  const handleDate = (date: Date) => () => {
    onChange?.(date);
  };

  return (
    <>
      <Header
        onTitle={handleView?.(CalendarView.year)}
        onPrevious={
          !min || (min && isAfter(addMonths(currentDate, 0), min))
            ? handleCurrentDate?.(addMonths(currentDate, -1))
            : undefined
        }
        onNext={
          !max || (max && isBefore(addMonths(currentDate, 1), max))
            ? handleCurrentDate?.(addMonths(currentDate, 1))
            : undefined
        }
      >
        {formatDate(locale, currentDate, {
          month: "long",
          year: "numeric",
        })}
      </Header>
      <div className={clsx([styles.grid, styles.monthly])}>
        {weekDays.map(([day, label]) => (
          <div key={day} className={clsx([styles.cell, styles.weekDay])}>
            {label}
          </div>
        ))}
        {days.map((day) => (
          <UiPureButton
            key={day.key}
            disabled={day.disabled}
            className={clsx([
              styles.cell,
              styles.day,
              day.disabled && styles.disabled,
              day.otherMonth && styles.otherMonth,
              day.highlighted && styles.highlighted,
              day.selected && styles.selected,
            ])}
            onClick={handleDate(day.date)}
          >
            {day.date.getDate()}
            {day.today && (
              <div className={styles.today}>
                <UiIcon
                  icon={Icon.ellipseMiniSolid}
                  className={styles.todayIcon}
                />
              </div>
            )}
          </UiPureButton>
        ))}
      </div>
    </>
  );
}

type YearViewProps = CommonViewProps;

type Month = {
  key: Key;
  date: Date;
  disabled?: boolean;
  selected?: boolean;
  highlighted?: boolean;
  today?: boolean;
};

function YearView({
  currentDate,
  handleCurrentDate,
  handleView,
  locale = "en",
  max,
  min,
  range,
}: YearViewProps) {
  const now = new Date();

  const filteredRange = filteredArray(range);

  const months: Array<Month> = Array.from({ length: 12 })
    .map((_, i) => addMonths(startOfYear(currentDate), i))
    .map((date) => ({
      date,
      key: +date,
      today: isSameMonth(now, date) && isSameYear(now, date),
      highlighted:
        filteredRange.length === 2 &&
        +date >= +filteredRange[0] &&
        +date <= +filteredRange[1],
      disabled:
        (min && isBefore(date, min) && !isSameMonth(date, min)) ||
        (max && isAfter(date, max)),
      selected: filteredRange.some((s) => isSameMonth(s, date)),
    }));

  const handleMonth = (date: Date) => () => {
    handleView?.(CalendarView.month)();
    handleCurrentDate?.(date)();
  };

  return (
    <>
      <Header
        onTitle={handleView?.(CalendarView.years)}
        onPrevious={
          !min || (min && isAfter(addYears(currentDate, -1), min))
            ? handleCurrentDate?.(addYears(currentDate, -1))
            : undefined
        }
        onNext={
          !max || (max && isBefore(addYears(currentDate, 1), max))
            ? handleCurrentDate?.(addYears(currentDate, 1))
            : undefined
        }
      >
        {formatDate(locale, currentDate, {
          year: "numeric",
        })}
      </Header>
      <div className={clsx([styles.grid, styles.yearly])}>
        {months.map((month) => (
          <UiPureButton
            key={month.key}
            disabled={month.disabled}
            className={clsx([
              styles.cell,
              styles.month,
              month.selected && styles.selected,
              month.disabled && styles.disabled,
              month.highlighted && styles.highlighted,
            ])}
            onClick={handleMonth(month.date)}
          >
            {formatDate(locale, month.date, {
              month: "short",
            })}
            {month.today && (
              <div className={styles.today}>
                <UiIcon
                  icon={Icon.ellipseMiniSolid}
                  className={styles.todayIcon}
                />
              </div>
            )}
          </UiPureButton>
        ))}
      </div>
    </>
  );
}

type YearsViewProps = CommonViewProps;

type Year = {
  key: Key;
  date: Date;
  disabled?: boolean;
  selected?: boolean;
  highlighted?: boolean;
  today?: boolean;
};

function YearsView({
  currentDate,
  handleCurrentDate,
  locale = "en",
  max,
  min,
  range,
  handleView,
}: YearsViewProps) {
  const now = new Date();

  const filteredRange = filteredArray(range);

  const years: Array<Year> = Array.from({ length: 10 })
    .map((_, i) => addYears(startOfDecade(currentDate), i))
    .map((date) => ({
      date,
      key: +date,
      today: isSameYear(now, date),
      highlighted:
        filteredRange.length === 2 &&
        +date >= +filteredRange[0] &&
        +date <= +filteredRange[1],
      disabled:
        (min && isBefore(date, min) && !isSameYear(date, min)) ||
        (max && isAfter(date, max)),
      selected: filteredRange.some((s) => isSameYear(s, date)),
    }));

  const handleYear = (date: Date) => () => {
    handleView?.(CalendarView.year)();
    handleCurrentDate?.(date)();
  };

  return (
    <>
      <Header
        onPrevious={
          !min || (min && isAfter(addYears(currentDate, -10), min))
            ? handleCurrentDate?.(addYears(currentDate, -10))
            : undefined
        }
        onNext={
          !max || (max && isBefore(addYears(currentDate, 10), max))
            ? handleCurrentDate?.(addYears(currentDate, 10))
            : undefined
        }
      >
        {[startOfDecade(currentDate), endOfDecade(currentDate)]
          .map((date) =>
            formatDate(locale, date, {
              year: "numeric",
            }),
          )
          .join(" — ")}
      </Header>
      <div className={clsx([styles.grid, styles.yearly])}>
        {years.map((year) => (
          <UiPureButton
            key={year.key}
            disabled={year.disabled}
            className={clsx([
              styles.cell,
              styles.month,
              year.selected && styles.selected,
              year.disabled && styles.disabled,
              year.highlighted && styles.highlighted,
            ])}
            onClick={handleYear(year.date)}
          >
            {formatDate(locale, year.date, {
              year: "numeric",
            })}
            {year.today && (
              <div className={styles.today}>
                <UiIcon
                  icon={Icon.ellipseMiniSolid}
                  className={styles.todayIcon}
                />
              </div>
            )}
          </UiPureButton>
        ))}
      </div>
    </>
  );
}

export function Calendar({
  className,
  value,
  min,
  max,
  range,
  level = UiDatePickerLevel.day,
  locale = "en",
  onChange,
}: CalendarProps) {
  const [view, setView] = useState(
    {
      [UiDatePickerLevel.day]: CalendarView.month,
      [UiDatePickerLevel.month]: CalendarView.year,
      [UiDatePickerLevel.year]: CalendarView.years,
    }[level],
  );
  const handleView = (newView: CalendarView) => () => {
    setView(newView);
  };

  const [currentDate, setCurrentDate] = useState(value || new Date());

  const handleCurrentDate = (newCurrentDate: Date) => () => {
    setCurrentDate(newCurrentDate);
  };

  return (
    <div className={clsx([className, styles.calendar])}>
      {view === CalendarView.month && (
        <MonthView
          handleView={handleView}
          currentDate={currentDate}
          handleCurrentDate={handleCurrentDate}
          locale={locale}
          range={range}
          min={min}
          max={max}
          onChange={onChange}
        />
      )}
      {view === CalendarView.year && (
        <YearView
          handleView={handleView}
          currentDate={currentDate}
          handleCurrentDate={handleCurrentDate}
          locale={locale}
          range={range}
          min={min}
          max={max}
        />
      )}
      {view === CalendarView.years && (
        <YearsView
          currentDate={currentDate}
          handleView={handleView}
          handleCurrentDate={handleCurrentDate}
          locale={locale}
          range={range}
          min={min}
          max={max}
        />
      )}
    </div>
  );
}
