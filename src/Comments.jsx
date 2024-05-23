import React, { useState, useEffect } from "react";
import "./Comments.css";
import icone from "./Photos/icone.png";
import { GoHeart } from "react-icons/go";
import { FaRegComment } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FaTrash } from "react-icons/fa6";

function Comments() {
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Maria",
      username: "maria123",
      body: "june saying she doesn't like her name being in the front... my girl..... I need to put on make up tomorrow so, maybe I’ll live tomorrow.I’ll meet with View. What do ViewJuners want me to do with View?",
      likes: 9,
      comments: 0,
      timestamp: new Date(),
    },
    {
      id: 2,
      name: "John",
      username: "john_doe",
      body: "Just finished a 10k run! Feeling great!",
      likes: 23,
      comments: 2,
      timestamp: new Date(),
    },
    {
      id: 3,
      name: "Ana",
      username: "ana_banana",
      body: "Adorei o novo episódio da série, foi incrível!",
      likes: 15,
      comments: 3,
      timestamp: new Date(),
    },
    {
      id: 4,
      name: "Lucas",
      username: "lucas123",
      body: "Today was a productive day at work.",
      likes: 5,
      comments: 1,
      timestamp: new Date(),
    },
    {
      id: 5,
      name: "Carla",
      username: "carla87",
      body: "Vou viajar no fim de semana, não vejo a hora!",
      likes: 12,
      comments: 0,
      timestamp: new Date(),
    },
    {
      id: 6,
      name: "David",
      username: "david_king",
      body: "Just read an amazing book about space exploration.",
      likes: 18,
      comments: 4,
      timestamp: new Date(),
    },
    {
      id: 7,
      name: "Julia",
      username: "julia_rose",
      body: "A comida no novo restaurante é deliciosa!",
      likes: 22,
      comments: 5,
      timestamp: new Date(),
    },
    {
      id: 8,
      name: "Pedro",
      username: "pedro_lima",
      body: "Estou treinando para a maratona do próximo mês.",
      likes: 7,
      comments: 0,
      timestamp: new Date(),
    },
    {
      id: 9,
      name: "Sophie",
      username: "sophie_smiles",
      body: "Had a wonderful day at the beach!",
      likes: 14,
      comments: 2,
      timestamp: new Date(),
    },
    {
      id: 10,
      name: "Roberto",
      username: "roberto_guitar",
      body: "Comprei uma guitarra nova, mal posso esperar para tocar!",
      likes: 20,
      comments: 3,
      timestamp: new Date(),
    },
    {
      id: 11,
      name: "Isabel",
      username: "isabel_art",
      body: "Acabei de terminar uma nova pintura.",
      likes: 25,
      comments: 6,
      timestamp: new Date(),
    },
  ]);
  
  const [newComment, setNewComment] = useState("");
  const [likedComments, setLikedComments] = useState([]);
 
  const currentUser = "currentUser";

  useEffect(() => {
    const interval = setInterval(() => {
      setComments((comments) => [...comments]);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleLike = (id) => {
    if (likedComments.includes(id)) {
      setLikedComments(likedComments.filter((commentId) => commentId !== id));
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === id ? { ...comment, likes: comment.likes - 1 } : comment
        )
      );
    } else {
      setLikedComments([...likedComments, id]);
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
        )
      );
    }
  };

  const handleNewComment = (e) => {
    e.preventDefault();
    const newCommentObj = {
      id: comments.length + 1,
      name: "User Name",
      username: currentUser,
      body: newComment,
      likes: 0,
      comments: 0,
      timestamp: new Date(),
    };
    setComments([newCommentObj, ...comments]);
    setNewComment("");
  };

  const handleDelete = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  return (
    <div className="comments-section">
      <div className="comment-post">
        <form onSubmit={handleNewComment} className="new-comment-form">
          <div className="comment-header">
            <img className="avatar" src={icone} alt="Descrição da imagem" />
            <input
              type="text"
              className="new-comment-input"
              placeholder="Escreva algum tópico..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            />
            <button type="submit" className="new-comment-button">
              Postar
            </button>
          </div>
        </form>
      </div>
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="comment-header">
              <img className="avatar" src={icone} alt="Descrição da imagem" />
              <div className="username-container">
                <h4>{comment.name}</h4>
                <span className="username">@{comment.username}</span>
              </div>
              {comment.username === currentUser && (
                <button onClick={() => handleDelete(comment.id)} className="delete-button">
                 <FaTrash /> 
                </button>
              )}
            </div>
            <p className="comment-body">{comment.body}</p>
            <div className="bottom-comments">
              <div className="comment-actions">
                <span onClick={() => handleLike(comment.id)} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
                  <GoHeart color={likedComments.includes(comment.id) ? "red" : "#555"} style={{ marginRight: "5px" }} />
                  <span style={{ color: "#555" }}>{comment.likes}</span>
                </span>
                <span style={{ display: "flex", alignItems: "center" }}>
                  <FaRegComment color="#555" style={{ marginRight: "5px" }} />
                  <span style={{ color: "#555" }}>{comment.comments}</span>
                  <p style={{ paddingLeft: "4px" }}>comentários</p>
                </span>
              </div>
              <p>{formatDistanceToNow(new Date(comment.timestamp), { locale: ptBR, addSuffix: true })}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;