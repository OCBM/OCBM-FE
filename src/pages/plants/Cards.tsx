const Cards = ({ image, name, onClick }: any) => {
  return (
    <>
      <div
        className="border mb-5 pt-2 pb-[10px] px-2 border-white rounded-2xl shadow-2xl w-[160px] h-[178px] "
        onClick={onClick}
      >
        <img className="w-[144px] h-[130px]" src={image} alt={name} />
        <p className="text-center pt-[10px] font-GothamMedium text-xs font-medium">{name}</p>
      </div>
    </>
  );
};

export default Cards;
