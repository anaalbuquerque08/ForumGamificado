import React, { useState, useEffect } from "react";
import "./Comments.css";
import icone from "./Photos/icone.png";
import { GoHeart } from "react-icons/go";
import { FaRegComment } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FaTrash, FaArrowUp } from "react-icons/fa";
import useAuth from "./useAuth";

function Comments() {
  const { user } = useAuth();
  const currentUser = user?.username;

  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Maria",
      username: "maria123",
      body: "june saying she doesn't like her name being in the front... my girl..... I need to put on make up tomorrow so, maybe I’ll live tomorrow.I’ll meet with View. What do ViewJuners want me to do with View?",
      likes: 9,
      comments: [],
      timestamp: new Date(),
      avatar: "https://picsum.photos/seed/maria123/50", // Avatar aleatório
    },
    {
      id: 2,
      name: "John",
      username: "john_doe",
      body: "Just finished a 10k run! Feeling great!",
      likes: 23,
      comments: [],
      timestamp: new Date(),
      avatar: "https://picsum.photos/seed/john_doe/50", // Avatar aleatório
    },
    {
      id: 3,
      name: "Ana",
      username: "ana_banana",
      body: "Adorei o novo episódio da série, foi incrível!",
      likes: 15,
      comments: [],
      timestamp: new Date(),
      avatar: "https://picsum.photos/seed/ana_banana/50", // Avatar aleatório
    },
    {
      id: 4,
      name: "Carlos",
      username: "carlos2020",
      body: "Estou aprendendo React e estou amando!",
      likes: 18,
      comments: [],
      timestamp: new Date(),
      avatar: "https://picsum.photos/seed/carlos2020/50", // Avatar aleatório
    },
    {
      id: 5,
      name: "Sofia",
      username: "sofia123",
      body: "Hoje o dia está lindo, aproveitem!",
      likes: 7,
      comments: [],
      timestamp: new Date(),
      avatar: "https://picsum.photos/seed/sofia123/50", // Avatar aleatório
    },
    {
      id: 6,
      name: "Lucas",
      username: "lucas_skywalker",
      body: "Alguém aí joga xadrez? Vamos marcar uma partida.",
      likes: 10,
      comments: [],
      timestamp: new Date(),
      avatar: "https://picsum.photos/seed/lucas_skywalker/50", // Avatar aleatório
    },
    {
      id: 7,
      name: "Beatriz",
      username: "bea_88",
      body: "Viagem marcada para o fim de semana! Ansiosa!",
      likes: 12,
      comments: [],
      timestamp: new Date(),
      avatar: "https://picsum.photos/seed/bea_88/50", // Avatar aleatório
    },
    {
      id: 8,
      name: "Pedro",
      username: "pedro_tech",
      body: "Acabei de assistir um documentário muito interessante sobre inteligência artificial.",
      likes: 19,
      comments: [],
      timestamp: new Date(),
      avatar: "https://picsum.photos/seed/pedro_tech/50", // Avatar aleatório
    },
    {
      id: 9,
      name: "Laura",
      username: "laura_martins",
      body: "Comecei a praticar yoga e estou adorando!",
      likes: 11,
      comments: [],
      timestamp: new Date(),
      avatar: "https://picsum.photos/seed/laura_martins/50", // Avatar aleatório
    },
    {
      id: 10,
      name: "Bruno",
      username: "bruno_xyz",
      body: "Finalmente terminei aquele livro que estava lendo há meses.",
      likes: 14,
      comments: [],
      timestamp: new Date(),
      avatar: "https://picsum.photos/seed/bruno_xyz/50", // Avatar aleatório
    },
    {
      id: 11,
      name: "Camila",
      username: "camila_love",
      body: "Aproveitei o dia para fazer uma caminhada no parque.",
      likes: 8,
      comments: [],
      timestamp: new Date(),
      avatar: "https://picsum.photos/seed/camila_love/50", // Avatar aleatório
    },
    {
      id: 12,
      name: "Thiago",
      username: "thiago_ventura",
      body: "Participei de um workshop incrível sobre fotografia.",
      likes: 21,
      comments: [],
      timestamp: new Date(),
      avatar: "https://picsum.photos/seed/thiago_ventura/50", // Avatar aleatório
    },
    {
      id: 13,
      name: "Fernanda",
      username: "fernanda_oliveira",
      body: "Ontem à noite assisti a um filme muito bom, recomendo!",
      likes: 16,
      comments: [],
      timestamp: new Date(),
      avatar: "https://picsum.photos/seed/fernanda_oliveira/50", // Avatar aleatório
    },
    {
      id: 14,
      name: "Ricardo",
      username: "ricardo_silva",
      body: "Treinamento intenso na academia hoje, me sinto revigorado!",
      likes: 20,
      comments: [],
      timestamp: new Date(),
      avatar: "https://picsum.photos/seed/ricardo_silva/50", // Avatar aleatório
    },
    {
      id: 15,
      name: "Juliana",
      username: "juliana_santos",
      body: "Experimentei uma nova receita de bolo e ficou uma delícia!",
      likes: 13,
      comments: [],
      timestamp: new Date(),
      avatar: "https://picsum.photos/seed/juliana_santos/50", // Avatar aleatório
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [likedComments, setLikedComments] = useState([]);
  const [expandedComments, setExpandedComments] = useState({});

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
    if (!user) {
      alert("Você precisa estar logado para comentar.");
      return;
    }
    const newCommentObj = {
      id: comments.length + 1,
      name: user.nome,
      username: user.username,
      body: newComment,
      likes: 0,
      comments: [],
      avatar: icone, // Use the original icon for the current user
      timestamp: new Date(),
    };
    setComments([newCommentObj, ...comments]);
    setNewComment("");
    e.target.reset();
  };

  const handleNewReply = (e, commentId) => {
    e.preventDefault();
    if (!user) {
      alert("Você precisa estar logado para responder.");
      return;
    }
    const newReplyObj = {
      id: Date.now(),
      name: user.nome,
      username: user.username,
      body: newReply,
      avatar: icone, // Use the original icon for the current user
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
    e.target.reset();
  };

  const handleDelete = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
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
        {comments.map((comment) => (
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
                <div className="comment-replies">
                  {comment.comments.map((reply) => (
                    <div key={reply.id} className="reply">
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
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;