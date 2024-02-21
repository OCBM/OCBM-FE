const Tag = ({ type }: any) => {
  const TAG_COLOR = type === 'high' ? 'bg-[#EF4040]' : type === 'medium' ? 'bg-[#FFFF54]' : 'bg-[#74F94B]';

  return (
    <span
      className={`${TAG_COLOR} text-black pt-1 pb-4 rounded-t-[5px] px-8 -z-50 relative capitalize font-medium text-[11px]`}
    >
      {type}
    </span>
  );
};

export default Tag;
