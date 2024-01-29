import InventoryForm from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Inventory', href: '/dashboard/inventory' },
          {
            label: 'Create Inventory',
            href: '/dashboard/inventory/create',
            active: true,
          },
        ]}
      />
      <InventoryForm customers={customers} />
    </main>
  );
}