import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Rating from "@mui/material/Rating";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header";
import Head from "./Head";
import { Context } from "./Provider";
import Settings from "./Settings";
import getGenre from "./functions";

const cardData = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const imgURL = "https://image.tmdb.org/t/p/original/";
const defaultImg = imgURL + "/fiVW06jE7z9YnO4trhaMEdclSiC.jpg";

const defaultTheme = createTheme();

export default function Main() {
  const {
    watchedList,
    isList,
    loading,
    yearMovieList,
    filterMode,
    searchList,
    allList,
    languageList,
    setAddWatched,
  } = React.useContext(Context);
  const [movieData, setMovieData] = React.useState([]);
  const [isLoad, setIsLoad] = React.useState(loading);
  const handleMovieList = (data) => {
    setMovieData(data);
    setIsLoad(false);
  };
  React.useEffect(() => {
    if (filterMode === "Watched" && Object.keys(watchedList).length !== 0) {
      handleMovieList(watchedList?.results);
    } else if (
      filterMode === "Year" &&
      Object.keys(yearMovieList).length !== 0
    ) {
      handleMovieList(yearMovieList?.results);
    } else if (
      filterMode === "Search" &&
      Object.keys(searchList).length !== 0
    ) {
      handleMovieList(searchList?.results);
    } else if (
      filterMode === "Lang" &&
      Object.keys(languageList).length !== 0
    ) {
      handleMovieList(languageList?.results);
    } else if (filterMode === "All" && Object.keys(allList).length !== 0) {
      handleMovieList(allList?.results);
    } else {
      setMovieData(cardData);
      setIsLoad(true);
    }
  }, [
    searchList,
    yearMovieList,
    filterMode,
    allList,
    watchedList,
    languageList,
  ]);
  React.useEffect(() => {
    loading && setIsLoad(true);
  }, [loading]);
  console.log(watchedList);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Header />
      <Head />
      <main>
        <Settings />
        <Container sx={{ py: 8 }} maxWidth="lg">
          <Grid container spacing={4}>
            {movieData?.map((card, i) => (
              <Grid
                item
                key={i}
                xs={12}
                sm={isList ? 12 : 6}
                md={isList ? 12 : 4}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: isList ? "row" : "column",
                    cursor: "pointer",
                    //backgroundColor: isLoad ? "" : "#212121",
                    //opacity: 0.9
                  }}
                >
                  {isLoad ? (
                    <Skeleton key={card} variant="rectangular" height={200} />
                  ) : (
                    <CardMedia
                      component="div"
                      sx={{
                        width: isList ? "70%" : "100%",
                        pt: isList ? "24%" : "114%",
                      }}
                      image={imgURL + card.poster_path || defaultImg}
                    />
                  )}
                  {isLoad ? (
                    <Box sx={{ pt: 0.5 }}>
                      <Skeleton width="30%" />
                      <Skeleton width="90%" />
                      <Skeleton width="80%" />
                      <Skeleton width="60%" />
                    </Box>
                  ) : (
                    <CardContent align="left" sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h4" component="h2">
                        {card.original_title?.substring(0, 16) || ""}{" "}
                        {card.original_title?.length > 14 ? " ..." : ""}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#a1a1a1",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <Rating
                            size="small"
                            defaultValue={1}
                            max={1}
                            sx={{ marginRight: "2px" }}
                          />
                          {card.vote_average + "/10" || 7}
                        </div>
                        <Typography sx={{ color: "#a1a1a1", fontSize: "13px" }}>
                          {getGenre(card.genre_ids || [])}
                        </Typography>
                      </Typography>
                      <Typography sx={{ color: "#a1a1a1" }}>
                        {card.overview?.substring(0, 180) + " ..." || ""}
                      </Typography>
                      <Typography mt={2}>
                        {watchedList?.results?.filter((e) => e.id === card.id)
                          .length ? (
                          filterMode === "Watched" && (
                            <Button
                              size="medium"
                              color="secondary"
                              variant="contained"
                              onClick={() => setAddWatched(card?.id)}
                            >
                              Remove
                            </Button>
                          )
                        ) : (
                          <Button
                            size="medium"
                            color="secondary"
                            variant="contained"
                            onClick={() => setAddWatched(card?.id)}
                          >
                            Add to Watched
                          </Button>
                        )}

                        <Button
                          size="medium"
                          color="secondary"
                          variant="contained"
                          sx={{ marginLeft: "4px" }}
                        >
                          Read More
                        </Button>
                      </Typography>
                    </CardContent>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
