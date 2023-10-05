import * as React from 'react';

export default function AddAdminFormControl() {
  return (
    <form>
         
        <div className="relative z-0 w-full mb-6 group">
            <input style={{color: '#6B6B6B'}} type="search" name="worker_name" id="worker_name" className="block py-2.5 px-0 w-full text-gray-900 text-base bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required />
            <label htmlFor="worker_name" className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Search Workers Name</label>
        </div>
    
        <div className="relative z-0 w-full mb-6 group">
            <label htmlFor="large" className="block mb-2 text-base font-medium text-gray-900 ">Roles</label>
            <select id="large" className="block w-full px-4 py-3 text-base text-gray-900 border border-primary rounded-lg bg-gray-50 focus:ring-primary focus:border-primary">
            <option defaultValue='Select A Role'>Select A Role</option>
            <option value="User">Worker</option>
            <option value="NewConvertAdmin">New Believers Admin</option>
            <option value="DTIAdmin">DTI Admin</option>
            <option value="MinistryAdmin">Ministry Admin</option>
            <option value="SuperAdmin">General Admin</option>
            </select>
        </div>
     
        <button type="submit" className="text-white hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center bg-[#38404b]">Submit</button>
    </form>
  );
}




