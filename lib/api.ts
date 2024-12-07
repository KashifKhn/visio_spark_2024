import {
  Customer,
  ServiceRequest,
  SubscriptionChange,
} from '../types/customer';

// Sample data
const customers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Anytown, AN 12345',
    subscriptionPlan: 'standard',
    status: 'Active',
    dateJoined: '2023-01-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '(555) 987-6543',
    address: '456 Elm St, Othertown, OT 67890',
    subscriptionPlan: 'premium',
    status: 'Active',
    dateJoined: '2023-03-22',
  },
  // Add more sample customers as needed
];

const serviceRequests: ServiceRequest[] = [
  {
    id: 'SR1',
    customerId: '1',
    type: 'Technical Support',
    description: 'Internet connection issues',
    status: 'Open',
    dateCreated: '2023-06-01',
  },
  {
    id: 'SR2',
    customerId: '2',
    type: 'Billing Inquiry',
    description: 'Question about recent charges',
    status: 'Resolved',
    dateCreated: '2023-05-28',
    dateResolved: '2023-05-30',
  },
  // Add more sample service requests as needed
];

const subscriptionChanges: SubscriptionChange[] = [
  {
    id: 'SC1',
    customerId: '1',
    oldPlan: 'Basic',
    newPlan: 'Standard',
    changeDate: '2023-04-01',
    status: 'Completed',
  },
  {
    id: 'SC2',
    customerId: '2',
    oldPlan: 'Standard',
    newPlan: 'Premium',
    changeDate: '2023-05-15',
    status: 'Completed',
  },
  // Add more sample subscription changes as needed
];

// API functions
export async function getCustomers(): Promise<Customer[]> {
  // In a real application, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(customers), 500);
  });
}

export async function getCustomerById(
  id: string
): Promise<Customer | undefined> {
  // In a real application, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(customers.find((c) => c.id === id)), 500);
  });
}

export async function addCustomer(
  customer: Omit<Customer, 'id'>
): Promise<Customer> {
  // In a real application, this would be an API call
  return new Promise((resolve) => {
    const newCustomer = { ...customer, id: String(customers.length + 1) };
    customers.push(newCustomer);
    setTimeout(() => resolve(newCustomer), 500);
  });
}

export async function updateCustomer(customer: Customer): Promise<Customer> {
  // In a real application, this would be an API call
  return new Promise((resolve) => {
    const index = customers.findIndex((c) => c.id === customer.id);
    if (index !== -1) {
      customers[index] = customer;
    }
    setTimeout(() => resolve(customer), 500);
  });
}

export async function deleteCustomer(id: string): Promise<void> {
  // In a real application, this would be an API call
  return new Promise((resolve) => {
    const index = customers.findIndex((c) => c.id === id);
    if (index !== -1) {
      customers.splice(index, 1);
    }
    setTimeout(resolve, 500);
  });
}

export async function getServiceRequests(
  customerId: string
): Promise<ServiceRequest[]> {
  // In a real application, this would be an API call
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve(serviceRequests.filter((sr) => sr.customerId === customerId)),
      500
    );
  });
}

export async function getSubscriptionChanges(
  customerId: string
): Promise<SubscriptionChange[]> {
  // In a real application, this would be an API call
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve(
          subscriptionChanges.filter((sc) => sc.customerId === customerId)
        ),
      500
    );
  });
}
