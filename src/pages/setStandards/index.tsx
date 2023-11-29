import { SITEMAP } from '@/utils/sitemap';
import { useNavigate } from 'react-router-dom';

const SetStandards = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center flex-grow">
      <div
        className="flex flex-col gap-5 items-center justify-center px-16 py-12 rounded-2xl cursor-pointer shadow-[0_0_6px_2px_rgba(0,0,0,0.08)]"
        onClick={() => navigate(SITEMAP.setStandards.NewSetStandards)}
      >
        <p className="text-[#605BFF] text-[18px] font-medium leading-[18px]">Create</p>
      </div>
    </div>
  );
};

export default SetStandards;
