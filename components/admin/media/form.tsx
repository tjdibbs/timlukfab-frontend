"use client";

import { Button } from "@/components/ui/button";
import {
  Loader2Icon,
  PlusCircleIcon,
  UploadCloudIcon,
  UploadIcon,
} from "lucide-react";
import { FormEvent, useState } from "react";
import Modal from "../ui/modal";
import product1 from "@/assets/images/products/product1.jpg";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import useMessage from "@/hooks/useMessage";
import { uploadFile } from "@/lib/actions/files";

const UploadForm = () => {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<string[] | null>(null);
  const [files, setFiles] = useState<File[] | null>(null);
  const [pending, setPending] = useState(false);
  const [text, setText] = useState<string>(
    "Click to upload an image or drag and drop"
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 10,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/svg": [".svg"],
    },
    onDrop: acceptedFiles => {
      const files = acceptedFiles;
      setImages(files.map(file => URL.createObjectURL(file)));
      setFiles(files);
      setText("Click to upload an image or drag and drop");
    },
    onDragEnter: () => {
      setText("Drop files here");
    },
    onDragLeave: () => {
      setText("Click to upload an image or drag and drop");
    },
  });

  const handleOpen = () => setOpen(true);

  const { alertMessage } = useMessage();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    if (!files) {
      alertMessage("Please upload an image", "error");
      return;
    }

    const promises = files.map(async file => {
      const formData = new FormData();
      formData.append("file", file);
      const res = await uploadFile(formData);
      if (!res.success) {
        return alertMessage(res.message, "error");
      }
    });

    try {
      const res = await Promise.all(promises);
      console.log(res);
      alertMessage("Upload successful", "success");
      setOpen(false);
    } catch (error) {
      alertMessage("Upload failed", "error");
    } finally {
      setPending(false);
    }
  };

  return (
    <div>
      <Button className="flex items-center gap-2" onClick={handleOpen}>
        <PlusCircleIcon className="h-4 w-4" /> Upload media
      </Button>
      <Modal
        open={open}
        setOpen={setOpen}
        title="Upload media"
        description="Upload your images here (max of 10)"
      >
        <form onSubmit={onSubmit}>
          {images && (
            <div className="mb-4 grid max-h-64 grid-cols-3 gap-2 overflow-y-auto">
              {images.map(image => (
                <div className="h-32" key={image}>
                  <Image
                    src={image}
                    alt="image"
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="image-upload"
              {...getRootProps({ className: "dropzone" })}
              className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300"
            >
              <input {...getInputProps()} />
              <UploadIcon className="h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">{text}</p>
            </label>
          </div>
          <Button type="submit" disabled={pending} className="w-full">
            {pending ? (
              <Loader2Icon className="h-4 w-4 animate-spin" />
            ) : (
              "Upload"
            )}
          </Button>
        </form>
      </Modal>
    </div>
  );
};
export default UploadForm;
