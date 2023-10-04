import { CalenderIcon, ChevronLeftIcon, ChevronRightIcon } from '@/assets/icons';
import { DatePicker, Space } from 'antd';
import { DateRangePickerPropType } from './types';
import './index.css';

const DateRangePicker = ({ className, onChange, placeholder }: DateRangePickerPropType) => {
  return (
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
  );
};

export default DateRangePicker;
