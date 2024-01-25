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
    FormLabel,
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

// type LoadoutFormProps = {
//     userId: string,
//     type: 'Create' | 'Update'
// }



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






const LoadoutForm = () => {
    const [files, setFiles] = useState<File[]>([])

    // 1. Define a form instance.
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
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

    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof FormSchema>) {
        console.log(values)
    }



    return (
        <main >
            <section className='container mt-20'>
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
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Weapon Category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Assault Rifles">Assault Rifles</SelectItem>
                                            <SelectItem value="Submachine Guns">Submachine Guns</SelectItem>
                                            <SelectItem value="Light Machine Guns">Light Machine Guns</SelectItem>
                                            <SelectItem value="Sniper Rifles">Sniper Rifles</SelectItem>
                                            <SelectItem value="Shotguns">Shotguns</SelectItem>
                                            <SelectItem value="Pistols">Pistols</SelectItem>
                                        </SelectContent>
                                    </Select>
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


                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </section>
        </main>
    )
}

export default LoadoutForm