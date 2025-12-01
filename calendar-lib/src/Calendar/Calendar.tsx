import React, { useMemo, useState } from "react";
import "./Calendar.css";

export type CalendarEvent = {
  id?: string;
  date: Date;
  title: string;
  meta?: Record<string, unknown>;
};

type Props = {
  initialMonth?: Date;
  today?: Date;
  events?: CalendarEvent[];
  onMonthChange?: (monthStart: Date) => void;
  renderDay?: (args: {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
    events: CalendarEvent[];
  }) => React.ReactNode;
  className?: string;
  primaryColor?: string;
  accentColor?: string;
  backgroundColor?: string;
  fontFamily?: string;
  fontColor?: string;
  todayColor?: string;
};

const startOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);
const endOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);
const addMonths = (date: Date, amount: number) => new Date(date.getFullYear(), date.getMonth() + amount, 1);
const isSameMonth = (date1: Date, date2: Date) => 
  date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();
const isSameDay = (date1: Date, date2: Date) => {
  return date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();
};
const startOfWeek = (date: Date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day; // Monday as first day
  d.setDate(d.getDate() + diff);
  return d;
};
const endOfWeek = (date: Date) => {
  const d = startOfWeek(date);
  d.setDate(d.getDate() + 6);
  return d;
};

export function Calendar({
  initialMonth = new Date(),
  today: todayProp,
  events = [],
  onMonthChange,
  renderDay,
  className,
  primaryColor = "#3b82f6",
  accentColor = "#10b981",
  backgroundColor = "#ffffff",
  fontFamily = "system-ui, sans-serif",
  fontColor = "#000",
  todayColor = "#3b82f6"
}: Props) {
  const today = useMemo(() => todayProp || new Date(), [todayProp]);
  const [month, setMonth] = useState(startOfMonth(initialMonth));
  const isCurrentMonth = isSameMonth(month, today);

  const weeks = useMemo(() => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(monthStart);
    const gridStart = startOfWeek(monthStart);
    const gridEnd = endOfWeek(monthEnd);

    const days: Date[] = [];
    let cur = new Date(gridStart);
    while (cur <= gridEnd) {
      days.push(new Date(cur));
      cur.setDate(cur.getDate() + 1);
    }

    const chunks: Date[][] = [];
    for (let i = 0; i < days.length; i += 7) chunks.push(days.slice(i, i + 7));
    return chunks;
  }, [month]);

  const eventsByDay = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const e of events) {
      const key = `${e.date.getFullYear()}-${e.date.getMonth()}-${e.date.getDate()}`;
      const list = map.get(key) || [];
      list.push(e);
      map.set(key, list);
    }
    return map;
  }, [events]);

  const goPrev = () => {
    const next = startOfMonth(addMonths(month, -1));
    setMonth(next);
    onMonthChange?.(next);
  };
  
  const goNext = () => {
    const next = startOfMonth(addMonths(month, +1));
    setMonth(next);
    onMonthChange?.(next);
  };

  const goToday = () => {
    const next = startOfMonth(today);
    setMonth(next);
    onMonthChange?.(next);
  };

  const styleVars: Record<string, string> = {
    fontFamily: fontFamily,
    "--gp-primary": primaryColor,
    "--gp-accent": accentColor,
    "--gp-bg": backgroundColor,
    "--gp-font-color": fontColor,
    "--gp-today": todayColor
  };

  return (
    <div
      className={["gp-calendar", className].filter(Boolean).join(" ")}
      style={styleVars as React.CSSProperties}
    >
      <div className="gp-cal-header">
        <button className="gp-nav" onClick={goPrev} aria-label="Previous month">
          ‹
        </button>
        <div className="gp-title">
          {month.toLocaleString(undefined, { month: "long", year: "numeric" })}
        </div>
        <button className="gp-nav" onClick={goNext} aria-label="Next month">
          ›
        </button>
      </div>

      {!isCurrentMonth && (
        <div className="gp-reset-container">
          <button className="gp-reset" onClick={goToday} aria-label="Go to today">
            Today
          </button>
        </div>
      )}

      <div className="gp-weekdays">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d} className="gp-weekday">
            {d}
          </div>
        ))}
      </div>

      <div className="gp-grid">
        {weeks.map((week, wi) => (
          <div key={wi} className="gp-row">
            {week.map((date) => {
              const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
              const dayEvents = eventsByDay.get(key) || [];
              const cell = renderDay ? (
                renderDay({
                  date,
                  isCurrentMonth: isSameMonth(date, month),
                  isToday: isSameDay(date, today),
                  events: dayEvents
                })
              ) : (
                <DefaultCell
                  date={date}
                  isCurrentMonth={isSameMonth(date, month)}
                  isToday={isSameDay(date, today)}
                  events={dayEvents}
                />
              );
              return (
                <div key={key} className="gp-cell">
                  {cell}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function DefaultCell({
  date,
  isCurrentMonth,
  isToday,
  events
}: {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}) {
  return (
    <div
      className={[
        "gp-day",
        isCurrentMonth ? "gp-day--in" : "gp-day--out",
        isToday ? "gp-day--today" : ""
      ].join(" ")}
    >
      <div className="gp-day-number">{date.getDate()}</div>
      {events.length > 0 && (
        <div className="gp-dots">
          {events.slice(0, 3).map((e, i) => (
            <span key={e.id ?? i} className="gp-dot" title={e.title} />
          ))}
          {events.length > 3 && (
            <span className="gp-count">+{events.length - 3}</span>
          )}
        </div>
      )}
    </div>
  );
}