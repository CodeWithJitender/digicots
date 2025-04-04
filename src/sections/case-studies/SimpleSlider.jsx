import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CaseStudy from "./CaseStudy";

const slides = [
  {
    image:
      "https://drive.google.com/file/d/1YEqUBsqtD2fjygp8ujF8ybfIf8_NVVYH/view?usp=drive_link",
    title: "Apple Marketing Case Study",
    text: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
    tags: ["Design", "Web-Dev", "Product"],
    new: [
      {
        img: "https://drive.google.com/file/d/133eL0amUE7fUW8Sf5bUOHiunC_nCasva/view?usp=drive_link",
        content: {
          p1:'Did you know that Apple Inc. started in a garage as Apple Computer, Inc. and has market cap of over $3.5 trillion now? It is inspiring how such simple, small dreams turn into overwhelming realities.',
          p2:'In 1976, Steve Jobs, Steve Wozniak & Ronald Wayne founded the trillion-dollar tech behemoth. It has managed to dominate the global market and sold more than 230 million units in 2024! With its sleek designs, state-of-the-art technologies and a loyal consumer cult, Apple has completely transformed the way people talk, work and relax.',
          p3:'Apple’s rather minimalistic marketing character perfectly aligns with its brand image and target audience. However, when entering India – a price-conscious market, the challenges were big:',
          ul:['The Indian consumers needed to be convinced that a higher price translated to real value.', 'The market was filled with budget-friendly competitors.'],
          p4:'To everyone’s surprise, they managed to capture the majority of the market. Tim Cook, the CEO of Apple even highlighted that India is an extraordinary market; with the company achieving record-sales in the third quarter of the 2023-24 fiscal year.'
        },
      },
      {
        h1:'Understanding the Target Market',
        img:'https://drive.google.com/file/d/1VkJIJV8_2fKWKfoYAXtM817RBFAJHKm5/view?usp=drive_link',
        p1:'Apple leaves no stone unturned when it comes to understanding their target market and catering products and campaigns to them. Since their early days, they have progressively narrowed down the target audience they want each of their products to reach.',
        p2:'They have always targeted individuals who are willing to pay more for an innovative product and a quality user experience. The majority of their audiences come from the middle-to-upper classes and are younger to middle-aged. Based mostly in the Americas, Europe or China, these tech-enthusiasts are absolute fans of the Apple Ecosystem. This has been a direct result of Apple’s user-oriented marketing approach, wherein each of their marketing initiatives emphasize on the people using the products; not the products themselves.',
        p3:'The global brand recognizability of Apple, aided by its famous bitten-apple logo, has gradually inclined their marketing efforts towards a segmented approach. They consider the nuances and cultural differences in various countries and cater their campaigns to them. This helps them avoid offending consumers and ensure that each campaign is tailored for success.'
      },
      {
        h1:'4P’s – Product. Price. Place. Promotion.',
        img:'https://drive.google.com/file/d/11jVexnHc3jwxYQAF2ePn83KkLxmFigRW/view?usp=drive_link',
        Product:[`Although Apple's products and marketing are to-the-point, they don’t let their focus go off the innovation radar. They consistently focus on innovating new products and features to craft the ultimate user experience. Innovation is their lifeline – they constantly push boundaries, developing products that redefine entire industries.`, `The company offers a curated selection of products, each of which seamlessly integrate with the popular Apple Ecosystem – a well-knitted network of Apple products and services. This focus on an intertwined product portfolio helps them present a unified brand image.`],
        Price:[`iPhones, among other Apple products, are a sought-after status symbol around the world. India is a price-conscious market; however, the purchasing power of people, especially in tier-1 & tier-2 cities is steadily increasing.`, `In order to demonstrate exclusivity and a premium brand image, their products are priced on the higher end of the spectrum. The higher price point translates to a badge of honor among consumers, a symbol of their success and the ability to afford the desired Apple experience. It is a well-calculated, high return risk which has helped them carve out an exclusive niche from the Indian market.`],
        Place:['Apple ensures that it is very easy for its customers to find their products, both online and offline. Their products are available directly on Apple stores, authorized resellers, the official website or major e-commerce platforms. The convenience to find the products anywhere and everywhere compels people to buy them.'],
        Promotion:['With customers engaging with brands through multiple channels, it’s typically not enough to market products and services with just one channel. Apple employs television and print advertising, website advertisements, social media advertisements and more to lure customers. Advertisements often demonstrate unique capabilities of the newest products, creating immense value for consumers and generating more awareness for these offerings. They make sure to never overwhelm their audiences with technical specifications – they rather try to keep it as simple as possible. '],
      },
      {
        h:'Remarkable Campaigns',
        img:'https://drive.google.com/file/d/146z0uc4Rljo0mIMzgGDY7NOaaXLCYyd7/view?usp=drive_link',
        'The ‘1984’ Commercial':['This is the most famous Apple advertisement that ran during Super Bowl XVIII in 1984. It was created to launch the Macintosh Computer and was inspired by the science-fiction fantasy novel, 1984, by George Orwell. It is one of the most iconic and much-admired commercials ever created. It signaled the beginning of a personal computer era led by Apple. It also suggested that the company was bringing something that would change society and the norms of technology.']
      },
      {
        h:'“Think Different”',
        img:'https://drive.google.com/file/d/1-_2dRPcT9ZxuqB0Rj0AIMI3wYVs0-vUu/view?usp=drive_link',
        p:'Released in 1997, this commercial was filled with black-and-white footage of famous activists, creators, leaders and other icons. Richard Dreyfuss, an actor, is seen reading a poem called “Here’s to the Crazy Ones” in the background. Apple products were often connected to creativity and innovation instead of business and tech. The company chose to make an advertisement that conveyed how creative people are the ones who bring about massive changes, rather than those who follow the standard route. It helped concretize the foundation for Apple’s slogan, “Think Different.”'
      },
      {
        h:'Get a Mac',
        img:'https://drive.google.com/file/d/15R5xcTZe0fnCZlfKnyf2-tLNxgEIs3sJ/view?usp=drive_link',
        p:'This one ran throughout the mid-2000s with 66 different commercials. Get a Mac came out when the Mac vs PC debate was in full force and Mac sales were declining. It features actors Justin Long and John Hodgman as a Mac & PC respectively. In each commercial, they draw a comparison of each other’s features. Running over four years. The ads helped position Mac over PC for a wide set of reasons and emphasized their focus on simplicity and innovation.',
      },
      {
        h1:'Misunderstood (2013)',
        img:'https://drive.google.com/file/d/1-YU3vUGs_fOKRLh-RDPPb_9pu_8xwJgP/view?usp=drive_link',
        p:'This famous advertisement was so memorable and well-executed that it won a Creative Arts Emmy for ‘Outstanding Commercial’. It features a young man visiting his family for Christmas. He seems to be engrossed completely in his iPhone the whole time. However, the commercial eventually reveals a family video he has been filming the whole time. This helped create an emotional connection with customers without focusing on the product.',
      }
    ],
  },
  {
    image: "case-study-2.png",
    title: "Product: With Long Heading",
    text: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
    tags: ["Design", "Web-Dev", "Product"],
    contant:[
      {
        h1:'',
        img:'asdfasdsd',
        p1:'',
        p2:'',
        ul:[' ',' ']
      }
    ]
  },
  {
    image: "case-study-3.png",
    title: "Product: With Long Heading",
    text: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
    tags: ["Design", "Web-Dev", "Product"],
  },
  {
    image: "case-study-2.png",
    title: "Product: With Long Heading",
    text: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
    tags: ["Design", "Web-Dev", "Product"],
  },
];

export default function SimpleSlider() {
  const [selectedCase, setSelectedCase] = useState(null);

  return (
    <div className="w-full flex justify-center items-center py-10 bg-gray-100">
      {selectedCase ? (
        <CaseStudy slide={selectedCase} onClose={() => setSelectedCase(null)} />
      ) : (
        <div className="container-xxl">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="w-full max-w-7xl"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index} className="w-80">
                <div
                  className="w-full bg-white rounded-xl overflow-hidden shadow-lg relative cursor-pointer"
                  onClick={() => setSelectedCase(slide)}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute flex flex-col h-full justify-end top-0 left-0 w-full">
                    <div className="p-5 backdrop-blur-[3px] bg-black/40 text-white">
                      <h4 className="text-2xl font-bold">{slide.title}</h4>
                      <p className="text-sm mt-3">{slide.text}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}
