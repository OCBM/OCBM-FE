import { DeleteIcon, PencilIcon, QuesionMarkIcon, ChevronCancelIcon, ChevronSuccessIcon } from '@/assets/icons';
import { Button, Dropdown, FileUploader, Input, Modal } from '@/components';
import { FileUploadStatusType } from '@/components/reusable/fileuploader/types';
import { Table } from '@/components/reusable/table';
import { PLANT_SERVICES } from '@/services/plantServices';
import { SHOP_SERVICES } from '@/services/shopServices';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export type DeleteShopType = {
  onCloseDeleteModal: () => void;
  deleteShop: () => void;
};

const Shop = () => {
  type InitialStateType = {
    shopName: string | undefined;
    image: string | undefined;
    imageName: string | undefined;
    description: string | undefined;
    plantId: string | undefined | any;
    shopId: string | undefined;
  };
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

  // constants to store plants and shops
  const [shopList, setShopList] = useState([]);
  const [plantList, setPlantList] = useState([]);

  // constants to store new shop details
  const [newShop, setNewShop] = useState<any>(initialState);

  // constant to store a selected shop
  const [selectedShop, setSelectedShop] = useState<any>(initialState);

  // constants to edit a shop
  // const [edit, setEdit] = useState<boolean>(false);
  const [showEditShopModal, setShowEditShopModal] = useState<boolean>(false);
  const [showEditSuccessModal, setShowEditSuccessModal] = useState<boolean>(false);

  // constants to delete a shop
  const [showDeleteShopModal, setShowDeleteShopModal] = useState<boolean>(false);

  /* To get plants and shops */
  useEffect(() => {
    fetchAllPlants();
    fetchAllShops();
  }, []);

  const fetchAllShops = async () => {
    const res = await SHOP_SERVICES.getAllShops();
    setShopList(res?.message);
  };

  const fetchAllPlants = async () => {
    const res = await PLANT_SERVICES.getAllPlants('9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d');
    setPlantList(res?.message);
  };

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
      key: 'description',
    },
    {
      title: 'Shop ID',
      dataIndex: 'shopId',
      key: 'shopId',
    },
    {
      title: 'Image',
      dataIndex: 'imageName',
      key: 'imageName',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, data: any) => {
        return (
          <div className="flex justify-start gap-3">
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowEditShopModal(true);
                setNewShop(data);
              }}
            >
              <PencilIcon className="w-[20px] h-[20px]" />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setSelectedShop(data);
                setShowDeleteShopModal(true);
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
    setNewShop((initialState: InitialStateType) => ({
      ...initialState,
      [name]: value,
    }));
  };

  // function to read a file
  const handleFile = async (event: any) => {
    setFileName(event[0].name);
    setUploadStatus('success');
    const base64String: any = await convertToBase64(event[0]);
    setNewShop((prev: any) => ({ ...prev, image: base64String, imageName: event[0].name }));
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
      plantId: newShop?.plantId?.plantId,
    };

    const res = await SHOP_SERVICES.addShop(body);
    if (res.statusCode === 201) {
      setNewShop(initialState);
      setFileName('');
      setImageURl('');
      toast.success('Shop added successfully');
      fetchAllShops();
    }
  };

  /* functions for buttons */
  const disablingAdd = () => {
    return newShop.shopName && newShop.plantId && newShop.image ? false : true;
  };

  const handleClear = () => {
    setNewShop(initialState);
    setFileName('');
    setImageURl('');
  };

  /* Functions to update a shop */
  const updateShop = async () => {
    if (newShop?.plantId && newShop.shopId) {
      const body = {
        shopName: newShop?.shopName,
        description: newShop?.description,
        image: newShop?.image,
        imageName: newShop?.imageName,
      };
      const res = await SHOP_SERVICES.updateShopById(newShop?.plantId, newShop.shopId, body);
      if (res.statusCode === 200) {
        setNewShop(initialState);
        setFileName('');
        setImageURl('');
        setShowEditShopModal(false);
        setShowEditSuccessModal(true);
        fetchAllShops();
      }
    }
  };

  // function to do what happen while closing the search modal
  const onCloseEditModal = () => {
    setShowEditShopModal(false);
  };

  /* Functions to delete a shop */

  // Delete Modal
  const DeleteShop = ({ onCloseDeleteModal, deleteShop }: DeleteShopType) => {
    return (
      <div className="w-[393px] rounded-[16px] py-[50px] px-[86px] relative">
        <div className="flex flex-col items-center justify-center">
          <QuesionMarkIcon />
          <h2 className="text-[24px] text-center text-[#272332] font-medium mt-2 mb-4">Are you sure want to delete?</h2>
          <div className="flex gap-[8px] justify-between">
            <Button
              label="Cancel"
              variant="secondary"
              className="rounded-[16px] text-[16px] font-medium text-[#605BFF] italic py-[8px] px-[24px] w-[104px]"
              onClick={onCloseDeleteModal}
            />
            <Button
              label="Yes"
              variant="primary"
              className="rounded-[16px] text-[16px] font-medium tex-[#ffffff] italic py-[8px] px-[24px] w-[104px]"
              onClick={deleteShop}
            />
          </div>
        </div>
      </div>
    );
  };

  // API call to delete a shop
  const onDeleteShop = async (plantId: string, shopId: string) => {
    setShowDeleteShopModal(true);
    if (plantId && shopId) {
      const res = await SHOP_SERVICES.deleteShopById(plantId, shopId);
      toast.success(res.message);
      setShowDeleteShopModal(false);
      fetchAllShops();
    }
  };

  return (
    <div>
      <Modal
        isOpen={showEditShopModal}
        onCancel={() => {
          setShowEditShopModal(false);
        }}
        className="z-[99]"
      >
        <div className="w-[485px] rounded-[16px] p-[50px] relative">
          <div
            className="absolute right-[10px] top-[10px] cursor-pointer"
            onClick={() => {
              setShowEditShopModal(false);
            }}
          >
            <ChevronCancelIcon />
          </div>

          <h2 className="text-[#605BFF] text-[24px] font-medium text-center mb-5">Edit Details</h2>

          <form>
            <div>
              <h4 className="text-[18px] text-[#0F0F0F] font-medium mb-4">Organization Details</h4>
              <Input
                className="w-[385px] h-[54px] rounded-[50px] border-[#444444] border-[1px] p-[20px] mb-5 mt-2"
                label="Shop Name"
                labelClassName="text-[#492CE1] text-[14px] font-medium"
                mandatory={true}
                type="text"
                name="shopName"
                placeholder="Enter Shop Name"
                value={newShop?.shopName}
                onChange={handleChange}
              />
              <Input
                className="w-[385px] h-[54px] rounded-[50px] border-[#444444] border-[1px] p-[20px] mb-5 mt-2"
                label="Shop Description"
                labelClassName="text-[#492CE1] text-[14px] font-medium"
                mandatory={true}
                type="text"
                name="description"
                placeholder="Enter Plant Description"
                value={newShop?.description}
                onChange={handleChange}
              />
              <FileUploader
                className="w-[385px] py-6 mt-2"
                mastery
                fileFormat=".jpg, .png"
                handleFile={handleFile}
                uploadStatus={uploadStatus}
                image={newShop?.image}
                fileName={newShop.imageName}
              />
            </div>
            <div className="text-center mt-3">
              <Button
                onClick={updateShop}
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
            <h2 className="text-[24px] text-center text-[#272332] font-medium mt-2 mb-4">Changes are done</h2>
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
      <Modal
        isOpen={showDeleteShopModal}
        onCancel={() => {
          setShowDeleteShopModal(false);
        }}
        className="z-[99]"
      >
        <DeleteShop
          deleteShop={() => {
            onDeleteShop(selectedShop.plantId, selectedShop?.shopId);
          }}
          onCloseDeleteModal={() => {
            setShowDeleteShopModal(false);
          }}
        />
      </Modal>
      <p className="text-xl font-medium leading-5 py-[10px] mb-8">Add Shop</p>
      {/* Fields to get shop name, shop description and shop image */}
      <div className="flex items-center justify-center gap-[16px] mb-6 ">
        {/* <Modal isOpen /> */}
        <Input
          placeholder="Shop Name"
          className="w-full border border-solid border-[#A9A9A9] rounded-[50px] p-4 text-[14px] leading-[14px] h-[46px] placeholder:text-[#BBBBBB]"
          onChange={handleChange}
          type="text"
          name="shopName"
          value={newShop.shopName}
          mandatory={true}
        />
        <Input
          placeholder="Shop Descriptions"
          className="w-full border border-solid border-[#A9A9A9] rounded-[50px] p-4 text-[14px] leading-[14px] h-[46px] placeholder:text-[#BBBBBB]"
          onChange={handleChange}
          type="text"
          name="description"
          value={newShop.description}
          mandatory={true}
        />
        <Dropdown
          placeholder="Select Plant"
          className="w-full border-[1px] border-solid border-[#A9A9A9] rounded-[50px] py-4 px-5 text-[14px] leading-[14px] h-[46px] placeholder:text-[#BBBBBB]"
          options={plantList}
          optionLabel="plantName"
          handleChange={(value) => {
            setNewShop((prev: any) => ({ ...prev, plantId: value }));
          }}
          value={newShop.plantId}
          mandatory={true}
        />
      </div>

      {/* We can add shop images using uploader */}
      <FileUploader
        className="w-[560px] py-6"
        mastery
        fileFormat=".jpg, .png"
        handleFile={handleFile}
        uploadStatus={uploadStatus}
        fileName={fileName}
        image={imageURL}
      />

      {/* Buttons to clear data and add a shop */}
      <div className="flex gap-4 mt-8 mb-8">
        <Button
          variant="secondary"
          className="py-3 px-6 rounded-2xl tracking-[0.32px] text-base leading-4 font-GothamMedium"
          label="Clear"
          onClick={handleClear}
        />
        <Button
          variant="primary"
          className="py-3 px-6 rounded-2xl tracking-[0.32px] text-base leading-4 font-GothamMedium"
          label="Add"
          disabled={disablingAdd()}
          onClick={createShop}
        />
      </div>
      {/* Table for listing shops */}
      <Table columns={columns} dataSource={shopList} />
    </div>
  );
};

export default Shop;
