import { LiquidGauge } from "../../components/LiquidGauge";
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const DashboardPage = ({ dashboard }) => {


  return (
    <div className="dashboard-page">
      
      <h1> { dashboard.titulo } </h1>

      <div className="container box-cards" >
        <div className="row justify-content-center teste"> 
          {dashboard.elementos.map((el, i) => { return ( 
            <div className="card col-6" key={i}>
                <h5 className="titulo">{ el.display.titulo }</h5>
                <div className="card-component">
                  <LiquidGauge value={ 10.0 }/> 
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
