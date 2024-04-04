"use client";

import "@/public/wasm_exec.js";
import { useRef } from "react";
import Editor from "./Editor";
import Header from "./Header";
import OutputPane from "./OutputPane";

export default function Home() {
  const outputPaneRef = useRef<HTMLDivElement>(null);

  return (
    <main className="flex items-center justify-center flex-col prose-a:no-underline prose-a:text-indigo-500">
      <Header />
      <div className="flex justify-center w-full max-w-[130ch] gap-8 pb-24">
        <Editor outputPaneRef={outputPaneRef} />
        <OutputPane outputPaneRef={outputPaneRef} />
      </div>
    </main>
  );
}
