import { useState } from "react";

const Create = () => {

    const[title,setTitle] = useState('');
    const[body,setBody] = useState('');
    const[author, setAuthor] = useState('mario');



  return (
    <div className="create">
      <h2>Add a new blog</h2>
      <form>
        <label>Blog title: </label>
        <input type="text" required value={title} onChange={(e)=>setTitle(e.target.value)}/>
        <label>Blog body: </label>
        <textarea required value={body} onChange={(e)=>setBody(e.target.value)}/>
        <label>Blog author: </label>
        <select value={author} onChange={(e)=>setAuthor(e.target.value)}>
            <option value='mario' >Mario</option>
            <option value='joshi'>Joshi</option>
        </select>

        <p>{title}</p>
        <p>{author}</p>

      </form>
    </div>
  );
};

export default Create;
