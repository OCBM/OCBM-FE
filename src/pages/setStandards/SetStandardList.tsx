import { DeleteIcon, PencilIcon, QuestionMarkIcon } from '@/assets/icons';
import { Table } from '@/components/reusable/table';
import { Button } from '@/components';
import { useNavigate } from 'react-router-dom';
import { SITEMAP } from '@/utils/sitemap';
import { SETSTANDARDS_SERVICES } from '@/services/setStandardsServices';
import { useEffect, useState } from 'react';
import PopupModal from '@/components/reusable/popupmodal/popupmodal';
import { toast } from 'react-toastify';
import { PLANT_SERVICES } from '@/services/plantServices';
import { useAppSelector } from '@/hooks';
import { accessRules } from '@/utils/accessibilityConstants';

export type updatedData = {
  sensor: any;
  machineName: string;
  elementName: string;
  macAddress: string;
  sensorDescription: string;
  sensorId?: undefined;
  standardDetails: any;
};

const SetStandardList = () => {
  const navigate = useNavigate();
  const [setStandardlist, setSetStandardList] = useState<any>([]);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState<boolean>(false);
  const [selectedStandard, setSelectedStandard] = useState<string>('');
  const loggedUser = useAppSelector((state) => state.auth?.user);
  // To get userId
  const user = useAppSelector((state) => state.auth.user);
  const UserID = user?.userId;

  // To Get Two API in one Variable
  useEffect(() => {
    const fullData = async () => {
      const getPlantId = await PLANT_SERVICES.getAllPlantByUserId(UserID);
      console.log(getPlantId.message[0].plantId, 'plant');
      const plantId = getPlantId.message[0].plantId;
      const details = await PLANT_SERVICES.getAllPlantsSets(plantId);
      console.log('updated', details.message);

      const updatedData = await Promise.all(
        details.message.map(async (data: { sensorId: string }) => {
          console.log(data);
          const standardDetails = await SETSTANDARDS_SERVICES.getAllSetsbyid(data.sensorId);
          return {
            ...data,
            ...standardDetails,
          };
        }),
      );

      // Filtering to Get Full values Even after deleting sensor data
      const finalData = updatedData.filter((data: { uom: any }) => data.uom);
      setSetStandardList(finalData);
    };

    fullData();
  }, []);

  const fetchAllSet = async () => {
    const res = await SETSTANDARDS_SERVICES.getAllSetStandard();
    setSetStandardList(res);
  };

  useEffect(() => {
    fetchAllSet();
  }, []);

  // delete plant
  const onDeletePlant = async (macAddress: any) => {
    setShowDeleteUserModal(true);
    if (macAddress) {
      const res = await SETSTANDARDS_SERVICES.deleteSetStandardById(macAddress);
      toast.success(res.message);
      setShowDeleteUserModal(false);
    }
  };

  const columns: any = [
    {
      title: 'Machine Name',
      dataIndex: 'machine',
      key: 'machine',
      align: 'center',
    },

    {
      title: 'Element Name',
      dataIndex: 'element',
      key: ' element',
      align: 'center',
    },
    {
      title: 'Sensor Description',
      dataIndex: 'sensorDescription',
      key: 'sensorDescription',
      align: 'center',
    },
    {
      title: 'Sensor ID',
      dataIndex: 'macAddress',
      key: 'macAddress',
      align: 'center',
    },
    {
      title: 'Operating Range',
      dataIndex: ['minOperatingRange', 'maxOperatingRange'],
      key: 'minOperatingRange',
      className: 'operatingRange',
      align: 'center',
      render: (_: any, data: any) => {
        return (
          <div className="flex justify-center gap-3">
            <span>{data.minOperatingRange}</span> -<span>{data.maxOperatingRange}</span>
          </div>
        );
      },
    },
    {
      title: 'Threshold value',
      dataIndex: ['minThresholdValue', 'maxThresholdValue'],
      key: 'minThresholdValue',
      className: 'thresholdValue',
      align: 'center',
      render: (_: any, data: any) => {
        return (
          <div className="flex justify-center gap-3">
            <span>{data.minThresholdValue}</span> -<span>{data.maxThresholdValue}</span>
          </div>
        );
      },
    },
    {
      title: 'UOM',
      dataIndex: 'uom',
      key: 'uom',
      align: 'center',
      render: (_: any, data: any) => {
        return (
          <div className="flex justify-center gap-3">
            <span>{data.uom}</span>
          </div>
        );
      },
    },
    {
      title: 'Interval',
      dataIndex: 'interval',
      key: 'interval',
      align: 'center',
      render: (_: any, data: any) => {
        return (
          <div className="flex justify-center gap-3">
            <span>{data.interval}</span>
          </div>
        );
      },
    },
    {
      title: 'Trigger',
      dataIndex: 'trigger',
      key: 'trigger',
      align: 'center',
    },
    {
      title: 'Criticality',
      dataIndex: 'criticality',
      key: 'criticality',
      align: 'center',

      render: (_: any, data: any) => {
        // Criticality logic
        const criticalityBreakDown = data?.criticality?.breakDown;
        const criticalityDefect = data?.criticality?.defect;
        const criticalityUnsafe = data?.criticality?.unSafe;

        let criticalityData = '';

        if (criticalityBreakDown) {
          criticalityData += 'BreakDown ';
        }

        if (criticalityDefect) {
          criticalityData += 'Defect ';
        }

        if (criticalityUnsafe) {
          criticalityData += 'Unsafe';
        }

        criticalityData = criticalityData.trim();

        if (!criticalityBreakDown && !criticalityDefect && !criticalityUnsafe) {
          criticalityData = 'Non';
        }

        return <div>{criticalityData}</div>;
      },
    },
    {
      title: 'Actions',
      dataIndex: 'criticality',
      key: 'criticality',
      align: 'center',

      render: (_: any, data: any) => {
        return (
          <div className="flex justify-center gap-3">
            <div
              className="cursor-pointer"
              onClick={() => navigate(SITEMAP.setStandards.NewSetStandards, { state: { data } })}
            >
              <PencilIcon className="w-[20px] h-[20px]" />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowDeleteUserModal(true);
                setSelectedStandard(data?.macAddress);
              }}
            >
              <DeleteIcon className="w-[20px] h-[20px]" />
            </div>
          </div>
        );
      },
    },
  ];
  const userAccess = accessRules[loggedUser?.role || 'USER']['Set Standards'].includes('add');

  return (
    <>
      <div className="flex justify-between mb-7">
        <p className="font-semibold text-2xl leading-6">CBM SET STANDARDS</p>

        <Button
          className="font-medium text-base w-52 h-10 leading-4 flex justify-center items-center"
          label="+ Create Standards"
          type="button"
          variant="primary"
          disabled={!userAccess}
          onClick={() => navigate(SITEMAP.setStandards.NewSetStandards)}
        />
      </div>

      <Table
        className="set-table"
        columns={columns}
        dataSource={setStandardlist}
        scroll={{ x: 'calc(1500px + 50%)' }}
      />
      <PopupModal
        title={'Are you sure want to delete?'}
        isOpen={showDeleteUserModal}
        icon={<QuestionMarkIcon />}
        handleClose={() => setShowDeleteUserModal(false)}
        handleDelete={() => {
          onDeletePlant(selectedStandard);
          window.location.reload();
        }}
        onCloseDeleteModal={() => {
          setShowDeleteUserModal(false);
        }}
      />
    </>
  );
};
export default SetStandardList;
