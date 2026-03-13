import { useParams } from "react-router-dom";

function Edit(){

 const {id} = useParams();

 return(

  <div>

   <h1>Edit Page</h1>

   <p>ID : {id}</p>

  </div>

 )

}

export default Edit