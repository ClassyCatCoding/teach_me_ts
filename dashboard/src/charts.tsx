import { useEffect, useRef, useState, type PointerEvent } from "react";

export interface ChartPoint {
  /** Short x-axis label, for example "21 Nov". */
  label: string;
  value: number;
  /** First line of the tooltip, for example the task title. */
  title: string;
  /** Formatted value for the tooltip, for example "88 / 100". */
  valueText: string;
}

interface LineChartProps {
  points: ChartPoint[];
  yMax: number;
  ticks: number[];
  height?: number;
  /** A labelled horizontal reference line, for example the Passing Score. */
  reference?: { value: number; label: string };
  /** Text for the direct label on the latest point. */
  endLabel?: string;
  ariaLabel: string;
}

function useWidth(): [React.RefObject<HTMLDivElement>, number] {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setWidth(Math.floor(entry.contentRect.width));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return [ref, width];
}

/** One series over an ordered list of events, with a crosshair and tooltip on hover. */
export function LineChart({ points, yMax, ticks, height = 220, reference, endLabel, ariaLabel }: LineChartProps) {
  const [ref, width] = useWidth();
  const [hover, setHover] = useState<number | null>(null);

  const margin = { top: 14, right: endLabel ? 44 : 16, bottom: 26, left: 34 };
  const plotWidth = Math.max(0, width - margin.left - margin.right);
  const plotHeight = height - margin.top - margin.bottom;

  const xAt = (index: number): number =>
    points.length <= 1
      ? margin.left + plotWidth / 2
      : margin.left + (plotWidth * index) / (points.length - 1);
  const yAt = (value: number): number => margin.top + plotHeight * (1 - value / yMax);

  const path = points.map((point, index) => `${index === 0 ? "M" : "L"}${xAt(index)},${yAt(point.value)}`).join(" ");

  // Thin the x labels so neighbours never collide.
  const labelEvery = Math.max(1, Math.ceil(points.length / Math.max(1, Math.floor(plotWidth / 64))));

  const onMove = (event: PointerEvent<SVGSVGElement>) => {
    if (points.length === 0) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    let nearest = 0;
    for (let index = 1; index < points.length; index += 1) {
      if (Math.abs(xAt(index) - x) < Math.abs(xAt(nearest) - x)) nearest = index;
    }
    setHover(nearest);
  };

  const hovered = hover === null ? undefined : points[hover];
  const last = points[points.length - 1];
  const tooltipOnLeft = hover !== null && xAt(hover) > width * 0.6;

  return (
    <div className="chart" ref={ref} style={{ height }}>
      {width > 0 && (
        <svg
          width={width}
          height={height}
          role="img"
          aria-label={ariaLabel}
          onPointerMove={onMove}
          onPointerLeave={() => setHover(null)}
        >
          {ticks.map((tick) => (
            <g key={tick}>
              <line
                className={tick === 0 ? "chart-axis" : "chart-grid"}
                x1={margin.left}
                x2={margin.left + plotWidth}
                y1={yAt(tick)}
                y2={yAt(tick)}
              />
              <text className="chart-tick" x={margin.left - 8} y={yAt(tick)} dy="0.32em" textAnchor="end">
                {tick}
              </text>
            </g>
          ))}

          {reference && (
            <g>
              <line
                className="chart-reference"
                x1={margin.left}
                x2={margin.left + plotWidth}
                y1={yAt(reference.value)}
                y2={yAt(reference.value)}
              />
              <text className="chart-tick" x={margin.left + 4} y={yAt(reference.value) - 5}>
                {reference.label}
              </text>
            </g>
          )}

          {points.map((point, index) =>
            index % labelEvery === 0 ? (
              <text key={index} className="chart-tick" x={xAt(index)} y={height - 6} textAnchor="middle">
                {point.label}
              </text>
            ) : null,
          )}

          {hover !== null && (
            <line className="chart-crosshair" x1={xAt(hover)} x2={xAt(hover)} y1={margin.top} y2={margin.top + plotHeight} />
          )}

          {points.length > 1 && <path className="chart-line" d={path} />}

          {points.map((point, index) => (
            <circle
              key={index}
              className="chart-dot"
              cx={xAt(index)}
              cy={yAt(point.value)}
              r={hover === index ? 6 : 4.5}
            />
          ))}

          {endLabel && last && (
            <text className="chart-end-label" x={xAt(points.length - 1) + 10} y={yAt(last.value)} dy="0.32em">
              {endLabel}
            </text>
          )}
        </svg>
      )}

      {hovered && hover !== null && (
        <div
          className="chart-tooltip"
          style={{
            top: Math.max(0, yAt(hovered.value) - 12),
            ...(tooltipOnLeft ? { right: width - xAt(hover) + 12 } : { left: xAt(hover) + 12 }),
          }}
        >
          <div className="chart-tooltip-title">{hovered.title}</div>
          <div>
            <strong>{hovered.valueText}</strong> <span className="muted">· {hovered.label}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export interface BarRow {
  label: string;
  value: number;
  detail?: string;
}

/** Horizontal bars for a count per category, value labelled at the tip. */
export function BarList({ rows, unit }: { rows: BarRow[]; unit: string }) {
  const max = Math.max(1, ...rows.map((row) => row.value));
  return (
    <ul className="bars">
      {rows.map((row) => (
        <li key={row.label} title={`${row.label}: ${row.value} ${unit}`}>
          <span className="bars-label">{row.label}</span>
          <span className="bars-track">
            <span className="bars-fill" style={{ width: `${(row.value / max) * 100}%` }} />
            <span className="bars-value">{row.value}</span>
          </span>
          {row.detail && <span className="bars-detail muted">{row.detail}</span>}
        </li>
      ))}
    </ul>
  );
}
