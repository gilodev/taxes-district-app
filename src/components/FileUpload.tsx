import React, { RefObject, useRef, useState } from "react";
import { MdAttachFile } from "react-icons/md";

interface FileUploadProps {
  ref: RefObject<any>;
  label: string | React.ReactNode;
  accept: string;
  onChange: (file: File) => void;
  className?: string;
}

export default function FileUpload({
  ref,
  label,
  accept,
  onChange,
  className = "",
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFileName(file.name);
      onChange(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      onChange(file);
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div
      ref={ref}
      className={`bg-gray-100 rounded-lg p-10 text-center cursor-pointer 
      ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"} 
      ${className}`}
      onClick={handleClick}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />

      <div className="flex flex-row items-center justify-center">
        {fileName ? (
          <div className="mt-2 text-sm text-gray-600">
            <span className="font-medium text-orange">{fileName}</span>
          </div>
        ) : (
          <div className="text-gray-400 text-sm font-medium flex">
            <MdAttachFile size={20} />
            <span className="ml-2">{label}</span>
          </div>
        )}
      </div>
    </div>
  );
}
