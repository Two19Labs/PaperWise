"use client";

import React from "react";
import katex from "katex";

// Renders inline markdown-like formatting: ***bold italic***, **bold**, *italic*, `code`
function renderInlineMarkdown(text, keyPrefix) {
  // Pattern order matters: triple first, then double, then single, then backtick
  const pattern = /(\*\*\*.*?\*\*\*|\*\*.*?\*\*|\*.*?\*|`.*?`)/gs;
  const parts = text.split(pattern);
  return parts.map((part, i) => {
    const key = `${keyPrefix}-md-${i}`;
    if (part.startsWith("***") && part.endsWith("***")) {
      return <strong key={key}><em>{part.slice(3, -3)}</em></strong>;
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={key}>{part.slice(1, -1)}</em>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={key} style={{ background: "rgba(0,0,0,0.1)", borderRadius: "3px", padding: "0 4px", fontFamily: "monospace" }}>{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

export default function Latex({ text, children }) {
  const content = text || children;
  if (typeof content !== "string") {
    return content;
  }

  // Split by $$ first (display math), then by $ (inline math)
  const displayParts = content.split(/(\$\$.*?\$\$)/gs);

  return (
    <>
      {displayParts.map((part, i) => {
        if (part.startsWith("$$") && part.endsWith("$$")) {
          const math = part.slice(2, -2);
          try {
            const html = katex.renderToString(math, {
              displayMode: true,
              throwOnError: false,
            });
            return (
              <span
                key={i}
                dangerouslySetInnerHTML={{ __html: html }}
                style={{ display: "block", margin: "0.5em 0", overflowX: "auto" }}
              />
            );
          } catch (e) {
            return <code key={i}>{part}</code>;
          }
        } else {
          // Split by inline math $...$
          const inlineParts = part.split(/(\$.*?\$)/g);
          return (
            <React.Fragment key={i}>
              {inlineParts.map((subPart, j) => {
                if (subPart.startsWith("$") && subPart.endsWith("$") && subPart.length > 1) {
                  const math = subPart.slice(1, -1);
                  try {
                    const html = katex.renderToString(math, {
                      displayMode: false,
                      throwOnError: false,
                    });
                    return (
                      <span
                        key={j}
                        dangerouslySetInnerHTML={{ __html: html }}
                        style={{ display: "inline-block", verticalAlign: "middle" }}
                      />
                    );
                  } catch (e) {
                    return <code key={j}>{subPart}</code>;
                  }
                }
                // Plain text — render with markdown formatting
                return (
                  <React.Fragment key={j}>
                    {renderInlineMarkdown(subPart, `${i}-${j}`)}
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          );
        }
      })}
    </>
  );
}
