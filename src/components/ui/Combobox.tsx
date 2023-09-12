"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/Command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";

function capitalizeFirstLetter(string: string) {
  const words = string.split(" ");
  const capitalizedWords = words.map(function (word) {
    const firstCharacter = word.charAt(0);
    const isEmoji =
      firstCharacter.charCodeAt(0) >= 127000 &&
      firstCharacter.charCodeAt(0) <= 127743;
    return isEmoji ? word : word.charAt(0).toUpperCase() + word.slice(1);
  });
  return capitalizedWords.join(" ");
}

export function Combobox({
  title,
  list,
  currentValues,
  setCurrentValuesFunction,
  limit,
}: {
  title: string;
  list: string[];
  currentValues: string[];
  setCurrentValuesFunction: (values: string[]) => void;
  limit: number;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between bg-gray-950 dark:bg-slate-100"
        >
          {value ? value : `Select ${title}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        className="w-[200px] p-0 bg-gray-950 dark:bg-slate-100 text-slate-100 dark:text-gray-950"
      >
        <Command>
          <CommandInput placeholder={`Search ${title}...`} />
          <CommandEmpty>{`No ${title} found.`}</CommandEmpty>
          <CommandGroup>
            {list.map((item, index) => (
              <CommandItem
                className="cursor-pointer hover:bg-rose-500 dark:hover:bg-rose-500 p-0 py-2 font-semibold m-0"
                key={index}
                onSelect={(currentValue) => {
                  const selectedTopic = capitalizeFirstLetter(currentValue);
                  setValue(selectedTopic === value ? "" : selectedTopic);
                  currentValues.length < limit &&
                    setCurrentValuesFunction([
                      ...currentValues.filter((item) => item !== selectedTopic),
                      selectedTopic,
                    ]);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item ? "opacity-100" : "opacity-0"
                  )}
                />
                {item}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
