import { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks';
import NoPlants from './NoPlants';
import classNames from 'classnames';
import { PLANT_SERVICES } from '@/services/plantServices';
import PlantCard from './PlantCard';

function Plant() {
  const loggedUser = useAppSelector((state) => state.auth?.user);
  const [plantData, setPlantData] = useState([]);
  const [city, setCity] = useState<any>('');

  const fetchPlantsbyUserId = async () => {
    if (loggedUser) {
      const res = await PLANT_SERVICES.getAllPlantsbyUserid(loggedUser.userId);
      setPlantData(res?.message);
    }
  };
  const no_plant_container = classNames(
    `w-full h-[76%] container mx-auto font-GothamMedium text-2xl font-medium shadow-2xl rounded-2xl p-6`,
  );
  const plantBtn = (val: any) => {
    setCity(val);
  };
  useEffect(() => {
    fetchPlantsbyUserId();
  }, []);
  return (
    <>
      {plantData ? (
        <div className={`${no_plant_container}`}>
          <div className=" flex flex-col gap-6 w-full ">
            <div className="py-5">
              <h2 className="text-[#492CE1] font-GothamMedium text-2xl font-medium">
                Can you tell us which plant are you looking at ?
              </h2>
            </div>
            <div className="grid  grid-cols-5 gap-10 pr-6 h-[60vh] overflow-x-scroll ">
              {plantData.map((data: any, i) => (
                <div key={i}>
                  <PlantCard data={data} onClick={() => plantBtn(data)} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <NoPlants />
      )}
    </>
  );
}
export { Plant };
