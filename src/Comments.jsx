import React, { useState, useEffect } from "react";
import "./Comments.css";
import icone from "./Photos/icone.png";
import { GoHeart } from "react-icons/go";
import { FaRegComment } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FaTrash, FaArrowUp } from "react-icons/fa";

function Comments() {
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Maria",
      username: "maria123",
      body: "june saying she doesn't like her name being in the front... my girl..... I need to put on make up tomorrow so, maybe I’ll live tomorrow.I’ll meet with View. What do ViewJuners want me to do with View?",
      likes: 9,
      comments: [],
      timestamp: new Date(),
    },
    {
      id: 2,
      name: "John",
      username: "john_doe",
      body: "Just finished a 10k run! Feeling great!",
      likes: 23,
      comments: [],
      timestamp: new Date(),
    },
    {
      id: 3,
      name: "Ana",
      username: "ana_banana",
      body: "Adorei o novo episódio da série, foi incrível!",
      likes: 15,
      comments: [],
      timestamp: new Date(),
    },
    // ... outros comentários
  ]);

  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [likedComments, setLikedComments] = useState([]);
  const [expandedComments, setExpandedComments] = useState({});

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
      comments: [],
      timestamp: new Date(),
    };
    setComments([newCommentObj, ...comments]);
    setNewComment("");
    e.target.reset(); // Limpar o formulário
  };

  const handleNewReply = (e, commentId) => {
    e.preventDefault();
    const newReplyObj = {
      id: Date.now(),
      name: "User Name",
      username: currentUser,
      body: newReply,
      timestamp: new Date(),
    };
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, comments: [newReplyObj, ...comment.comments] }
          : comment
      )
    );
    setNewReply("");
    setReplyingTo(null);
    e.target.reset(); // Limpar o formulário de resposta
  };

  const handleDelete = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  const toggleExpand = (id) => {
    setExpandedComments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    if (replyingTo !== id) { // Apenas atualize replyingTo se não estiver respondendo ao mesmo comentário
      setReplyingTo(id);
    }
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
                  <FaTrash /> Excluir
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
                <span
                  style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                  onClick={() => toggleExpand(comment.id)}
                >
                  <FaRegComment color="#555" style={{ marginRight: "5px" }} />
                  <span style={{ color: "#555" }}>{comment.comments.length}</span>
                  <p style={{ paddingLeft: "4px" }}>comentários</p>
                </span>
              </div>
              <p>{formatDistanceToNow(new Date(comment.timestamp), { locale: ptBR, addSuffix: true })}</p>
            </div>
            {expandedComments[comment.id] && (
              <>
                <div className="comment-replies-header">
                  {replyingTo === comment.id && (
                    <form onSubmit={(e) => handleNewReply(e, comment.id)} className="reply-form">
                       <img className="avatar" src={icone} alt="Descrição da imagem" />
                      <input
                        type="text"
                        className="reply-input"
                        placeholder="Escreva um comentário..."
                        value={newReply}
                        onChange={(e) => setNewReply(e.target.value)}
                        required
                      />
                      <button type="submit" className="reply-button">Comentar</button>
                    </form>
                  )}
                  <span
                    style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                    onClick={() => toggleExpand(comment.id)}
                  >
                    <FaArrowUp color="#555" />
                  </span>
                </div>
                {comment.comments.length > 0 && (
                  <div className="replies-list">
                    {comment.comments.map((reply) => (
                      <div key={reply.id} className="reply">
                        <div className="reply-header">
                          <img className="avatar" src={icone} alt="Descrição da imagem" />
                          <div className="username-container">
                            <h4>{reply.name}</h4>
                            <span className="username">@{reply.username}</span>
                          </div>
                        </div>
                        <p className="reply-body">{reply.body}</p>
                        <p className="reply-timestamp">
                          {formatDistanceToNow(new Date(reply.timestamp), { locale: ptBR, addSuffix: true })}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;
