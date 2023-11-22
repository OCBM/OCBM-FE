import { ChevronCancelIcon, ChevronSuccessIcon, DeleteIcon, PencilIcon, QuestionMarkIcon } from '@/assets/icons';
import { Button, FileUploader, Input, Modal } from '@/components';
import { FileUploadStatusType } from '@/components/reusable/fileuploader/types';
import { Table } from '@/components/reusable/table';
import { useAppSelector } from '@/hooks';
import { PLANT_SERVICES } from '@/services/plantServices';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { MASTERY_PAGE_CONSTANTS, USERS_PAGE_CONSTANTS } from '../users/constants';

function Plant() {
  const orgID: string = '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d';
  type InitialStateType = {
    plantName: string | undefined;
    organizationId: string | undefined;
    plantId: string | undefined;
    description: string | undefined;
    image: any;
    imageName: string | undefined;
  };
  const initialState = {
    plantName: '',
    organizationId: '',
    plantId: '',
    description: '',
    image: '',
    imageName: '',
  };

  const [plantData, setPlantData] = useState([]);
  const [newPlant, setNewPlant] = useState<InitialStateType>(initialState);
  const [uploadStatus, setUploadStatus] = useState<FileUploadStatusType>('upload');
  const [editPlant, setEditPlant] = useState<boolean>(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState<boolean>(false);
  const [selectedPlant, setSelectedPlant] = useState<string>('');
  const [showEditSuccessModal, setShowEditSuccessModal] = useState<boolean>(false);
  const loggedUser = useAppSelector((state) => state.auth?.user);

  const [fileName, setFileName] = useState<string>('');
  const [imageURL, setImageURl] = useState<string>('');
  // fetching All Plant data by organizationId
  const fetchPlantDataByOrgId = async () => {
    if (loggedUser) {
      const res = await PLANT_SERVICES.getAllPlants(orgID);
      setPlantData(res?.message);
    }
  };

  useEffect(() => {
    fetchPlantDataByOrgId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setNewPlant((initialState: InitialStateType) => ({
      ...initialState,
      [name]: value,
    }));
  };

  const handleFile = async (event: any) => {
    setUploadStatus('success');
    setFileName(event[0].name);
    const base64String: any = await convertToBase64(event[0]);
    setNewPlant((prev: any) => ({ ...prev, image: base64String, imageName: event[0].name }));
    setImageURl(base64String);
  };

  // function to convert image file to base64
  const convertToBase64 = (file: any) => {
    return new Promise((resolve) => {
      let baseURL: any = '';
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
        return baseURL;
      };
    });
  };

  const onDeletePlant = async (orgId: string, plantId: string) => {
    setShowDeleteUserModal(true);
    if (orgId && plantId) {
      const res = await PLANT_SERVICES.deletePlantById(orgId, plantId);
      toast.success(res.message);
      setShowDeleteUserModal(false);
      fetchPlantDataByOrgId();
    }
  };

  const disablingNewPlant = () => {
    return newPlant.plantName && newPlant.description && newPlant.image ? false : true;
  };

  const columns = [
    {
      title: 'Plant Name',
      dataIndex: 'plantName',
      key: 'name',
    },
    {
      title: 'Plant Description',
      dataIndex: 'description',
      width: '20%',
      key: 'description',
    },
    {
      title: 'Plant ID',
      dataIndex: 'plantId',
      width: '30%',
      key: 'id',
    },
    {
      title: 'Image',
      dataIndex: 'imageName',
      width: '20%',
      key: 'image',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      width: '10%',
      key: 'actions',
      render: (_: any, data: any) => {
        return (
          <div className="flex justify-start gap-3">
            <div
              className="cursor-pointer"
              onClick={() => {
                setNewPlant(data);
                setEditPlant(true);
                console.log(data, 'table data');
              }}
            >
              <PencilIcon className="w-[20px] h-[20px]" />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowDeleteUserModal(true);
                setSelectedPlant(data?.plantId);
                console.log(data);
              }}
            >
              <DeleteIcon className="w-[20px] h-[20px]" />
            </div>
          </div>
        );
      },
    },
  ];

  async function createPlant() {
    const body = {
      image: newPlant.image,
      plantName: newPlant.plantName,
      description: newPlant.description,
      organizationId: orgID,
      imageName: newPlant.imageName,
    };
    const res = await PLANT_SERVICES.addPlant(body);
    if (res?.statusCode === 201) {
      setNewPlant(initialState);
      setFileName('');
      setImageURl('');
      toast.success('Plant added successfully');
      fetchPlantDataByOrgId();
    }
  }

  const updatePlant = async () => {
    const body = {
      plantName: newPlant.plantName,
      description: newPlant.description,
      image: newPlant.image,
      ImageName: newPlant.imageName,
    };
    const res = await PLANT_SERVICES.updatePlantbyId(orgID, newPlant.plantId, body);
    if (res.statusCode === 200) {
      fetchPlantDataByOrgId();
      setNewPlant(initialState);
      setEditPlant(false);
      setShowEditSuccessModal(true);
    }
  };

  const onCloseEditModal = () => {
    setNewPlant(initialState);
    setShowEditSuccessModal(false);
  };

  return (
    <>
      <h2 className="text-[20px] text-[#444444] leading-5 font-medium mb-8">Add Plant</h2>
      <>
        <div className="flex justify-start items-center gap-[16px] mb-6">
          <Input
            className="w-[270px] border-[1px] h-[46px] px-3 rounded-[50px] border-[#A9A9A9] p-[16px] text-[14px]"
            placeholder="Plant Name*"
            type="text"
            value={newPlant.plantName}
            name="plantName"
            onChange={handleChange}
          />
          <Input
            className="w-[270px] border-[1px] h-[46px] px-3 rounded-[50px] border-[#A9A9A9] p-[16px] text-[14px]"
            placeholder="Plant Descriptions*"
            type="text"
            name="description"
            value={newPlant.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <FileUploader
            className="w-[560px] py-6"
            mastery
            fileFormat=".jpg, .png"
            handleFile={handleFile}
            uploadStatus={uploadStatus}
            image={imageURL}
            fileName={fileName}
          />
        </div>
        <div className="flex justify-start flex-row w-full gap-4 mt-8 mb-8">
          <Button
            onClick={() => {
              setNewPlant(initialState);
              setFileName('');
              setImageURl('');
            }}
            className="py-3 px-6 rounded-2xl tracking-[0.32px] text-base leading-4 font-medium"
            label="Clear"
            variant="secondary"
          />
          <Button
            className="py-3 px-6 rounded-2xl tracking-[0.32px] text-base leading-4 font-medium"
            label="Add"
            disabled={disablingNewPlant()}
            onClick={createPlant}
          />
        </div>
      </>

      {/* 
      <div>
        <Table columns={columns} dataSource={plantData} pagination={false} />
      </div> 
      Changing this due t usage of empty div.
      */}

      <>
        <Table columns={columns} dataSource={plantData} pagination={false} />
      </>

      <Modal
        isOpen={showDeleteUserModal}
        onCancel={() => {
          setShowDeleteUserModal(false);
        }}
        className="z-[99]"
      >
        <div className="w-[393px] rounded-[16px] py-[50px] px-[86px] relative">
          <div className="flex flex-col items-center justify-center">
            <QuestionMarkIcon />
            <h2 className="text-[24px] text-center text-[#272332] font-medium mt-2 mb-4">
              {USERS_PAGE_CONSTANTS.DELETE_USER_DIALOG.message}
            </h2>
            <div className="flex gap-[8px] justify-between">
              <Button
                label="Cancel"
                variant="secondary"
                className="rounded-[16px] text-[16px] font-medium text-[#605BFF] italic py-[8px] px-[24px] w-[104px]"
                onClick={() => {
                  setShowDeleteUserModal(false);
                }}
              />
              <Button
                label="Yes"
                variant="primary"
                className="rounded-[16px] text-[16px] font-medium text-[#ffffff] italic py-[8px] px-[24px] w-[104px]"
                onClick={() => {
                  onDeletePlant(orgID, selectedPlant);
                }}
              />
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={editPlant}
        onCancel={() => {
          setEditPlant(false);
        }}
        className="z-[99]"
      >
        <div className="w-[485px] rounded-[16px] p-[50px] relative">
          <div
            className="absolute right-[10px] top-[10px] cursor-pointer"
            onClick={() => {
              setEditPlant(false);
            }}
          >
            <ChevronCancelIcon />
          </div>

          <h2 className="text-[#605BFF] text-[24px] font-medium text-center mb-[36px]">
            {MASTERY_PAGE_CONSTANTS.EDIT_PLANT_DIALOG.label}
          </h2>

          <form>
            <div>
              <h4 className="text-[18px] text-[#0F0F0F] font-medium mb-4">
                {MASTERY_PAGE_CONSTANTS.EDIT_PLANT_DIALOG.orgLabel}
              </h4>
              <Input
                className="w-[385px] h-[54px] rounded-[50px] border-[#444444] border-[1px] p-[20px] mb-4 mt-[10px]"
                label="Plant Name"
                labelClassName="text-[#492CE1] text-[14px] font-medium"
                mandatory={true}
                type="text"
                name="plantName"
                placeholder="Enter Plant Name"
                value={newPlant?.plantName}
                onChange={handleChange}
              />
              <Input
                className="w-[385px] h-[54px] rounded-[50px] border-[#444444] border-[1px] p-[20px] mb-4 mt-[10px]"
                label="Plant Description"
                labelClassName="text-[#492CE1] text-[14px] font-medium"
                mandatory={true}
                type="text"
                name="description"
                placeholder="Enter Plant Description"
                value={newPlant?.description}
                onChange={handleChange}
              />
              <FileUploader
                label="Image"
                labelClassName="text-[#492CE1] text-[14px] font-medium"
                className="w-[385px] py-6 mt-2"
                mastery
                fileFormat=".jpg, .png"
                handleFile={handleFile}
                uploadStatus={uploadStatus}
                image={newPlant?.image}
                fileName={newPlant?.imageName}
              />
            </div>
            <div className="text-center mt-[36px]">
              <Button
                onClick={updatePlant}
                variant="primary"
                label="Submit"
                className="py-[8px] px-[24px] rounded-[16px] font-normal text-[16px]"
              />
            </div>
          </form>
        </div>
      </Modal>

      <Modal isOpen={showEditSuccessModal} onCancel={onCloseEditModal} className="z-[99]">
        <div className="w-[393px] rounded-[16px] py-[50px] px-[86px] relative">
          <div className="flex flex-col items-center justify-center">
            <ChevronSuccessIcon className="w-[100px] h-[100px]" />
            <h2 className="text-[24px] text-center text-[#272332] font-medium mt-2 mb-4">
              {USERS_PAGE_CONSTANTS.EDIT_USER_DIALOG.message}
            </h2>
            <div className="flex gap-[8px] justify-between">
              <Button
                label="Done"
                variant="primary"
                className="rounded-[16px] text-[16px] font-medium tex-[#ffffff] py-[8px] px-[24px]"
                onClick={() => {
                  setShowEditSuccessModal(false);
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Plant;
