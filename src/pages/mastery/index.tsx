import { BulkUploadIcon, ManualEntryIcon } from '@/assets/icons';
import { SITEMAP } from '@/utils/sitemap';
import { useNavigate } from 'react-router-dom';

const Mastery = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center flex-grow">
      <div className="flex gap-6 items-center justify-center">
        {/* Block upload section */}
        <div className="flex flex-col gap-5 items-center justify-center px-16 py-12 rounded-2xl cursor-pointer shadow-[0_0_6px_2px_rgba(0,0,0,0.08)]">
          <BulkUploadIcon />
          <p className="text-[#605BFF] text-[18px] font-medium leading-[18px]">Bulk Upload</p>
        </div>
        {/* Manual Entry Section */}
        <div
          className="flex flex-col gap-5 items-center justify-center px-16 py-12 rounded-2xl cursor-pointer shadow-[0_0_6px_2px_rgba(0,0,0,0.08)]"
          // onClick={() => setShowTab(true)}
          onClick={() => navigate(SITEMAP.mastery.manualEntry)}
        >
          <ManualEntryIcon />
          <p className="text-[#605BFF] text-[18px] font-medium leading-[18px]">Manual Entry</p>
        </div>
      </div>
    </div>
  );
};

export default Mastery;
