import Form from "@/app/ui/customers/new"
import { fetchCustomers } from '@/app/lib/data';

export default async function Page() {
  const customers = await fetchCustomers();
  return (
    <div>
      <Form customers={customers} />
    </div>
  );
  }