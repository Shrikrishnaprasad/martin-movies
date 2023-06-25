import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import Search from "./Search";

const headings = ["Home", "Page", "Movies", "TV Shows", "Blogs", "Contact"];
export default function Album() {
  return (
    <AppBar position="relative" color="default">
      <Toolbar>
        <SlideshowIcon sx={{ mr: 1 }} color="secondary" />
        <Typography variant="h5" color="secondary" sx={{ mr: "20%" }} noWrap>
          MartinMovies
        </Typography>
        <Typography color="inherit" align="center" noWrap sx={{ flex: 1 }}>
          {headings.map((e, i) => {
            return (
              <Typography
                key={i}
                variant="title"
                align="center"
                noWrap
                sx={{ mr: 2, cursor: "pointer" }}
              >
                {e}
              </Typography>
            );
          })}
        </Typography>
        <Typography align="right" noWrap sx={{ flex: 1 }}>
          <Search />
          <Button variant="contained" color="secondary" size="small">
            Sign up
          </Button>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
