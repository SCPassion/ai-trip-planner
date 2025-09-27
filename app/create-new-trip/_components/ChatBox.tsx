"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader, Send } from "lucide-react";
import axios from "axios";
import EmptyBoxState from "./EmptyBoxState";
import GroupSizeUi from "./GroupSizeUi";
import BudgetUi from "./BudgetUi";
import TripDurationUI from "./TripDurationUI";

type Message = {
  role: string;
  content: string;
  ui?: string;
};

function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function onSend(input?: string) {
    const messageContent = input || userInput;
    if (!messageContent) return;
    setLoading(true);

    const newMsg: Message = { role: "user", content: messageContent };
    setMessages((prev) => [...prev, newMsg]);
    setUserInput("");

    const updatedMessages = [...messages, newMsg];

    try {
      const result = await axios.post("/api/arcjet/aimodel", {
        messages: updatedMessages,
      });
      const returnedMsg: Message = {
        role: "assistant",
        content: result?.data?.resp,
        ui: result?.data?.ui,
      };
      setMessages((prev) => [...prev, returnedMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setUserInput("");
    }
  }

  function RenderGenerativeUI(ui: string) {
    if (ui === "budget") {
      // generate budget UI
      return (
        <BudgetUi
          onSelectedOption={(option: string) => {
            setUserInput((prev) => `${option}`);
            onSend(option);
          }}
        />
      );
    } else if (ui === "groupSize") {
      return (
        <GroupSizeUi
          onSelectedOption={(option: string) => {
            setUserInput((prev) => `${option}`);
            onSend(option);
          }}
        />
      );
    } else if (ui === "tripDuration") {
      return (
        <TripDurationUI
          onSelectedOption={(option: string) => {
            setUserInput((prev) => `${option}`);
            onSend(option);
          }}
        />
      );
    } else if (ui === "final") {
      // generate final UI
      return null;
    }
  }
  return (
    <div className="h-[80vh] flex flex-col justify-between">
      {messages.length === 0 && (
        <EmptyBoxState
          onSelectOption={(v: string) => {
            setUserInput(v);
            onSend(v);
          }}
        />
      )}
      {/* Display messages */}
      <section className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) =>
          message.role === "user" ? (
            <div className="flex justify-end mt-2" key={index}>
              <div className="max-w-lg bg-primary text-white px-4 py-2 rounded-lg">
                {message.content}
              </div>
            </div>
          ) : (
            <div className="flex justify-start mt-2" key={index}>
              <div className="max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg">
                {message.content}
                {RenderGenerativeUI(message.ui || "")}
              </div>
            </div>
          )
        )}

        {loading && (
          <div className="flex justify-start mt-2">
            <div className="max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg">
              {<Loader className="animate-spin" />}
            </div>
          </div>
        )}
      </section>
      {/* User input */}
      <section>
        <div className="border rounded-2xl p-4 shadow relative">
          <Textarea
            // This is how you remove the border and shadow of the textarea
            className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
            placeholder="Start typing here!"
            value={userInput || ""}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <Button
            size="icon"
            className="absolute right-6 bottom-6 cursor-pointer"
            onClick={() => onSend()}
          >
            <Send className="size-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}

export default ChatBox;
