import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutFeature = () => {
  return (
    <div className="flex flex-col md:flex-row bg-background max-w-[1264px] mx-auto md:space-x-4 space-y-4 md:space-y-0 px-4 md:px-0">
      <Card className="w-full md:w-[630px] h-[380px] md:h-[478px] relative shadow-md overflow-hidden">
        <Image
          src="/aboutfeature.jpg"
          alt="Decorative"
          fill
          className="object-cover rounded-lg"
        />
      </Card>

      <Card className="w-full md:w-[634px] h-[380px] md:h-[478px] bg-card text-card-foreground flex flex-col justify-center px-8 py-6 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-semibold mb-4">
            Our service isn&apos;t just personal, it&apos;s actually hyper
            personally exquisite
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm md:text-base leading-relaxed mb-6 text-muted-foreground">
          Our vision was clear: to make premium, handcrafted furniture accessible to everyone. With a focus on quality and timeless design, we create furniture and homeware that blend craftsmanship with affordability. Our journey began with a commitment to making thoughtfully designed pieces that cater to both modern lifestyles and enduring elegance.
          </p>
          <Button
            className="text-wite bg-primary hover:bg-primary/80"
            variant="outline"
          >
            Get in touch
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutFeature;