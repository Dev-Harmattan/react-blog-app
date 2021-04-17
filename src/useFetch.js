import {useState, useEffect} from 'react';
const useFetch = (url) => {
  const abortCont = new AbortController();

  const [data, setDatas] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch(url, {signal: abortCont.signal})
      .then(res => {
        if(!res.ok){
          throw Error('Could not reach the server endpoint...');
        }
        return res.json()
      })
      .then(data => {
        setDatas(data);
        setIsPending(false);
        setError(null);
      })
      .catch(err => {
        if(err.name !== 'AbortError'){
          setIsPending(false);
          setError(err.message);
        }
      })
    },1000);
    return () => abortCont.abort();
  },[url]);

  return {data, isPending, error}
}

export default useFetch;