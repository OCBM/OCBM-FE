import { DeleteIcon, PencilIcon, QuestionMarkIcon, ChevronCancelIcon, ChevronSuccessIcon } from '@/assets/icons';
import { Button, Dropdown, FileUploader, Input, Modal } from '@/components';
import { FileUploadStatusType } from '@/components/reusable/fileuploader/types';
import { Table } from '@/components/reusable/table';
import { MACHINE_LINE_SERVICES } from '@/services/machineLineServices';
import { MACHINE_SERVICES } from '@/services/machineServices';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export type DeleteMachineType = {
  onCloseDeleteModal: () => void;
  deleteMachine: () => void;
};

const Machine = () => {
  type InitialStateType = {
    machineName: string;
    image: string;
    imageName: string;
    machineDescription: string;
    machineLineId: string;
    machineId: string;
  };
  const initialState = {
    machineName: '',
    image: '',
    imageName: '',
    machineDescription: '',
    machineLineId: '',
    machineId: '',
  };

  // constants for file uploader
  const [uploadStatus, setUploadStatus] = useState<FileUploadStatusType>('upload');
  const [fileName, setFileName] = useState<string>('');
  const [imageURL, setImageURl] = useState<string>('');

  // constants to store machineLines and Machines
  const [machineList, setMachineList] = useState([]);
  const [machineLineList, setMachineLineList] = useState([]);

  // constants to store new Machine details
  const [newMachine, setNewMachine] = useState<InitialStateType>(initialState);

  // constant to store a selected Machine
  const [selectedMachine, setSelectedMachine] = useState<InitialStateType>(initialState);

  // constants to edit a Machine
  const [showEditMachineModal, setShowEditMachineModal] = useState<boolean>(false);
  const [showEditSuccessModal, setShowEditSuccessModal] = useState<boolean>(false);

  // constants to delete a Machine
  const [showDeleteMachineModal, setShowDeleteMachineModal] = useState<boolean>(false);

  /* To get machineLines and Machines */
  useEffect(() => {
    fetchAllMachineLines();
    fetchAllMachines();
  }, []);

  const fetchAllMachines = async () => {
    const res = await MACHINE_SERVICES.getAllMachines();
    setMachineList(res?.message);
    console.log(res?.message, 'res');
  };

  const fetchAllMachineLines = async () => {
    const res = await MACHINE_LINE_SERVICES.getAllMachineLine();
    setMachineLineList(res?.message);
  };

  /* Columns and Data for table */
  const columns = [
    {
      title: 'Machine Name',
      dataIndex: 'machineName',
      key: 'machineName',
    },
    {
      title: 'Machine Description',
      dataIndex: 'machineDescription',
      key: 'machineDescription',
    },
    {
      title: 'Machine ID',
      dataIndex: 'machineId',
      key: 'machineId',
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
                setShowEditMachineModal(true);
                setNewMachine(data);
              }}
            >
              <PencilIcon className="w-[20px] h-[20px]" />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setSelectedMachine(data);
                setShowDeleteMachineModal(true);
              }}
            >
              <DeleteIcon className="w-[20px] h-[20px]" />
            </div>
          </div>
        );
      },
    },
  ];

  /* Functions to create a new Machine */
  // function to read input changes
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setNewMachine((initialState: InitialStateType) => ({
      ...initialState,
      [name]: value,
    }));
  };

  // function to read a file
  const handleFile = async (event: any) => {
    setFileName(event[0].name);
    setUploadStatus('success');
    const base64String: any = await convertToBase64(event[0]);
    setNewMachine((prev: any) => ({ ...prev, image: base64String, imageName: event[0].name }));
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

  // API call for adding a new Machine
  const createMachine = async () => {
    const body = {
      machineName: newMachine.machineName,
      image: newMachine.image,
      imageName: newMachine.imageName,
      machineDescription: newMachine.machineDescription,
      machineLineId: newMachine?.machineLineId,
    };

    const res = await MACHINE_SERVICES.addMachine(body);
    if (res.statusCode === 201) {
      setNewMachine(initialState);
      setFileName('');
      setImageURl('');
      toast.success('Machine added successfully');
      fetchAllMachines();
    }
  };

  /* functions for buttons */
  const disablingAdd = () => {
    return newMachine.machineName && newMachine.machineLineId && newMachine.image ? false : true;
  };

  const handleClear = () => {
    setNewMachine(initialState);
    setFileName('');
    setImageURl('');
  };

  /* Functions to update a Machine */
  const updateMachine = async () => {
    const body = {
      machineName: newMachine?.machineName,
      machineDescription: newMachine?.machineDescription,
      image: newMachine?.image,
      imageName: newMachine?.imageName,
    };
    const res = await MACHINE_SERVICES.updateMachineById(newMachine?.machineLineId, newMachine?.machineId, body);
    if (res.statusCode === 200) {
      handleClear();
      setShowEditMachineModal(false);
      setShowEditSuccessModal(true);
      fetchAllMachines();
    }
  };

  // function to do what happen while closing the search modal
  const onCloseEditModal = () => {
    setShowEditMachineModal(false);
  };

  /* Functions to delete a Machine */

  // Delete Modal
  const DeleteMachine = ({ onCloseDeleteModal, deleteMachine }: DeleteMachineType) => {
    return (
      <div className="w-[393px] rounded-[16px] py-[50px] px-[86px] relative">
        <div className="flex flex-col items-center justify-center">
          <QuestionMarkIcon />
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
              onClick={deleteMachine}
            />
          </div>
        </div>
      </div>
    );
  };

  // API call to delete a Machine
  const onDeleteMachine = async (machineLineId: string, machineId: string) => {
    setShowDeleteMachineModal(true);
    console.log(machineLineId, 'mlid');
    console.log(machineId, 'mid');
    if (machineLineId && machineId) {
      const res = await MACHINE_SERVICES.deleteMachineById(machineLineId, machineId);
      toast.success(res.message);
      setShowDeleteMachineModal(false);
      fetchAllMachines();
    }
  };

  return (
    <div>
      <Modal
        isOpen={showEditMachineModal}
        onCancel={() => {
          setShowEditMachineModal(false);
        }}
        className="z-[99]"
      >
        <div className="w-[485px] rounded-[16px] p-[50px] relative">
          <div
            className="absolute right-[10px] top-[10px] cursor-pointer"
            onClick={() => {
              setShowEditMachineModal(false);
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
                label="Machine Name"
                labelClassName="text-[#492CE1] text-[14px] font-medium"
                mandatory={true}
                type="text"
                name="machineName"
                placeholder="Enter Machine Name"
                value={newMachine?.machineName}
                onChange={handleChange}
              />
              <Input
                className="w-[385px] h-[54px] rounded-[50px] border-[#444444] border-[1px] p-[20px] mb-5 mt-2"
                label="Machine Description"
                labelClassName="text-[#492CE1] text-[14px] font-medium"
                mandatory={true}
                type="text"
                name="machineDescription"
                placeholder="Enter machineLine Description"
                value={newMachine?.machineDescription}
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
                image={newMachine?.image}
                fileName={newMachine.imageName}
              />
            </div>
            <div className="text-center mt-3">
              <Button
                onClick={updateMachine}
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
        isOpen={showDeleteMachineModal}
        onCancel={() => {
          setShowDeleteMachineModal(false);
        }}
        className="z-[99]"
      >
        <DeleteMachine
          deleteMachine={() => {
            onDeleteMachine(selectedMachine?.machineLineId || '', selectedMachine?.machineId || '');
          }}
          onCloseDeleteModal={() => {
            setShowDeleteMachineModal(false);
          }}
        />
      </Modal>
      <p className="text-xl font-medium leading-5 mb-8">Add Machine</p>
      {/* Fields to get Machine name, Machine description and Machine image */}
      <div className="flex items-center justify-between gap-[16px] mb-6">
        <Input
          placeholder="Machine Name"
          className="w-[270px] border border-solid border-[#A9A9A9] rounded-[50px] p-4 text-[14px] leading-[14px] h-[46px] placeholder:text-[#BBBBBB]"
          onChange={handleChange}
          type="text"
          name="machineName"
          value={newMachine.machineName}
          mandatory={true}
        />
        <Input
          placeholder="Machine Descriptions"
          className="w-[270px] border border-solid border-[#A9A9A9] rounded-[50px] p-4 text-[14px] leading-[14px] h-[46px] placeholder:text-[#BBBBBB]"
          onChange={handleChange}
          type="text"
          name="machineDescription"
          value={newMachine.machineDescription}
          mandatory={true}
        />
        <Dropdown
          placeholder="Select machineLine"
          className="w-[270px] border-[1px] border-solid border-[#A9A9A9] rounded-[50px] py-4 px-5 text-[14px] leading-[14px] h-[46px] placeholder:text-[#BBBBBB]"
          options={machineLineList}
          optionLabel="machineLineName"
          handleChange={(value: any) => {
            setNewMachine((prev: any) => ({ ...prev, machineLineId: value?.machineLineId }));
          }}
          value={
            showEditMachineModal
              ? ''
              : machineLineList.find((machineLine: any) => machineLine.machineLineId === newMachine.machineLineId)
          }
          mandatory={true}
        />
      </div>

      {/* We can add Machine images using uploader */}
      <FileUploader
        className="w-[560px] py-6"
        mastery
        fileFormat=".jpg, .png"
        handleFile={handleFile}
        uploadStatus={uploadStatus}
        fileName={fileName}
        image={imageURL}
      />

      {/* Buttons to clear data and add a Machine */}
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
          onClick={createMachine}
        />
      </div>
      {/* Table for listing Machines */}
      <Table columns={columns} dataSource={machineList} />
    </div>
  );
};

export default Machine;
