import React, { useState, useEffect } from 'react';
import axios from 'axios';

//import InfiniteScroll from 'react-infinite-scroll-component';
import { Waypoint } from 'react-waypoint';
import './pagination.css';

const Pagination = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(20);
  const [hasNext, setHasNext] = useState(true);
  // Fetching data from API

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    const fetchPosts = async () => {
      if (!hasNext) return;
      const res = await axios.get(
        `https://api.instantwebtools.net/v1/passenger?page=${currentPage}&size=${postsPerPage}`
      );

      if (res.data) {
        if (res.data.totalPassengers === posts.length + res.data.data.length) {
          setHasNext(false);
        }
        setPosts(posts => [...posts, ...res.data.data]);

        setCurrentPage(currentPage => currentPage + 1);
      }
    };
    fetchPosts();
    //window.addEventListener('scroll', handleScroll);
  };
  // console.log(posts);
  const loadMoreData = () => {
    if (currentPage > 0) {
      getData();
    }
  };
  return (
    <div>
      <ul className="listBox">
        {posts.map(post => (
          <li key={post._id} className="detailGroup">
            <div>
              <p>Name : {post.name}</p>
              <p>Trips :{post.trips}</p>
              <p>Airplane :{post.airline.name}</p>
              <p>Airline-Country:{post.airline.country}</p>
            </div>
          </li>
        ))}
      </ul>
      {hasNext && (
        <Waypoint onEnter={loadMoreData}>
          <h3>Loading..</h3>
        </Waypoint>
      )}
    </div>
  );
};
export default Pagination;
