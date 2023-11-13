import { ChevronCancelIcon, ChevronSuccessIcon, DeleteIcon, PencilIcon, QuesionMarkIcon } from '@/assets/icons';
import { Button, Dropdown, FileUploader, Input, Modal } from '@/components';
import { FileUploadStatusType } from '@/components/reusable/fileuploader/types';
import { Table } from '@/components/reusable/table';
import { MACHINE_LINE_SERVICES } from '@/services/machineLineServices';
import { SHOP_SERVICES } from '@/services/shopServices';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
export type DeleteMachineLineType = {
  onCloseDeleteModal: () => void;
  deleteMachineLine: () => void;
};
const MachineLine = () => {
  type InitialStateType = {
    machineLineName: string;
    machineLineId: any;
    image: string;
    imageName: string;
    description: string;
    shopId: string;
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

  const [upload, setUpload] = useState<FileUploadStatusType>('upload');
  const [newMachineLine, setNewMachineLine] = useState<InitialStateType>(initialState);
  const [selectedMachineLine, setSelectedMachineLine] = useState<InitialStateType>(initialState);
  const [fileName, setFileName] = useState<string>('');
  const [imageURL, setImageURl] = useState<string>('');
  const [shopList, setShopList] = useState([]);
  const [machinelineList, setMachinelineList] = useState([]);
  const [showDeleteMachineLineModal, setShowDeleteMachineLineModal] = useState<boolean>(false);
  const [showEditMachineLineModal, setShowEditMachineLineModal] = useState<boolean>(false);
  const [showEditSuccessModal, setShowEditSuccessModal] = useState<boolean>(false);

  //useEffect for shops and machine line api fetch
  useEffect(() => {
    fetchAllMachineline();
    fetchAllShops();
  }, []);
  //all machine line api fetch
  const fetchAllMachineline = async () => {
    const res = await MACHINE_LINE_SERVICES.getAllMachineLine();
    setMachinelineList(res?.message);
  };

  //all shops api fetch
  const fetchAllShops = async () => {
    const res = await SHOP_SERVICES.getAllShops();
    setShopList(res?.message);
  };

  //DATA FOR MACHINELINE TABLE
  const tableData = [
    {
      title: 'Machine line Name',
      key: 'machineLineName',
      dataIndex: 'machineLineName',
    },
    {
      title: 'Machine line Description',
      key: 'machineLineDescription',
      dataIndex: 'machineLineDescription',
    },
    {
      title: 'Machine line ID',
      key: 'machineLineId',
      dataIndex: 'machineLineId',
    },
    {
      title: 'Image',
      key: 'imageName',
      dataIndex: 'imageName',
    },
    {
      title: 'Actions',
      key: 'action',
      dataIndex: 'action',
      render: (_: any, data: any) => {
        return (
          <div className="flex justify-start gap-3">
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowEditMachineLineModal(true);
                setNewMachineLine(data);
                console.log(data);
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
    setNewMachineLine((prev: any) => ({ ...prev, image: base64String, imageName: event[0].name }));
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
        setNewMachineLine(initialState);
        setFileName('');
        setImageURl('');
        setShowEditMachineLineModal(false);
        setShowEditSuccessModal(true);
        fetchAllMachineline();
      }
    }
  };

  //delete machine line
  const onDeleteMachineline = async (shopId: string, machineLineId: string) => {
    setShowDeleteMachineLineModal(true);
    if (shopId && machineLineId) {
      const res = await MACHINE_LINE_SERVICES.deleteMachinelineById(machineLineId, shopId);
      toast.success(res.message);
      setShowDeleteMachineLineModal(false);
      fetchAllMachineline();
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
      setNewMachineLine(initialState);
      setFileName('');
      setImageURl('');
      toast.success('Shop added successfully');
      fetchAllMachineline();
    }
  };

  //Delete popupmodal component
  const DeleteMachineLine = ({ onCloseDeleteModal, deleteMachineLine }: DeleteMachineLineType) => {
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
              onClick={deleteMachineLine}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
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
                className="w-[385px] h-[54px] rounded-[50px] border-[#444444] border-[1px] p-[20px] mb-5 mt-2"
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
                className="w-[385px] py-6 mt-2"
                mastery
                fileFormat=".jpg, .png"
                handleFile={handleFile}
                uploadStatus={upload}
                image={newMachineLine?.image}
                fileName={newMachineLine.imageName}
              />
            </div>
            <div className="text-center mt-3">
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
      {/*Delete message modal*/}
      <Modal
        isOpen={showDeleteMachineLineModal}
        onCancel={() => {
          setShowDeleteMachineLineModal(false);
        }}
        className="z-[99]"
      >
        <DeleteMachineLine
          deleteMachineLine={() => {
            onDeleteMachineline(selectedMachineLine?.shopId, selectedMachineLine?.machineLineId);
          }}
          onCloseDeleteModal={() => {
            setShowDeleteMachineLineModal(false);
          }}
        />
      </Modal>
      <p className="text-xl font-medium leading-5 py-[10px] mb-8">Add Machine Line</p>
      <div className="flex items-center justify-center gap-[16px] mb-6">
        <Input
          placeholder="Machine line Name"
          className="w-full border border-solid border-[#A9A9A9] rounded-[50px] p-4 text-[14px] leading-[14px] h-[46px] placeholder:text-[#BBBBBB]"
          onChange={handleChange}
          type="text"
          name="machineLineName"
          value={newMachineLine.machineLineName}
          mandatory={true}
        />
        <Input
          placeholder="Machine line descriptions"
          className="w-full border border-solid border-[#A9A9A9] rounded-[50px] p-4 text-[14px] leading-[14px] h-[46px] placeholder:text-[#BBBBBB]"
          name="description"
          type="text"
          onChange={handleChange}
          value={newMachineLine.description}
          mandatory={true}
        />
        <Dropdown
          placeholder="Select Shop"
          className="w-full border-[1px] border-solid border-[#A9A9A9] rounded-[50px] py-4 px-5 text-[14px] leading-[14px] h-[46px] placeholder:text-[#BBBBBB]"
          options={shopList}
          handleChange={(value) => {
            setNewMachineLine((prev: any) => ({ ...prev, shopId: value }));
          }}
          optionLabel="shopName"
          value={newMachineLine.shopId}
          mandatory={true}
        />
      </div>
      <FileUploader
        className="w-[560px] py-6"
        mastery
        fileFormat=".jpg, .png"
        handleFile={handleFile}
        uploadStatus={upload}
        fileName={fileName}
        image={imageURL}
      />
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
          onClick={createMachineLine}
        />
      </div>
      <Table columns={tableData} dataSource={machinelineList} />
    </div>
  );
};
export default MachineLine;
