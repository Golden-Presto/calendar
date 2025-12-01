import { jsxs as m, jsx as a } from "react/jsx-runtime";
import { useMemo as N, useState as L } from "react";
const u = (t) => new Date(t.getFullYear(), t.getMonth(), 1), P = (t) => new Date(t.getFullYear(), t.getMonth() + 1, 0), w = (t, e) => new Date(t.getFullYear(), t.getMonth() + e, 1), M = (t, e) => t.getFullYear() === e.getFullYear() && t.getMonth() === e.getMonth(), b = (t, e) => t.getDate() === e.getDate() && t.getMonth() === e.getMonth() && t.getFullYear() === e.getFullYear(), k = (t) => {
  const e = new Date(t), r = e.getDay(), o = r === 0 ? -6 : 1 - r;
  return e.setDate(e.getDate() + o), e;
}, V = (t) => {
  const e = k(t);
  return e.setDate(e.getDate() + 6), e;
};
function H({
  initialMonth: t = /* @__PURE__ */ new Date(),
  today: e,
  events: r = [],
  onMonthChange: o,
  renderDay: h,
  className: f,
  primaryColor: F = "#3b82f6",
  accentColor: Y = "#10b981",
  backgroundColor: x = "#ffffff",
  fontFamily: S = "system-ui, sans-serif",
  fontColor: C = "#000",
  todayColor: T = "#3b82f6"
}) {
  const p = N(() => e || /* @__PURE__ */ new Date(), [e]), [l, D] = L(u(t)), $ = M(l, p), j = N(() => {
    const n = u(l), c = P(n), s = k(n), i = V(c), g = [];
    let d = new Date(s);
    for (; d <= i; )
      g.push(new Date(d)), d.setDate(d.getDate() + 1);
    const v = [];
    for (let y = 0; y < g.length; y += 7) v.push(g.slice(y, y + 7));
    return v;
  }, [l]), O = N(() => {
    const n = /* @__PURE__ */ new Map();
    for (const c of r) {
      const s = `${c.date.getFullYear()}-${c.date.getMonth()}-${c.date.getDate()}`, i = n.get(s) || [];
      i.push(c), n.set(s, i);
    }
    return n;
  }, [r]), E = () => {
    const n = u(w(l, -1));
    D(n), o?.(n);
  }, W = () => {
    const n = u(w(l, 1));
    D(n), o?.(n);
  }, B = () => {
    const n = u(p);
    D(n), o?.(n);
  }, G = {
    fontFamily: S,
    "--gp-primary": F,
    "--gp-accent": Y,
    "--gp-bg": x,
    "--gp-font-color": C,
    "--gp-today": T
  };
  return /* @__PURE__ */ m(
    "div",
    {
      className: ["gp-calendar", f].filter(Boolean).join(" "),
      style: G,
      children: [
        /* @__PURE__ */ m("div", { className: "gp-cal-header", children: [
          /* @__PURE__ */ a("button", { className: "gp-nav", onClick: E, "aria-label": "Previous month", children: "‹" }),
          /* @__PURE__ */ a("div", { className: "gp-title", children: l.toLocaleString(void 0, { month: "long", year: "numeric" }) }),
          /* @__PURE__ */ a("button", { className: "gp-nav", onClick: W, "aria-label": "Next month", children: "›" })
        ] }),
        !$ && /* @__PURE__ */ a("div", { className: "gp-reset-container", children: /* @__PURE__ */ a("button", { className: "gp-reset", onClick: B, "aria-label": "Go to today", children: "Today" }) }),
        /* @__PURE__ */ a("div", { className: "gp-weekdays", children: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((n) => /* @__PURE__ */ a("div", { className: "gp-weekday", children: n }, n)) }),
        /* @__PURE__ */ a("div", { className: "gp-grid", children: j.map((n, c) => /* @__PURE__ */ a("div", { className: "gp-row", children: n.map((s) => {
          const i = `${s.getFullYear()}-${s.getMonth()}-${s.getDate()}`, g = O.get(i) || [], d = h ? h({
            date: s,
            isCurrentMonth: M(s, l),
            isToday: b(s, p),
            events: g
          }) : /* @__PURE__ */ a(
            q,
            {
              date: s,
              isCurrentMonth: M(s, l),
              isToday: b(s, p),
              events: g
            }
          );
          return /* @__PURE__ */ a("div", { className: "gp-cell", children: d }, i);
        }) }, c)) })
      ]
    }
  );
}
function q({
  date: t,
  isCurrentMonth: e,
  isToday: r,
  events: o
}) {
  return /* @__PURE__ */ m(
    "div",
    {
      className: [
        "gp-day",
        e ? "gp-day--in" : "gp-day--out",
        r ? "gp-day--today" : ""
      ].join(" "),
      children: [
        /* @__PURE__ */ a("div", { className: "gp-day-number", children: t.getDate() }),
        o.length > 0 && /* @__PURE__ */ m("div", { className: "gp-dots", children: [
          o.slice(0, 3).map((h, f) => /* @__PURE__ */ a("span", { className: "gp-dot", title: h.title }, h.id ?? f)),
          o.length > 3 && /* @__PURE__ */ m("span", { className: "gp-count", children: [
            "+",
            o.length - 3
          ] })
        ] })
      ]
    }
  );
}
export {
  H as Calendar
};
