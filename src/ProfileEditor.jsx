import React, { useState } from "react"; 
import AvatarEditor from "react-avatar-editor";

function ProfileEditor() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode fazer o que quiser com a imagem, nome e username, como enviar para o servidor
    console.log("Nome:", name);
    console.log("Username:", username);
    console.log("Imagem:", image);
  };

  return (
    <div>
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="image">Foto de Perfil:</label>
          <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
          {image && (
            <AvatarEditor
              image={image}
              width={150}
              height={150}
              border={10}
              borderRadius={75}
              color={[255, 255, 255, 0.6]} // RGBA
              scale={1.2}
            />
          )}
        </div>
        <div>
          <label htmlFor="name">Nome:</label>
          <input type="text" id="name" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange} />
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default ProfileEditor;
