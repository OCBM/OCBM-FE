import { useEffect } from 'react';
import classNames from 'classnames';
import NoPlants from './NoPlants';
import PlantCard from './PlantCard';
import {
  fetchMachineLineByShopId,
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
import Loader from '@/components/reusable/loader';

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
    dispatch(fetchMachineLineByShopId(data?.shopId));
    dispatch(setSelectedShop(data));
  };

  const plant_container = classNames(
    `w-full h-[76%] container mx-auto text-2xl font-medium shadow-2xl rounded-2xl p-6`,
  );

  const plant_card = classNames(
    ` bg-white flex flex-col items-center pt-[10px] pb-5 px-[10px] border-white rounded-2xl shadow-lg w-[220px] h-full cursor-pointer justify-evenly`,
  );
  const machine_container = classNames(
    'border p-[30px] shadow-card-shadow rounded-2xl absolute bottom-0 bg-white w-full top-[536px] h-fit translate-y-[-64%] delay-200',
    { '!top-[400px] ': !machines?.data?.length },
  );
  return (
    <>
      {plants ? (
        <div className={`${plant_container}`}>
          <div className=" relative flex flex-col gap-6 w-full ">
            <div className="py-2">
              {show === 'plant' && (
                <h2 className="text-[#492CE1] text-2xl font-medium">
                  Can you tell us which Business Unit are you looking at ?{' '}
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
                plants?.data?.map((plant: any) => {
                  return (
                    <div key={plant?.plantId} className={`${plant_card}`}>
                      <PlantCard name={plant?.plantName} image={plant?.image} onClick={() => plantBtn(plant)} />
                    </div>
                  );
                })}
            </div>
            {show === 'shop' && (
              <>
                <div className="border p-[30px] shadow-card-shadow rounded-2xl absolute bottom-0 bg-white w-full top-[536px] h-fit translate-y-[-64%] delay-200">
                  {shops?.loading ? (
                    <Loader />
                  ) : (
                    <>
                      {shops?.data?.length > 0 ? (
                        <>
                          <span className="absolute w-[30px] h-[30px] bg-white rotate-45 top-[-15px] left-[95px]"></span>
                          <p className="text-[#492CE1] text-lg font-medium">Which Manufacturing Location are you in?</p>
                          <div className="overflow-auto flex gap-6">
                            {shops?.data?.map((shop: any) => (
                              <div key={shop?.shopId} className="flex gap-4 w-fit cursor-pointer">
                                <Cards name={shop?.shopName} image={shop?.image} onClick={() => shopCardBtn(shop)} />
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <>
                          <span className="absolute w-[30px] h-[30px] bg-white rotate-45 top-[-15px] left-[335px]"></span>
                          <p className="text-[#492CE1] text-lg font-medium">No Shops are created!!!</p>
                        </>
                      )}
                    </>
                  )}
                </div>
              </>
            )}
            {show === 'machine' && (
              <>
                <div className={machine_container}>
                  {machines?.loading ? (
                    <Loader />
                  ) : (
                    <>
                      {machines?.data?.length > 0 ? (
                        <>
                          <span className="absolute w-[30px] h-[30px] bg-white rotate-45 top-[-15px] left-[335px]"></span>
                          <p className="text-[#492CE1] text-lg font-medium">
                            Lets us know which manufacturing line are you working on ?
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
                      ) : (
                        <>
                          <span className="absolute w-[30px] h-[30px] bg-white rotate-45 top-[-15px] left-[335px]"></span>
                          <p className="text-[#492CE1] text-lg font-medium">No Machines are present</p>
                        </>
                      )}
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
