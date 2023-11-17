import { CardType } from './types';

const PlantCard = ({ image, name, onClick }: CardType) => {
  return (
    <div onClick={onClick}>
      <img className="w-[200px] h-[180px]" src={image} alt={name} />
      <p className="text-center pt-5 text-lg">{name}</p>
    </div>
  );
};
export default PlantCard;
