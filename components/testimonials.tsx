import { Star } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Testimonials = () => {
  const customer = [
    {
      name: "Saravana Jega",
      comment: "The best experience I've had this year.",
      rating: 5,
    },
    {
      name: "Anusha Chandran",
      comment: "The best experience I've had this year.",
      rating: 4,
    },
    {
      name: "Kalai Saravana",
      comment: "The best experience I've had this year.",
      rating: 4,
    },
  ];
  return (
    <section className="container mx-auto px-4 py-16 bg-secondary">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Guest Says</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from our customer
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {customer.map((person, index) => (
            <div key={index} className="bg-background rounded-lg shadow-sm p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < person.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 italic">
                "{person.comment}"
              </p>
              <p className="font-medium">{person.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
