import React, { useState, useEffect } from "react";
import "./Comments.css";
import icone from "./Photos/icone.png";
import { GoHeart } from "react-icons/go";
import { FaRegComment, FaTrash, FaArrowUp } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import useAuth from "./useAuth";

function Comments() {
  const { user } = useAuth();
  const currentUser = user?.username;

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [likedComments, setLikedComments] = useState([]);
  const [expandedComments, setExpandedComments] = useState({});
  const baseUrl = "https://forumgamificado-a367c-default-rtdb.asia-southeast1.firebasedatabase.app/";

  useEffect(() => {
    fetch(`${baseUrl}/comments.json`)
      .then((response) => response.json())
      .then((data) => {
        const commentsData = Object.entries(data || {}).map(([key, value]) => ({
          id: key,
          ...value,
          timestamp: new Date(value.timestamp),
        }));
        setComments(commentsData);
      })
      .catch((error) => console.error("Error fetching comments:", error));
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
    if (!user) {
      alert("Você precisa estar logado para comentar.");
      return;
    }
    const newCommentObj = {
      name: user.nome,
      username: user.username,
      body: newComment,
      likes: 0,
      comments: [],
      avatar: icone,
      timestamp: new Date(),
    };
    fetch(`${baseUrl}/comments.json`, {
      method: "POST",
      body: JSON.stringify(newCommentObj),
    })
      .then((response) => response.json())
      .then((data) => {
        const newCommentWithId = { ...newCommentObj, id: data.name };
        setComments([newCommentWithId, ...comments]);
        setNewComment("");
      })
      .catch((error) => console.error("Error posting comment:", error));
  };

  const handleNewReply = (e, commentId) => {
    e.preventDefault();
    if (!user) {
      alert("Você precisa estar logado para responder.");
      return;
    }
    const newReplyObj = {
      name: user.nome,
      username: user.username,
      body: newReply,
      avatar: icone,
      timestamp: new Date(),
    };
    const updatedComments = comments.map((comment) =>
      comment.id === commentId
        ? { ...comment, comments: [newReplyObj, ...comment.comments || []] }
        : comment
    );
    setComments(updatedComments);
    setNewReply("");
    setReplyingTo(null);
  };

  const handleDelete = (id) => {
    fetch(`${baseUrl}/comments/${id}.json`, {
      method: "DELETE",
    })
      .then(() => {
        setComments(comments.filter((comment) => comment.id !== id));
      })
      .catch((error) => console.error("Error deleting comment:", error));
  };

  const toggleExpand = (id) => {
    setExpandedComments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    if (replyingTo !== id) {
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
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="comment-header">
                <img className="avatar" src={comment.avatar} alt="Descrição da imagem" />
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
                    <span style={{ color: "#555" }}>{comment.comments ? comment.comments.length : 0}</span>
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
                  <div className="comment-replies">
                    {comment.comments && comment.comments.length > 0 ? (
                      comment.comments.map((reply, index) => (
                        <div key={index} className="reply">
                          <div className="comment-header">
                            <img className="avatar" src={reply.avatar} alt="Descrição da imagem" />
                            <div className="username-container">
                              <h4>{reply.name}</h4>
                              <span className="username">@{reply.username}</span>
                            </div>
                          </div>
                          <p className="comment-body">{reply.body}</p>
                          <p className="timestamp">
                            {formatDistanceToNow(new Date(reply.timestamp), { locale: ptBR, addSuffix: true })}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p>Sem respostas disponíveis.</p>
                    )}
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p>Sem comentários disponíveis.</p>
        )}
      </div>
    </div>
  );
}

export default Comments;
 