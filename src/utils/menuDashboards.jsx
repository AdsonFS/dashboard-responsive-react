import { useEffect} from "react";
import { DashboardPage } from "../templates/dashboard-page";
import { User } from "./user";

export const MenuDashboard = () => {
  const [user, loading, finish] = User();


  useEffect(() => {
    if(!finish) return;
    console.log('finish PAGE: ', finish)
    console.log('TOKEN: ', user.token)
    console.log('DASHBOARD: ');
    console.log(user.dashboards[0].elementos);
  }, [finish, loading, user])
  
  return (
    <div>
      { finish ? <DashboardPage dashboard={user.dashboards[0]} /> : 'Carregando' }
    </div>

  );
}