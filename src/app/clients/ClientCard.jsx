'use client';

export default function ClientCard({ client }) {
  return (
    <div
      className="fixed top-[10%] left-[40%] z-50 p-4 text-center 
      bg-white dark:bg-gray-900 shadow-lg rounded-lg border border-gray-300
       dark:border-gray-700 w-64"
    >
      <h3 className="text-lg font-semibold">{client.name}</h3>
      <p className="text-xs sm:text-sm text-gray-600">{client.city}, {client.country}</p>
      <p className="text-xs sm:text-sm text-gray-600">State: {client.state}</p>
      <p className="text-xs sm:text-sm text-gray-600">Industry Code: {client.industry_codes}</p>
      <p className="text-xs sm:text-sm font-semibold mt-2">
        State:{' '}
        <span className={client.active ? 'text-green-600' : 'text-red-600'}>
          {client.active ? 'Active' : 'Inactive'}
        </span>
      </p>
    </div>
  );
}
