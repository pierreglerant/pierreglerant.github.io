import { Fragment, type ReactNode } from "react";

/**
 * Remplace les segments **mot** par du gras (pas d’imbrication).
 */
export function renderInlineBold(text: string): ReactNode {
  if (!/\*\*.+?\*\*/.test(text)) {
    return text;
  }
  const re = /\*\*(.+?)\*\*/g;
  const nodes: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      nodes.push(<Fragment key={k++}>{text.slice(last, m.index)}</Fragment>);
    }
    nodes.push(
      <strong key={k++} className="font-semibold text-[var(--color-text)]">
        {m[1]}
      </strong>,
    );
    last = re.lastIndex;
  }
  if (last < text.length) {
    nodes.push(<Fragment key={k++}>{text.slice(last)}</Fragment>);
  }
  if (nodes.length === 0) {
    return text;
  }
  if (nodes.length === 1) {
    return nodes[0];
  }
  return <>{nodes}</>;
}
