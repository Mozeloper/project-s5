import * as React from 'react';

export default function AddSoulsFormControl() {
    // payload for newconvert
//     {
//   "surname": "string",
//   "firstName": "string",
//   "email": "string",
//   "gender": "Male",
//   "address": "string",
//   "phoneNumber": "string",
//   "nearestBusStop": "string"
// }
  return (
    <form>
        <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
                <input style={{color: '#6B6B6B'}} type="text" name="floating_surname" id="floating_surname" className="block py-2.5 px-0 w-full text-gray-900 text-base bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="floating_surname" className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Surname</label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
                <input style={{color: '#6B6B6B'}} type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-gray-900 text-base bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
            </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
                <input style={{color: '#6B6B6B'}} type="tel" pattern="^\d{11}$" name="floating_phoneNumber" id="floating_phoneNumber" className="block py-2.5 px-0 w-full text-gray-900 text-base bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="floating_phoneNumber" className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (08012345678)</label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
            <input style={{color: '#6B6B6B'}} type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-gray-900 text-base bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>

            </div>
        </div>
        <div className="relative z-0 w-full mb-6 group">
            <label htmlFor="large" className="block mb-2 text-base font-medium text-gray-900 ">Gender</label>
            <select 
                style={{color: '#6B6B6B6'}} 
                defaultValue={'Select'}
                id="large" 
                className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            >
            <option value="Select"  disabled >Select Gender</option>
            <option value="MA">Male</option>
            <option value="FE">Female</option>
            </select>
        </div>
        <div className="relative z-0 w-full mb-6 group">
            <input style={{color: '#6B6B6B'}} type="text" name="floating_address" id="floating_address" className="block py-2.5 px-0 w-full text-gray-900 text-base bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="floating_address" className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
            <input style={{color: '#6B6B6B'}} type="text" name="floating_nearestBusStop" id="floating_nearestBusStop" className="block py-2.5 px-0 w-full text-gray-900 text-base bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="floating_nearestBusStop" className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nearest Bus Stop</label>
        </div>
        <button type="submit" className="text-white hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center bg-[#38404b]">Submit</button>
    </form>
  );
}




