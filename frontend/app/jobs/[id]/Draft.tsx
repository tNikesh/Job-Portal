// components/DraftJsRenderer.tsx
import React from "react";
import { convertFromRaw, RawDraftContentState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

interface DraftJsRendererProps {
  rawContent: string | RawDraftContentState;
}

export const DraftJsRenderer: React.FC<DraftJsRendererProps> = ({ rawContent }) => {
  let contentRaw: RawDraftContentState;

  try {
    contentRaw = typeof rawContent === "string" ? JSON.parse(rawContent) : rawContent;
  } catch (e) {
    return <p className="text-red-600">Invalid content format</p>;
  }

  const contentState = convertFromRaw(contentRaw);

  const options = {
    inlineStyles: {
      BOLD: { element: "strong" },
      ITALIC: { element: "em" },
      UNDERLINE: { element: "u" },
      CODE: { element: "code" },
    },
  };

  const html = stateToHTML(contentState, options);

  return <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />;
};
