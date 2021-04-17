import {useState} from 'react';
import {useHistory} from 'react-router-dom';
const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('Lekan');
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();


  const formSubmit = (e) => {
    e.preventDefault();
    const blog = {title, body, author}
    setIsPending(true)
    fetch('http://localhost:8000/blogs', {
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(blog)
    }).then(() => {
      setIsPending(false);
      history.push('/');
    })
  }
  return ( 
    <div className="create">
      <h2>Add a new blog</h2>
      <form onSubmit={formSubmit}>
        <label>Blog title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog author:</label>
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="Lekan">Lekan</option>
          <option value="Kean">Kean</option>
        </select>
        {!isPending && <button>Add Blog</button>}
        {isPending && <button>Adding Blog...</button>}
      </form>
    </div>
   );
}
 
export default Create;