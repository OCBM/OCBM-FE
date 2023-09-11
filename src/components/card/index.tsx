import { CardsType } from './types';

function Card({ className, children }: CardsType) {
  return (
    <div
      className={`${className} w-[326px] h-[284px] rounded-[15px] bg-white shadow-[0px_0px_40px_0px_#0000001A]`}
    >
      {children}
    </div>
  );
}

export default Card;
