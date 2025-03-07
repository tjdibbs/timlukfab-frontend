'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description: string;
  maxWidth: string;
};

const Modal = ({
  children,
  open,
  setOpen,
  title,
  description,
  maxWidth = 'sm:max-w-[425px]',
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={maxWidth}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
export default Modal;
