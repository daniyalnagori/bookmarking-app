import React from "react"
import { useQuery,useMutation } from "@apollo/client";
import gql from "graphql-tag";

const BookMarksQuery = gql`{
  bookmark{
    id
    url
    desc
  }
}`

const AddBookMarkMutation = gql`
  mutation addBookmark($url: String!, $desc: String!){
    addBookmark(url: $url, desc: $desc){
     url 
    }
}
`

export default function Home() {
 const {loading,error,data} = useQuery(BookMarksQuery)
 const [addBookmark] = useMutation(AddBookMarkMutation)
 let textfield;
 let desc;
 const addBookmarkSubmit = () => {
  addBookmark({
    variables: {
      url: textfield.value,
      desc: desc.value
    },
    refetchQueries: [{query:BookMarksQuery}],
  })
   console.log('textfield',textfield.value)
   console.log('Desc',desc.value)
 }
  return (
    <div>
  <p>{JSON.stringify(data)}</p>
  <div>
     <input type="text" placeholder="URL" ref={node => textfield=node}/>
     <input type="text" placeholder="Description" ref={node => desc=node}/>
     <button onClick={addBookmarkSubmit}>Add BookMark</button>
  </div>
    </div>

  )
  
}
