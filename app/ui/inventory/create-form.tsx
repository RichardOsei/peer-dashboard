'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';
import {  CheckIcon,  ClockIcon,  CurrencyDollarIcon,  PencilSquareIcon,} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createInventory} from '@/app/lib/actions';

export default function InventoryForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createInventory, initialState);
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="activity" className="mb-2 block text-sm font-medium">
            Activity
          </label>
          <div className="relative">
          <input
                id="activity"
                name="activity"
                type="text"                
                placeholder="Enter activity"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          />            
            <PencilSquareIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="activity-error" aria-live="polite" aria-atomic="true">
            {state.errors?.activity &&
            state.errors.activity.map((error: string) => (
              
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
            )) }
            
          </div>
        </div>

        
        <div className="mb-4">
          <label htmlFor="unitPrice" className="mb-2 block text-sm font-medium">
            Unit price
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="unitPrice"
                name="unitPrice"
                type="number"
                step="0.01"
                placeholder="Enter unit price"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="unitPrice-error" aria-live="polite" aria-atomic="true">
            {state.errors?.unitPrice &&
            state.errors.unitPrice.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="quantity" className="mb-2 block text-sm font-medium">
            Quantity
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="quantity" 
                name="quantity"
                type="number"
                step="0.01"
                placeholder="Enter quantity"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="quantity-error" aria-live="polite" aria-atomic="true">
            {state.errors?.quantity &&
            state.errors.quantity.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
            ))}
          </div>
        </div>




        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set status
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
                  id="received"
                  name="status"
                  type="radio"
                  value="received"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="received"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                    Received <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            
            {state.errors?.status &&
            state.errors.status.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/inventory"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Inventory</Button>
      </div>
    </form>
  );
}




