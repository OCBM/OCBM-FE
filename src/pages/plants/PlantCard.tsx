import { CardType } from './types';

const PlantCard = ({ image, name, onClick }: CardType) => {
  return (
    <div onClick={onClick}>
      <img className="w-[200px] h-[180px]" src={image} alt={name} />
      <p className="w-full text-center pt-1 text-lg inline-block">{name}</p>
    </div>
  );
};
export default PlantCard;
