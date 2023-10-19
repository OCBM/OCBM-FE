import { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks';
import NoPlants from './NoPlants';
import { PLANT_SERVICES } from '@/services/plantServices';

function Plant() {
  const loggedUser = useAppSelector((state) => state.auth?.user);
  const [plantData, setPlantData] = useState([]);

  const fetchPlantsbyUserId = async () => {
    if (loggedUser) {
      const res = await PLANT_SERVICES.getAllPlantsbyUserid(loggedUser.userId);
      setPlantData(res?.message);
    }
  };
  useEffect(() => {
    fetchPlantsbyUserId();
  }, []);
  return <>{plantData ? <div>Plants available</div> : <NoPlants />}</>;
}
export { Plant };
