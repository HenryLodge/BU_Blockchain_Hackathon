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
import { useState, useEffect } from "react";

// Define cascading data structure
const categoryData = {
  electronics: {
    label: "Electronics",
    subcategories: {
      mobile: {
        label: "Mobile Devices",
        items: {
          phone: { label: "Phone", brands: ["Apple", "Samsung", "Google", "OnePlus"] },
          tablet: { label: "Tablet", brands: ["Apple", "Samsung", "Microsoft", "Amazon"] },
          smartwatch: { label: "Smartwatch", brands: ["Apple", "Samsung", "Garmin", "Fitbit"] },
        },
      },
      computer: {
        label: "Computers",
        items: {
          laptop: { label: "Laptop", brands: ["Apple", "Dell", "HP", "Lenovo"] },
          desktop: { label: "Desktop", brands: ["Dell", "HP", "Apple", "Custom Built"] },
          monitor: { label: "Monitor", brands: ["Dell", "LG", "Samsung", "ASUS"] },
        },
      },
      audio: {
        label: "Audio Devices",
        items: {
          headphones: { label: "Headphones", brands: ["Sony", "Bose", "Apple", "Sennheiser"] },
          earbuds: { label: "Earbuds", brands: ["Apple", "Samsung", "Sony", "Jabra"] },
          speaker: { label: "Speaker", brands: ["JBL", "Bose", "Sony", "Ultimate Ears"] },
        },
      },
    },
  },
  accessories: {
    label: "Accessories",
    subcategories: {
      bags: {
        label: "Bags & Backpacks",
        items: {
          backpack: { label: "Backpack", brands: ["Jansport", "North Face", "Nike", "Herschel"] },
          messenger: { label: "Messenger Bag", brands: ["Timbuk2", "Chrome", "Fossil", "Coach"] },
          tote: { label: "Tote Bag", brands: ["Longchamp", "Michael Kors", "Kate Spade", "Generic"] },
        },
      },
      clothing: {
        label: "Clothing",
        items: {
          jacket: { label: "Jacket", brands: ["North Face", "Patagonia", "Columbia", "Nike"] },
          hoodie: { label: "Hoodie", brands: ["Nike", "Adidas", "Champion", "University Merch"] },
          hat: { label: "Hat/Cap", brands: ["New Era", "Nike", "Adidas", "Generic"] },
        },
      },
      jewelry: {
        label: "Jewelry & Watches",
        items: {
          watch: { label: "Watch", brands: ["Rolex", "Casio", "Timex", "Fossil"] },
          necklace: { label: "Necklace", brands: ["Tiffany", "Pandora", "Custom", "Generic"] },
          bracelet: { label: "Bracelet", brands: ["Pandora", "Alex and Ani", "Custom", "Generic"] },
        },
      },
    },
  },
  documents: {
    label: "Documents & IDs",
    subcategories: {
      identification: {
        label: "Identification",
        items: {
          studentid: { label: "Student ID", brands: ["University Issued"] },
          driverslicense: { label: "Driver's License", brands: ["State Issued"] },
          passport: { label: "Passport", brands: ["Country Issued"] },
        },
      },
      cards: {
        label: "Cards",
        items: {
          creditcard: { label: "Credit/Debit Card", brands: ["Visa", "Mastercard", "Amex", "Discover"] },
          giftcard: { label: "Gift Card", brands: ["Amazon", "Starbucks", "Target", "Generic"] },
          keycard: { label: "Key Card", brands: ["Building Access", "Hotel", "Office"] },
        },
      },
    },
  },
  sports: {
    label: "Sports & Recreation",
    subcategories: {
      equipment: {
        label: "Sports Equipment",
        items: {
          basketball: { label: "Basketball", brands: ["Spalding", "Wilson", "Nike", "Generic"] },
          soccerball: { label: "Soccer Ball", brands: ["Adidas", "Nike", "Puma", "Generic"] },
          tennisracket: { label: "Tennis Racket", brands: ["Wilson", "Head", "Babolat", "Prince"] },
          baseball: { label: "Baseball/Glove", brands: ["Rawlings", "Wilson", "Mizuno", "Generic"] },
        },
      },
      gym: {
        label: "Gym Gear",
        items: {
          waterbottle: { label: "Water Bottle", brands: ["Hydro Flask", "Nalgene", "Contigo", "Generic"] },
          gymbag: { label: "Gym Bag", brands: ["Nike", "Adidas", "Under Armour", "Generic"] },
          yogamat: { label: "Yoga Mat", brands: ["Manduka", "Gaiam", "Lululemon", "Generic"] },
        },
      },
      recreation: {
        label: "Recreation Items",
        items: {
          frisbee: { label: "Frisbee", brands: ["Discraft", "Innova", "Wham-O", "Generic"] },
          skateboard: { label: "Skateboard", brands: ["Element", "Baker", "Zero", "Generic"] },
          bikeaccessory: { label: "Bike Accessory", brands: ["Kryptonite", "Bell", "Schwinn", "Generic"] },
        },
      },
    },
  },
  school: {
    label: "School Supplies",
    subcategories: {
      books: {
        label: "Textbooks",
        items: {
          mathbook: { label: "Math Textbook", brands: ["Pearson", "McGraw-Hill", "Cengage", "Wiley"] },
          sciencebook: { label: "Science Textbook", brands: ["Pearson", "McGraw-Hill", "Cengage", "Wiley"] },
          englishbook: { label: "English/Literature Book", brands: ["Pearson", "Norton", "Bedford", "Generic"] },
          otherbook: { label: "Other Textbook", brands: ["Pearson", "McGraw-Hill", "Cengage", "Generic"] },
        },
      },
      supplies: {
        label: "Writing & Supplies",
        items: {
          notebook: { label: "Notebook/Binder", brands: ["Five Star", "Mead", "Moleskine", "Generic"] },
          calculator: { label: "Calculator", brands: ["TI", "Casio", "HP", "Sharp"] },
          labequipment: { label: "Lab Equipment", brands: ["School Issued", "Generic"] },
        },
      },
      art: {
        label: "Art Supplies",
        items: {
          sketchbook: { label: "Sketchbook", brands: ["Moleskine", "Strathmore", "Canson", "Generic"] },
          artsupplies: { label: "Art Supplies", brands: ["Crayola", "Prismacolor", "Faber-Castell", "Generic"] },
        },
      },
    },
  },
  keys: {
    label: "Keys & Access Items",
    subcategories: {
      keys: {
        label: "Keys",
        items: {
          housekeys: { label: "House/Dorm Keys", brands: ["Generic", "With Keychain", "Loose"] },
          carkeys: { label: "Car Keys", brands: ["Toyota", "Honda", "Ford", "Other"] },
          keychain: { label: "Key Chain", brands: ["Custom", "Branded", "Generic"] },
        },
      },
      access: {
        label: "Access Items",
        items: {
          accessfob: { label: "Access Fob", brands: ["Building Access", "Parking", "Generic"] },
          remotecontrol: { label: "Remote Control", brands: ["Car Remote", "Garage Remote", "Generic"] },
        },
      },
    },
  },
  personal: {
    label: "Personal Care",
    subcategories: {
      eyewear: {
        label: "Eyewear",
        items: {
          glasses: { label: "Prescription Glasses", brands: ["Ray-Ban", "Oakley", "Warby Parker", "Generic"] },
          sunglasses: { label: "Sunglasses", brands: ["Ray-Ban", "Oakley", "Maui Jim", "Generic"] },
          case: { label: "Glasses Case", brands: ["Generic", "Branded"] },
        },
      },
      weather: {
        label: "Weather Protection",
        items: {
          umbrella: { label: "Umbrella", brands: ["Totes", "ShedRain", "Generic"] },
          raincoat: { label: "Rain Coat/Poncho", brands: ["Columbia", "North Face", "Generic"] },
        },
      },
      containers: {
        label: "Containers & Bottles",
        items: {
          thermos: { label: "Thermos/Tumbler", brands: ["Yeti", "Stanley", "Contigo", "Generic"] },
          lunchbox: { label: "Lunch Box", brands: ["Thermos", "Bentgo", "Generic"] },
        },
      },
    },
  },
};

