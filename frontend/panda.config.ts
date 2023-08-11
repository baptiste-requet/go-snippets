import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,ts,svelte}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {tokens: {
      colors: {
        primary: { value: '#ff0000' },
        secondary: { value: '#EE0F0F' }
      },
    }},
    
  },

  // The output directory for your css system
  outdir: "styled-system",
});
