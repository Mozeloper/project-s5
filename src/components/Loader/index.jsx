import { FaSpinner } from 'react-icons/fa6';

const Loader = () => {
  return (
    <div className="flex justify-center gap-3 text-center bg-gray-200 items-center h-96 mt-12">
      <FaSpinner className="animate-spin" /> <span>Loading</span>
    </div>
  );
};

export default Loader;
