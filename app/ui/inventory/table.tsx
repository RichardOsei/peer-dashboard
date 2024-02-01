
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/inventory/buttons';
import InventoryStatus from '@/app/ui/inventory/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredInventory } from '@/app/lib/data';
import { UserCircleIcon } from '@heroicons/react/20/solid';

export default async function InventoriesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const inventory = await fetchFilteredInventory(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {inventory?.map((inventory) => (
              <div
                key={inventory.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                    <UserCircleIcon className='text-sky-100 w-14'/>
                      <p>{inventory.activity}</p>
                    </div>
                    <p className="text-sm text-gray-500">{inventory.quantity}</p>
                  </div>
                  <InventoryStatus status={inventory.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(inventory.amount)}
                    </p>
                    <p>{formatDateToLocal(inventory.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={inventory.id} />
                    <DeleteInvoice id={inventory.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Activity
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Quantity
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {inventory?.map((inventory) => (
                <tr
                  key={inventory.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                    <UserCircleIcon className='text-sky-100 w-14'/>
                      <p>{inventory.activity}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {inventory.quantity}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(inventory.amount *100)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(inventory.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <InventoryStatus status={inventory.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={inventory.id} />
                      <DeleteInvoice id={inventory.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}