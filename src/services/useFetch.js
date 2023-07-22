import { useState, useEffect, useRef } from "react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    async function init() {
      try {
        const response = await fetch(baseUrl + url);
        if (response.ok) {
          console.log("in response ok");
          const jsonResponse = await response.json();
          if (isMountedRef.current) setData(jsonResponse);
        } else {
          throw response;
        }
      } catch (e) {
        if (isMountedRef.current) setError(e);
      } finally {
        if (isMountedRef.current) setLoading(false);
      }
    }
    init();

    return () => {
      isMountedRef.current = false;
    };
  }, [url]);

  return { data, error, loading };
}

export function Fetch({ url, children }) {
  const { data, error, loading } = useFetch(url);
  return children(data, error, loading);
}
