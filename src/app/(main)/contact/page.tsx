"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Image from "next/image";

const Contact = () => {
  return (
    <section className="text-muted-foreground body-font relative py-24 px-6 sm:px-12">
      <div className="absolute inset-0 -z-10">
      <Image src="/contact-bg.jpg" alt="contact" layout="fill" objectFit="cover" className="w-full h-full"/>
      </div>
      <Card className="w-full max-w-4xl mx-auto shadow-white bg-transparent">
        <CardHeader>
          <CardTitle className="text-xl sm:text-3xl text-stone-100 font-semibold text-center mb-6">
            Contact Us
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form className="flex flex-wrap -m-4">
            <div className="p-4 w-full md:w-1/2">
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                required
                className="w-full placeholder:text-cyan-400 font-semibold"
              />
            </div>

            <div className="p-4 w-full md:w-1/2">
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full placeholder:text-cyan-400 font-semibold"
              />
            </div>

            <div className="p-4 w-full md:w-1/2">
              <Input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Your Phone"
                className="w-full placeholder:text-cyan-400 font-semibold"
              />
            </div>

            <div className="p-4 w-full md:w-1/2">
              <Input
                type="text"
                id="subject"
                name="subject"
                placeholder="Subject"
                className="w-full placeholder:text-cyan-400 font-semibold"
              />
            </div>

            <div className="p-4 w-full">
              <Textarea
                id="message"
                name="message"
                placeholder="Your Message"
                className="w-full placeholder:text-cyan-400 font-semibold"
                rows={6}
                required
              />
            </div>

            <div className="p-4 w-full flex justify-center">
              <Button
                className="text-white bg-primary hover:bg-primary/80"
                variant="outline"
                onClick={() => toast("Message Sent successfully!")}
              >
                Send Message
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default Contact;