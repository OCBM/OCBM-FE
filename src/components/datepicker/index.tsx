import { CalenderIcon, ChevronLeftIcon, ChevronRightIcon } from '@/assets/icons';
import { DatePicker, Space } from 'antd';
import { DatePickerPropType } from './types';
import './index.css';

const Datepicker = ({ className, onChange, placeholder }: DatePickerPropType) => {
  return (
    <div>
      <Space direction="vertical">
        <DatePicker
          suffixIcon={<CalenderIcon />}
          nextIcon={<ChevronRightIcon />}
          prevIcon={<ChevronLeftIcon />}
          className={`${className} border border-grey-dark py-5 px-7 rounded-[50px] gap-2 `}
          onChange={onChange}
          superNextIcon={null}
          superPrevIcon={null}
          placeholder={placeholder}
          format="DD/MM/YYYY"
        />
      </Space>
    </div>
  );
};

export default Datepicker;
