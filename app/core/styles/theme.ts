import { red } from "@mui/material/colors"
import { createTheme } from "@mui/material/styles"

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#48DF02",
    },
    secondary: {
      main: "#FFFFFF",
    },
    error: {
      main: red.A400,
    },
  },
})

export default theme
