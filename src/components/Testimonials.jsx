"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

function Testimonials() {
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const testimonials = [
    {
      quote:
        "oily skin hai meri, din mein 2 baar dhona parta tha pehle, ab ye use karne k baad shine kaafi kam ho gayi hai",
      author: "Sara N.",
    },
    {
      quote:
        "blackheads wala area kaafi clean feel hota hai wash k baad, thora tingling hoti hai first time but normal hai",
      author: "Zeeshan A.",
    },
    {
      quote:
        "acne prone skin hai to naye products se darti hoon, ye try kiya to breakout nahi hua ulta clear hui skin",
      author: "Amna R.",
    },
    {
      quote:
        "gym jata hoon roz, sweat k baad face bohat oily ho jata tha, isse wash karo to matte feel rehta hai poore din",
      author: "Danish K.",
    },
    {
      quote:
        "pehle koi cheap face wash use karti thi jo skin ko dry kar deta tha, ye gentle hai but cleaning bhi proper karta hai",
      author: "Iqra M.",
    },
    {
      quote:
        "pores ka size thora improve hua hai mera, aur blackheads bhi pehle se kam nazar aa rahe hain 3 weeks mein",
      author: "Talha S.",
    },
    {
      quote:
        "Yar mujhe laga scam hoga but seriously 10 din mein hi glow aagaya face pe, meri mummy ne bhi notice kiya 😅",
      author: "Ayesha K.",
    },
    {
      quote:
        "shuru mein thora chipchipa laga but jaldi absorb ho jata hai, ab addicted hoon isse",
      author: "Bilal",
    },
    {
      quote:
        "office mein colleagues puch rahe the konsa facial karaya, bas ye serum lga rahi thi 2 weeks se lol",
      author: "Hina F.",
    },
    {
      quote:
        "mera skin already sensitive hai to darte darte try kiya, alhamdulillah koi reaction nahi hua aur brightness bhi aayi",
      author: "Usman",
    },
    {
      quote:
        "price thora zyada laga mujhe pehle but jab result dekha to worth it lga, dobara order kar rha hoon",
      author: "Hamza R.",
    },
    {
      quote:
        "shadi thi cousin ki isliye try kiya kuch glow k liye, itna acha laga k ab regular use kar rahi hoon",
      author: "Sana M.",
    },
    {
      quote:
        "mere pimple marks the jo saal se nahi ja rahe the, ye laga k 3 hafte mein kaafi light ho gaye, still using it",
      author: "Zainab S.",
    },
    {
      quote:
        "night mein laga k sota hoon, subah uth k face soft lagta hai bas thora patience chahiye result k liye",
      author: "Ali H.",
    },
    {
      quote:
        "acne itni thi k confidence hi nahi tha bahar jane ka, ab kaafi behtar hai skin, still not 100% but improving",
      author: "Mahnoor I.",
    },
    {
      quote:
        "pehli baar retinol try kar rha tha to dara hua tha peeling waghera hogi but ye mild nikla, koi issue nahi hua",
      author: "Faizan",
    },
    {
      quote:
        "texture wala masla tha mera, bumpy skin thi, ab smooth feel hoti hai touch karo to",
      author: "Rabia N.",
    },
  ];

  return (
    <div className="flex flex-col gap-y-10 py-10 lg:py-20 px-4 lg:px-10">
      <div className="relative">
        <div className="mx-0 lg:mx-10">
          <Swiper
            ref={swiperRef}
            spaceBetween={16}
            slidesPerView={3}
            modules={[Navigation]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            loop={true}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 1.5,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className="w-full"
          >
            {testimonials.map((review, reviewIndex) => (
              <SwiperSlide key={reviewIndex}>
                <article className="group min-h-[380px] md:h-[420px] snap-start flex flex-col justify-between p-6 md:p-8 rounded-3xl bg-gradient-to-br from-warm via-nude/30 to-nude/60 border border-ink/5 shadow-soft hover:shadow-lift transition-all duration-700">
                  <div>
                    <Quote className="w-6 h-6 md:w-8 md:h-8 text-rose/40 mb-4 md:mb-6" />
                    <p className="text-ink/80 font-light leading-relaxed text-[13px] md:text-[15px]">
                      "{review.quote}"
                    </p>
                  </div>
                  <div className="pt-4 md:pt-6 border-t border-ink/10">
                    {/* <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-rose text-rose"
                      />
                    ))}
                  </div> */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="serif text-lg md:text-xl text-ink">
                          {review.author}
                        </h4>
                        <p className="text-[11px] md:text-[12px] text-ink/50 tracking-wide mt-0.5">
                          Verified Customer
                        </p>
                      </div>
                      <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-rose/10 grid place-items-center text-rose text-[11px] md:text-xs font-medium bg-secondary">
                        {review.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* Desktop navigation */}
        <button
          onClick={() => swiperRef.current?.swiper?.slidePrev()}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 lg:-translate-x-4 bg-primary text-primary-foreground p-3 md:p-4 w-12 h-12 md:w-14 md:h-14 rounded-full z-10 hover:bg-primary/90 transition cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button
          onClick={() => swiperRef.current?.swiper?.slideNext()}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 lg:translate-x-4 bg-primary text-primary-foreground p-3 md:p-4 w-12 h-12 md:w-14 md:h-14 rounded-full z-10 hover:bg-primary/90 transition cursor-pointer"
        >
          <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        {/* Mobile navigation */}
        <div className="flex md:hidden justify-center gap-4 mt-6">
          <button
            onClick={() => swiperRef.current?.swiper?.slidePrev()}
            className="bg-primary text-primary-foreground p-3 w-12 h-12 rounded-full hover:bg-primary/90 transition cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => swiperRef.current?.swiper?.slideNext()}
            className="bg-primary text-primary-foreground p-3 w-12 h-12 rounded-full hover:bg-primary/90 transition cursor-pointer"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
