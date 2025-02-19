import { ReactNode, useEffect, useRef, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { v4 as uuidv4 } from "uuid";
import { BlueButton, HeaderComponent, RedButton } from "../header/header";
import { ReceivedFileComponent } from "../receivedFile/receivedFileComponent";
import { ReceivedErrorComponent } from "../receivedError/receivedErrorComponent";
import { ReceivedJsonComponent } from "../receivedJson/receivedJsonComponent";
import WebSocketService from "../webSocket/webSocket";
import { ReceivedMessage } from "../model/receivedMessage";

export default function DashboardComponent() {
  const auth = useAuth();

  const [chats, setChats] = useState([]);

  const textInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const wsService = WebSocketService.getInstance();
    wsService.connect(`http://localhost:3000?email=${auth.user}`);

    wsService.ws!.onmessage = async (event: MessageEvent) => {
      const x = await JSON.parse(event.data);

      setChats((chats) => [...chats, x]);
    };
    return () => {
      if (wsService.ws) {
        wsService.ws.close();
        wsService.ws = null;
      }
    };
  }, []);

  const sendFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const wsService = WebSocketService.getInstance();
    if (event.target.files && event.target.files.length == 1) {
      let file = event.target.files[0];
      if (file) {
        wsService.sendFile(file);
        event.target.value = null;
      }
    }
  };

  const sendMessage = () => {
    if (textInputRef.current.value != "") {
      const wsService = WebSocketService.getInstance();
      wsService.sendMessage(JSON.stringify(textInputRef.current.value));
      textInputRef.current.value = "";
    }
  };

  function selectMessageType(payload: ReceivedMessage): ReactNode {
    switch (payload.message) {
      case "Received File":
        return <ReceivedFileComponent obj={payload} />;
      case "Received JSON":
        return <ReceivedJsonComponent obj={payload} />;
      default: // error
        return <ReceivedErrorComponent obj={payload} />;
    }
  }
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0  xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="w-full gap-2 flex flex-row items-center justify-between ">
              <HeaderComponent user={auth.user} />
              <RedButton
                title="exit"
                onClick={() => {
                  auth.logout();
                }}
              />
            </div>

            <div className="w-full border border-gray-200 rounded-lg m-2">
              <ul className=" w-full h-60 max-h-60 p-2 overflow-y-scroll">
                {chats.map((item: any, index: number) => (
                  <li
                    key={uuidv4()}
                    className={
                      index % 2 == 0
                        ? "flex flex-row bg-pink-50  p-2  hover:bg-pink-100 "
                        : "flex flex-row bg-blue-50 p-2   hover:bg-blue-100"
                    }
                  >
                    {selectMessageType(item)}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col items-center sm:items-center sm:flex-row w-full border-t border-gray-300">
                <div className="flex flex-col w-full">
                  <textarea
                    ref={textInputRef}
                    className="w-full  border-b sm:border-r  p-2  border border-gray-200 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    id="comment"
                    placeholder="Leave a comment..."
                    required
                    rows={4}
                  />
                  <input
                    id="files2"
                    name="files2"
                    type="file"
                    accept=".png,.jpg"
                    onChange={sendFiles}
                    className="text-sm text-stone-500
   file:mr-5 file:py-1 file:px-3 file:border-[1px]
   file:text-xs file:font-medium
   file:bg-stone-50 file:text-stone-700
   hover:file:cursor-pointer hover:file:bg-blue-50
   hover:file:text-blue-700"
                  />
                </div>

                <div>
                  <BlueButton title="send" onClick={sendMessage} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
