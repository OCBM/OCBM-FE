const PlantCard = ({ data, onClick }: any) => {
  const { image, plantName, id } = data;
  return (
    <div>
      <div
        key={id}
        className="flex flex-col items-center pt-[10px] pb-5 px-[10px] border-white rounded-2xl shadow-lg relative w-[220px] h-[244px] "
        onClick={onClick}
      >
        <img className="w-[200px] h-[180px]" src={image} alt={plantName} />
        <p className="text-center pt-5 text-lg">{plantName}</p>
      </div>
    </div>
  );
};
export default PlantCard;
