const Tag = ({ type }: any) => {
  const TAG_COLOR = type === 'high' ? 'bg-red-600' : type === 'medium' ? 'bg-yellow-600' : 'bg-green-600';

  return (
    <span className={`${TAG_COLOR} text-white pt-1 pb-4 rounded-t-[5px] px-3 -z-50 relative capitalize`}>{type}</span>
  );
};

export default Tag;
