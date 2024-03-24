import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HTMLAttributes, forwardRef, useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

export interface DatePickerProps extends HTMLAttributes<HTMLDivElement> {
  onDateSelected: (date: Date) => void;
  changeButtonDate?: boolean;
}

const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  ({ changeButtonDate = false, onDateSelected, ...props }, ref) => {
    const [date, setDate] = useState<Date>();

    function dateSeletced(date: Date | undefined) {
      setDate(date);
      if (date) {
        onDateSelected(date);
      }
    }

    return (
      <div ref={ref} {...props}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {changeButtonDate && date ? (
                format(date, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" side="bottom">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(e) => dateSeletced(e)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);
DatePicker.displayName = "DatePicker";

export default DatePicker;
