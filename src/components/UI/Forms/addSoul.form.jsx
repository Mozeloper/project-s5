import * as React from 'react';

export default function AddSoulsFormControl() {
  return (
    <form>
        <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-6 group">
                <input style={{color: '#6B6B6B'}} type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-gray-900 text-base bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="floating_first_name" class="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
            </div>
            <div class="relative z-0 w-full mb-6 group">
                <input style={{color: '#6B6B6B'}} type="text" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-gray-900 text-base bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="floating_last_name" class="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
            </div>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-6 group">
                <input style={{color: '#6B6B6B'}} type="tel" pattern="^\d{11}$" name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-gray-900 text-base bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="floating_phone" class="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (08012345678)</label>
            </div>
            <div class="relative z-0 w-full mb-6 group">
            <input style={{color: '#6B6B6B'}} type="email" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-gray-900 text-base bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="floating_email" class="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>

            </div>
        </div>
        <div class="relative z-0 w-full mb-6 group">
            <label for="employment" class="block mb-2 text-base font-medium text-gray-900">Employment Status</label>
            <select style={{color: '#6B6B6B6'}} id="employment" class="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 ">
            <option selected>Enter Employment Status</option>
            <option value="EM">Employed</option>
            <option value="UNEM">Unemployed</option>
            <option value="SE">Self Employment</option>
            </select>
        </div>
        <div class="relative z-0 w-full mb-6 group">
            <label for="large" class="block mb-2 text-base font-medium text-gray-900 ">Gender</label>
            <select style={{color: '#6B6B6B6'}} id="large" class="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 ">
            <option selected>Select Gender</option>
            <option value="MA">Male</option>
            <option value="FE">Female</option>
            </select>
        </div>
        <div class="relative z-0 w-full mb-6 group">
            <input style={{color: '#6B6B6B'}} type="text" name="floating_Address" id="floating_Address" class="block py-2.5 px-0 w-full text-gray-900 text-base bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="floating_Address" class="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
        </div>
        <button type="submit" class="text-white hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center bg-[#38404b]">Submit</button>
    </form>
  );
}




