"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="bg-black min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <Header />
        <Hero />
        <Footer />
      </main>
    </div>
  );
}
