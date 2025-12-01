# React Responsive Calendar

A fully responsive, customizable calendar component for React with event support and container query-based scaling.

## Features

- Fully Responsive - Adapts to any container size and aspect ratio
- Highly Customizable - Control colors, fonts, and styling
- Event Support - Display events with dots and counters
- Navigation - Month navigation with "Today" reset button
- Container Queries - Uses modern CSS container queries for perfect scaling
- Lightweight - No external dependencies
- TypeScript Ready - Full TypeScript support included

## Installation
```bash
npm install @homagni/gp-calendar
```
```bash
yarn add @homagni/gp-calendar
```
```bash
pnpm add @homagni/gp-calendar
```

## Basic Usage
```jsx
import { Calendar } from '@homagni/gp-calendar';
import '@homagni/gp-calendar/dist/gp-calendar.css';

function App() {
  return (
    <div style={{ height: "500px", width: "600px" }}>
      <Calendar />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialMonth` | `Date` | `new Date()` | The initial month to display |
| `today` | `Date` | `new Date()` | Custom "today" date for highlighting |
| `events` | `CalendarEvent[]` | `[]` | Array of events to display |
| `onMonthChange` | `(monthStart: Date) => void` | `undefined` | Callback when month changes |
| `renderDay` | `Function` | `undefined` | Custom day cell renderer |
| `className` | `string` | `undefined` | Additional CSS class name |
| `primaryColor` | `string` | `"#3b82f6"` | Color for reset button |
| `accentColor` | `string` | `"#10b981"` | Color for event dots |
| `backgroundColor` | `string` | `"#ffffff"` | Background color for cells |
| `fontFamily` | `string` | `"system-ui, sans-serif"` | Font family |
| `fontColor` | `string` | `"#000"` | Color for date numbers |
| `todayColor` | `string` | `"#3b82f6"` | Background color for today's date |

## Examples

### With Events
```jsx
import { Calendar, CalendarEvent } from '@homagni/gp-calendar';
import '@homagni/gp-calendar/dist/gp-calendar.css';

function App() {
  const events: CalendarEvent[] = [
    { id: "1", date: new Date(2025, 11, 5), title: "Team Meeting" },
    { id: "2", date: new Date(2025, 11, 10), title: "Project Deadline" },
    { id: "3", date: new Date(2025, 11, 25), title: "Christmas" },
  ];

  return (
    <div style={{ height: "500px", width: "600px" }}>
      <Calendar events={events} />
    </div>
  );
}
```

### Custom Colors
```jsx
<Calendar
  fontColor="#259cabff"
  backgroundColor="#815286ff"
  todayColor="#ee1a1aff"
  primaryColor="#9ce781ff"
  accentColor="#ffff00"
/>
```

### Month Change Callback
```jsx
function App() {
  const handleMonthChange = (monthStart: Date) => {
    console.log("Month changed to:", monthStart);
  };

  return (
    <Calendar onMonthChange={handleMonthChange} />
  );
}
```

### Custom Day Renderer
```jsx
<Calendar
  renderDay={({ date, isCurrentMonth, isToday, events }) => (
    <div className={isToday ? "my-today-cell" : "my-cell"}>
      <span>{date.getDate()}</span>
      {events.length > 0 && <span>Events</span>}
    </div>
  )}
/>
```

## CalendarEvent Type
```typescript
type CalendarEvent = {
  id?: string;
  date: Date;
  title: string;
  meta?: Record<string, unknown>;
};
```

## Styling

The calendar uses CSS container queries for responsive scaling. Font sizes and element dimensions are calculated as percentages of the container size, ensuring perfect scaling at any size.

### Key Features:
- 80% Rule: Date numbers are 80% of cell height
- Event Dots: Scale proportionally with calendar size
- Container Queries: Uses cqh (container query height) units

### Custom Styling

You can override styles by targeting the CSS classes:
```css
.gp-calendar {
  /* Your custom styles */
}

.gp-day--today {
  /* Custom today cell styles */
}

.gp-dot {
  /* Custom event dot styles */
}
```

## Browser Support

Modern browsers with CSS Container Query support:
- Chrome 105+
- Edge 105+
- Safari 16+
- Firefox 110+

## Notes

- Month Indexing: JavaScript dates use 0-indexed months (0 = January, 11 = December)
- Week Start: Week starts on Monday
- Event Limit: Shows up to 3 event dots per day, with a counter for additional events
- Responsive: The calendar fills its parent container - set explicit height/width on the parent

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Support

For issues and feature requests, please use the GitHub issue tracker at https://github.com/Golden-Presto/calendar/issues