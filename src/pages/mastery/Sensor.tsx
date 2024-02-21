import { ChevronCancelIcon, ChevronSuccessIcon, DeleteIcon, PencilIcon, QuestionMarkIcon } from '@/assets/icons';
import { Button, Dropdown, FileUploader, Input, Modal } from '@/components';
import { FileUploadStatusType } from '@/components/reusable/fileuploader/types';
import PopupModal from '@/components/reusable/popupmodal/popupmodal';
import { Table } from '@/components/reusable/table';
import { useAppSelector } from '@/hooks';
import { ELEMENT_SERVICES } from '@/services/elementServices';
import { SENSOR_SERVICES } from '@/services/sensorServices';
import { Avatar } from 'antd';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const initialState = {
  sensorId: '',
  sensorDescription: '',
  sensorLabel: '',
  elementId: '',
  image: '',
};
const sensorInitialState = {
  sensor_Id: '',
  sensorId: '',
  sensorLabel: '',
  sensorDescription: '',
  image: '',
  imageKey: '',
  imageName: '',
  createdAt: '',
  updatedAt: '',
  elementId: '',
};

function Sensor() {
  const { currentPlant } = useAppSelector((state) => state.plantRegistration);
  const [uploadStatus, setUploadStatus] = useState<FileUploadStatusType>('upload');
  const [sensorData, setSensorData] = useState<any>(initialState);
  const [elementList, setElementList] = useState<any>([]);
  const [imageUrl, setImageUrl] = useState<any>('');
  const [fileName, setFileName] = useState<string>('');
  const [paginationData, setPaginationData] = useState<any>({});
  const [ocbmSensorList, setOcbmSensorList] = useState<any>([]);
  const [showEditSuccessModal, setShowEditSuccessModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<any>('');
  const [selectedSensor, setSelectedSensor] = useState<any>({});
  const [showDeleteSensorModal, setShowDeleteSensorModal] = useState<boolean>(false);
  const [showEditSensorModal, setShowEditSensorModal] = useState<boolean>(false);
  const [newSensor, setNewSensor] = useState<any>(sensorInitialState);
  const [sensorList, setSensorList] = useState<any>([]);

  const handleFile = async (event: any) => {
    setFileName(event[0].name);
    setUploadStatus('success');
    const base64String: any = await convertToBase64(event[0]);
    setSensorData({ ...sensorData, image: event[0] });
    setImage(event[0]);
    setImageUrl(base64String);
  };

  const handleUpdate = async (event: any) => {
    setFileName(event[0].name);
    setUploadStatus('success');
    const base64String: any = await convertToBase64(event[0]);
    setImage(event[0]);
    setNewSensor({ ...newSensor, image: base64String });
  };

  const convertToBase64 = (file: any) => {
    return new Promise((resolve) => {
      let baseURL: string | ArrayBuffer | null = '';
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
        return baseURL;
      };
    });
  };

  const handleSubmit = async () => {
    const res = await SENSOR_SERVICES.postSensorOcbm({ ...sensorData, imageName: fileName });
    if (res.statusCode === 201) {
      setSensorData(initialState);
      toast.success('Sensor added successfully');
      fetchAllSensorsOcbm(1);
    } else {
      toast.error('sensor already exists');
    }
  };

  const columns = [
    {
      title: 'Sensor Label',
      dataIndex: 'sensorLabel',
      key: 'sensorLabel',
    },
    {
      title: 'Sensor ID',
      dataIndex: 'sensorId',
      key: 'sensorId',
    },
    {
      title: 'Sensor Description',
      dataIndex: 'sensorDescription',
      key: 'description',
    },
    {
      title: 'Element ID',
      dataIndex: 'elementId',
      key: 'elementId',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image: any) => {
        return <Avatar shape="square" size={64} src={image} />;
      },
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_: any, data: any) => {
        return (
          <div className="flex justify-start gap-3">
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowEditSensorModal(true);
                setNewSensor(data);
              }}
            >
              <PencilIcon className="w-[20px] h-[20px]" />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setSelectedSensor(data);
                setShowDeleteSensorModal(true);
              }}
            >
              <DeleteIcon className="w-[20px] h-[20px]" />
            </div>
          </div>
        );
      },
    },
  ];

  const fetchAllElements = async () => {
    const res = await ELEMENT_SERVICES.getAllElementsByPlantId(currentPlant);
    setElementList(res?.message);
  };
  const fetchAllSensorsOcbm = async (page: number) => {
    setLoading(true);
    const res = await SENSOR_SERVICES.getAllSensorOcbmByPlantID(currentPlant, page);
    setOcbmSensorList(res?.message);
    setLoading(false);
    setPaginationData(res?.meta);
    if (res?.Error && paginationData?.current_page > 1) {
      fetchAllSensorsOcbm(paginationData?.current_page - 1);
    }
  };
  const fetchAllSensors = async () => {
    const res = await SENSOR_SERVICES.getAllSensorsByOrganization();
    console.log('res', res);
    setSensorList(res);
  };

  // const fetchAllSensors = async () => {
  //   const res = await SENSOR_SERVICES.getSensorsByOrgId(id as string);
  //   setSensorList(res?.message);
  // };

  //delete machine line
  const onDeleteSensor = async (elementId: string, sensorId: string) => {
    setShowDeleteSensorModal(true);
    if (elementId && sensorId) {
      const res = await SENSOR_SERVICES.deleteSensorOcbm(elementId, sensorId);
      toast.success(res.message);
      setShowDeleteSensorModal(false);
      fetchAllSensorsOcbm(1);
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setNewSensor((initialState: any) => ({
      ...initialState,
      [name]: value,
    }));
  };

  const updateMachineLine = async () => {
    if (newSensor?.sensorId) {
      const body = {
        sensorDescription: newSensor.sensorDescription,
        image: image || newSensor.image,
        imageName: fileName || newSensor.imageName,
        sensorLabel: newSensor.sensorLabel,
      };
      const res = await SENSOR_SERVICES.updateSensorOcbm(newSensor?.elementId, newSensor?.sensorId, body);
      if (res.statusCode === 200) {
        setNewSensor(sensorInitialState);
        setShowEditSensorModal(false);
        setShowEditSuccessModal(true);
        fetchAllSensorsOcbm(1);
      }
    }
  };

  useEffect(() => {
    fetchAllElements();
    fetchAllSensorsOcbm(1);
    fetchAllSensors();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-medium leading-5 text-[#444] mb-8">Add Sensor</h2>

      <div className="flex  gap-[16px] mb-6">
        <Dropdown
          options={elementList}
          className="w-[270px] border-[1px] h-[46px] px-3 rounded-[50px] border-[#A9A9A9] p-[16px] text-[14px]"
          placeholder="Select Element"
          optionLabel="elementName"
          optionValue="elementId"
          handleChange={(element) => setSensorData({ ...sensorData, elementId: element })}
          value={elementList?.find((data: any) => data?.elementId === sensorData.elementId)?.elementName}
          mandatory={true}
        />

        <Dropdown
          options={sensorList}
          className="w-[270px] border-[1px] h-[46px] px-3 rounded-[50px] border-[#A9A9A9] p-[16px] text-[14px]"
          placeholder="Select Sensor"
          optionLabel="macAddress"
          optionValue="macAddress"
          handleChange={(sensor) => setSensorData({ ...sensorData, sensorId: sensor })}
          value={sensorList?.find((machine: any) => machine?.macAddress === sensorData?.sensorId)?.macAddress}
          mandatory={true}
        />
        <Input
          className="w-[270px] border-[1px] h-[46px] px-3 rounded-[50px] border-[#A9A9A9] p-[16px] text-[14px]"
          placeholder="Sensor Label"
          type="text"
          value={sensorData.sensorLabel}
          name="Sensor Label"
          onChange={(e) => setSensorData({ ...sensorData, sensorLabel: e.target.value })}
        />
        <Input
          className="w-[270px] border-[1px] h-[46px] px-3 rounded-[50px] border-[#A9A9A9] p-[16px] text-[14px]"
          placeholder="Sensor description"
          type="text"
          value={sensorData.sensorDescription}
          name="description"
          onChange={(e) => setSensorData({ ...sensorData, sensorDescription: e.target.value })}
        />
      </div>
      <div>
        <FileUploader
          className="w-[560px] py-6"
          mastery
          fileFormat=".jpg, .png"
          image={imageUrl}
          handleFile={handleFile}
          uploadStatus={uploadStatus}
        />
      </div>
      <div className="flex justify-start flex-row w-full gap-4 mt-8 mb-8">
        <Button
          className="py-3 px-6 rounded-2xl tracking-[0.32px] text-base leading-4 font-medium"
          label="Clear"
          variant="secondary"
          onClick={() => {
            setSensorData(initialState);
            setImageUrl('');
            setFileName('');
          }}
        />
        <Button
          className="py-3 px-6 rounded-2xl tracking-[0.32px] text-base leading-4 font-medium"
          label="Add"
          onClick={handleSubmit}
          disabled={
            !sensorData.sensorId ||
            !sensorData.sensorDescription ||
            !sensorData.elementId ||
            !sensorData.image ||
            !sensorData.sensorLabel
          }
        />
      </div>

      <Table loading={loading} columns={columns} dataSource={ocbmSensorList} />
      <Modal
        isOpen={showEditSensorModal}
        onCancel={() => {
          setShowEditSensorModal(false);
        }}
        className="z-[99]"
      >
        <div className="w-[485px] rounded-[16px] p-[50px] relative">
          <div
            className="absolute right-[10px] top-[10px] cursor-pointer"
            onClick={() => {
              setShowEditSensorModal(false);
              setSensorData(initialState);
            }}
          >
            <ChevronCancelIcon />
          </div>
          <h2 className="text-[#605BFF] text-[24px] font-medium text-center mb-[36px]">Edit Sensor</h2>
          <form>
            <div className="flex flex-col gap-3">
              <h4 className="text-[18px] text-[#0F0F0F] font-medium mb-6">Sensor Details</h4>
              <Input
                className="w-[385px] h-[54px] rounded-[50px] border-[#444444] border-[1px] p-[20px] mb-4 mt-[10px]"
                label="Sensor description"
                labelClassName="text-[#492CE1] text-[14px] font-medium"
                mandatory={true}
                type="text"
                name="sensorDescription"
                placeholder="Enter sensor description"
                value={newSensor?.sensorDescription}
                onChange={handleChange}
              />
              <Input
                className="w-[385px] h-[54px] rounded-[50px] border-[#444444] border-[1px] p-[20px] mb-4 mt-[10px]"
                label="Sensor Label"
                labelClassName="text-[#492CE1] text-[14px] font-medium"
                mandatory={true}
                type="text"
                name="sensorLabel"
                placeholder="Enter sensor label"
                value={newSensor?.sensorLabel}
                onChange={handleChange}
              />
              <FileUploader
                label="Image"
                labelClassName="text-[#492CE1] text-[14px] font-medium"
                className="w-[385px] py-6 mt-2"
                mastery
                fileFormat=".jpg, .png"
                handleFile={handleUpdate}
                uploadStatus={uploadStatus}
                image={newSensor.image}
                fileName={fileName || newSensor.imageName}
              />
            </div>
            <div className="text-center mt-[36px]">
              <Button
                onClick={updateMachineLine}
                variant="primary"
                label="Submit"
                className="py-[8px] px-[24px] rounded-[16px] font-normal text-[16px]"
              />
            </div>
          </form>
        </div>
      </Modal>
      {/*Success message modal*/}
      <PopupModal
        primaryMessage={'Done'}
        title={'Changes are done'}
        isOpen={showEditSuccessModal}
        icon={<ChevronSuccessIcon className="w-[100px] h-[100px]" />}
        primaryPopup
        handleClose={() => setShowEditSensorModal(false)}
        onCloseSuccessModal={() => setShowEditSuccessModal(false)}
      />
      <PopupModal
        title={'Are you sure want to delete?'}
        isOpen={showDeleteSensorModal}
        icon={<QuestionMarkIcon />}
        handleClose={() => setShowDeleteSensorModal(false)}
        handleDelete={() => {
          onDeleteSensor(selectedSensor?.elementId, selectedSensor?.sensorId);
        }}
        onCloseDeleteModal={() => {
          setShowDeleteSensorModal(false);
        }}
      />
    </div>
  );
}
export default Sensor;
