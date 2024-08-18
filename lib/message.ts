import React from "react";

export default function message(
  bar: (message: React.ReactNode, options?: object) => void,
  message: React.ReactNode,
  variant: "error" | "success" | "info",
  time?: number
) {
  bar(message, {
    variant,
    anchorOrigin: {
      vertical: "top",
      horizontal: "right",
    },
    autoHideDuration: time ?? 3000,
  });
}
