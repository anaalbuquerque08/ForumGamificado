import React, { createContext, useState } from "react";

const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(100);
  const [likes, setLikes] = useState(0);
  const [posts, setPosts] = useState(0);
  const [likedComments, setLikedComments] = useState([]);  
  const incrementLikes = (commentId) => {
    if (!likedComments.includes(commentId)) {
      setLikedComments([...likedComments, commentId]);
      setLikes(likes + 1);
      setScore(score + 1);
    }
  };

  const decrementLikes = (commentId) => {
    if (likedComments.includes(commentId)) {
      setLikedComments(likedComments.filter((id) => id !== commentId));
      setLikes(likes - 1);
      setScore(score - 1);
    }
  };

  const incrementPosts = () => {
    setPosts(posts + 1);
    setScore(score + 2);
  };

  return (
    <ScoreContext.Provider
      value={{ score, likes, posts, incrementLikes, decrementLikes, incrementPosts }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

export default ScoreContext;
