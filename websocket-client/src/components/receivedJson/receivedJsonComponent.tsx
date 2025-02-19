import { ReceivedMessage } from "../model/receivedMessage";

export const ReceivedJsonComponent = ({ obj }: { obj: ReceivedMessage }) => {
  console.log(obj.email);
  return (
    <a className=" flex flex-row gap-2 items-center">
      <span className="font-semibold">{obj.email}</span> :{" "}
      <span className="flex flex-row items-center line-clamp-1 text-sm hover:text-blue-600">
        {obj.data}
      </span>
    </a>
  );
};
