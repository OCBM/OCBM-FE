import { ChevronCancelIcon, ChevronSuccessIcon, DeleteIcon, PencilIcon, QuestionMarkIcon } from '@/assets/icons';
import { Button, Dropdown, FileUploader, Input, Modal } from '@/components';
import { FileUploadStatusType } from '@/components/reusable/fileuploader/types';
import Loader from '@/components/reusable/loader';
import PopupModal from '@/components/reusable/popupmodal/popupmodal';
import { Table } from '@/components/reusable/table';
import { MACHINE_LINE_SERVICES } from '@/services/machineLineServices';
import { SHOP_SERVICES } from '@/services/shopServices';
import { useState, useEffect } from 'react';
import { Avatar } from 'antd';
import { toast } from 'react-toastify';

const MachineLine = () => {
  type InitialStateType = {
    machineLineName: string;
    machineLineId: any;
    image: string;
    imageName: string;
    description: string;
    shopId: any;
    machineLineDescription: string;
  };
  const initialState = {
    machineLineName: '',
    machineLineId: '',
    image: '',
    imageName: '',
    description: '',
    shopId: '',
    machineLineDescription: '',
  };
  type PaginationDataType = {
    current_page: number;
    item_count?: number;
    totalPage?: number;
    total_items?: number;
  };

  const [upload, setUpload] = useState<FileUploadStatusType>('upload');
  const [newMachineLine, setNewMachineLine] = useState<InitialStateType>(initialState);
  const [selectedMachineLine, setSelectedMachineLine] = useState<InitialStateType>(initialState);
  const [fileName, setFileName] = useState<string>('');
  const [imageURL, setImageURl] = useState<string>('');
  const [shopList, setShopList] = useState([]);
  const [machineLineList, setMachineLineList] = useState([]);
  const [showDeleteMachineLineModal, setShowDeleteMachineLineModal] = useState<boolean>(false);
  const [showEditMachineLineModal, setShowEditMachineLineModal] = useState<boolean>(false);
  const [showEditSuccessModal, setShowEditSuccessModal] = useState<boolean>(false);
  const [paginationData, setPaginationData] = useState<PaginationDataType>({
    current_page: 1,
  });
  const [isLoading, setIsLoading] = useState(false);

  //useEffect for shops and machine line api fetch
  useEffect(() => {
    fetchAllMachineLine(1);
    fetchAllShops();
  }, []);
  //all machine line api fetch
  const fetchAllMachineLine = async (page: number) => {
    setIsLoading(true);
    const res = await MACHINE_LINE_SERVICES.getAllMachineLine(page);
    setMachineLineList(res?.message);
    setIsLoading(false);
    setPaginationData(res?.meta);
    if (res?.Error && paginationData?.current_page > 1) {
      fetchAllMachineLine(paginationData?.current_page - 1);
    }
  };

  //all shops api fetch
  const fetchAllShops = async () => {
    const res = await SHOP_SERVICES.getAllShops();
    setShopList(res?.message);
  };

  //DATA FOR MACHINE LINE TABLE
  const tableData = [
    {
      title: 'Machine line Name',
      key: 'machineLineName',
      dataIndex: 'machineLineName',
    },
    {
      title: 'Machine line Description',
      key: 'machineLineDescription',
      width: '20%',
      dataIndex: 'machineLineDescription',
    },
    {
      title: 'Machine line ID',
      key: 'machineLineId',
      width: '30%',
      dataIndex: 'machineLineId',
    },
    {
      title: 'Image',
      key: 'imageName',
      width: '20%',
      dataIndex: 'imageName',
      render: (image: any, img: any) => {
        return <Avatar shape="square" size={64} src={img.image} alt={image} />;
      },
    },
    {
      title: 'Actions',
      key: 'action',
      width: '10%',
      dataIndex: 'action',
      render: (_: any, data: any) => {
        return (
          <div className="flex justify-start gap-3">
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowEditMachineLineModal(true);
                setNewMachineLine(data);
              }}
            >
              <PencilIcon className="w-[20px] h-[20px]" />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setSelectedMachineLine(data);
                setShowDeleteMachineLineModal(true);
              }}
            >
              <DeleteIcon className="w-[20px] h-[20px]" />
            </div>
          </div>
        );
      },
    },
  ];

  //FUNCTIONS
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setNewMachineLine((initialState: InitialStateType) => ({
      ...initialState,
      [name]: value,
    }));
  };

  const handleFile = async (event: any) => {
    setFileName(event[0].name);
    setUpload('success');
    const base64String: any = await convertToBase64(event[0]);
    setNewMachineLine((prev: any) => ({ ...prev, image: event[0], imageName: event[0].name }));
    setImageURl(base64String);
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

  const disablingAdd = () => {
    return newMachineLine.machineLineName && newMachineLine?.shopId && newMachineLine.image ? false : true;
  };

  const handleClear = () => {
    setNewMachineLine(initialState);
    setFileName('');
    setImageURl('');
  };

  const onCloseEditModal = () => {
    setShowEditMachineLineModal(false);
  };

  //API CALLS
  //update Machine Line
  const updateMachineLine = async () => {
    if (newMachineLine?.shopId) {
      const body = {
        machineLineName: newMachineLine.machineLineName,
        machineLineDescription: newMachineLine.machineLineDescription,
        image: newMachineLine.image,
        imageName: newMachineLine.imageName,
      };
      const res = await MACHINE_LINE_SERVICES.updateMachineLineById(
        newMachineLine?.machineLineId,
        newMachineLine?.shopId,
        body,
      );
      if (res.statusCode === 200) {
        handleClear();
        setShowEditMachineLineModal(false);
        setShowEditSuccessModal(true);
        fetchAllMachineLine(paginationData?.current_page);
      }
    }
  };

  //delete machine line
  const onDeleteMachineLine = async (shopId: string, machineLineId: string) => {
    setShowDeleteMachineLineModal(true);
    if (shopId && machineLineId) {
      const res = await MACHINE_LINE_SERVICES.deleteMachineLineById(machineLineId, shopId);
      toast.success(res.message);
      setShowDeleteMachineLineModal(false);
      fetchAllMachineLine(paginationData?.current_page);
    }
  };
  //create machine line
  const createMachineLine = async () => {
    const body = {
      machineLineName: newMachineLine.machineLineName,
      image: newMachineLine.image,
      imageName: newMachineLine.imageName,
      machineLineDescription: newMachineLine.description,
      shopId: newMachineLine?.shopId,
    };

    const res = await MACHINE_LINE_SERVICES.addMachineLine(body);
    if (res.statusCode === 201) {
      handleClear();
      toast.success('Machine Line added successfully');
      fetchAllMachineLine(1);
    }
  };

  return (
    <div>
      <p className="text-xl text-[#444] font-medium leading-5 mb-8">Add Machine Line</p>
      <div className="flex items-center gap-[16px] mb-6">
        <Input
          placeholder="Machine line Name"
          className="w-[270px] border border-solid border-[#A9A9A9] rounded-[50px] p-4 text-[14px] leading-[14px] h-[46px] placeholder:text-[#BBBBBB]"
          onChange={handleChange}
          type="text"
          name="machineLineName"
          value={showEditMachineLineModal ? '' : newMachineLine?.machineLineName}
          mandatory={true}
        />
        <Input
          placeholder="Machine line description"
          className="w-[270px] border border-solid border-[#A9A9A9] rounded-[50px] p-4 text-[14px] leading-[14px] h-[46px] placeholder:text-[#BBBBBB]"
          name="description"
          type="text"
          onChange={handleChange}
          value={showEditMachineLineModal ? '' : newMachineLine?.description}
          mandatory={true}
        />
        <Dropdown
          placeholder="Select Shop"
          className="w-[270px] border-[1px] border-solid border-[#A9A9A9] rounded-[50px] py-4 px-5 text-[14px] leading-[14px] h-[46px] placeholder:text-[#BBBBBB]"
          options={shopList}
          handleChange={(value: any) => {
            setNewMachineLine((prev: any) => ({ ...prev, shopId: value?.shopId }));
          }}
          optionLabel="shopName"
          value={shopList?.find((shop: any) => shop.shopId === newMachineLine.shopId)}
          mandatory={true}
        />
      </div>
      <FileUploader
        className="w-[560px] py-6"
        mastery
        fileFormat=".jpg, .png"
        handleFile={handleFile}
        uploadStatus={upload}
        fileName={showEditMachineLineModal ? '' : fileName}
        image={showEditMachineLineModal ? '' : imageURL}
      />
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
          onClick={createMachineLine}
        />
      </div>
      <>
        <Table
          columns={tableData}
          dataSource={machineLineList}
          pagination={{
            pageSize: paginationData?.item_count,
            total: paginationData?.total_items,
            current: paginationData?.current_page,
            onChange: (page) => {
              fetchAllMachineLine(page);
            },
          }}
          loading={{
            indicator: <Loader />,
            spinning: isLoading,
          }}
        />
      </>
      {/*Edit Modal for machine Line*/}
      <Modal
        isOpen={showEditMachineLineModal}
        onCancel={() => {
          setShowEditMachineLineModal(false);
        }}
        className="z-[99]"
      >
        <div className="w-[485px] rounded-[16px] p-[50px] relative">
          <div
            className="absolute right-[10px] top-[10px] cursor-pointer"
            onClick={() => {
              setShowEditMachineLineModal(false);
              handleClear();
            }}
          >
            <ChevronCancelIcon />
          </div>
          <h2 className="text-[#605BFF] text-[24px] font-medium text-center mb-[36px]">Edit Details</h2>
          <form>
            <div>
              <h4 className="text-[18px] text-[#0F0F0F] font-medium mb-6">Organization Details</h4>
              <Input
                className="w-[385px] h-[54px] rounded-[50px] border-[#444444] border-[1px] p-[20px] mb-4 mt-[10px]"
                label="Machine Line Name"
                labelClassName="text-[#492CE1] text-[14px] font-medium"
                mandatory={true}
                type="text"
                name="machineLineName"
                placeholder="Enter Machine Line Name"
                value={newMachineLine?.machineLineName}
                onChange={handleChange}
              />
              <Input
                className="w-[385px] h-[54px] rounded-[50px] border-[#444444] border-[1px] p-[20px] mb-4 mt-[10px]"
                label="Machine Line Description"
                labelClassName="text-[#492CE1] text-[14px] font-medium"
                mandatory={true}
                type="text"
                name="machineLineDescription"
                placeholder="Enter Machine Line Description"
                value={newMachineLine?.machineLineDescription}
                onChange={handleChange}
              />
              <FileUploader
                label="Image"
                labelClassName="text-[#492CE1] text-[14px] font-medium"
                className="w-[385px] py-6 mt-2"
                mastery
                fileFormat=".jpg, .png"
                handleFile={handleFile}
                uploadStatus={upload}
                image={newMachineLine?.image}
                fileName={newMachineLine.imageName}
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
        handleClose={() => onCloseEditModal}
        onCloseSuccessModal={() => setShowEditSuccessModal(false)}
      />
      {/*Delete message modal*/}
      <PopupModal
        title={'Are you sure want to delete?'}
        isOpen={showDeleteMachineLineModal}
        icon={<QuestionMarkIcon />}
        handleClose={() => setShowDeleteMachineLineModal(false)}
        handleDelete={() => {
          onDeleteMachineLine(selectedMachineLine?.shopId, selectedMachineLine?.machineLineId);
        }}
        onCloseDeleteModal={() => {
          setShowDeleteMachineLineModal(false);
        }}
      />
    </div>
  );
};
export default MachineLine;
