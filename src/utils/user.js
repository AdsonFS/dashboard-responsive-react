import { useEffect, useState } from "react";
import { useFetch } from "../custom-hooks/useFetch";

export const User = (flag) => {
  const [finish, setFinish] = useState(false);
  const [token, setToken] = useState(null);
  const [dashboards, setDashboards] = useState(null);
  const [active, setActive] = useState(false);
  const [result, loading] = useFetch(
    'https://localhost:5001/api/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify({
      "email": "api.react@smios.com",
      "password": "react"
    })
  }, active);
  useEffect(() => setActive(true), []);
  
  useEffect(() => {
    if(!result) return;
    setToken(result.token);
    setDashboards(result.dashboards);
    setFinish(true);
  }, [result]);

  
    
  // const getToken = () => result?.token;

  return [{
    token,
    dashboards
  }, loading, finish];
}