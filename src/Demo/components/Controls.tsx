import React from "react";
import { MONTHS, ITEMS, SELECTION_TYPES, SelectionType } from "../Data/constants";

interface Props {
  startMonth: string;
  endMonth: string;
  items: string[];
  selectionType: SelectionType | "";
  onChange: (key: string, value: any) => void;
  onSubmit: () => void;
}

export const Controls: React.FC<Props> = ({
//   startMonth,
//   endMonth,
//   items,
//   selectionType,
  onChange,
  onSubmit
}) => {
  return (
    <div style={{ marginBottom: 12 }}>
      <select onChange={e => onChange("startMonth", e.target.value)}>
        <option value="">Start Month</option>
        {MONTHS.map(m => <option key={m}>{m}</option>)}
      </select>

      <select onChange={e => onChange("endMonth", e.target.value)}>
        <option value="">End Month</option>
        {MONTHS.map(m => <option key={m}>{m}</option>)}
      </select>

      <select
        multiple
        onChange={e =>
          onChange(
            "items",
            [...e.target.selectedOptions].map(o => o.value)
          )
        }
      >
        {ITEMS.map(i => <option key={i}>{i}</option>)}
      </select>

      <select onChange={e => onChange("selectionType", e.target.value)}>
        <option value="">Selection Type</option>
        {SELECTION_TYPES.map(t => (
          <option key={t.value} value={t.value}>{t.label}</option>
        ))}
      </select>

      <button onClick={onSubmit}>Generate Sheets</button>
    </div>
  );
};