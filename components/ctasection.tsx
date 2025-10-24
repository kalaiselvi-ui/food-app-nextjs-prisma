import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="bg-primary py-16 text-primary-foreground">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Experience Our Cuisine
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Book your table now or order online for pickup
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild variant={"secondary"}>
            <Link href={"/reservation"}>Reserve a Table</Link>
          </Button>
          <Button asChild variant={"secondary"}>
            <Link href={"/order"}>Order Online</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
