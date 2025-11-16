"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  itemName: z.string().min(2, {
    message: "Item name must be at least 2 characters.",
  }),
  brand: z.string().min(1, {
    message: "Brand is required. Enter N/A if not applicable.",
  }),
  model: z.string().min(1, {
    message: "Model is required. Enter N/A if not applicable.",
  }),
  color: z.string().min(2, {
    message: "Color must be at least 2 characters.",
  }),
  condition: z.string().min(1, {
    message: "Please select the item condition.",
  }),
  distinctFeatures: z.string().min(10, {
    message: "Distinct features must be at least 10 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  dateLost: z.string().min(1, {
    message: "Please provide the date you lost the item.",
  }),
});

export default function FindItemPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: "",
      brand: "",
      model: "",
      color: "",
      condition: "",
      distinctFeatures: "",
      location: "",
      dateLost: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // TODO: Submit to blockchain/backend
    alert("Form submitted! Check console for values.");
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-4 flex items-center justify-between border-b bg-white">
        <Link href="/">
          <h1 className="text-2xl font-bold tracking-tight text-blue-600 hover:text-blue-700 transition-colors cursor-pointer">
            LostChain
          </h1>
        </Link>
        
        <nav className="flex items-center gap-8">
          <Link href="/find" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
            Find Item
          </Link>
          <Link href="/report" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            Report Item
          </Link>
          <ConnectButton />
        </nav>
      </header>

      {/* Form Section */}
      <section className="max-w-2xl mx-auto mt-12 px-6 pb-12 w-full">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Find Your Lost Item</h2>
          <p className="text-gray-600 mt-2">
            Fill out the form below to search for your lost item on the blockchain.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-lg shadow-sm border">
            <FormField
              control={form.control}
              name="itemName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Black Backpack" {...field} />
                  </FormControl>
                  <FormDescription>
                    What item did you lose?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Nike, Apple, Jansport (or N/A)" {...field} />
                  </FormControl>
                  <FormDescription>
                    Brand name. Put N/A if not applicable.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., iPhone 14, MacBook Pro (or N/A)" {...field} />
                  </FormControl>
                  <FormDescription>
                    Model number or name. Put N/A if not applicable.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Black, Navy Blue, Red" {...field} />
                  </FormControl>
                  <FormDescription>
                    Primary color of the item.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Condition</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="like-new">Like New</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="worn">Worn</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Condition of the item when lost.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="distinctFeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distinct Features</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe unique features, scratches, stickers, engravings, etc."
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Any unique identifiers that would help verify ownership.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location Lost</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Student Center, Library 3rd Floor" {...field} />
                  </FormControl>
                  <FormDescription>
                    Where did you last see your item?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateLost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date Lost</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormDescription>
                    When did you lose the item?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" size="lg">
              Submit Lost Item Report
            </Button>
          </form>
        </Form>
      </section>
    </main>
  );
}
