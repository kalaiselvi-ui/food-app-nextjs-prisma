import CTASection from "@/components/ctasection";
import Footer from "@/components/footer";
import MenuPreview from "@/components/menu-preview";
import Testimonials from "@/components/testimonials";
import { Button } from "@/components/ui/button";
import { ChevronRight, Clock, Leaf, Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <main className="flex-1">
        <section className="relative h-[80vh] max-h-[800px]">
          <div className="absolute inset-0 bg-black/50 z-10">
            <Image src="/hero-bg.jpg" fill className="object-cover" alt="" />
            <div
              className="relative container z-20 h-full flex flex-col justify-center items-start
            text-start text-white px-4"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Authentic Flavors. <br />
                <span className="text-green-400">Exceptional</span> Dining
              </h1>
              <p className="text-xl mb-8 max-w-2xl">
                Experience the finest culinery creations made with
                locally-sourced ingredients and passions.
              </p>
              <div className="flex md:flex-row flex-col gap-4">
                <Button asChild size={"lg"}>
                  <Link href={"/menu"}>
                    View Menu <ChevronRight className="ml-2 w-4 h-4" />{" "}
                  </Link>
                </Button>
                <Button
                  size={"lg"}
                  variant={"outline"}
                  className="text-black border-white hover:bg-white/10 hover:text-white"
                >
                  <Link href={"/reservation"}>Make Reservation</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        {/*  feature section */}
        <section className="container mx-auto py-16 bg-secondary/10">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background">
                <Clock className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Open Daily</h3>
                <p className="text-muted-foreground">
                  Monday - Sunday: 11am - 10pm
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background">
                <Utensils className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Diverse Menu</h3>
                <p className="text-muted-foreground">
                  50+ dishes crafted by our master chefs
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background">
                <Leaf className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Fresh Ingredients</h3>
                <p className="text-muted-foreground">
                  Loclly-sourced, organic products
                </p>
              </div>
            </div>
          </div>
        </section>
        {/*Menu Section */}
        <Suspense fallback={<h1>...Loading</h1>}>
          <MenuPreview />
        </Suspense>
        {/*Testimonial Section */}
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
