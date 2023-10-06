import { CardsType } from './types';
import Tag from './Tag';

function Card({ className, children, tag }: CardsType) {
  return (
    <div>
      {tag ? <Tag type={tag} /> : null}
      <div className={`${className}`}>{children}</div>
    </div>
  );
}

export default Card;
