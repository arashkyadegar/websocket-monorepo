export const HeaderComponent = ({ user }: { user: string }) => {
  return (
    <h1 className="w-full text-xl text-left font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white ml-4">
      dear <span className="text-blue-400">{user}</span> feel free to chat
    </h1>
  );
};

export const BlueButton = ({
  title,
  onClick,
}: {
  title: string;
  onClick: any;
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className=" w-24 m-2  text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      {title}
    </button>
  );
};
export const RedButton = ({
  title,
  onClick,
}: {
  title: string;
  onClick: any;
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="w-28 flex items-center justify-center  text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-1 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      {title}
    </button>
  );
};
