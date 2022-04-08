import { useEffect, useRef, useState } from 'react';

const isObjectEqual = (objA, objB) => {
  return JSON.stringify(objA) === JSON.stringify(objB);
};

export const useFetch = (url, options, active = false) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const urlRef = useRef(url);
  const activeRef = useRef(active);
  const optionsRef = useRef(options);

  
  useEffect(() => {
    if(!active) return;
    let changed = false;

    if (!isObjectEqual(url, urlRef.current)) {
      urlRef.current = url;
      changed = true;
    }

    if (!isObjectEqual(options, optionsRef.current)) {
      optionsRef.current = options;
      changed = true;
    }
    
    if (!isObjectEqual(active, activeRef.current)) {
      activeRef.current = active;
      changed = true;
    }

    if (changed) {
      setShouldLoad((s) => !s);
    }
  }, [url, options, active]);
  
  
  useEffect(() => {
    if(!activeRef.current) return;

    console.log('Pesquisando',);

    let wait = false;
    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);

    const fetchData = async () => {
      await new Promise((r) => setTimeout(r, 1000));

      try {
        const response = await fetch(urlRef.current, { signal, ...optionsRef.current });
        const jsonResult = await response.json();

        if (!wait && activeRef.current) {
          setResult(jsonResult);
          setLoading(false);
        }
      } catch (e) {
        if (!wait && activeRef.current) {
          setLoading(false);
        }
        console.log('MY ERROR:', e.message);
      }
    };

    fetchData();

    return () => {
      wait = true;
      controller.abort();
    };
  }, [shouldLoad]);
  return [result, loading];
};