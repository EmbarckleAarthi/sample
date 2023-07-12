import React,{useState,useEffect} from "react";
import Axios from "axios";
import { Card, CardContent, Typography } from '@mui/material';
import './App.css';

function App() {

  const[list, setList] = useState([]);
  const[page, setPage] = useState(1);

  useEffect(()=>{
    Axios.get('https://gist.githubusercontent.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4/raw/523c324c7fcc36efab8224f9ebb7556c09b69a14/Film.JSON')
    .then(response=>setList(response.data))
  },[])

  const selectPageHandler = (selectedPage) => {
    if(
      selectedPage >=1 &&
      selectedPage <= list.length / 4 &&
      selectedPage !== page
    )
    setPage(selectedPage)
  }

  

  
  return (

    <div className="card-container">
    {
    list.slice(page * 10 - 10, page * 10).map(movie=>(

      <Card key={movie.Title} className="movie-card"
      style={{
          width: 250,height: 350,
          backgroundColor: "black",
          margin: "0.5rem",
          }}
      >

      
        <CardContent className="card-content">
          <Typography variant="h5" className="additional-text">
            {movie.Title}
          </Typography>

          <Typography variant="body2" className="additional-text">
          {movie.Rated}
          </Typography>

        <Typography variant="body2">
         {movie.Images && <img src={movie.Images} alt={movie.Title} className="movie-image"/>}
        </Typography>

         
      </CardContent>
     
      </Card>
    )
   
    )}
 
    {      
       list.length > 0 && <div className="pagination">
        <span  onClick= {() => selectPageHandler(page - 1)}>  previous </span>

        {[...Array(list.length / 8)].map((_,i) => {
            return <span 
           
            onClick= {() => selectPageHandler(i+ 1)}key={i}>
              { i+ 1}</span>

          })}
       
        <span  onClick= {() => selectPageHandler(page+ 1)}> Next </span>
       </div>
      
    }
  </div>

 );
 
 
}

export default App;
