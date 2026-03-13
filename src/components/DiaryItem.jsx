import { motion } from "framer-motion";

function DiaryItem({item,onDelete}){

 return(

  <motion.div
   className="diary-item"
   initial={{opacity:0,y:20}}
   animate={{opacity:1,y:0}}
   exit={{opacity:0}}
  >

   <div>

    <p>{item.emotion} {item.content}</p>

    <small>{item.date}</small>

   </div>

   <button
    className="delete"
    onClick={()=>onDelete(item.id)}
   >
    삭제
   </button>

  </motion.div>

 )

}

export default DiaryItem;