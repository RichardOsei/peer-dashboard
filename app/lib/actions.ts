'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
 
const FormSchema = z.object({
  id: z.string(),
  activity: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  quantity: z.coerce.number(),
  unitPrice: z.coerce.number(),
  status: z.enum(['pending', 'paid', 'received']),
  date: z.string(),
});
 
const CreateInvoice = FormSchema.omit({ id: true, date: true,activity: true,quantity: true,unitPrice: true });

export async function createInvoice(formData: FormData) {
    const { customerId, amount, status } = CreateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
    
    const date = new Date().toISOString().split('T')[0];

    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amount}, ${status}, ${date})`;


    // Test it out:
    console.log(formData);
    //redirect to invoices page
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  
}


const CreateInventory = FormSchema.omit({ id: true, date: true,customerId: true,amount:true});
export async function createInventory(formData: FormData) {    
    const { activity,quantity,unitPrice, status } = CreateInventory.parse({
        activity: formData.get('activity'),
        unitPrice: formData.get('unitPrice'),
        quantity: formData.get('quantity'),        
        status: formData.get('status'),
    });
        
    // Perform calculations
    const amount = unitPrice * quantity;    
    

    //generate date format
    const date = new Date().toISOString().split('T')[0];

    const rawFormData = {
        activity,
        quantity,
        amount,
        status,
        date,
      };

    
    //inserting data to database
    await sql`
    INSERT INTO inventories (activity, quantity, amount, status, date)
    VALUES (${activity},${quantity} ,${amount}, ${status}, ${date})`;

    // Test it out:
    console.log(rawFormData);
    //redirect to inventory page
    revalidatePath('/dashboard/inventory');
    redirect('/dashboard/inventory');
    
}