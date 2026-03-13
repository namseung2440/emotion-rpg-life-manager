import { createContext, useReducer, useEffect } from "react";

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function reducer(state, action) {

  switch(action.type){

    case "CREATE":
      return [action.data, ...state];

    case "DELETE":
      return state.filter((item)=>item.id !== action.targetId);

    default:
      return state;

  }

}

export function DiaryProvider({children}){

  const [data, dispatch] = useReducer(
    reducer,
    [],
    () => JSON.parse(localStorage.getItem("diary") || "[]")
  );

  useEffect(()=>{
    localStorage.setItem("diary", JSON.stringify(data));
  },[data]);

  return(

    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={dispatch}>
        {children}
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>

  )

}