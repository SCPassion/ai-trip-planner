import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Globe2, Landmark, Plane, Send } from "lucide-react";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";

const suggestions = [
  {
    title: "Create New Trip",
    icon: <Globe2 className="text-blue-400 size-5" />,
  },
  {
    title: "Inspire me where to go",
    icon: <Plane className="text-green-500 size-5" />,
  },
  {
    title: "Discover Hidden gems",
    icon: <Landmark className="text-orange-500 size-5" />,
  },
  {
    title: "Adventure Destination",
    icon: <Globe2 className="text-yellow-600 size-5" />,
  },
];

export default function Hero() {
  return (
    <div className="mt-24 flex items-center w-full justify-center">
      {/* Content */}
      <div className="max-w-3xl w-full text-center space-y-6">
        <h1 className="text-xl md:text-5xl font-bold">
          Hey, I'm your personal{" "}
          <span className="text-primary">Trip Planner</span>
        </h1>
        <p className="text-lg">
          Tell me what you want, and I'll handle the rest: Flights, Hotels, trip
          planner - all in seconds
        </p>
        {/* Input box */}
        <div>
          <div className="border rounded-2xl p-4 shadow relative">
            <Textarea
              // This is how you remove the border and shadow of the textarea
              className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
              placeholder="Create a trip for Paris from New York"
            />
            <Button size="icon" className="absolute right-6 bottom-6">
              <Send className="size-4" />
            </Button>
          </div>
        </div>

        {/* Suggestion list */}
        <div className="flex gap-5">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="flex items-center gap-2 border rounded-full p-2 cursor-pointer hover:bg-primary hover:text-white"
            >
              {suggestion.icon}
              <h2 className="text-sm">{suggestion.title}</h2>
            </div>
          ))}
        </div>

        {/* Video Section */}
        <HeroVideoDialog
          className="block dark:hidden"
          animationStyle="from-center"
          // This is the video that will play when the thumbnail is clicked
          videoSrc="https://www.youtube.com/watch?v=sXRDL-EPtrM"
          // This is the thumbnail of the video, aka a picture preview of the video, when clicked on the thumbnail, the video will play
          thumbnailSrc="https://mma.prnewswire.com/media/2401528/1_MindtripProduct.jpg?p=facebook"
          thumbnailAlt="Dummy Video Thumbnail"
        />
      </div>
    </div>
  );
}
