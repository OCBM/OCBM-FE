import { DownloadIcon } from '@/assets/icons';
import { DateRangePicker, Dropdown, Input } from '@/components';

const Reports = () => {
  return (
    <div className="shadow-md w-full p-8 rounded-[16px] mx-auto mb-8 overflow-x-hidden">
      <h2 className="text-[24px] text-[#444444] font-medium">CBM Date History</h2>
      <form>
        <div className="w-[95%] mx-auto">
          <div className="flex justify-between flex-row w-full gap-[20px] mt-5  mb-9">
            <Input
              parentClassName=" !w-full "
              className="rounded-[50px] border-[1px] border-grey-dark w-[80%] h-[50px] mt-2 px-3"
              labelClassName="text-[#492CE1] text-[14px] font-semibold"
              label="Machine Name"
              placeholder="Enter Machine Name"
              type="text"
              name="name"
              mandatory={true}
            />
            <Input
              parentClassName=" !w-full "
              className="rounded-[50px] border-[1px] border-grey-dark w-[80%] h-[50px] mt-2 px-3"
              labelClassName="text-[#492CE1] text-[14px] font-semibold"
              label="Sensor Name"
              placeholder="Enter Sensor Name"
              type="text"
              name="name"
              mandatory={true}
            />
          </div>
          <div className="flex justify-between flex-row w-full gap-[20px] mt-5  mb-9">
            <Dropdown
              label="Sensor Data"
              className="w-[80%] border-[1px] h-[50px] px-3"
              placeholder="Enter Sensor data Type"
              optionLabel="SensorData"
              mandatory={true}
              options={undefined}
            />
            <div className="flex justify-center items-center w-full flex-col">
              <span className="text-[#492CE1] text-[14px] font-medium flex self-start">
                Date Period
                <span className="text-[#D95117]">*</span>
              </span>
              <div className="flex gap-4 self-start mt-2">
                <DateRangePicker className="w-[300px] h-[50px]" placeholder={'From in DD/MM/YYYY'} />
                <DateRangePicker className="w-[300px] h-[50px]" placeholder={'From in DD/MM/YYYY'} />
              </div>
            </div>
          </div>
          <div>
            <button className=" flex items-center gap-2 rounded-[16px] text-[16px] font-medium bg-[#AAAAAA] text-white py-[7px] px-[18px] w-[104px]">
              <DownloadIcon />
              Excel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Reports;
