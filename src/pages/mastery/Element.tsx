import { DeleteIcon, PencilIcon, QuestionMarkIcon, ChevronCancelIcon, ChevronSuccessIcon } from '@/assets/icons';
import { Button, Dropdown, FileUploader, Input, Modal } from '@/components';
import { FileUploadStatusType } from '@/components/reusable/fileuploader/types';
import { Table } from '@/components/reusable/table';
import { MACHINE_SERVICES } from '@/services/machineServices';
import { ELEMENT_SERVICES } from '@/services/elementServices';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '@/components/reusable/loader';
import { Avatar } from 'antd';
import PopupModal from '@/components/reusable/popupmodal/popupmodal';
import { useAppSelector } from '@/hooks';

export type DeleteElementType = {
  onCloseDeleteModal: () => void;
  deleteElement: () => void;
};

type EditModalType = {
  closeEditModal: () => void;
  handleChange: (e: any) => void;
  handleFile: (e: any) => void;
  onEdit: () => void;
  newElement: InitialElementStateType;
  uploadStatus: FileUploadStatusType;
};

type InitialElementStateType = {
  elementName: string;
  image: string;
  imageName: string;
  elementDescription: string;
  machineId: string;
  elementId: string;
};

type PaginationDataType = {
  current_page: number;
  item_count?: number;
  totalPage?: number;
  total_items?: number;
};

