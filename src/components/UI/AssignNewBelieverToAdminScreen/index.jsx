import React, { useState, useEffect } from 'react';
import { GiConfirmed } from 'react-icons/gi';
import { useModalToggle } from '../../../context/ConfirmationModal.context';
import Button from '../../Button';
import toast from 'react-hot-toast';
import { api } from '../../../services/api';
import { appUrls } from '../../../services/urls';
import { FaSpinner } from 'react-icons/fa';


export default function AssignNewBelieverToAdmin({ handleAssignToAdmin, convertId, roles, name }) {
  const { closeModal } = useModalToggle();
  // console.log(convertId, roles);
   const [isLoading, setIsLoading] = useState(null);

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
      setIsLoading(null);
    }
    // Replace this with your actual API call logic
    // You can send a request to add or remove the role based on the 'adminRoles' state
    console.log(`API call to update ${role} for admin with ID ${convertId}`);
  };
  return (
    <>
      <div className="bg-white p-8 md:w-[400px] min-h-[220px] rounded-md flex flex-col gap-4 md:mt-0 mt-2 items-center justify-center">
        <h3 className="text-gray-700 text-lg font-bold">
          <span className="text-primary">{name}</span> is currently assigned to
          the checked admin roles:
        </h3>
        <p>
          Click on any of the checkboxes to assign or remove this user from the
          Role
        </p>
        <div className="w-full flex flex-col gap-y-4 py-5">
          {/* <h2>Admin Roles for Admin ID: {convertId}</h2> */}
          <div>
            <label className="flex gap-x-3">
              {isLoading === 'SuperAdmin' ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <input
                  type="checkbox"
                  checked={adminRoles.SuperAdmin}
                  onChange={() => handleRoleToggle('SuperAdmin')}
                  className="!checked:bg-red-500"
                />
              )}
              General Admin
            </label>
          </div>
          <div>
            <label className="flex gap-x-3">
              {isLoading === 'DTIAdmin' ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <input
                  type="checkbox"
                  checked={adminRoles.DTIAdmin}
                  onChange={() => handleRoleToggle('DTIAdmin')}
                  className=""
                />
              )}
              DTI Admin
            </label>
          </div>
          <div>
            <label className="flex gap-x-3">
              {isLoading === 'MinistryAdmin' ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <input
                  type="checkbox"
                  checked={adminRoles.MinistryAdmin}
                  onChange={() => handleRoleToggle('MinistryAdmin')}
                  className="accent-red-700 checked:bg-blue-500 read-only:bg-gray-100"
                />
              )}
              Ministry Admin
            </label>
          </div>
          <div>
            <label className="flex gap-x-3">
              {isLoading === 'NewConvertAdmin' ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <input
                  type="checkbox"
                  checked={adminRoles.NewConvertAdmin}
                  onChange={() => handleRoleToggle('NewConvertAdmin')}
                  className=""
                />
              )}
              New Believers Admin
            </label>
          </div>
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
