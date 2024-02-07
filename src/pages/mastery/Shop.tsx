import { DeleteIcon, PencilIcon, QuestionMarkIcon, ChevronCancelIcon, ChevronSuccessIcon } from '@/assets/icons';
import { Button, FileUploader, Input, Modal } from '@/components';
import { FileUploadStatusType } from '@/components/reusable/fileuploader/types';
import Loader from '@/components/reusable/loader';
import PopupModal from '@/components/reusable/popupmodal/popupmodal';
import { Table } from '@/components/reusable/table';
import { useAppSelector } from '@/hooks';
import { SHOP_SERVICES } from '@/services/shopServices';
import { Avatar } from 'antd';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export type InitialShopStateType = {
  shopName: string;
  image: string;
  imageName: string;
  description: string;
  plantId: string;
  shopId: string;
};

type EditModalType = {
  closeEditModal: () => void;
  handleChange: (e: any) => void;
  handleFile: (e: any) => void;
  onEdit: () => void;
  newShop: InitialShopStateType;
  uploadStatus: FileUploadStatusType;
};

type PaginationDataType = {
  current_page: number;
  item_count?: number;
  totalPage?: number;
  total_items?: number;
};

// Edit Modal
const EditModal = ({ closeEditModal, handleChange, handleFile, onEdit, newShop, uploadStatus }: EditModalType) => {
  return (
    <div className="w-[485px] rounded-[16px] p-[50px] relative">
      <div className="absolute right-[10px] top-[10px] cursor-pointer" onClick={closeEditModal}>
        <ChevronCancelIcon />
      </div>

      <h2 className="text-[#605BFF] text-[24px] font-medium text-center mb-[36px]">Edit Details</h2>

      <form>
        <div>
          <h4 className="text-[18px] text-[#0F0F0F] font-medium mb-6">Organization Details</h4>
          <Input
            className="w-[385px] h-[54px] rounded-[50px] border-[#444444] border-[1px] p-[20px] mb-4 mt-[10px]"
            label="Shop Name"
            labelClassName="text-[#492CE1] text-[14px] font-medium"
            mandatory={true}
            type="text"
            name="shopName"
            placeholder="Enter Name"
            value={newShop?.shopName}
            onChange={handleChange}
          />
          <Input
            className="w-[385px] h-[54px] rounded-[50px] border-[#444444] border-[1px] p-[20px] mb-4 mt-[10px]"
            label="Shop Description"
            labelClassName="text-[#492CE1] text-[14px] font-medium"
            mandatory={true}
            type="text"
            name="description"
            placeholder="Enter Description"
            value={newShop?.description}
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
            image={newShop?.image}
            fileName={newShop.imageName}
          />
        </div>
        <div className="text-center mt-[36px]">
          <Button
            onClick={onEdit}
            variant="primary"
            label="Submit"
            className="py-[8px] px-[24px] rounded-[16px] font-normal text-[16px]"
          />
        </div>
      </form>
    </div>
  );
};

