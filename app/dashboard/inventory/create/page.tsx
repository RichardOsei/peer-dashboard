import InventoryForm from '@/app/ui/inventory/create-form';
import Breadcrumbs from '@/app/ui/inventory/breadcrumbs';

 
export default async function Page() {
  
 
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
      <InventoryForm />
    </main>
  );
}