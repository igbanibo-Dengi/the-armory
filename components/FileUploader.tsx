"use client";

import { useCallback, Dispatch, SetStateAction } from "react";
import type { FileWithPath } from "@uploadthing/react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";
// import { UploadCloud } from "lucide-react";

type FileUploaderProps = {
    onFieldChange: (url: string) => void;
    imageUrl: string;
    setFiles: Dispatch<SetStateAction<File[]>>;
};

export function FileUploader({
    imageUrl,
    onFieldChange,
    setFiles,
}: FileUploaderProps) {
    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setFiles(acceptedFiles);
        onFieldChange(convertFileToUrl(acceptedFiles[0]));
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
    });

    return (
        <div
            {...getRootProps()}
            className="flex-center bg-dark-3 flex   cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50"
        >
            <input {...getInputProps()} className="cursor-pointer" />

            {imageUrl ? (
                <div className="flex w-full flex-1 justify-center items-center">
                    <img
                        src={imageUrl}
                        alt="image"
                        width={250}
                        height={250}
                        className="w-full object-cover object-center"
                    />
                </div>
            ) : (
                <div className="flex justify-center items-center flex-col py-5 text-grey-500">
                    <Button type="button" variant={"outline"}>
                        Click to upload
                    </Button>
                </div>
            )}
        </div>
    );
}
