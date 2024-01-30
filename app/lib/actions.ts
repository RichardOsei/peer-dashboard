'use server';
 
export async function createInvoice(formData: FormData) {
  const rawFormData = {
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  };
  // Test it out:
  console.log(rawFormData);
}

export async function createInventory(formData: FormData) {
    const rawFormData = {
      activity: formData.get('activity'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    };
    // Test it out:
    console.log(rawFormData);
  }