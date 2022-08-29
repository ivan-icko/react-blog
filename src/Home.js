import BlogList from "./BlogList";
import { urlJobs } from "./endpoints";
import useFetch from "./useFetch";



const Home = () => {

    const {data:blogs, isPending,error} = useFetch(urlJobs);
  
  return (
    <div className="home">
        {error && <div>{error}</div>}
        {isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} title="All blogs"/>}
    </div>
  );
};

export default Home;
