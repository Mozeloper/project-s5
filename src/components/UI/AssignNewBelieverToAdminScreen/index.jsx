import React, { useState, useEffect } from 'react';
import { GiConfirmed } from 'react-icons/gi';
import { useModalToggle } from '../../../context/ConfirmationModal.context';
import Button from '../../Button';
import toast from 'react-hot-toast';
import { api } from '../../../services/api';
import { appUrls } from '../../../services/urls';
import { FaSpinner } from 'react-icons/fa';
import SearchBoxIndex from '../../Searchbox/searchBoxIndex';
import { useDTIAdminNames } from '../../../hooks/useFetchNewBelievers';

export default function AssignNewBelieverToAdmin({ handleAssignToAdmin, convertId, roles, name }) {
  const { closeModal } = useModalToggle();
  const { data: DtiAdminName, isError, isLoading } = useDTIAdminNames();
  // console.log(convertId, roles);


  const handleClose = () => {
    closeModal();
  };

  const handleConfirm = () => {
    closeModal();
    handleAssignToAdmin();
  };

  const [adminRoles, setAdminRoles] = useState({
    SuperAdmin: false,
    DTIAdmin: false,
    MinistryAdmin: false,
    NewConvertAdmin: false,
  });

    useEffect(() => {
      if (roles && roles.length > 0) {
        // Use the provided roles from the props
        setAdminRoles(() => {
          const updatedRoles = { ...adminRoles };
          roles.forEach((role) => {
            updatedRoles[role] = true;
          });
          return updatedRoles;
        });
      } else {
        // If no roles are provided, fetch roles using the convertId
        fetchAdminRoles(convertId)
          .then((data) => {
            setAdminRoles(data); // Assuming data is an object with role states
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }, [convertId, roles]);



  const fetchAdminRoles = (convertId) => {
    // Simulate an API call to fetch the admin's roles
    // Replace this with your actual API call logic
    return new Promise((resolve, reject) => {
      // Simulate API response
      setTimeout(() => {
        resolve({
          SuperAdmin: true,
          DTIAdmin: false,
          MinistryAdmin: true,
          NewConvertAdmin: false,
        });
      }, 1000);
    });
  };

  const handleRoleToggle = (role) => {
    // Toggle the role in the local state
  

    // Simulate an API call to update the admin's roles
    // Replace this with your actual API call logic
    updateAdminRoles(convertId, role);
  };

  const updateAdminRoles = async (convertId, role) => {
    // Simulate an API call to update the admin's roles
      try {
        setIsLoading(role);
        //wrong api called on purpose
      const res = await api.post(
        `${appUrls.ADD_ROLE_TO_USER}?userId=10s&roles=${role}`
      );

      if (res?.status === 200) {
        console.log("success")
        // Convert promoted successfully
        toast.success('Role was updated successfully!');
          setAdminRoles((prevRoles) => ({
            ...prevRoles,
            [role]: !prevRoles[role],
          }));

        // Close the modal
        //handleClose();
        //queryClient.invalidateQueries('admins');
      } else {
        console.log("something went wrong")
        // Convert promotion failed
       
      }
    } catch (error) {
      console.log(error)
       toast.error('An error occurred while modifying Admin.');
      // Convert promotion failed
      // toast.error(error, {
      //   duration: 3000,
      // });
    } finally{
      
    }
    // Replace this with your actual API call logic
    // You can send a request to add or remove the role based on the 'adminRoles' state
    console.log(`API call to update ${role} for admin with ID ${convertId}`);
  };
  return (
    <>
      <div className="bg-white p-8 md:w-[400px] min-h-[220px] rounded-md flex flex-col gap-4 md:mt-0 mt-2 items-center justify-center">
        <h3 className="text-gray-700 text-lg font-bold">
          Assign<span className="text-primary">{name}</span> to a New Believers Admin
          
        </h3>
        <p>
        Please search and select the New Believers Admin you would like to assign
        </p>
        <div className="relative w-full mb-6">
      <p
        htmlFor="worker_name"
        className="block mb-2 text-base font-medium text-gray-900 "
      >
        Search Workers Name
      </p>
        <SearchBoxIndex 
          searchArray={DtiAdminName && DtiAdminName?.Data} 
          // bg={'bg-transparent'} 
          textColor="#CBCBCB" 
          placeholder="Search NewBelievers Admin's Name..."
        />
      </div>
        <div className="w-full flex flex-col gap-y-4 py-5">
          {/* <h2>Admin Roles for Admin ID: {convertId}</h2> */}
         
        </div>
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
      </div>
    </>
  );
}
