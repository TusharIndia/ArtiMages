import React from "react";
import Searchbar from "./SearchBar";
import Posts from "./Posts";
import { useState,useEffect } from "react";

const Home = () => {
  const [images, setImages] = useState([]);
  const [filteredPics, setfilteredPics] = useState([]);
  const [search, setsearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/api/posts/GetAllPosts', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setImages(data);
    };

    fetchData();
  }, []); 

  useEffect(() => {
    if(!search){
      setfilteredPics(images)
    }
    const SearchfilteredPics = images.filter((images) =>{
      const promptMatch = images?.prompt?.toLowerCase().includes(search);
      const authorMatch = images?.author?.toLowerCase().includes(search);
    
      return promptMatch || authorMatch;
    });

    if(search){
      setfilteredPics(SearchfilteredPics);
    }
  }, [images, search]);
  

  return (
    <>
      <div className="flex flex-col items-center pt-5 space-y-3 pb-10">
        <div className="flex items-center flex-col mb-10">
          <p className="font-extrabold text-3xl lg:text-4xl">
            Explore popular posts in the Community!
          </p>
          <p className="font-extrabold text-xl lg:text-2xl text-violet-400">
            - Generated with AI -
          </p>
        </div>
        <Searchbar search={search} setsearch={setsearch}/>
      </div>
      <Posts images = {filteredPics}></Posts>
    </>
  );
};

export default Home;
