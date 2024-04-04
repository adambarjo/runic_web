import { classNames } from "@/util";
import { Roboto_Mono } from "next/font/google";
import { RefObject, useEffect, useRef } from "react";
import editor from "./editor.json";

const robotoMono = Roboto_Mono({ weight: "400", subsets: ["latin"] });

interface EditorProps {
  outputPaneRef: RefObject<HTMLDivElement>;
}

function Editor({ outputPaneRef }: EditorProps) {
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const highlightTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const go = new window.Go();

    WebAssembly.instantiateStreaming(fetch("main.wasm"), go.importObject).then(
      (result) => {
        go.run(result.instance);
        parseInput(editor.startingText);
      },
    );

    return window.runicUnmount;
  });

  const handleEditorChange = (e: any) => parseInput(e.target.value);

  const handleEditorScroll = () => {
    const element = editorRef.current!;
    highlightTextRef.current!.style.top = element.scrollTop * -1 + "px";
  };

  const handleClear = () => parseInput("");

  const handleReset = () => {
    parseInput(editor.startingText);
    editorRef.current!.value = editor.startingText;
  };

  const parseInput = (input: string) => {
    const editorData = JSON.parse(window.runicParse(input));

    outputPaneRef.current!.innerHTML = editorData.html;
    highlightTextRef.current!.innerHTML = editorData.highlightText;
  };

  return (
    <div className="w-full h-[calc(100vh-8rem)] sticky top-8">
      <div className="bg-indigo-950 w-full h-full rounded-2xl p-4">
        <div className="w-full h-full relative overflow-hidden">
          <textarea
            ref={editorRef}
            defaultValue={editor.startingText}
            onChange={handleEditorChange}
            onScroll={handleEditorScroll}
            spellCheck={false}
            className={classNames(
              robotoMono.className,
              "absolute top-0 left-0 p-4 w-full h-full outline-none caret-indigo-500 resize-none text-transparent bg-transparent",
            )}
          />
          <div
            ref={highlightTextRef}
            className={classNames(
              robotoMono.className,
              "absolute top-0 left-0 p-4 w-full h-full outline-none pointer-events-none",
            )}
          />
        </div>
        <div className="-translate-x-4 translate-y-6 flex gap-2">
          <button
            onClick={handleReset}
            className="py-1 px-4 bg-indigo-300 rounded-md text-sm flex items-center justify-center text-indigo-700 gap-1"
          >
            <span>⟳</span>
            <span>Reset</span>
          </button>
          <button
            onClick={handleClear}
            className="py-1 px-4 bg-indigo-300 rounded-md text-sm flex items-center justify-center text-indigo-700 gap-1"
          >
            <span>⨯</span>
            <span>Clear</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Editor;
