import { useEffect } from 'react';
import classNames from 'classnames';
import NoPlants from './NoPlants';
import PlantCard from './PlantCard';
import {
  fetchMachineByShopId,
  fetchShopsByPlantId,
  plantData,
  resetPlantData,
  setSelectedPlant,
  setSelectedShop,
  toggleShopOpen,
} from '@/redux/slices/plantSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import Cards from './Cards';
import { useNavigate } from 'react-router-dom';
import { Loading } from '@/components';

function Plant() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loggedUser = useAppSelector((state) => state.auth?.user);
  const { plants, shops, machines, show } = useAppSelector((state) => state.plantRegistration);

  const fetchPlantsbyUserId = async () => {
    if (loggedUser) {
      dispatch(plantData(loggedUser.userId));
    }
  };

  useEffect(() => {
    fetchPlantsbyUserId();
  }, []);

  useEffect(() => {
    return () => {
      dispatch(resetPlantData());
    };
  }, []);

  const plantBtn = (data: any) => {
    dispatch(toggleShopOpen('shop'));
    dispatch(fetchShopsByPlantId(data?.plantId));
    dispatch(setSelectedPlant(data));
  };

  const shopCardBtn = (data: any) => {
    dispatch(toggleShopOpen('machine'));
    dispatch(fetchMachineByShopId(data?.shopId));
    dispatch(setSelectedShop(data));
  };

  const plant_container = classNames(
    `w-full h-[76%] container mx-auto font-GothamMedium text-2xl font-medium shadow-2xl rounded-2xl p-6`,
  );

  const plant_card = classNames(
    ` bg-white flex flex-col items-center pt-[10px] pb-5 px-[10px] border-white rounded-2xl shadow-lg w-[220px] h-[244px] cursor-pointer`,
  );
  return (
    <>
      {plants ? (
        <div className={`${plant_container}`}>
          <div className=" relative flex flex-col gap-6 w-full ">
            <div className="py-2">
              {show === 'plant' && (
                <h2 className="text-[#492CE1] font-GothamMedium text-2xl font-medium">
                  Can you tell us which plant are you looking at ?
                </h2>
              )}
            </div>
            <div className="grid grid-cols-5 gap-10 pr-6 h-fit winLap:gap-[15%] ">
              {plants?.selectedPlant?.plantId && (
                <div className={`${plant_card}`}>
                  <PlantCard
                    name={plants?.selectedPlant?.plantName}
                    onClick={() => {
                      dispatch(toggleShopOpen('plant'));
                      dispatch(setSelectedPlant({}));
                      dispatch(setSelectedShop({}));
                    }}
                    image={plants?.selectedPlant?.image}
                  />
                </div>
              )}
              {shops?.selectedShop?.shopId && (
                <div className={`${plant_card}`}>
                  <PlantCard
                    onClick={() => {
                      dispatch(toggleShopOpen('shop'));
                      dispatch(setSelectedShop({}));
                    }}
                    name={shops?.selectedShop?.shopName}
                    image={shops?.selectedShop?.image}
                  />
                </div>
              )}
              {show === 'plant' &&
                plants?.data?.map((plant: any) => (
                  <div key={plant?.plantId} className={`${plant_card}`}>
                    <PlantCard name={plant?.plantName} image={plant?.image} onClick={() => plantBtn(plant)} />
                  </div>
                ))}
            </div>
            {show === 'shop' && (
              <>
                <div className="border p-[30px] shadow-card-shadow rounded-2xl absolute bottom-0 bg-white w-full top-[505px] h-fit translate-y-[-64%] delay-200">
                  {shops?.loading ? (
                    <Loading />
                  ) : (
                    <>
                      <span className="absolute w-[30px] h-[30px] bg-white rotate-45 top-[-15px] left-[95px]"></span>
                      <p className="text-[#492CE1] font-GothamMedium text-lg font-medium">Which shop are you in ?</p>
                      <div className="overflow-auto flex gap-6">
                        {shops?.data?.map((shop: any) => (
                          <div key={shop?.shopId} className="flex gap-4 w-fit cursor-pointer">
                            <Cards name={shop?.shopName} image={shop?.image} onClick={() => shopCardBtn(shop)} />
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
            {show === 'machine' && (
              <>
                <div className="border p-[30px] shadow-card-shadow rounded-2xl absolute bottom-0 bg-white w-full top-[505px] h-fit translate-y-[-64%] delay-200 ">
                  {machines?.loading ? (
                    <Loading />
                  ) : (
                    <>
                      <span className="absolute w-[30px] h-[30px] bg-white rotate-45 top-[-15px] left-[335px]"></span>
                      <p className="text-[#492CE1] font-GothamMedium text-lg font-medium">
                        Lets us know which machine line are you working on ?
                      </p>
                      <div className="overflow-auto flex gap-6">
                        {machines?.data?.map((machine: any) => (
                          <div
                            key={machine?.machineLineId}
                            className="flex gap-4 w-fit cursor-pointer"
                            onClick={() => navigate('/machines')}
                          >
                            <Cards name={machine?.machineLineName} image={machine?.image} />
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <NoPlants />
      )}
    </>
  );
}
export { Plant };
