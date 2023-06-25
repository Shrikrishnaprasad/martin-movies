import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import AppsIcon from "@mui/icons-material/Apps";
import MenuIcon from "@mui/icons-material/Menu";
import FilterYear from "./FilterYear";
import FilterType from "./FilterType";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import { Context } from "./Provider";
import React from "react";

export default function Main() {
  const { isList, setIsList } = React.useContext(Context);
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 4
      }}
    >
      <Container maxWidth="lg">
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="space-between"
        >
          <div>
            <Button
              variant={isList ? "contained" : "outlined"}
              color={isList ? "secondary" : "inherit"}
              sx={{ mr: 1 }}
              onClick={() => setIsList(true)}
            >
              <MenuIcon />
            </Button>
            <Button
              variant={!isList ? "contained" : "outlined"}
              color={!isList ? "secondary" : "inherit"}
              onClick={() => setIsList(false)}
            >
              <AppsIcon />
            </Button>
          </div>
          <div>
            <FilterType />
            <FilterYear />
          </div>
        </Stack>
      </Container>
    </Box>
  );
}
