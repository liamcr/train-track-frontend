import { createMuiTheme } from "@material-ui/core/styles";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: { main: "hsl(204, 100%, 50%)" },
  },
});

export default theme;
