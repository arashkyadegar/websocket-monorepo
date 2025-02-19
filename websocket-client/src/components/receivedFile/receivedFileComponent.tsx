import { ReceivedMessage } from "../model/receivedMessage";

export const ReceivedFileComponent = ({ obj }: { obj: ReceivedMessage }) => {
  return (
    <a
      className=" flex flex-row gap-2 items-center"
      target="_blank"
      href={"http://localhost:3001" + obj.data}
    >
      <span className="font-semibold">{obj.email}</span> :{" "}
      <span className="flex flex-row items-center line-clamp-1 gap-2 text-sm hover:text-blue-600">
        {obj.data}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4 mt-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
      </span>
    </a>
  );
};
