import EditInventoryForm from '@/app/ui/inventory/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInventoryById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [inventory] = await Promise.all([
      fetchInventoryById(id)        
      ]);
      if (!inventory) {
        notFound();
      }
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