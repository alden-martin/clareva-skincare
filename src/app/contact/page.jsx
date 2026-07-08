"use client"
import CtaButton from '@/components/CtaButton'
import Heading from '@/components/Heading';
import OutlineButton from '@/components/OutlineButton'
import { ArrowRight, Clock, Mail, MapPin, Phone, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function page() {
  const [activeFaq, setActiveFaq] = useState(0);
  const contacts = [
    {
      icon: MapPin,
      title: 'Vist',
      value: 'Karachi, Sindh, Pakistan'
    },
    {
      icon: Phone,
      title: 'Call',
      value: '+92 333 3246628'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'support@clareva.pk'
    },
    {
      icon: Clock,
      title: 'Support Hours',
      value: 'Mon – Sat · 10:00 AM – 7:00 PM (PKT)'
    }
  ]
    const instaLink = ["DZo4IF8IHK3", "DYUbWLrIieS", "DXcSEBLjfIi"];
 const skinTypes = [
   {
     title: "Acne & Breakouts",
     description: "Calming, clarifying routines",
   },
   {
     title: "Dark Spots & Pigmentation",
     description: "Brightening rituals",
   },
   {
     title: "Dry & Dehydrated Skin",
     description: "Deep barrier repair",
   },
   {
     title: "Oily Skin",
     description: "Balanced daily care",
   },
   {
     title: "Sensitive Skin",
     description: "Gentle, minimalist formulas",
   },
   {
     title: "Uneven Skin Tone",
     description: "Radiance-restoring blends",
   },
   {
     title: "Anti-Aging",
     description: "Firming & renewal rituals",
   },
  ];
  const faqs = [
    {
      question: "How long does shipping take?",
      answer:
        "Orders are typically delivered within 2–5 business days across Pakistan, carefully packaged to preserve every formula.",
    },
    {
      question: "Do you offer Cash on Delivery?",
      answer:
        "Yes — we offer Cash on Delivery (COD) nationwide for your comfort and confidence.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is dispatched, you'll receive a tracking number via SMS or email so you can follow it every step of the way.",
    },
    {
      question: "Are Clareva products suitable for sensitive skin?",
      answer:
        "Our products are formulated with carefully selected, skin-loving ingredients. We recommend performing a patch test before first use.",
    },
    {
      question: "Can I return a product?",
      answer:
        "If you receive a damaged or incorrect product, please contact us within 48 hours of delivery and our support team will personally assist you.",
    },
  ];
  const socials = [
    {
      logo: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram h-4 w-4" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
      ),
      title: "Instagram",
      link: "https://www.instagram.com/clareva.skincare/",
    },
  ];
  return (
    <div className="">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('/hero/hero-contact.png')] bg-cover bg-position-[center_0px]  bg-repeat-no-repeat" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-tr from-hero-background via-hero-background/90 via-30% to-transparent" />

        {/* Content */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center min-h-screen">
          {/* Left */}
          <div className="px-10 py-20 mt-20">
            {/* heading */}
            <h1 className="font-heading text-[clamp(3rem,7vw,6.5rem)] leading-[0.95] text-text font-bold italic">
              Helping Your Skin Thrive.
            </h1>

            {/* Description */}
            <p className="text-text/50 font-light text-lg w-[90%] my-5">
              Whether you have questions about our products, need help choosing
              the right skincare routine, or require assistance with an order —
              our team is always happy to guide you on your skincare journey.
            </p>

            {/* Button Container */}
            <div className="flex gap-x-5 my-10">
              <CtaButton>Contact our team</CtaButton>
              <OutlineButton>Speak with a specialist</OutlineButton>
            </div>
          </div>
          {/* Empty right column keeps text on left */}
          <div />
        </div>
      </section>
      {/* Contact Form */}
      <section className="grid grid-cols-1 lg:grid-cols-2 px-10 py-20 bg-background">
        {/* Left */}
        <div className="flex flex-col w-[90%] gap-y-5 mt-10">
          <Heading
            mainHeading={"Get in Touch"}
            subHeading={"Reach Out"}
            headingClass={"text-5xl italic font-bold"}
          />
          <p className="text-text/60">
            A calm, considered conversation is often the first step to healthier
            skin. We'd love to hear from you.
          </p>
          <div className="flex flex-col gap-y-5 mt-10">
            {contacts.map((contact, index) => (
              <div
                key={index}
                className="flex items-center gap-x-5 bg-primary-foreground px-5 py-6 rounded-2xl shadow-2xl"
              >
                <div className="w-12 h-12 bg-primary/50 rounded-xl flex items-center justify-center">
                  <contact.icon className="w-6 h-6 text-text" />
                </div>
                <div>
                  <h3 className="font-light text-sm uppercase font-body text-text">
                    {contact.title}
                  </h3>
                  <p className="text-text/60 font-heading font-semibold text-lg">
                    {contact.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Right */}
        <div className="bg-primary-foreground p-10 rounded-2xl shadow-2xl gap-y-5 flex flex-col">
          <Heading
            mainHeading={"Send Us a Message"}
            subHeading={"Message"}
            headingClass="text-5xl italic font-bold"
          />
          <p className="text-text/60">
            Have a question or feedback? Fill out the form below and we'll get
            back to you within 24 hours.
          </p>
          <form action="" className="grid grid-cols-2 gap-x-5 gap-y-5 mt-10">
            <input
              type="text"
              placeholder="Full Name"
              className="p-5 rounded-2xl bg-card border "
            />
            <input
              type="email"
              placeholder="Email Address"
              className="p-5 rounded-2xl bg-card border "
            />
            <input
              type="phone"
              placeholder="Phone Number (Optional)"
              className="p-5 rounded-2xl bg-card border "
            />
            <input
              type="text"
              placeholder="Subject"
              className="p-5 rounded-2xl bg-card border "
            />
            <textarea
              placeholder="Message"
              className="p-5 rounded-2xl bg-card border  col-span-2"
            />
            <button type="submit" className="-ml-20">
              <CtaButton>Send Message</CtaButton>
            </button>
          </form>
        </div>
      </section>

      {/* Personal Consultation */}
      <section className="grid grid-cols-1 lg:grid-cols-2 px-10 py-20 bg-secondary/50">
        {/* Left */}
        <div className="relative h-fit">
          <Image
            src="/consultation.png"
            alt="Our Story"
            width={500}
            height={400}
            className="rounded-2xl shadow-2xl"
          />
          <div className="absolute -bottom-10  -right-5 -translate-x-1/2 p-5 bg-background rounded-2xl w-[45%] shadow-2xl">
            <h1 className="text-primary font-heading text-3xl font-semibold tracking-wider">
              1:1
            </h1>
            <p className="text-text text-xs">
              Specialist consultations, always complimentary
            </p>
          </div>
        </div>
        {/* Right */}
        <div className="flex flex-col gap-y-5">
          <Heading
            mainHeading={"Need Help Choosing the Right Product?"}
            subHeading={"Personalized Consultation"}
          />
          <p className="text-text/60 text-lg">
            Not sure which skincare products are right for your skin? Our
            skincare specialists can help you build a personalized routine based
            on your skin type and concerns.
          </p>
          <div className="grid grid-cols-2 gap-5">
            {skinTypes.map((type, index) => (
              <div
                key={index}
                className="flex flex-row justify-between bg-card p-5 rounded-2xl items-center"
              >
                <div>
                  <h3 className="font-heading font-bold text-lg">
                    {type.title}
                  </h3>
                  <p className="text-sm text-text/60">{type.description}</p>
                </div>
                <ArrowRight />
              </div>
            ))}
          </div>
          <OutlineButton>Get Skincare Advice</OutlineButton>
        </div>
      </section>
      {/* FAQ */}
      <section className="flex flex-col gap-5 items-center py-10 bg-secondary/50">
        <Heading
          mainHeading={"Frequently Asked Questions"}
          subHeading={"FAQ"}
          container="flex flex-col items-center"
        />
        <p className="text-text/70 text-lg">
          Everything you might wonder before your first Clareva ritual.
        </p>
        <div className="flex flex-col gap-y-5 w-full max-w-3xl">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl overflow-hidden hover:bg-secondary/50"
            >
              <button
                onClick={() => setActiveFaq(index === activeFaq ? null : index)}
                className="w-full p-5 flex justify-between items-center text-left  transition-colors"
              >
                <h3 className="text-xl font-semibold">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: activeFaq === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown />
                </motion.div>
              </button>
              <AnimatePresence>
                {activeFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden px-5 pb-5"
                  >
                    <p className="text-text/70 text-sm">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
      {/* Visit Us  */}
      <section className="flex flex-col mx-10 my-20">
        <div className="flex justify-between items-center">
          <Heading mainHeading={"Visit Us"} subHeading={"Our Studio"} />
          <p className="text-text/60">
            Based in Karachi, we ship rituals of care all across Pakistan.
          </p>
        </div>
        <iframe
          title="Clareva location — Karachi, Pakistan"
          src="https://www.google.com/maps?q=Karachi%2C+Sindh%2C+Pakistan&amp;output=embed"
          width="100%"
          height="480"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          className="block w-full rounded-xl my-5"
          style={{ border: 0, filter: "saturate(0.85) contrast(0.95)" }}
        />
      </section>
      {/* Instagram Section */}
      <section className="flex flex-col mx-20 my-10">
        <div className="flex flex-col justify-center items-center gap-y-5">
          <Heading subHeading="Community" mainHeading="Stay Connected" />
          <p className="text-text/70">
            Follow Clareva for skincare tips, product launches, exclusive
            offers, and real customer transformations.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 my-5">
          {instaLink.map((reelId, index) => (
            <iframe
              key={index}
              src={`https://www.instagram.com/reel/${reelId}/embed/`}
              width="100%"
              height="650"
              frameBorder="0"
              scrolling="no"
              allowFullScreen={true}
            />
          ))}
        </div>
        <div className="flex flex-row items-center justify-center gap-x-5">
          {socials.map((social, index) => (
            <a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-row items-center gap-x-2 bg-primary-foreground p-2 hover:border hover:border-secondary-foreground rounded-2xl"
            >
              {social.logo()}
              <span>{social.title}</span>
              <span>@clareva</span>
            </a>
          ))}
        </div>
      </section>
      {/* Cta Section */}
      <section className="bg-[url('/backgrounds/contact-cta.png')] bg-cover bg-center bg-no-repeat py-20 flex flex-col items-center justify-center gap-y-10">
        <Heading
          mainHeading="Let's Build Your Best Skin Together.
"
          container="flex flex-col items-center"
          subHeading="Your Ritual Awaits"
        />
        <p className="text-text/70 w-1/2 text-center text-lg">
          Healthy, glowing skin starts with the right care. Whether you're
          beginning your skincare journey or looking to upgrade your routine,
          Clareva is here to support you every step of the way.
        </p>
        <h4 className="text-text/70 text-center text-2xl font-heading">
          Your glow begins with Clareva. ✨
        </h4>
        <CtaButton>
          Explore Our Products
        </CtaButton>
      </section>
    </div>
  );
}

export default page