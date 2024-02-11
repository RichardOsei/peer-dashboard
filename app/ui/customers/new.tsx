'use client'
import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import { CurrencyDollarIcon, UserCircleIcon, CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createInvoice} from '@/app/lib/actions';
import { CustomerField } from '@/app/lib/definitions';
import { eventNames } from 'process';

export default function Form({ customers }: { customers: CustomerField[] }) {
  const initialState = { message: null, errors: {} };
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const [state, dispatch] = useFormState(createInvoice, initialState);


  const toggleCustomer = (event: { preventDefault: () => void; }) => {
    event.preventDefault(); // Prevent form submission
    setIsNewCustomer(prevState => !prevState);
  };

  return (
        
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

      {/* Toggle Button */}
      <>
      <label htmlFor="customer" className="mb-2 block text-sm font-medium">Choose customer</label>
      <div className="flex col-flex gap-6 align ">        
      <h6>OG</h6>
          <button className="w-16 h-8 rounded-full relative bg-slate-200" onClick={toggleCustomer}>
            <div className={`w-6 h-6 bg-blue-600 absolute my-auto top-0 bottom-0 transition-all duration-200 ${isNewCustomer ? "right-[3px]" : "right-[60%]"} rounded-full`}></div>
          </button>
          <h6>New or sales</h6>
      </div>
      </>
        {/* Customer Name */}
        <div className="my-4">
            <div className="relative">
            {isNewCustomer ? (
              // New Customer Field with Text Input
              <input
                id="newCustomer"
                name="newCustomerName"
                type="text"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder="Enter new customer"
                aria-describedby="customer-error"
              />
              ) : (
              // Original Customer Field with Select Dropdown
              <select
                id="customer"
                name="customerId"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
                aria-describedby="customer-error"
              >
                <option value="" disabled>Select a customer</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>{customer.name}</option>
                ))}
              </select>
              
              )}
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.customerId &&
            state.errors.customerId.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
            ))}
          </div>
        </div>

      

        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="amount-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.amount &&
            state.errors.amount.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
            ))}
          </div>
        </div>

      {/* Invoice Status */}
      <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                  aria-describedby="amount-error"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            
            {state.errors?.status &&
            state.errors.status.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
            ))}
          </div>
        </fieldset>

      </div>

      {/* Submit and Cancel Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <Link href="/dashboard/invoices" className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">Cancel</Link>
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
}

