export default function UserPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 p-4 md:p-8">
      <h1 className="text-2xl font-bold">Your Profile</h1>
      <div className="grid grid-cols-5 gap-4 w-full">
        <div className="p-4 col-span-1 border rounded-md space-y-2">
          {/* <h2>{user.username}</h2> */}
          <h2 className="text-lg font-semibold p-2">Username</h2>
          <ul className="flex flex-col">
            <li className="p-2 rounded-md cursor-pointer hover:bg-gray-100 transition">
              User Setting 1
            </li>
            <li className="p-2 rounded-md cursor-pointer hover:bg-gray-100 transition">
              User Setting 2
            </li>
            <li className="p-2 rounded-md cursor-pointer hover:bg-gray-100 transition">
              User Setting 3
            </li>
            <li className="p-2 rounded-md cursor-pointer hover:bg-gray-100 transition">
              User Setting 4
            </li>
            <li className="p-2 rounded-md cursor-pointer hover:bg-gray-100 transition">
              User Setting 5
            </li>
          </ul>
        </div>
        <div className="p-4 col-span-2 border rounded-md"></div>
        <div className="p-4 col-span-2 border rounded-md"></div>
      </div>
    </div>
  );
}
