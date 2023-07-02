import React, { useEffect, useState } from "react";

export const Context = React.createContext();

const Provider = (props) => {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTBkZDFmNmEzNDgxNzJjNWNiOTU0Y2I1ZDIxMTBhZiIsInN1YiI6IjYwZTlhMmZjYjdkMzUyMDA1ZTIyMjdmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tP1f7YE_aPpTh6RAVKYWLLPTrWhXbCbMYDMUAkoX-4Y"
  );
  myHeaders.append("accept", "application/json");
  myHeaders.append("content-type", "application/json");
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const [watchedList, setWatchedList] = useState({});
  const [loading, setLoading] = useState(false);
  const [isList, setIsList] = useState(false);
  const [filterYear, setFilterYear] = useState("");
  const [yearMovieList, setYearMovieList] = useState([]);
  const [filterMode, setFilterMode] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [filterLanguage, setFilterLanguage] = useState("All");
  const [keyWord, setKeyWord] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [allList, setAllList] = useState([]);
  const [addWatched, setAddWatched] = useState(null);
  const [languageList, setLanguageList] = useState([]);
  const [isAlert, setIsAlert] = useState(false);
  const getByYear = () => {
    setLoading(true);
    fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&year=" +
        filterYear,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setYearMovieList(JSON.parse(result));
        setLoading(false);
      })
      .catch((error) => console.log("error", error));
  };
  const getByLanguage = () => {
    setLoading(true);
    fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&page=1&primary_release_year=2023&sort_by=primary_release_date.desc&with_original_language=ta",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setLanguageList(JSON.parse(result));
        setLoading(false);
      })
      .catch((error) => console.log("error", error));
  };
  const getByKeyWord = (data) => {
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${data}&include_adult=false&language=en-US&page=1`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setSearchList(JSON.parse(result));
        setLoading(false);
      })
      .catch((error) => console.log("error", error));
  };
  const getAllList = () => {
    setLoading(true);
    fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setAllList(JSON.parse(result));
        setLoading(false);
      })
      .catch((error) => console.log("error", error));
  };
  const getWatched = () => {
    setLoading(true);
    fetch(
      "https://api.themoviedb.org/3/account/10722831/watchlist/movies?language=en-US&page=1&sort_by=created_at.desc",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setWatchedList(JSON.parse(result));
        setLoading(false);
      })
      .catch((error) => console.log("error", error));
  };
  const addToWatchList = (id) => {
    setLoading(true);
    let url = "https://api.themoviedb.org/3/account/10722831/watchlist";
    const payload = {
      media_type: "movie",
      media_id: id,
      watchlist: true,
    };

    fetch(url, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: "follow",
    })
      .then((response) => response.text())
      .then((result) => {
        setIsAlert(true);
        setAddWatched(null);
        getWatched();
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    getWatched();
    getAllList();
  }, []);
  useEffect(() => {
    if (filterYear !== "" && filterMode === "Year") {
      getByYear();
      setFilterType("");
      setKeyWord("");
    }
  }, [filterYear, filterMode]);
  useEffect(() => {
    if (filterLanguage === "Tamil" && filterMode === "Lang") {
      getByLanguage();
      setFilterType("");
      setKeyWord("");
    }
  }, [filterLanguage, filterMode]);
  useEffect(() => {
    if (keyWord !== "" && filterMode === "Search") {
      setTimeout(() => {
        getByKeyWord(keyWord);
      }, 1500);
      setFilterType("");
      setFilterYear("");
    }
  }, [keyWord, filterMode]);
  useEffect(() => {
    if (
      addWatched &&
      !watchedList?.results?.filter((e) => e.id === addWatched).length
    ) {
      addToWatchList(addWatched);
    }
  }, [addWatched]);
  useEffect(() => {
    if (filterMode === "All") setFilterLanguage("All");
    else setFilterLanguage("");
  }, [filterMode]);
  return (
    <Context.Provider
      value={{
        loading,
        watchedList,
        isList,
        setIsList,
        filterYear,
        setFilterYear,
        yearMovieList,
        getByYear,
        filterMode,
        setFilterMode,
        keyWord,
        setKeyWord,
        searchList,
        setSearchList,
        allList,
        setAllList,
        filterType,
        setFilterType,
        setAddWatched,
        isAlert,
        setIsAlert,
        filterLanguage,
        setFilterLanguage,
        languageList,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
