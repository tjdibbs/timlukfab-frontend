"use client"

const getCurrentTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export default getCurrentTheme;
