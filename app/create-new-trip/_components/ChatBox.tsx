"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import axios from "axios";

type Message = {
  role: string;
  content: string;
};

function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string | null>(null);

  async function onSend() {
    if (!userInput) return;
    setUserInput(null);

    const newMsg: Message = { role: "user", content: userInput };
    setMessages([...messages, newMsg]);

    const result = await axios.post("/api/arcjet/aimodel", {
      messages: [...messages, newMsg],
    });
    const returnedMsg: Message = {
      role: "assistant",
      content: result?.data?.resp,
    };
    setMessages([...messages, returnedMsg]);
    console.log(result.data);
  }

  return (
    <div className="h-[80vh] flex flex-col justify-between">
      {/* Display messages */}
      <section className="flex-1 overflow-y-auto p-4">
        <div className="flex justify-end mt-2">
          <div className="max-w-lg bg-primary text-white px-4 py-2 rounded-lg">
            User Msg
          </div>
        </div>
        <div className="flex justify-start mt-2">
          <div className="max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg">
            AI Agent Msg
          </div>
        </div>
      </section>
      {/* User input */}
      <section>
        <div className="border rounded-2xl p-4 shadow relative">
          <Textarea
            // This is how you remove the border and shadow of the textarea
            className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
            placeholder="Create a trip for Paris from New York"
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