const formSchema = z.object({
  category: z.string().min(1, { message: "Please select a category." }),
  subcategory: z.string().min(1, { message: "Please select a subcategory." }),
  itemType: z.string().min(1, { message: "Please select an item type." }),
  brand: z.string().min(1, { message: "Please select a brand." }),
  color: z.string().min(2, { message: "Color must be at least 2 characters." }),
  distinctFeatures: z.string().min(10, {
    message: "Distinct features must be at least 10 characters.",
  }),
  location: z.string().min(2, { message: "Location must be at least 2 characters." }),
  dateLost: z.string().min(1, { message: "Please provide the date you lost the item." }),
});

export default function CategoryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [selectedItemType, setSelectedItemType] = useState<string>("");
  const [availableSubcategories, setAvailableSubcategories] = useState<any>({});
  const [availableItems, setAvailableItems] = useState<any>({});
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      subcategory: "",
      itemType: "",
      brand: "",
      color: "",
      distinctFeatures: "",
      location: "",
      dateLost: "",
    },
  });

  // Update subcategories when category changes
  useEffect(() => {
    if (selectedCategory) {
      const categoryObj = categoryData[selectedCategory as keyof typeof categoryData];
      setAvailableSubcategories(categoryObj?.subcategories || {});
      // Reset dependent fields
      setSelectedSubcategory("");
      setSelectedItemType("");
      setAvailableItems({});
      setAvailableBrands([]);
      form.setValue("subcategory", "");
      form.setValue("itemType", "");
      form.setValue("brand", "");
    }
  }, [selectedCategory, form]);

  // Update items when subcategory changes
  useEffect(() => {
    if (selectedCategory && selectedSubcategory) {
      const categoryObj = categoryData[selectedCategory as keyof typeof categoryData];
      const subcategoryObj = (categoryObj?.subcategories as any)[selectedSubcategory];
      setAvailableItems(subcategoryObj?.items || {});
      // Reset dependent fields
      setSelectedItemType("");
      setAvailableBrands([]);
      form.setValue("itemType", "");
      form.setValue("brand", "");
    }
  }, [selectedSubcategory, selectedCategory, form]);

  // Update brands when item type changes
  useEffect(() => {
    if (selectedCategory && selectedSubcategory && selectedItemType) {
      const categoryObj = categoryData[selectedCategory as keyof typeof categoryData];
      const subcategoryObj = (categoryObj?.subcategories as any)[selectedSubcategory];
      const itemObj = (subcategoryObj?.items as any)[selectedItemType];
      setAvailableBrands(itemObj?.brands || []);
      form.setValue("brand", "");
    }
  }, [selectedItemType, selectedSubcategory, selectedCategory, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    alert("Form submitted! Check console for values.");
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-4 flex items-center justify-between border-b bg-white">
        <Link href="/">
          <h1 className="text-3xl font-bold tracking-tight text-blue-600 hover:text-blue-700 transition-colors cursor-pointer">
            LostChain
          </h1>
        </Link>
        
        <nav className="flex items-center gap-8">
          <Link href="/find" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            Find Item
          </Link>
          <Link href="/report" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            Report Item
          </Link>
          <Link href="/category" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
            Category Search
          </Link>
          <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            Dashboard
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            About
          </Link>
          <ConnectButton />
        </nav>
      </header>

      {/* Form Section */}
      <section className="max-w-2xl mx-auto mt-12 px-6 pb-12 w-full">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Categorized Item Search</h2>
          <p className="text-gray-600 mt-2">
            Use cascading dropdowns to precisely identify your lost item. Each selection narrows down the next options.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-lg shadow-sm border">
            {/* Category Dropdown */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedCategory(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(categoryData).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Start by selecting the main category of your item.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Subcategory Dropdown */}
            <FormField
              control={form.control}
              name="subcategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subcategory</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedSubcategory(value);
                    }}
                    defaultValue={field.value}
                    disabled={!selectedCategory}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={selectedCategory ? "Select a subcategory" : "Select category first"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(availableSubcategories).map(([key, value]: [string, any]) => (
                        <SelectItem key={key} value={key}>
                          {value.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose a more specific subcategory.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Item Type Dropdown */}
            <FormField
              control={form.control}
              name="itemType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Type</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedItemType(value);
                    }}
                    defaultValue={field.value}
                    disabled={!selectedSubcategory}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={selectedSubcategory ? "Select an item type" : "Select subcategory first"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(availableItems).map(([key, value]: [string, any]) => (
                        <SelectItem key={key} value={key}>
                          {value.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the specific type of item.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Brand Dropdown */}
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!selectedItemType}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={selectedItemType ? "Select a brand" : "Select item type first"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableBrands.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the brand of your item.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Color Input */}
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

            {/* Distinct Features */}
            <FormField
              control={form.control}
              name="distinctFeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distinct Features</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe unique features, scratches, stickers, engravings, serial numbers, etc."
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

            {/* Location */}
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

            {/* Date Lost */}
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
              Submit Categorized Item Report
            </Button>
          </form>
        </Form>
      </section>
    </main>
  );
}
