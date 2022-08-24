import { useState,useEffect } from "react";
import BlogList from "./BlogList";

const Home = () => {
  const [blogs, setBlogs] = useState([
    {
      title: "My new websige 1",
      body: "lorem ipsum...",
      author: "mario",
      id: 1,
    },
    {
      title: "My new websige 2",
      body: "lorem ipsum...",
      author: "icko",
      id: 2,
    },
    {
      title: "My new websige 3",
      body: "lorem ipsum...",
      author: "mario",
      id: 3,
    },
  ]);

  const handleDelete = (id) => {
    const newBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(newBlogs);
  };

  const [name,setName] = useState('mario');

  useEffect(()=>{
        console.log('Use effect run');
        console.log({name});
  },[name]);

  return (
    <div className="home">
      <BlogList blogs={blogs} title="All blogs" handleDelete={handleDelete} />
      <button onClick={()=>{setName('luigi')}}>Change name</button>
        <p>{name}</p>
    </div>
  );
};

export default Home;
