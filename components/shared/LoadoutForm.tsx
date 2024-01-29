"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Check, ChevronDown } from "lucide-react"
import { Input } from "../ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

import { Textarea } from "../ui/textarea"
import { useState } from "react"

// ========FORM FIELDS DATA==========================

import { firstAttachments, fifthAttachments, fourthAttachments, secondAttachments, thirdAttachments, weapons } from "@/constants"
import { FileUploader } from "../FileUploader"
import { ILoadout } from "@/lib/database/models/loadout.model"
import { useUploadThing } from "@/lib/uploadthing"
import { useRouter } from "next/navigation"
import { createLoadout, updateLoadout } from "@/lib/actions/loadout.actions"
import Dropdown from "../Dropdown"

type LoadoutFormProps = {
    userId: string;
    type: "Create" | "Update";
    loadout?: ILoadout;
    loadoutId?: string;
}



const FormSchema = z.object({
    title: z.string().min(2, {
        message: "title must be at least 2 characters.",
    }),
    weapon: z.string().min(1, {
        message: "Please select a weapon.",
    }),

    gameMode: z.string().min(2, {
        message: "Please select a game mode.",
    }),
    description: z.string().min(3, 'Description must be at least 3 characters').max(400, 'Description must be less than 400 characters'),
    firstAttachment: z.string().min(1, {
        message: "Please select an attachment.",
    }),
    secondAttachment: z.string().min(1, {
        message: "Please select an attachment.",
    }),
    thirdAttachment: z.string().min(1, {
        message: "Please select an attachment.",
    }),
    fourthAttachment: z.string().min(1, {
        message: "Please select an attachment.",
    }),
    fifthAttachment: z.string().min(1, {
        message: "Please select an attachment.",
    }),
    imageUrl: z.string().min(2, {
        message: "cannot be empty.",
    }),
    categoryId: z.string().min(2, {
        message: "Please select a category.",
    }),
})

const loadoutDefaultValues = {
    title: '',
    weapon: '',
    gameMode: '',
    description: '',
    imageUrl: '',
    firstAttachment: '',
    secondAttachment: '',
    thirdAttachment: '',
    fourthAttachment: '',
    fifthAttachment: '',
    categoryId: '',
}






