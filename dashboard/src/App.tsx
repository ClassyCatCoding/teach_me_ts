import { register } from "./data";
import { useHashRoute } from "./ui";
import { History } from "./views/History";
import { Overview } from "./views/Overview";
import { TaskReview } from "./views/TaskReview";
import { Trends } from "./views/Trends";

const NAV = [
  { href: "#/", label: "Overview", match: (route: string) => route === "/" },
  { href: "#/trends", label: "Trends", match: (route: string) => route === "/trends" },
  {
    href: "#/history",
    label: "History",
    match: (route: string) => route === "/history" || route.startsWith("/task/"),
  },
];

export function App() {
  const route = useHashRoute();

  let view;
  if (route.startsWith("/task/")) {
    view = <TaskReview id={decodeURIComponent(route.slice("/task/".length))} />;
  } else if (route === "/trends") {
    view = <Trends />;
  } else if (route === "/history") {
    view = <History />;
  } else {
    view = <Overview />;
  }

  return (
    <div className="shell">
      <header className="topbar">
        <div className="brand">
          <strong>Mentor Dashboard</strong>
          <span className="muted">
            {register.student} · {register.track}
          </span>
        </div>
        <nav aria-label="Sections">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} aria-current={item.match(route) ? "page" : undefined}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>
      <main>{view}</main>
      <footer className="muted">
        Read-only. Data comes from progress/progress.json, progress/journal.md and tasks/, and refreshes when the mentor
        updates them.
      </footer>
    </div>
  );
}