const Shop = () => {
  const initialState = {
    shopName: '',
    image: '',
    imageName: '',
    description: '',
    plantId: '',
    shopId: '',
  };

  // constants for file uploader
  const [uploadStatus, setUploadStatus] = useState<FileUploadStatusType>('upload');
  const [fileName, setFileName] = useState<string>('');
  const [imageURL, setImageURl] = useState<string>('');
  const { currentPlant } = useAppSelector((state) => state.plantRegistration);
  // constants to store plants and shops
  const [shopList, setShopList] = useState([]);

  // constants to store new shop details
  const [newShop, setNewShop] = useState<InitialShopStateType>(initialState);

  // constant to store a selected shop
  const [selectedShop, setSelectedShop] = useState<InitialShopStateType>(initialState);

  // constants to edit a shop
  // const [edit, setEdit] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showEditSuccessModal, setShowEditSuccessModal] = useState<boolean>(false);

  // constants to delete a shop
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  // constants for pagination
  const [paginationData, setPaginationData] = useState<PaginationDataType>({
    current_page: 1,
  });
  // constant to set loading state
  const [isLoading, setIsLoading] = useState(false);

  /* To get plants and shops */
  useEffect(() => {
    fetchAllShops(1);
  }, []);

  const fetchAllShops = async (page: number) => {
    setIsLoading(true);
    const res = await SHOP_SERVICES.getAllShopsByPlantId(currentPlant, page);
    setShopList(res?.message);
    setIsLoading(false);
    setPaginationData(res?.meta);
    if (res?.Error && paginationData?.current_page > 1) {
      fetchAllShops(paginationData?.current_page - 1);
    }
  };

  // const fetchAllPlants = async () => {
  //   const res = await PLANT_SERVICES.getAllPlantsbyUserid(loggedUser?.userId || '');
  //   setPlantList(res?.message);
  // };

  /* Columns and Data for table */
  const columns = [
    {
      title: 'Shop Name',
      dataIndex: 'shopName',
      key: 'shopName',
    },
    {
      title: 'Shop Description',
      dataIndex: 'description',
      width: '20%',
      key: 'description',
    },
    {
      title: 'Shop ID',
      dataIndex: 'shopId',
      width: '30%',
      key: 'shopId',
    },
    {
      title: 'Image',
      dataIndex: 'imageName',
      width: '20%',
      key: 'imageName',
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
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowEditModal(true);
                setNewShop(data);
              }}
            >
              <PencilIcon className="w-[20px] h-[20px]" />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setSelectedShop(data);
                setShowDeleteModal(true);
              }}
            >
              <DeleteIcon className="w-[20px] h-[20px]" />
            </div>
          </div>
        );
      },
    },
  ];

  /* Functions to create a new shop */
  // function to read input changes
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setNewShop((initialState: InitialShopStateType) => ({
      ...initialState,
      [name]: value,
    }));
  };

  // function to read a file
  const handleFile = async (event: any) => {
    setFileName(event[0].name);
    setUploadStatus('success');
    const base64String: any = await convertToBase64(event[0]);
    setNewShop((prev: any) => ({ ...prev, image: event[0], imageName: event[0].name }));
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

  // API call for adding a new shop
  const createShop = async () => {
    const body = {
      shopName: newShop.shopName,
      image: newShop.image,
      imageName: newShop.imageName,
      description: newShop.description,
      plantId: currentPlant,
    };

    const res = await SHOP_SERVICES.addShop(body);
    if (res.statusCode === 201) {
      setNewShop(initialState);
      setFileName('');
      setImageURl('');
      toast.success('Shop added successfully');
      fetchAllShops(1);
    }
  };

  /* functions for buttons */
  // Add button functionalities
  const disablingAdd = () => {
    return newShop.shopName && currentPlant && newShop.image ? false : true;
  };

  // Clear button functionalities
  const handleClear = () => {
    setNewShop(initialState);
    setFileName('');
    setImageURl('');
  };

  /* Functions to update a shop */

  // API call to edit a shop
  const editShop = async () => {
    if (newShop?.plantId && newShop.shopId) {
      const body = {
        shopName: newShop?.shopName,
        description: newShop?.description,
        image: newShop?.image,
        imageName: newShop?.imageName,
      };
      const res = await SHOP_SERVICES.updateShopById(newShop?.plantId, newShop.shopId, body);
      if (res.statusCode === 200) {
        handleClear();
        setShowEditModal(false);
        setShowEditSuccessModal(true);
        fetchAllShops(paginationData.current_page);
      }
    }
  };

  // function to do what happen while closing the search modal
  const closeEditModal = () => {
    setShowEditModal(false);
  };

  /* Functions to delete a shop */

  // API call to delete a shop
  const deleteShop = async (plantId: string, shopId: string) => {
    setShowDeleteModal(true);
    if (plantId && shopId) {
      const res = await SHOP_SERVICES.deleteShopById(plantId, shopId);
      toast.success(res.message);
      setShowDeleteModal(false);
      fetchAllShops(paginationData?.current_page);
    }
  };

  return (
    <div>
      <p className="text-xl text-[#444] font-medium leading-5 mb-8">Add Manufacturing Location</p>
      {/* Fields to get shop name, shop description and shop image */}
      <div className="flex items-center gap-[16px] mb-6">
        <Input
          placeholder="Name"
          className="w-[270px] border border-solid border-[#A9A9A9] rounded-[50px] p-4 text-[14px] leading-[14px] h-[46px] placeholder:text-[#BBBBBB]"
          onChange={handleChange}
          type="text"
          name="shopName"
          value={showEditModal ? '' : newShop.shopName}
          mandatory={true}
        />
        <Input
          placeholder="Description"
          className="w-[270px] border border-solid border-[#A9A9A9] rounded-[50px] p-4 text-[14px] leading-[14px] h-[46px] placeholder:text-[#BBBBBB]"
          onChange={handleChange}
          type="text"
          name="description"
          value={showEditModal ? '' : newShop.description}
          mandatory={true}
        />
        {/* <Dropdown
          placeholder="Select Plant"
          className="w-[270px] border-[1px] border-solid border-[#A9A9A9] rounded-[50px] py-4 px-5 text-[14px] leading-[14px] h-[46px] placeholder:text-[#BBBBBB]"
          options={plantList}
          optionLabel="plantName"
          handleChange={(value: any) => {
            setNewShop((prev: any) => ({ ...prev, plantId: value.plantId }));
          }}
          value={showEditModal ? '' : plantList?.find((plant: any) => plant?.plantId === newShop?.plantId)}
          mandatory={true}
        /> */}
      </div>

      {/* We can add shop images using uploader */}
      <FileUploader
        className="w-[560px] py-6"
        mastery
        fileFormat=".jpg, .png"
        handleFile={handleFile}
        uploadStatus={uploadStatus}
        fileName={showEditModal ? '' : fileName}
        image={showEditModal ? '' : imageURL}
      />

      {/* Buttons to clear data and add a shop */}
      <div className="flex gap-4 mt-8 mb-8">
        <Button
          variant="secondary"
          className="py-3 px-6 rounded-2xl tracking-[0.32px] text-base leading-4 font-medium"
          label="Clear"
          onClick={handleClear}
        />
        <Button
          variant="primary"
          className="py-3 px-6 rounded-2xl tracking-[0.32px] text-base leading-4 font-medium"
          label="Add"
          disabled={disablingAdd()}
          onClick={createShop}
        />
      </div>
      {/* Table for listing shops */}
      <>
        <Table
          columns={columns}
          dataSource={shopList}
          pagination={{
            pageSize: paginationData?.item_count,
            total: paginationData?.total_items,
            current: paginationData?.current_page,
            onChange: (page) => {
              fetchAllShops(page);
            },
          }}
          loading={{
            indicator: <Loader />,
            spinning: isLoading,
          }}
        />
      </>
      <Modal
        isOpen={showEditModal}
        onCancel={() => {
          setShowEditModal(false);
        }}
        className="z-[99]"
      >
        <EditModal
          closeEditModal={() => {
            handleClear();
            setShowEditModal(false);
          }}
          handleFile={handleFile}
          onEdit={editShop}
          handleChange={handleChange}
          newShop={newShop}
          uploadStatus={uploadStatus}
        />
      </Modal>
      {/*Success message modal*/}
      <PopupModal
        primaryMessage={'Done'}
        title={'Changes are done'}
        isOpen={showEditSuccessModal}
        icon={<ChevronSuccessIcon className="w-[100px] h-[100px]" />}
        primaryPopup
        handleClose={() => closeEditModal}
        onCloseSuccessModal={() => setShowEditSuccessModal(false)}
      />
      {/*Delete message modal*/}
      <PopupModal
        title={'Are you sure want to delete?'}
        isOpen={showDeleteModal}
        icon={<QuestionMarkIcon />}
        handleClose={() => setShowDeleteModal(false)}
        handleDelete={() => {
          deleteShop(selectedShop?.plantId, selectedShop?.shopId);
        }}
        onCloseDeleteModal={() => {
          setShowDeleteModal(false);
        }}
      />
    </div>
  );
};

export default Shop;
