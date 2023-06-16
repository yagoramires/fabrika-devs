// Components
import AdminsList from '../../../components/Lists/Admins/Admins';

const Admins = ({ darkMode }) => {
  return (
    <div
      className={`p-4 flex flex-col heightCalc ${
        darkMode ? 'bg-cDkBlack' : 'bg-cWhite'
      }`}>
      <AdminsList darkMode={darkMode} />
    </div>
  );
};

export default Admins;
