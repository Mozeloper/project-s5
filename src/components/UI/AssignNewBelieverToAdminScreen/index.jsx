import React, { useState, useEffect } from 'react';
import { GiConfirmed } from 'react-icons/gi';
import { useModalToggle } from '../../../context/ConfirmationModal.context';
import Button from '../../Button';
import toast from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';
import { useDTIAdminNames } from '../../../hooks/useFetchNewBelievers';
import SearchNBAdmin from '../../Searchbox/searchNBAdmin';
import { getAllDTIAdminNames } from '../../../services/admins.api';

export default function AssignNewBelieverToAdmin({
  handleAssignToAdmin,
  convertId,
  name,
}) {
  const { closeModal } = useModalToggle();
  const [dtiAdmins, setDtiAdmins] = useState(null);
  const [selectedAdmin, setSelectedAdmin] = useState({});
  const logValue = (value) => console.log(`this is the admin ${value}`);

  useEffect(() => {
    async function fetchAdmins() {
      try {
        const DtiAdminName = await getAllDTIAdminNames('');
        // const { data: DtiAdminName, isError, isLoading } = useDTIAdminNames();
        setDtiAdmins(DtiAdminName && (await DtiAdminName?.Data));
      } catch (error) {
        toast.error(error || error.message);
      }
    }
    fetchAdmins();
  }, []);

  console.log(dtiAdmins);

  const handleClose = () => {
    //setSelectedAdmin();
    closeModal();
  };

  const handleConfirm = () => {
    closeModal();
    handleAssignToAdmin(selectedAdmin.Id);
  };

  return (
    <>
      <div className="bg-white p-8 md:w-[600px] min-h-[220px] rounded-md flex flex-col gap-4 md:mt-0 mt-2 items-center justify-center">
        {selectedAdmin.FullName == undefined ? (
          <>
            <h3 className="text-gray-700 text-lg font-bold">
              Assign a New Believers Admin to
              <span className="text-primary"> {name}</span>
            </h3>
            <small>
              Use the search box below to search and select a New Believers
              Admin
            </small>
            <div className="relative w-full mb-6">
              <p
                htmlFor="worker_name"
                className="block mb-2 text-base text-center font-medium text-gray-900 "
              >
                Search New Believers Admin Name
              </p>
              <SearchNBAdmin
                searchArray={dtiAdmins}
                onSelect={setSelectedAdmin}
                // bg={'bg-transparent'}
                textColor="#CBCBCB"
                placeholder="Search NewBelievers Admin's Name..."
              />
            </div>
            {selectedAdmin && (
              <div className="w-full flex flex-col gap-y-4 py-5">
                {/* <h2>You have selected: {selectedAdmin.FullName}</h2> */}
              </div>
            )}
            <div className="w-full">
              <Button
                title="Close"
                className="w-full h-[56px] bg-secondary text-white text-center rounded-2xl border border-[#D0D5DD]"
                backgroundColor="bg-none"
                textColor="#38404b"
                type="button"
                onClick={handleClose}
              />
              
            </div>
          </>
        ) : (
          <>
            <h3 className="text-gray-700 text-lg font-bold">
              You have selected{' '}
              <span className="text-primary"> {selectedAdmin.FullName}</span> to
              disciple
              <span className="text-primary"> {name}</span>
            </h3>
            <p className='mb-10'>Click the Proceed button to Confirm?</p>
            <div className="w-full">
              <Button
                title="Back"
                className="w-full h-[56px] bg-secondary text-white text-center rounded-2xl border border-[#D0D5DD]"
                backgroundColor="bg-none"
                textColor="#38404b"
                type="button"
                onClick={handleClose}
              />
              <Button
                title="Proceed"
                className="w-full h-[56px] bg-primary text-white text-center rounded-2xl border border-[#D0D5DD]"
                backgroundColor="bg-none"
                textColor="#38404b"
                type="button"
                onClick={handleConfirm}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
