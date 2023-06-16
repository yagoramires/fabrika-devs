import { useEffect } from 'react';
import { RiSunFill, RiMoonFill } from 'react-icons/ri';

function Toggle({ darkMode, setDarkMode }) {
  const handleClick = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    localStorage.setItem('darkmode', darkMode);
  });

  return (
    <div
      className='relative flex justify-between rounded-2xl p-[2px] cursor-pointer gap-1 border-[2px] border-cGreen'
      onClick={handleClick}>
      <RiMoonFill className='w-4 h-4 text-cGreen' />
      <RiSunFill className='w-4 h-4 text-cGreen' />
      <div
        className={`rounded-full absolute bg-cGreen w-4 h-4 ${
          darkMode ? 'right-[2px]' : 'left-[2px]'
        }  `}
      />
    </div>
  );
}

export default Toggle;
