// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const inventories = [
    {
      activity:'Ordered Oil',
      quantity:30,
      amount: 15795,
      status: 'pending',
      date: '2022-12-06',
    },
    {
      activity:'Ordered Oil',
      quantity:10,
      amount: 15795,
      status: 'received',
      date: '2022-12-06',
    },
    {
      activity:'Ordered Oil',
      quantity:20,
      amount: 15795,
      status: 'pending',
      date: '2022-12-06',
    },
];



const invoices = [
  {
    activity:'Sale',
    quantity:30,
    unitprice:200,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    activity:'Sale',
    quantity:30,
    unitprice:200,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    activity:'Sale',
    quantity:30,
    unitprice:200,
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    activity:'Sale',
    quantity:30,
    unitprice:200,
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    activity:'Sale',
    quantity:30,
    unitprice:200,
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    activity:'Sale',
    quantity:30,
    unitprice:200,
    amount: 8945,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    activity:'Sale',
    quantity:30,
    unitprice:200,
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    activity:'Sale',
    quantity:30,
    unitprice:200,
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    activity:'Sale',
    quantity:30,
    unitprice:200,
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    activity:'Sale',
    quantity:30,
    unitprice:200,
    amount: 8945,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    activity:'Sale',
    quantity:30,
    unitprice:200,
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    activity:'Sale',
    quantity:30,
    unitprice:200,
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    activity:'Sale',
    quantity:30,
    unitprice:200,
    amount: 8945,
    status: 'paid',
    date: '2023-06-18',
  },
  {
    activity:'Sale',
    quantity:30,
    unitprice:200,
    amount: 8945,
    status: 'paid',
    date: '2023-10-04',
  },
  {
    activity:'Sale',
    quantity:30,
    unitprice:200,
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

module.exports = {
  users,
  invoices,
  inventories,
  revenue,
};
