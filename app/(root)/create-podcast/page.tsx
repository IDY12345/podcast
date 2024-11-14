"use client"
import React,{ useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Textarea } from '@/components/ui/textarea'
import GeneratePodcast from '@/components/GeneratePodcast'
import GenerateThumbnail from '@/components/GenerateThumbnail'
import { Loader } from 'lucide-react'
import { Id } from '@/convex/_generated/dataModel'


const voiceCategories=['alloy','shimmer','nova','echo','fable','onyx']

const formSchema = z.object({
  podcastTitle: z.string().min(2, {
    message: "Title must be at least  characters.",
  }),
  podcastDescription: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
})

const CreatePodcast = () => {
  
  const [imagePrompt, setImagePrompt] = useState("")
  const [imageStorageId, setImageStorageId] = 
  useState<Id<"_storage"> | null>(null)
  const [imageUrl, setImageUrl] = useState('')

  const [audioStorageId, setAudioStorageId] = 
  useState<Id<"_storage"> | null>(null)
  const [audioUrl, setAudioUrl] = useState('')
  const [audioDuration, setAudioDuration] = useState(0)

  const [voiceType, setVoiceType] = useState("")
  const [voicePrompt, setVoicePrompt] = useState("")

  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: "",
      podcastDescription: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <section className="mt-10 flex flex-col">
      <h1 className='text-white-1 text-20 font-bold'>
        Create Podcast
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 flex w-full flex-col">
          <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
            <FormField
              control={form.control}
              name="podcastTitle"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">Podcast Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title..." {...field} className="input-class focus-visible:ring-orange-1" />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2.5">
              <Label className="text-16 font-bold text-white-1">
                Select A.I. Voice
              </Label>
              <Select onValueChange={(value)=>setVoiceType(value)}>
                <SelectTrigger className={cn('text-16 w-full border-none text-gray-1 bg-black-1')}>
                  <SelectValue placeholder="Select A.I. Voice" className="placeholder:text-gray-1"/>
                </SelectTrigger>
                <SelectContent className="text-16 border-none bg-black-1 font-bold text-white-1 focus:ring-orange-1">
                  {voiceCategories.map((voice) => (
                    
                    <SelectItem key={voice} value={voice} className="text-white-1 capitalize focus:bg-orange-1">
                      {voice}
                    </SelectItem>
                  ))}
                </SelectContent>
                {
                  voiceType && <audio src={`/${voiceType}.mp3`} autoPlay className="hidden" />
                }
              </Select>
            </div>
            <FormField
              control={form.control}
              name="podcastDescription"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">Podcast Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Write a short podcast description." {...field} className="input-class focus-visible:ring-orange-1" />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
          </div>
          <div className='flex flex-col pt-10'>
              <GeneratePodcast 
              setAudioStorageId={setAudioStorageId}
              setAudio={setAudioUrl}
              voiceType={voiceType}
              audio={audioUrl}
              voicePrompt={voicePrompt}
              setVoicePrompt={setVoicePrompt}
              setAudioDuration={setAudioDuration}
              />
              <GenerateThumbnail />
              
              <div className='mt-10 w-full'>
                <Button type='submit' className='text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:bg-black-1 rounded-[5px]'>
                  {isSubmitting ? 
                  (<>
                  Submitting...
                  <Loader size={20} className='animate-spin ml-2'/>
                  </>) : "Submit & Publish Podcast"}
                </Button>
              </div>
          </div>
        </form>
      </Form>
    </section>
  )
}

export default CreatePodcast