const LoadoutForm = ({ userId, type, loadout, loadoutId }: LoadoutFormProps) => {
    const [files, setFiles] = useState<File[]>([])
    const initialValues = loadoutDefaultValues

    const router = useRouter();

    const { startUpload } = useUploadThing('imageUploader')

    // 1. Define a form instance.
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: initialValues

    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof FormSchema>) {
        // console.log(values)

        let uploadedImageUrl = values.imageUrl;

        if (files.length > 0) {

            const uploadedImages = await startUpload(files);

            if (!uploadedImages) {
                return;
            }
            uploadedImageUrl = uploadedImages[0].url;

        }


        if (type === "Create") {
            try {
                const newLoadout = await createLoadout({
                    loadout: { ...values, imageUrl: uploadedImageUrl, },
                    userId,
                    path: "/profile"
                })

                if (newLoadout) {
                    form.reset;
                    router.push(`/loadouts/${newLoadout._id}`)
                }
            } catch (error) {
                console.log(error);

            }
        }

        if (type === "Update") {
            if (!loadoutId) {
                router.back();
                return
            }
            try {
                const updatedLoadout = await updateLoadout({
                    userId,
                    loadout: { ...values, imageUrl: uploadedImageUrl, _id: loadoutId },
                    path: `/loadouts/${loadoutId}`,
                })
                if (updatedLoadout) {
                    form.reset();
                    router.push(`/laodouts/${updatedLoadout._id}`);
                }
            } catch (error) {
                console.log(error);

            }

        }
    }



    return (
        <main >
            <section className='container max-w-2xl mt-20'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Name your Loadout" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <Dropdown
                                        onChangeHandler={field.onChange}
                                        value={field.value}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="weapon"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? weapons.find(
                                                            (weapon) => weapon.value === field.value
                                                        )?.label
                                                        : "Select weapon"}
                                                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] h-[200px] p-0">
                                            <Command>
                                                <CommandInput
                                                    placeholder="Search weapon..."
                                                    className="h-9"
                                                />
                                                <CommandEmpty>No weapon found.</CommandEmpty>
                                                <CommandGroup>

                                                    <ScrollArea className="h-[200px] w-[200px]">
                                                        {weapons.map((weapon) => (

                                                            <CommandItem
                                                                value={weapon.label}
                                                                key={weapon.value}
                                                                onSelect={() => {
                                                                    form.setValue("weapon", weapon.value)
                                                                }}
                                                            >
                                                                {weapon.label}
                                                                <Check
                                                                    className={cn(
                                                                        "ml-auto h-4 w-4",
                                                                        weapon.value === field.value
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                            </CommandItem>

                                                        ))}
                                                    </ScrollArea>
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="gameMode"
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a game mode" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Multiplayer">Multiplayer</SelectItem>
                                            <SelectItem value="Battle Royal">Battle Royal</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem className="w-full flex flex-col items-center justify-center border rounded-md">
                                    <FormControl>
                                        <FileUploader
                                            onFieldChange={field.onChange}
                                            imageUrl={field.value}
                                            setFiles={setFiles}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="firstAttachment"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? firstAttachments.find(
                                                            (attachment) => attachment.value === field.value
                                                        )?.label
                                                        : "Select first attachment"}
                                                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput
                                                    placeholder="Search..."
                                                    className="h-9"
                                                />
                                                <CommandEmpty>No attachment found.</CommandEmpty>
                                                <CommandGroup>
                                                    <ScrollArea className="h-[200px] w-[200px]">
                                                        {firstAttachments.map((attachment) => (
                                                            <CommandItem
                                                                value={attachment.label}
                                                                key={attachment.value}
                                                                onSelect={() => {
                                                                    form.setValue("firstAttachment", attachment.value)
                                                                }}
                                                            >
                                                                {attachment.label}
                                                                <Check
                                                                    className={cn(
                                                                        "ml-auto h-4 w-4",
                                                                        attachment.value === field.value
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                            </CommandItem>
                                                        ))}
                                                    </ScrollArea>
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="secondAttachment"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? secondAttachments.find(
                                                            (attachment) => attachment.value === field.value
                                                        )?.label
                                                        : "Select second attachment"}
                                                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput
                                                    placeholder="Search..."
                                                    className="h-9"
                                                />
                                                <CommandEmpty>No attachment found.</CommandEmpty>
                                                <CommandGroup>
                                                    <ScrollArea className="h-[200px] w-[200px]">
                                                        {secondAttachments.map((attachment) => (
                                                            <CommandItem
                                                                value={attachment.label}
                                                                key={attachment.value}
                                                                onSelect={() => {
                                                                    form.setValue("secondAttachment", attachment.value)
                                                                }}
                                                            >
                                                                {attachment.label}
                                                                <Check
                                                                    className={cn(
                                                                        "ml-auto h-4 w-4",
                                                                        attachment.value === field.value
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                            </CommandItem>
                                                        ))}
                                                    </ScrollArea>
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="thirdAttachment"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? thirdAttachments.find(
                                                            (attachment) => attachment.value === field.value
                                                        )?.label
                                                        : "Select third attachment"}
                                                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput
                                                    placeholder="Search..."
                                                    className="h-9"
                                                />
                                                <CommandEmpty>No attachment found.</CommandEmpty>
                                                <CommandGroup>
                                                    <ScrollArea className="h-[200px] w-[200px]">
                                                        {thirdAttachments.map((attachment) => (
                                                            <CommandItem
                                                                value={attachment.label}
                                                                key={attachment.value}
                                                                onSelect={() => {
                                                                    form.setValue("thirdAttachment", attachment.value)
                                                                }}
                                                            >
                                                                {attachment.label}
                                                                <Check
                                                                    className={cn(
                                                                        "ml-auto h-4 w-4",
                                                                        attachment.value === field.value
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                            </CommandItem>
                                                        ))}
                                                    </ScrollArea>
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="fourthAttachment"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? fourthAttachments.find(
                                                            (attachment) => attachment.value === field.value
                                                        )?.label
                                                        : "Select fourth attachment"}
                                                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput
                                                    placeholder="Search..."
                                                    className="h-9"
                                                />
                                                <CommandEmpty>No attachment found.</CommandEmpty>
                                                <CommandGroup>
                                                    <ScrollArea className="h-[200px] w-[200px]">
                                                        {fourthAttachments.map((attachment) => (
                                                            <CommandItem
                                                                value={attachment.label}
                                                                key={attachment.value}
                                                                onSelect={() => {
                                                                    form.setValue("fourthAttachment", attachment.value)
                                                                }}
                                                            >
                                                                {attachment.label}
                                                                <Check
                                                                    className={cn(
                                                                        "ml-auto h-4 w-4",
                                                                        attachment.value === field.value
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                            </CommandItem>
                                                        ))}
                                                    </ScrollArea>
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="fifthAttachment"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? fifthAttachments.find(
                                                            (attachment) => attachment.value === field.value
                                                        )?.label
                                                        : "Select fifth attachment"}
                                                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput
                                                    placeholder="Search..."
                                                    className="h-9"
                                                />
                                                <CommandEmpty>No attachment found.</CommandEmpty>
                                                <CommandGroup>
                                                    <ScrollArea className="h-[200px] w-[200px]">
                                                        {fifthAttachments.map((attachment) => (
                                                            <CommandItem
                                                                value={attachment.label}
                                                                key={attachment.value}
                                                                onSelect={() => {
                                                                    form.setValue("fifthAttachment", attachment.value)
                                                                }}
                                                            >
                                                                {attachment.label}
                                                                <Check
                                                                    className={cn(
                                                                        "ml-auto h-4 w-4",
                                                                        attachment.value === field.value
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                            </CommandItem>
                                                        ))}
                                                    </ScrollArea>
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl className="h-72">
                                        <Textarea
                                            placeholder="Description"
                                            {...field}
                                            className="textarea rounded-2xl"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <Button
                            type="submit"
                            size="lg"
                            disabled={form.formState.isSubmitting}
                            className="button col-span-2 w-full mt-10"
                        >
                            {form.formState.isSubmitting ? "Building..." : `${type} Loadout `}
                        </Button>
                    </form>
                </Form>
            </section>
        </main>
    )
}

export default LoadoutForm

