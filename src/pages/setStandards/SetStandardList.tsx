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
import { Tag } from 'antd';
import AccessManager from '@/components/accessManager';

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
  const { currentPlant } = useAppSelector((state) => state.plantRegistration);

  // To Get all plants using plantId
  useEffect(() => {
    const fullData = async () => {
      if (currentPlant) {
        const details = await PLANT_SERVICES.getAllPlantsSets(currentPlant);

        const updatedData = await Promise.all(
          details.message.map(async (data: { sensorId: string }) => {
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
      }
    };

    fullData();
  }, [currentPlant]);

  // delete plant
  const onDeletePlant = async (macAddress: any) => {
    setShowDeleteUserModal(true);
    if (macAddress) {
      const res = await SETSTANDARDS_SERVICES.deleteSetStandardById(macAddress);
      toast.success(res.message);
      setShowDeleteUserModal(false);
    }
  };

  const locale = {
    emptyText: <span className="text-grey-light font-semibold text-2xl leading-6">No Plants Available</span>,
  };

  const columns: any = [
    {
      title: 'Machine Number',
      dataIndex: 'machineNumber',
      key: 'machineNumber',
      align: 'center',
    },
    {
      title: 'Element Name',
      dataIndex: 'element',
      key: ' element',
      align: 'center',
    },
    {
      title: 'Sensor Label',
      dataIndex: 'sensorLabel',
      key: 'sensorLabel',
      align: 'center',
    },
    {
      title: 'Sensor Description',
      dataIndex: 'sensorDescription',
      key: 'sensorDescription',
      align: 'center',
    },
    {
      title: 'Primary Operating Range',
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
      title: 'Secondary Operating Range',
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
      title: 'Primary Threshold Range ',
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
      title: 'Secondary Threshold Range ',
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
      title: 'Primary UOM',
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
      title: 'Secondary UOM',
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
      title: 'Interval (minutes)',
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
      title: 'Trigger (Threshold Value)',
      dataIndex: 'trigger',
      key: 'trigger',
      width: '11%',
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

        let criticalityData: any = [];

        if (criticalityBreakDown) {
          criticalityData.push('BreakDown');
        }

        if (criticalityDefect) {
          criticalityData.push('Defect');
        }

        if (criticalityUnsafe) {
          criticalityData.push('Unsafe');
        }

        // criticalityData = criticalityData.join(',');

        if (!criticalityBreakDown && !criticalityDefect && !criticalityUnsafe) {
          criticalityData = 'None';
        }

        return criticalityData?.map((criticality: string) => {
          const COLOR = criticality === 'BreakDown' ? 'magenta' : criticality === 'Defect' ? 'red' : 'orange';
          return (
            <Tag color={COLOR} key={criticality}>
              {criticality}
            </Tag>
          );
        });
      },
    },
    {
      title: 'Sensor ID',
      dataIndex: 'macAddress',
      key: 'macAddress',
      align: 'center',
    },
    {
      title: 'Actions',
      dataIndex: 'Actions',
      key: 'Actions',
      align: 'center',

      render: (_: any, data: any) => {
        return (
          <div className="flex justify-center gap-3">
            <AccessManager role={loggedUser?.role || 'USER'} category="Set PM Standards" accessNeeded="update">
              <div
                className="cursor-pointer"
                onClick={() => navigate(SITEMAP.setStandards.NewSetStandards, { state: { data } })}
              >
                <PencilIcon className="w-[20px] h-[20px]" />
              </div>
            </AccessManager>
            <AccessManager role={loggedUser?.role || 'USER'} category="Set PM Standards" accessNeeded="delete">
              <div
                className="cursor-pointer"
                onClick={() => {
                  setShowDeleteUserModal(true);
                  setSelectedStandard(data?.macAddress);
                }}
              >
                <DeleteIcon className="w-[20px] h-[20px]" />
              </div>
            </AccessManager>
          </div>
        );
      },
    },
  ];

  const userAccess = accessRules[loggedUser?.role || 'USER']['Set PM Standards'].includes('add');

  return (
    <>
      <div className="flex justify-between mb-7">
        <p className="font-semibold text-2xl leading-6">CBM Set Standards</p>

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
        locale={locale}
        scroll={{ x: 'calc(1900px + 50%)' }}
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
