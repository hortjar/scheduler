"use client";

import { HTMLAttributes, forwardRef, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export interface UsernameDialogProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onUsernameSubmit(name: string): void;
  onOpenChange(open: boolean): void;
}

const UsernameDialog = forwardRef<HTMLDivElement, UsernameDialogProps>(
  ({ open, onUsernameSubmit, onOpenChange, ...props }, ref) => {
    const usernameRef = useRef<HTMLInputElement | null>(null);

    function onDialogSubmit() {
      if (usernameRef.current?.value) {
        onUsernameSubmit(usernameRef.current.value);
      }
    }

    return (
      <div ref={ref} {...props}>
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="rounded-3xl">
            <DialogHeader>
              <DialogTitle>Hello!</DialogTitle>
              <DialogDescription>
                <p>
                  It looks like this is your first time attending a meeting on
                  this site. Please, pick a name so others know who is
                  attending.
                </p>
                <p>
                  If you do not want to set a username, you can sign in on the
                  top right of your screen.
                </p>
              </DialogDescription>
            </DialogHeader>
            <div>
              <div className="flex flex-row gap-3 items-center justify-center">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" ref={usernameRef} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={onDialogSubmit}>
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
);
UsernameDialog.displayName = "UsernameDialog";

export default UsernameDialog;
