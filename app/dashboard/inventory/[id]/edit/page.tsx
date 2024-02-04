import EditInventoryForm from '@/app/ui/inventory/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInventoryById } from '@/app/lib/data';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [inventory] = await Promise.all([
      fetchInventoryById(id)        
      ]);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Inventory', href: '/dashboard/inventories' },
          {
            label: 'Edit Inventory',
            href: `/dashboard/inventory/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditInventoryForm inventory={inventory}/>
    </main>
  );
}