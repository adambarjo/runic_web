import { RefObject } from "react";

interface OutputPaneProps {
  outputPaneRef: RefObject<HTMLDivElement>;
}

function OutputPane({ outputPaneRef }: OutputPaneProps) {
  return (
    <div
      ref={outputPaneRef}
      className="w-full prose bg-white p-16 border border-slate-600 shadow-lg"
    />
  );
}

export default OutputPane;
