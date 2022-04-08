import { LiquidGauge } from "../../components/LiquidGauge";
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";

const ele = {
  deviceId: '111',
  title: 'ok',
  channel: 6,
  value: 11,
}

export const DashboardPage = ({ dashboard, token }) => {
  const [leituraDashboard, setLeituraDashboard] = useState(() => {
    const listaLeituraDashboard = dashboard.elementos.map(el => {
      return {
        deviceId: el.deviceId,
        title: el.display.titulo,
        channel: el.tipoCanal,
        value: 11,
      };
    })
    return listaLeituraDashboard;
  });
  console.log('Dash: ', dashboard);
  
  useEffect(() => {
    fetch('https://smiosapi.azurewebsites.net/api/atualizar-dashboard/0', {
      method: 'GET',
      headers: {
          'Authorization': 'Bearer ' + token 
      }
    })
    .then(response => response.json())
    .then(response => {
      setLeituraDashboard(listaLeituraDashboard => {
        return listaLeituraDashboard.map(el => {
          const elemento = {...el};
          const index = response.findIndex(x => x.deviceId === el.deviceId && x.channel === el.channel);
          elemento.value = response[index].value;
          return elemento;
        })
      })
      return 'ok';
    });
  }, [dashboard, token]);

  console.log('leitura: ', leituraDashboard)

  return (
    <div className="dashboard-page">
      
      <h1> { dashboard.titulo } </h1>

      <div className="container box-cards" >
        <div className="row justify-content-center teste"> 
          {leituraDashboard.map((el, i) => { return ( 
            <div className="card col-6 " key={i}>
                <h5 className="titulo">{ el.title }</h5>
                <div className="card-component">
                  <LiquidGauge value={ el.value }/> 
                </div>
            </div>
              
          )
          })}
          {

          }
        </div>
      </div>
    </div>
  );
}
  /*
  useEffect(() => {
    const _token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkFQSSBSZWFjdCIsIm5hbWVpZCI6IjYyNGYyYzZiODk2YTljYmFhYmY2YjY3YyIsIlVzZXJJZCI6IjYyNGYyYzZiODk2YTljYmFhYmY2YjY3YyIsIlVzZXJOYW1lIjoiQVBJIFJlYWN0IiwiVXNlckVtYWlsIjoiYXBpLnJlYWN0QHNtaW9zLmNvbSIsIm5iZiI6MTY0OTM4NTI3OCwiZXhwIjoxNjQ5NTU4MDc4LCJpYXQiOjE2NDkzODUyNzh9.al1QBJytUmDHad9JElwDu7p3VtWKe_vh1bpT2dYzcds";
    fetch('https://localhost:5001/api/atualizar-dashboard/0', {
      method: 'GET',
      headers: {
          'Authorization': 'Bearer ' + _token 
      }
    })
    .then(response => response.json())
    .then(response => setEstadoDashboard([...response])
    );
  }, [])
  */
