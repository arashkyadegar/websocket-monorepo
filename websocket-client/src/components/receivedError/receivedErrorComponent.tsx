import { ReceivedMessage } from "../model/receivedMessage";

export const ReceivedErrorComponent = ({ obj }: { obj: ReceivedMessage }) => {
  return (
    <a className=" flex  flex-row gap-2 items-center">
      <span className="font-semibold">{obj.email}</span> :{" "}
      <span className="flex flex-row items-center line-clamp-1 text-red-600 text-sm ">
        error {obj.data}
      </span>
    </a>
  );
};
