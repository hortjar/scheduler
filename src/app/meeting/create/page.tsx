"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import dynamic from "next/dynamic";
import { LatLng } from "leaflet";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { H4 } from "@/components/ui/typography";
import { Switch } from "@/components/ui/switch";
import { api } from "@/trpc/react";
import { updateLocalCreatorKeys } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  private: z.boolean().default(false),
  virtual: z.boolean().default(false),
  coordinates: z
    .object({
      latitude: z.number(),
      longitude: z.number(),
    })
    .optional(),
  dates: z.array(z.date()),
});

export default function CreateMeeting() {
  const MapWithNoSSR = dynamic(() => import("@/components/map/map"), {
    ssr: false,
  });

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      private: true,
      virtual: true,
      dates: [],
    },
  });

  const createMeeting = api.meeting.create.useMutation();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await createMeeting.mutateAsync(values);
    if (res && res.length > 0) {
      updateLocalCreatorKeys(res[0]!.creatorKey);
      router.push(res[0]!.urlKey);
    }
  }

  function locationSelected(latLong: LatLng) {
    console.log("selected", latLong);
    form.setValue("coordinates", {
      latitude: latLong.lat,
      longitude: latLong.lng,
    });
  }

  function dateSelected(date: Date[] | undefined) {
    if (!date) {
      return;
    }
    form.setValue("dates", date);
  }

  function onTimeChange(value: string, date: Date) {
    const dates = form.getValues().dates;
    const existingDate = dates.find(
      (x) => x.toDateString() == date.toDateString()
    );
    const splitTime = value.split(":");
    existingDate?.setHours(Number(splitTime[0]));
    existingDate?.setMinutes(Number(splitTime[1]));
  }

  return (
    <Card rounded={"full"}>
      <CardHeader>
        <CardTitle className="text-3xl font-semibold tracking-tight">
          Create meeting
        </CardTitle>
        <CardDescription>
          Organize a new meeting and specify the location and possible dates
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-semibold tracking-tight">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name of your meeting.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="virtual"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>This meeting is virtual</FormLabel>
                    <FormDescription>
                      If unchecked, specify the location below
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="private"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>This meeting is private</FormLabel>
                    <FormDescription>
                      This meeting will only be accessible to those with a link
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!form.getValues().virtual && (
              <>
                <div className="flex flex-col gap-3">
                  <H4>Location</H4>
                  <div className="flex flex-row w-full gap-3">
                    <FormField
                      control={form.control}
                      name="coordinates.latitude"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Latitude</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="lat"
                              {...field}
                              readOnly
                              disabled
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="coordinates.longitude"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Longitude</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="lon"
                              {...field}
                              readOnly
                              disabled
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="h-[400px]" suppressHydrationWarning>
                  <MapWithNoSSR locationSelected={locationSelected} />
                </div>
              </>
            )}
            <div>
              <FormField
                control={form.control}
                name="dates"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-xl font-semibold tracking-tight">
                      Dates
                    </FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-3">
                        <Calendar
                          mode="multiple"
                          selected={field.value}
                          onSelect={(e) => dateSelected(e)}
                          initialFocus
                          className="w-full h-[355px]"
                        />
                        <div className="flex flex-col gap-3">
                          {field.value.map((x) => (
                            <div
                              key={x.toISOString()}
                              className="flex flex-row gap-3"
                            >
                              <Input
                                type="date"
                                value={format(x, "yyyy-MM-dd")}
                                readOnly
                                disabled
                              />
                              <Input
                                type="time"
                                defaultValue={format(x, "hh:mm")}
                                onChange={(e) =>
                                  onTimeChange(e.target.value, x)
                                }
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      You have selected {form.getValues().dates.length} date(s)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
