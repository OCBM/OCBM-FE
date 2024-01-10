import { DeleteIcon, PencilIcon, QuestionMarkIcon, SearchIcon } from '@/assets/icons';
import { Table } from '@/components/reusable/table';
import { Button, Input } from '@/components';
// import { DATA_SOURCE } from './constants';
import { useNavigate } from 'react-router-dom';
import { SITEMAP } from '@/utils/sitemap';
import { SETSTANDARD_SERVICES } from '@/services/setStandardService';
import { useEffect, useState } from 'react';
import PopupModal from '@/components/reusable/popupmodal/popupmodal';
import { toast } from 'react-toastify';

const SetStandardList = () => {
  const navigate = useNavigate();
  const [setStandardlist, setSetStandardList] = useState([]);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState<boolean>(false);
  const [selectedStandard, setSelectedStandard] = useState<string>('');

  const fetchAllSet = async () => {
    const res = await SETSTANDARD_SERVICES.getAllSetStandard();
    setSetStandardList(res);
  };

  useEffect(() => {
    fetchAllSet();
  }, []);

  const onDeletePlant = async (macAddress: any) => {
    setShowDeleteUserModal(true);
    if (macAddress) {
      const res = await SETSTANDARD_SERVICES.deleteSetStandardById(macAddress);
      toast.success(res.message);
      setShowDeleteUserModal(false);
    }
  };

  const columns: any = [
    {
      title: 'Machine Name',
      dataIndex: 'machineName',
      key: 'machineName',
      align: 'center',
    },
    {
      title: 'Element Name',
      dataIndex: 'elementName',
      key: ' elementName',
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
    },
    {
      title: 'Interval',
      dataIndex: 'interval',
      key: 'interval',
      align: 'center',
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
        console.log('Criticality', data.criticality.breakDown);
        const criticalityBreakDown = data.criticality.breakDown;
        const criticalityDefect = data.criticality.defect;
        // const criticalityUnsafe = data.criticality.unSafe;

        if (criticalityBreakDown) {
          var criticalityData = 'BreakDown';
        } else if (criticalityDefect) {
          var criticalityData = 'Defect';
        } else {
          var criticalityData = 'Unsafe';
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
        // console.log(data, 'data');
        return (
          <div className="flex justify-center gap-3">
            <div className="cursor-pointer">
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

  return (
    <>
      <div className="flex justify-between mb-7">
        <p className="font-semibold text-2xl leading-6">CBM SET STANDARDS</p>
        <Input
          className="border-2 w-[340px] h-12 flex gap-3 text-sm p-4"
          leftIcon={<SearchIcon />}
          placeholder="Search Sensor, Machine..."
        />
        <Button
          className="font-medium text-base w-52 h-10 leading-4 flex justify-center items-center"
          label="+ Create Standards"
          type="button"
          variant="primary"
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
