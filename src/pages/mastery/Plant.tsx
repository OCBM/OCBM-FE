import { ChevronCancelIcon, ChevronSuccessIcon, DeleteIcon, PencilIcon, QuestionMarkIcon } from '@/assets/icons';
import { Button, FileUploader, Input, Modal } from '@/components';
import { FileUploadStatusType } from '@/components/reusable/fileuploader/types';
import { Table } from '@/components/reusable/table';
import { useAppSelector } from '@/hooks';
import { PLANT_SERVICES } from '@/services/plantServices';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '@/components/reusable/loader';
import { Avatar } from 'antd';
import PopupModal from '@/components/reusable/popupmodal/popupmodal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import AccessManager from '@/components/accessManager';
import { setAllPlants, setCurrentPlant } from '@/redux/slices/plantSlice';

function Plant() {
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

  type PaginationDataType = {
    current_page: number;
    item_count?: number;
    totalPage?: number;
    total_items?: number;
  };
  const data = useSelector((state: RootState) => state.auth.organization);
  const { currentPlant } = useAppSelector((state) => state.plantRegistration);
  const dispatch = useDispatch();
  const [plantData, setPlantData] = useState([]);
  const [newPlant, setNewPlant] = useState<InitialStateType>(initialState);
  const [uploadStatus, setUploadStatus] = useState<FileUploadStatusType>('upload');
  const [editPlant, setEditPlant] = useState<boolean>(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState<boolean>(false);
  const [selectedPlant, setSelectedPlant] = useState<string>('');
  const [showEditSuccessModal, setShowEditSuccessModal] = useState<boolean>(false);
  const loggedUser = useAppSelector((state) => state.auth?.user);
  const [paginationData, setPaginationData] = useState<PaginationDataType>({
    current_page: 1,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const [imageURL, setImageURl] = useState<string>('');

  // fetching All Plant data by organizationId
  const fetchPlantDataByOrgId = async () => {
    try {
      if (loggedUser) {
        setIsLoading(true);

        const res = await PLANT_SERVICES.getAllPlantsbyUserid(loggedUser.userId);

        const formattedData = res?.message.map((el: any) => {
          return {
            value: el.plantId,
            label: el.plantName,
          };
        });
        dispatch(setAllPlants(formattedData));
        if (!currentPlant && formattedData) {
          dispatch(setCurrentPlant(formattedData[0].value));
        }
        setPlantData(res?.message);
        setIsLoading(false);
        setPaginationData(res?.meta);
      }
    } catch {
      setIsLoading(false);
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
    setNewPlant((prev: any) => ({ ...prev, image: event[0], imageName: event[0].name }));
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

  // Clear button functionalities
  const handleClear = () => {
    setNewPlant(initialState);
    setFileName('');
    setImageURl('');
  };

  const columns = [
    {
      title: 'Business unit Name',
      dataIndex: 'plantName',
      key: 'name',
    },
    {
      title: 'Business unit Description',
      dataIndex: 'description',
      width: '20%',
      key: 'description',
    },
    {
      title: 'Business unit ID',
      dataIndex: 'plantId',
      width: '30%',
      key: 'id',
    },
    {
      title: 'Image',
      dataIndex: 'imageName',
      width: '20%',
      key: 'image',
      render: (image: any, img: any) => {
        return <Avatar shape="square" size={64} src={img.image} alt={image} />;
      },
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      width: '10%',
      key: 'actions',
      render: (_: any, data: any) => {
        return (
          <div className="flex justify-start gap-3">
            <AccessManager role={loggedUser?.role || 'USER'} category="Plant" accessNeeded="update">
              <div
                className="cursor-pointer"
                onClick={() => {
                  setNewPlant(data);
                  setEditPlant(true);
                }}
              >
                <PencilIcon className="w-[20px] h-[20px]" />
              </div>
            </AccessManager>
            <AccessManager role={loggedUser?.role || 'USER'} category="Plant" accessNeeded="delete">
              <div
                className="cursor-pointer"
                onClick={() => {
                  setShowDeleteUserModal(true);
                  setSelectedPlant(data?.plantId);
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

  async function createPlant() {
    const body = {
      image: newPlant.image,
      plantName: newPlant.plantName,
      description: newPlant.description,
      organizationId: data?.organizationId,
      imageName: newPlant.imageName,
    };
    const res = await PLANT_SERVICES.addPlant(body);
    if (res?.statusCode === 201) {
      handleClear();
      toast.success('Plant added successfully');
      fetchPlantDataByOrgId();
    }
  }

  const updatePlant = async () => {
    const body = {
      plantName: newPlant.plantName,
      description: newPlant.description,
      image: newPlant.image,
      imageName: newPlant.imageName,
    };
    const res = await PLANT_SERVICES.updatePlantbyId(data?.organizationId || '', newPlant.plantId, body);
    if (res.statusCode === 200) {
      fetchPlantDataByOrgId();
      handleClear();
      setEditPlant(false);
      setShowEditSuccessModal(true);
    }
  };

  const onCloseEditModal = () => {
    setShowEditSuccessModal(false);
  };

  return (
    <>
      <AccessManager role={loggedUser?.role || 'USER'} category="Plant" accessNeeded="add">
        <h2 className="text-[20px] text-[#444444] leading-5 font-medium mb-8">Add Business Unit</h2>
        <>
          <div className="flex justify-start items-center gap-[16px] mb-6">
            <Input
              className="w-[270px] border-[1px] h-[46px] px-3 rounded-[50px] border-[#A9A9A9] p-[16px] text-[14px]"
              placeholder="Name"
              type="text"
              value={editPlant ? '' : newPlant?.plantName}
              name="plantName"
              onChange={handleChange}
            />
            <Input
              className="w-[270px] border-[1px] h-[46px] px-3 rounded-[50px] border-[#A9A9A9] p-[16px] text-[14px]"
              placeholder="Description"
              type="text"
              name="description"
              value={editPlant ? '' : newPlant?.description}
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
              fileName={editPlant ? '' : fileName}
              image={editPlant ? '' : imageURL}
            />
          </div>
          <div className="flex justify-start flex-row w-full gap-4 mt-8 mb-8">
            <Button
              onClick={handleClear}
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
      </AccessManager>

      <>
        <Table
          columns={columns}
          dataSource={plantData}
          pagination={{
            pageSize: paginationData?.item_count,
            total: paginationData?.total_items,
            current: paginationData?.current_page,
            onChange: () => {
              fetchPlantDataByOrgId();
            },
          }}
          loading={{
            indicator: <Loader />,
            spinning: isLoading,
          }}
        />
      </>

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
              handleClear();
            }}
          >
            <ChevronCancelIcon />
          </div>

          <h2 className="text-[#605BFF] text-[24px] font-medium text-center mb-[36px]">Edit Business Unit</h2>

          <form>
            <div>
              <h4 className="text-[18px] text-[#0F0F0F] font-medium mb-4">Business Unit Details</h4>
              <Input
                className="w-[385px] h-[54px] rounded-[50px] border-[#444444] border-[1px] p-[20px] mb-4 mt-[10px]"
                label="Business Unit Name"
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
                label="Business Unit Description"
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
      {/*Success message modal*/}
      <PopupModal
        primaryMessage={'Done'}
        title={'Changes are done'}
        isOpen={showEditSuccessModal}
        icon={<ChevronSuccessIcon className="w-[100px] h-[100px]" />}
        primaryPopup
        handleClose={() => onCloseEditModal}
        onCloseSuccessModal={() => setShowEditSuccessModal(false)}
      />
      {/*Delete message modal*/}
      <PopupModal
        title={'Are you sure want to delete?'}
        isOpen={showDeleteUserModal}
        icon={<QuestionMarkIcon />}
        handleClose={() => setShowDeleteUserModal(false)}
        handleDelete={() => {
          onDeletePlant(data?.organizationId || '', selectedPlant);
        }}
        onCloseDeleteModal={() => {
          setShowDeleteUserModal(false);
        }}
      />
    </>
  );
}

export default Plant;
