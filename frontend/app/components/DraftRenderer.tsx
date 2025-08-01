"use client";

import React from "react";
import { convertFromRaw, RawDraftContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";

interface DraftRendererProps {
  rawContent: string | RawDraftContentState;
}

const DraftRenderer: React.FC<DraftRendererProps> = ({ rawContent }) => {
  let contentRaw: RawDraftContentState;

  try {
    contentRaw =
      typeof rawContent === "string" ? JSON.parse(rawContent) : rawContent;
  } catch {
    return <p className="text-red-500">⚠ Invalid content format</p>;
  }

  const contentState = convertFromRaw(contentRaw);
  const html = draftToHtml(contentState.toJS());

  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default DraftRenderer;
