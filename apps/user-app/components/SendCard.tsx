"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="h-[90vh] bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center animate-fade-in">
      <Center>
        <div className="backdrop-blur-lg bg-white/40 rounded-2xl shadow-2xl max-w-md">
          <Card title="Send Money">
            <h2 className="text-2xl font-extrabold text-purple-700 text-center mt-4">
              🔁 Send Money Instantly
            </h2>
            <div className="p-6 space-y-5">
              <TextInput
                placeholder="1234567890"
                label="Recipient Phone"
                onChange={(v) => setNumber(v)}
                value={number}
              />
              <TextInput
                placeholder="Amount in INR"
                label="Amount"
                onChange={(v) => setAmount(v)}
                value={amount}
              />
              <div className="pt-4 flex justify-center">
                <div className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition">
                  <Button
                    onClick={async () => {
                      await p2pTransfer(number, Number(amount) * 100);
                    }}
                  >
                    🚀 Send Now
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Center>
    </div>
  );
}
