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
    const activity = formData.get('activity');
    const unitPrice = formData.get('unitPrice');
    const quantity = formData.get('quantity');
    const status = formData.get('status');
    const amount = unitPrice * quantity;

    const rawFormData = {
        activity,
        quantity,
        amount,
        status,
      };
  
    // Test it out:
    console.log(rawFormData);
}