export const cursorColors = [
  '#3b82f6', // Blue
  '#ef4444', // Red
  '#10b981', // Green
  '#f59e0b', // Amber
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#06b6d4', // Cyan
  '#f97316', // Orange
  '#14b8a6', // Teal
  '#a855f7', // Violet
  '#84cc16', // Lime
  '#f43f5e', // Rose
  '#0ea5e9', // Sky Blue
  '#eab308', // Yellow
  '#6366f1', // Indigo
  '#22c55e', // Emerald
];

export const getColor = (userCount)=>{
    return cursorColors[userCount%cursorColors.length];
}
