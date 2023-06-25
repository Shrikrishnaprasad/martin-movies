import * as React from "react";
import Container from "@mui/material/Container";
import MainFeaturedPost from "./MainFeaturedPost";

const mainFeaturedPost = {
  title: "Movies",
  description: "",
  image:
    "https://images.unsplash.com/photo-1574894078563-01e879b89809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80",
  imageText: "main image description",
  linkTex1: "HOME",
  linkTex2: "MOVIES"
};

export default function Blog() {
  return (
    <Container maxWidth="xl">
      <main>
        <MainFeaturedPost post={mainFeaturedPost} />
      </main>
    </Container>
  );
}
