"use client";

import React from "react";
import katex from "katex";

export default function Latex({ text, children }) {
  const content = text || children;
  if (typeof content !== "string") {
    return content;
  }

  // We split by $$ first, then by $
  const displayPartsCorrect = content.split(/(\$\$.*?\$\$)/gs);

  return (
    <>
      {displayPartsCorrect.map((part, i) => {
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
          // Now split by $ (inline math)
          const inlineParts = part.split(/(\$.*?\$)/g);
          return (
            <React.Fragment key={i}>
              {inlineParts.map((subPart, j) => {
                if (subPart.startsWith("$") && subPart.endsWith("$")) {
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
                return subPart;
              })}
            </React.Fragment>
          );
        }
      })}
    </>
  );
}
