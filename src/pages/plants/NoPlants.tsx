import { SITEMAP } from '@/utils/sitemap';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const NoPlants = () => {
  const no_plant_container = classNames(
    `w-full h-[76%] flex flex-col items-center justify-center font-GothamMedium text-2xl font-medium shadow-2xl rounded-2xl`,
  );
  return (
    <div className={`${no_plant_container}`}>
      <p className="grid text-center">
        To choose the plant. <span> Please upload in the mastery</span>
      </p>
      <Link to={SITEMAP?.mastery?.index} className="cursor-pointer text-[#492CE1] underline pt-9 ">
        Upload in mastery
      </Link>
    </div>
  );
};

export default NoPlants;
