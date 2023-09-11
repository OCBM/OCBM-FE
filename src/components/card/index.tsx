import { CardsType } from './types';
import Tag from './Tag';

function Card({ className, children, tag }: CardsType) {
  return (
    <div>
      {tag ? <Tag type={tag} /> : null}
      <div
        className={`${className} w-[326px] h-[284px] rounded-[15px] bg-white shadow-[0px_0px_40px_0px_#0000001A]`}
      >
        {children}
      </div>
    </div>
  );
}

export default Card;
