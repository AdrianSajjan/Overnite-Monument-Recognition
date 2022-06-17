import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    background: "#232935",
    text: "#BFBFBF",
  },
  fonts: {
    brand: `"Iceland", cursive`,
    body: `"Space Grotesk", sans-serif`,
    heading: `"Space Grotesk", sans-serif`,
  },
  styles: {
    global: {
      "html, body": {
        margin: 0,
        padding: 0,
        height: "100%",
        color: "#FFFFFF",
        overflowX: "hidden",
        boxSizing: "border-box",
        scrollBehaviour: "smooth",
        backgroundColor: "#232935",
      },
      ".root": {
        height: "100%",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "regular",
      },
      sizes: {
        md: {
          px: "6",
        },
      },
    },
  },
});
