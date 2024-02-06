'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
 
const FormSchema = z.object({
  id: z.string(),
  activity: z.string(
    {invalid_type_error: 'Please input activity.',}
  ),
  customerId: z.string(
    {invalid_type_error: 'Please select a customer.',}
  ),
  amount: z.coerce.number().gt(
    0,{ message: 'Please enter a price greater than GHS 0.' }
  ),
  quantity: z.coerce.number().gt(
    0,{ message: 'Please enter an quantity greater than 0.' }
  ),
  unitPrice: z.coerce.number().gt(
    0,{ message: 'Please enter a greater number than GHS 0.' }
  ),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select status.',
  }),
  date: z.string(),
});
 

export type invoiceState = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type inventoryState = {
  errors?: {
    activity?: string[];
    unitPrice?: string[];
    quantity?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};


const CreateInvoice = FormSchema.omit({ id: true, date: true,activity: true,quantity: true,unitPrice: true });

export async function createInvoice(prevState: invoiceState, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
    
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Invoice.',
      };
    }

    const { customerId, amount, status } = validatedFields.data;
    const date = new Date().toISOString().split('T')[0];

    try {
    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amount}, ${status}, ${date})`;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  
}


const CreateInventory = FormSchema.omit({ id: true, date: true,customerId: true,amount:true});
export async function createInventory(prevState: inventoryState,formData: FormData) {    
  const validatedFields = CreateInventory.safeParse({
        activity: formData.get('activity'),
        unitPrice: formData.get('unitPrice'),
        quantity: formData.get('quantity'),        
        status: formData.get('status'),
    });        

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Invoice.',
      };
    }
    
    const {activity, quantity, unitPrice, status } = validatedFields.data;
    // Perform calculations   
    const date = new Date().toISOString().split('T')[0];
    const amount = unitPrice * quantity; 

    try {
    //inserting data to database
    await sql`
    INSERT INTO inventories (activity, quantity, amount, status, date)
    VALUES (${activity},${quantity} ,${amount}, ${status}, ${date})`;
    } catch (error) {
    return {
      message: 'Database Error: Failed to Create Inventory.',
    };
    }

    revalidatePath('/dashboard/inventory');
    redirect('/dashboard/inventory');
    
}


// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true,activity: true,quantity: true,unitPrice: true });
 export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  const amountInCents = amount * 100;
 
  try {
  await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;} 
  catch (error) {
    return {
      message: 'Database Error: Failed to Update Invoice.',
    };
  }
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}


const UpdateInventory = FormSchema.omit({ id: true, date: true,customerId: true,unitPrice:true });
 export async function updateInventory(id: string, formData: FormData) {
  const { activity,quantity,amount, status, } = UpdateInventory.parse({    
    activity: formData.get('activity'),
    amount: formData.get('amount'),
    quantity: formData.get('quantity'),        
    status: formData.get('status'),
  });
  try {
  await sql`
    UPDATE inventories
    SET id = ${id},activity = ${activity},quantity=${quantity}, amount = ${amount}, status = ${status}
    WHERE id = ${id}
  `;}
  catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
 
  revalidatePath('/dashboard/inventory');
  redirect('/dashboard/inventory');
}



export async function deleteInvoice(id: string) {
  
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}

export async function deleteInventory(id: string) {
  try {
  await sql`DELETE FROM inventories WHERE id = ${id}`;
  revalidatePath('/dashboard/inventory');
  return { message: 'Deleted Invoice.' };
      } 
  catch (error) {
  return { message: 'Database Error: Failed to Delete Invoice.' };
}
}