// Edit Modal
const EditModal = ({ closeEditModal, handleChange, handleFile, onEdit, newElement, uploadStatus }: EditModalType) => {
  return (
    <div className="w-[485px] rounded-[16px] p-[50px] relative">
      <div className="absolute right-[10px] top-[10px] cursor-pointer" onClick={closeEditModal}>
        <ChevronCancelIcon />
      </div>

      <h2 className="text-[#605BFF] text-[24px] font-medium text-center mb-[36px]">Edit Element</h2>

      <form>
        <div>
          <h4 className="text-[18px] text-[#0F0F0F] font-medium mb-6">Element Details</h4>
          <Input
            className="w-[385px] h-[54px] rounded-[50px] border-[#444444] border-[1px] p-[20px] mb-4 mt-[10px]"
            label="Element Name"
            labelClassName="text-[#492CE1] text-[14px] font-medium"
            mandatory={true}
            type="text"
            name="elementName"
            placeholder="Enter Element Name"
            value={newElement?.elementName}
            onChange={handleChange}
          />
          <Input
            className="w-[385px] h-[54px] rounded-[50px] border-[#444444] border-[1px] p-[20px] mb-4 mt-[10px]"
            label="Element Description"
            labelClassName="text-[#492CE1] text-[14px] font-medium"
            mandatory={true}
            type="text"
            name="elementDescription"
            placeholder="Enter Element Description"
            value={newElement?.elementDescription}
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
            image={newElement?.image}
            fileName={newElement?.imageName}
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

const Element = () => {
  const initialState = {
    elementName: '',
    image: '',
    imageName: '',
    elementDescription: '',
    machineId: '',
    elementId: '',
  };
  const { currentPlant } = useAppSelector((state) => state.plantRegistration);
  // constants for file uploader
  const [uploadStatus, setUploadStatus] = useState<FileUploadStatusType>('upload');
  const [fileName, setFileName] = useState<string>('');
  const [imageURL, setImageURl] = useState<string>('');

  // constants to store elements and machines
  const [elementList, setElementList] = useState([]);
  const [machineList, setMachineList] = useState([]);

  // constants to store new element details
  const [newElement, setNewElement] = useState<InitialElementStateType>(initialState);

  // constant to store a selected element
  const [selectedElement, setSelectedElement] = useState<InitialElementStateType>(initialState);

  // constants to edit a element
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showEditSuccessModal, setShowEditSuccessModal] = useState<boolean>(false);

  // constants to delete a element
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  // constants for pagination
  const [paginationData, setPaginationData] = useState<PaginationDataType>({
    current_page: 1,
  });
  // constants to set loading state
  const [isLoading, setIsLoading] = useState(false);

  /* To get elements and machines */
  useEffect(() => {
    fetchAllMachines();
    fetchAllElements(1);
  }, []);

  const fetchAllMachines = async () => {
    const res = await MACHINE_SERVICES.getAllMachinesByPlantId(currentPlant);
    setMachineList(res?.message);
  };

  const fetchAllElements = async (page: number) => {
    setIsLoading(true);
    const res = await ELEMENT_SERVICES.getAllElementsByPlantId(currentPlant, page);
    setElementList(res?.message);
    setIsLoading(false);
    setPaginationData(res?.meta);
    if (res?.Error && paginationData?.current_page > 1) {
      fetchAllElements(paginationData?.current_page - 1);
    }
  };

  /* Columns and Data for table */
  const columns = [
    {
      title: 'Element Name',
      dataIndex: 'elementName',
      key: 'elementName',
    },
    {
      title: 'Element Description',
      dataIndex: 'elementDescription',
      width: '20%',
      key: 'elementDescription',
    },
    {
      title: 'Element ID',
      dataIndex: 'elementId',
      width: '30%',
      key: 'elementId',
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
                setNewElement(data);
              }}
            >
              <PencilIcon className="w-[20px] h-[20px]" />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setSelectedElement(data);
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

  /* Functions to create a new element */
  // function to read input changes
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setNewElement((initialState: InitialElementStateType) => ({
      ...initialState,
      [name]: value,
    }));
  };

  // function to read a file
  const handleFile = async (event: any) => {
    setFileName(event[0].name);
    setUploadStatus('success');
    const base64String: any = await convertToBase64(event[0]);
    setNewElement((prev: any) => ({ ...prev, image: event[0], imageName: event[0].name }));
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
      elementName: newElement?.elementName,
      image: newElement?.image,
      imageName: newElement?.imageName,
      elementDescription: newElement?.elementDescription,
      machineId: newElement?.machineId,
    };

    const res = await ELEMENT_SERVICES.addElement(body);
    if (res.statusCode === 201) {
      setNewElement(initialState);
      setFileName('');
      setImageURl('');
      toast.success('Element added successfully');
      fetchAllElements(1);
    }
  };

  /* functions for buttons */
  const disablingAdd = () => {
    return newElement?.elementName && newElement?.machineId && newElement?.elementDescription && newElement?.image
      ? false
      : true;
  };

  const handleClear = () => {
    setNewElement(initialState);
    setFileName('');
    setImageURl('');
  };

  /* Functions to update a element */
  const editMachine = async () => {
    if (newElement?.machineId && newElement.elementId) {
      const body = {
        elementName: newElement?.elementName,
        elementDescription: newElement?.elementDescription,
        image: newElement?.image,
        imageName: newElement?.imageName,
      };
      const res = await ELEMENT_SERVICES.updateElementById(newElement?.machineId, newElement?.elementId, body);
      if (res.statusCode === 200) {
        handleClear();
        setShowEditModal(false);
        setShowEditSuccessModal(true);
        fetchAllElements(paginationData?.current_page);
      }
    }
  };

  // function to do what happen while closing the search modal
  const closeEditModal = () => {
    setShowEditModal(false);
  };

  /* Functions to delete a element*/

  // API call to delete a Machine
  const deleteElement = async (machineId: string, elementId: string) => {
    setShowDeleteModal(true);
    if (machineId && elementId) {
      const res = await ELEMENT_SERVICES.deleteElementById(machineId, elementId);
      toast.success(res.message);
      setShowDeleteModal(false);
      fetchAllElements(paginationData?.current_page);
    }
  };

  return (
    <div>
      <p className="text-xl font-medium leading-5 mb-8">Add Element</p>
      {/* Fields to get Element name, Element description and Element image */}
      <div className="flex items-center  gap-[16px] mb-6">
        <Input
          placeholder="Element Name"
          className="w-[270px] border border-solid border-[#A9A9A9] rounded-[50px] p-4 text-[14px] leading-[14px] h-[46px] placeholder:text-[#BBBBBB]"
          onChange={handleChange}
          type="text"
          name="elementName"
          value={showEditModal ? '' : newElement?.elementName}
          mandatory={true}
        />
        <Input
          placeholder="Element Description"
          className="w-[270px] border border-solid border-[#A9A9A9] rounded-[50px] p-4 text-[14px] leading-[14px] h-[46px] placeholder:text-[#BBBBBB]"
          onChange={handleChange}
          type="text"
          name="elementDescription"
          value={showEditModal ? '' : newElement?.elementDescription}
          mandatory={true}
        />
        <Dropdown
          placeholder="Select Machine"
          className="w-[270px] border-[1px] border-solid border-[#A9A9A9] rounded-[50px] py-4 px-5 text-[14px] leading-[14px] h-[46px] placeholder:text-[#BBBBBB]"
          options={machineList}
          optionLabel="machineName"
          handleChange={(value: any) => {
            setNewElement((prev: any) => ({ ...prev, machineId: value?.machineId }));
          }}
          value={showEditModal ? '' : machineList?.find((machine: any) => machine?.machineId === newElement?.machineId)}
          mandatory={true}
        />
      </div>

      {/* We can add element images using uploader */}
      <FileUploader
        className="w-[560px] py-6"
        mastery
        fileFormat=".jpg, .png"
        handleFile={handleFile}
        uploadStatus={uploadStatus}
        fileName={showEditModal ? '' : fileName}
        image={showEditModal ? '' : imageURL}
      />

      {/* Buttons to clear data and add a element */}
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
          onClick={createMachine}
        />
      </div>
      {/* Table for listing Machines */}
      <>
        <Table
          columns={columns}
          dataSource={elementList}
          pagination={{
            pageSize: paginationData?.item_count,
            total: paginationData?.total_items,
            current: paginationData?.current_page,
            onChange: (page) => {
              fetchAllElements(page);
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
          handleChange={handleChange}
          handleFile={handleFile}
          onEdit={editMachine}
          newElement={newElement}
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
          deleteElement(selectedElement?.machineId, selectedElement?.elementId);
        }}
        onCloseDeleteModal={() => {
          setShowDeleteModal(false);
        }}
      />
    </div>
  );
};

export default Element;
