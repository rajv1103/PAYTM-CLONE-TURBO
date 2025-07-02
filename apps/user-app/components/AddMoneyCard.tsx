"use client";

import { useState } from "react";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/textinput";
import { createOnRampTransaction } from "../app/lib/actions/createOnRamptxn";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

export const AddMoney = () => {
  const [amount, setAmount] = useState<number>(0);
  const [provider, setProvider] = useState<string>(SUPPORTED_BANKS[0]?.name || "");
  const [redirectUrl, setRedirectUrl] = useState<string>(SUPPORTED_BANKS[0]?.redirectUrl || "");
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddMoney = async () => {
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    setLoading(true);
    try {
      await createOnRampTransaction(amount * 100, provider);
      window.location.href = redirectUrl;
    } catch (err) {
      alert("Failed to create transaction.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput
          label="Amount"
          placeholder="Enter amount"
          value={amount.toString()}
          onChange={(value) => {
            const numeric = parseFloat(value);
            if (!isNaN(numeric)) setAmount(numeric);
            else setAmount(0);
          }}
        />

        <div className="py-4 text-left font-medium text-gray-700">Select Bank</div>
        <Select
          onSelect={(value) => {
            const bank = SUPPORTED_BANKS.find((x) => x.name === value);
            setRedirectUrl(bank?.redirectUrl || "");
            setProvider(bank?.name || "");
          }}
          options={SUPPORTED_BANKS.map((bank) => ({
            key: bank.name,
            value: bank.name,
          }))}
        />

        <div className="flex justify-center pt-4">
          <Button onClick={handleAddMoney}>
            {loading ? "Processing..." : "Add Money"}
          </Button>
        </div>
      </div>
    </Card>
  );
};
