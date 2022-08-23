import {useState} from 'react';


const Home = () => {

    //let name = 'Mario';
    const [name,setName] = useState('Mario');
    const [age,setAge] = useState(25);


    const handleClick = ()=>{
        setName('icko');
        setAge(30);
    }
    const handleClickAgain = (name,e)=>{
        console.log('hello'+name,e.target);
    }

    return ( 
        <div className="home">
            <h2>Homepage</h2>
            <p>{name} and {age}</p>
            <button onClick={handleClick}>Click me</button>
            <button onClick={(e)=>{handleClickAgain('icko',e)}}>Click me again</button>
        </div>
     ); 
}
 
export default Home;