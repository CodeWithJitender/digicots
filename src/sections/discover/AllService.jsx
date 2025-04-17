import { i } from "framer-motion/client";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function AllService() {
  const data = {
    "Content Production": {
      img: "icon-9.png",
      i: "Crafting your howl in seamless harmony with the consumer’s voice",
      description: [
        "The art of storytelling by transforming ideas into captivating visual narratives that engage, inform and persuade. Content production is the bridge between creativity and commerce – making brands not just visible, but rather unforgettable.",
        "It's the heart of getting your message out there visually these days. Think of it like turning your ideas into cool stuff people actually want to see – videos, images, all that jazz. Moreover, it's about connecting with your audience and making sure they remember you. You're not just showing them stuff but also telling them a story. When you do it right, that story sticks. You've got to know who you're talking to, what they like and how to really grab their attention with visuals.",
        "In simpler words, good content production can take your brand from just being seen to actually being remembered. It helps you build real connections with people and gets them interested in what you're doing. It's always changing but it's essential for getting your business noticed and making it successful.",
      ],
      offerings: {
        "Product Photography": {
          i: "State-of-the-art visuals that catch every detail",
          p: "We craft awesome visual content that really captures what your product is all about. We pay super close attention to all the little things and use cool techniques to show off your product's looks, details and what makes it unique. Thus, it's both eye-catching and clear. Our visuals don't just show your product; they tell its story, stir up feelings and make a real impact that sticks with your audience.",
        },
        "Corporate Videos": {
          i: "Your story, your voice",
          p: "We create fantastic videos that put your brand front and center, getting your message across clearly. You can count on us for high-quality work that really shows who you are, your company vibe, what you offer and what you've accomplished. We'll work with you every step of the way from coming up with ideas and writing scripts to filming and editing. We make sure that the final video is exactly what you imagined and connects with your audience. Need a promo video, company intro, product demo, customer story or something totally different? We've got you covered with something memorable and engaging.",
        },
        "eCommerce Photography": {
          i: "Photographing experiences, not products",
          p: "We're all about making your products look amazing! Our photography team really gets how to make your brand shine. We'll work with you to figure out what you're going for and then we'll capture images that totally nail it. We're detail-oriented and make sure every feature of your product pops with great lighting and style. Basically, we'll deliver industry-grade images that show off your product's ultimate promise and leave a mark. Whether it's for your online store, ads or social media, we've got you covered with awesome product photos.",
        },
        "Explainer Videos": {
          i: "Short, engaging videos that simplify complexities",
          p: "We make short, cool explainer videos that break down complicated stuff. Think awesome visuals, friendly voices and smooth animations to really get the message across. Perfect for teaching, ads or training, these videos make sure your point sticks. We also do all the behind-the-scenes stuff including writing scripts, drawing storyboards, recording voiceovers and editing everything together. We team up with clients to make sure the videos match their vibe and nail their goals.",
        },
        "Reel Production & Showreels": {
          i: "Showcasing your strengths and victories in an avant-garde storytelling template",
          p: "Let's get your story out there and make it pop! We're going to highlight all your best stuff – your wins, skills, the journey – and package it up in a way that really sticks. Think engaging stories, visuals that grab attention and a solid structure. Bottom line? We want to make sure the right people not only notice you but remember you, too, making you the person to go to in your field. We're going to position you as someone who really knows their stuff, someone people trust and want to work with. ",
        },
        "Amazon Video Ads": {
          i: "Capturing visions, experiences & character to drive engagement and conversions.",
          p: "We make eye-catching visuals that help your brand get noticed and build real relationships with your customers. We work closely with you to make sure your brand's personality shines through in everything we do, whether it's launching a new product or tweaking your online presence. By keeping things clear and positioning your brand strategically online, we want to gain customer trust, spark conversations and boost your sales.",
        },
      },
      id: "content-production",
    },
    "Outreach Solutions": {
      img: "icon-8.png",
      i: "Exploring the Unknown; Making Your Mark.",
      description: [
        "In today's super crowded market, old-school ads just don't cut it anymore. Really connecting with your audience is key and teaming up with influencers is a super effective way to do that. Working with well-known experts makes your brand look way more credible and trustworthy. Their fans really listen to them so if they say your brand is great, people will believe it. Also, you get instant access to their audience which is a huge time-saver.",
        "Moreover,  it's not just about having great content; you need to get it out there where people will actually see it. We figure out where your audience hangs out online and tweak what you're sharing to match their interests. We help you partner with influencers and are precise about where we share your content and can make a huge difference.",
      ],
      offerings: {
        "Influencer Marketing": {
          i: "Make your brand echo",
          p: "Want to get your brand out there? We'll team you up with awesome influencers who can really connect with people. Forget boring ads, this is about getting real recommendations to the right audience. We've got different options – posts, reviews, giveaways and whatever else fits your vibe. We'll track everything and show you what's working so you get the most bang for your buck. In simpler words, we'll boost your brand and help you hit those goals.",
        },
        "Inter-Brand Collaborations": {
          i: "Turn your competitors into collaborators",
          p: "We're all about setting up smart brand partnerships that open up cool new marketing avenues. We find you partners who share your vibe and target audience and then we put together campaigns that click with everyone. Think joint projects, cross-promo stuff and maybe even some co-branded goodies. With our help, your brand gets in front of new crowds, gets way more buzz and really gets people talking.",
        },
        "WhatsApp Marketing & Email Campaigns": {
          i: "Direct. Personal. Precise.",
          p: "We've got your messaging covered to supercharge your communication and boost your business. Think targeted messages that hit home with your audience, get the word out about what you're selling and guide those leads through the sales process. We're all about using the right platforms, like email and WhatsApp, to send personalized stuff straight to your customers when they need it which means more engagement and sales. No matter if you want to build buzz, rack up sales or offer awesome support, our messaging can get you there. We'll team up with you to create a strategy that fits your goals and actually shows results.",
        },
        "Regional Amplification": {
          i: "Building customer loyalty in every corner",
          p: "We'll make sure everything - the words we use, the pictures we show and the deals we offer - really clicks with your audience wherever they are. Think local vibes, local tastes and what's hot right now in their area. By making it all super relevant, we're talking way more people getting interested and sticking around for the long haul, no matter where they live.",
        },
      },
      id: "outreach-solutions",
    },
    "Public Relations": {
      img: "icon-4.png ",
      i: "Making your vision echo across the globe",
      description: [
        "This is the art of shaping and maintaining a brand’s reputation – its most valuable asset. PR strategies go way beyond publicity; they help in establishing credibility, authority and trust. Effective PR creates a wave that turns mere businesses into industry icons.",
        "Your brand's rep is everything these days. We're all about building and protecting it while making sure you're not just known but genuinely trusted and respected in your field. We're the best at dealing with the media, handling tough situations, connecting with important people and keeping your brand looking good. We get you noticed in a positive way with news stories and articles and we make sure you're seen as an apex brand.",
        "Even if something goes wrong, we're quick to jump in, keep things under control and make sure your reputation stays intact. We're also great at building relationships with media folks and community leaders, opening doors for partnerships and collaborations.",
      ],
      offerings: {
        "Press Releases & Editorial Articles": {
          i: "Dominate the headlines, own the narrative",
          p: "In order to get your brand out there and known, we'll be doing a full-on media push. This means sending out press releases about all the cool stuff you're doing and getting in touch with reporters, bloggers and influencers who matter in your industry. We'll aim for interviews, articles and maybe even sponsored posts to get your brand's message seen in the right places online and in print. By consistently showing up in the news and industry publications, we'll build your credibility and get more people interested in your business leading to more traffic and sales.",
        },
        "Authored Articles": {
          i: "Get the experts talking",
          p: "We'll dig into what's happening in your field, the latest tech and other important stuff to make content that shows just how much you know. By sharing cool insights and tips people can use, we'll help you build trust, bring in new customers and make sure everyone knows you're the real deal. Think white papers that make you think, articles that teach, blog posts that keep people hooked and ebooks with loads of info. Our writers and experts will team up with your top people to create content that's not just educational but also gets people talking and makes your brand the place everyone turns to in your industry.",
        },
        "Reputation Management": {
          i: "Be the voice of authority, guard your image",
          p: "We keep a close eye on what people are saying about you online by scanning social media, news sites, blogs and more. If we see something that could damage your reputation, we jump on it and take steps to fix it quickly. Our team will create a plan to handle negative stuff like bad comments or false information and help you build a strong, positive online presence. We'll chat with your audience, share cool content and highlight all the good reviews people leave.",
        },
      },
      id: "public-relations",
    },
    "Digital Marketing": {
      img: "icon-6.png ",
      i: "Hunt Smarter. Hunt Harder.",
      description: [
        "We do way more than just post on social media. We build real strategies with data behind them to get your brand noticed online, keep people engaged, and build a loyal following. We're all about mixing creative ideas, number crunching and smart planning to get you real, measurable results and grow your business big time.",
        "We dive into the data and figure out who your customers really are so we can create messages and content that actually connect. We use all sorts of digital channels – social media, search engines, email, content – to reach your audience wherever they are online.",
        "With our approach, you can watch how your campaigns are doing live and get the info you need to keep improving. This way, you know your marketing efforts are on track and getting you the best results.",
      ],
      offerings: {
        "Social Media Management & Evergreen Strategies": {
          i: "Keep your audience engaged and loyal to your brand",
          p: "Looking for awesome content for your business? We've got you! We'll team up with you to make a content plan that fits what you need and speaks to your people. Our super talented writers will whip up killer content like blog posts, social media stuff, emails and videos to get your audience hooked. We won't just leave it at that. We'll also make sure your content pops up in search results and gets seen by the right folks. We'll keep an eye on how it's doing and tweak things to keep it working hard for you. Basically, we're here to help your business shine online with the power of great content.",
        },
        "Campaign-level Strategy & SEO": {
          i: "Pop-up where it matters the most",
          p: "We've got a full range of services to really boost your brand online and get you results. We focus on creating custom ad strategies that match what you need and then run awesome campaigns on all sorts of digital platforms. Moreover, we'll fine-tune your website's content and structure so it shows up high in searches and pulls in lots of good leads. Basically, we cover everything from planning to managing campaigns and optimizing your site, giving you a complete digital marketing solution to help your business succeed online.",
        },
      },
      id: "digital-marketing",
    },
    "Performance Marketing": {
      img: "icon-5.png ",
      i: "Unmatched Precision. Uncaged Results.",
      description: [
        "We're all about getting you the best returns on your advertising budget. We do this by creating and launching really focused ad campaigns that hit the right people, in the right place, at the right time. We don't just set it and forget it; we keep a close eye on things and tweak as needed to make sure you see real results. Whether you need more website visitors, more leads or more sales, we're here to make it happen.",
        "Everything we do is based on data. We use cool tools to track and analyze how campaigns are performing. This helps us see what's working and what's not, so we can make smart changes and get the most out of your budget. Basically, your campaigns get better and better over time which means a better return on your investment.",
        "We see ourselves as more than just a service provider – we're your partner in growth. We'll team up with you to create a solid marketing plan based on data and proven strategies. We'll take the time to understand your business, your audience, and your competition so we can help you reach your long-term goals. This way, your marketing efforts fit perfectly into your overall business strategy.",
        "Besides just ads, we also offer other things like SEO, social media, content and email marketing. By putting all these pieces together, we can make your brand stronger and get you more visibility. Ultimately, we want to help you build a powerful online presence that brings in leads, sales and happy customers.",
      ],
      offerings: {
        "eCommerce Revenue & Brand Awareness Campaigns": {
          i: "Seen and sold",
          p: "We've got a full range of ecommerce services to really boost your brand online and bring in more money. We're all about creating and running super targeted paid ad campaigns on places like Google, social media, and other spots where your audience hangs out. We use data to make sure your ad spend is smart, hitting the right people at the right time for the best return. We dig deep into who your customers are and use the latest targeting tools to help you hit your goals whether that's selling more, getting leads or just getting your name out there.",
        },
        "Lead Generation & Remarketing Funnels": {
          i: "Bring everyone back to you",
          p: "For getting new leads, we use things like ads and SEO to get people to landing pages and then we track everything to see what works best. For people who have already shown interest but haven't bought yet, we show them personalized ads and emails to remind them we're here and encourage them to buy. We keep an eye on the numbers to make sure everything is working and tweak things as needed to get the best results and the most bang for our buck.",
        },
        "Conversion Rate Optimization (CRO)": {
          i: "Turn visitors into loyal customers",
          p: "We focus on turning visitors into customers through A/B testing, UX improvements, compelling CTAs, optimized landing pages and simplified checkout. Benefits include increased revenue, better ROI, happier users and a competitive edge. Ultimately, our CRO services drive online success by making the most of your website traffic.",
        },
      },
      id: "performance-marketing",
    },
    "Creative Designing": {
      i: "Visuals that Make the Consumer Stop.",
      img: "icon-7.png ",
      description: [
        "Turn concepts into striking visual assets – digital or print. Design is way more than just aesthetics; it is the visual language of a brand. It is the backbone of compelling brand communication ensuring every interaction is simply WOW!",
        "Good design isn't just about looking good. It's about making people feel something. Our talented team knows how to create visuals that really stand out and help your brand shine. We want every interaction with your audience to be something special, something they remember. We sweat the small stuff like colors and fonts, pictures and layouts. Every little detail matters because it all helps tell your story. We're passionate about making sure your story is told in the best way possible whether it's a website, logo or brochure",
        "It's a noisy world out there. You need to stand out. We don't just make things look nice; we make visuals that get noticed and actually work for you. We team up with you to understand your goals and who you're talking to and then create designs that are both beautiful and smart.",
      ],
      offerings: {
        "Lookbooks, Catalogs & Pitch Decks": {
          i: "The Show of Force",
          p: "We're all about making awesome marketing stuff that really pops and makes your brand stand out. Think eye-catching lookbooks, detailed catalogs and killer pitch decks. We handle all sorts of visuals to show off what makes your company special, what you're selling and why you're the best choice. We mix great images, easy-to-understand words and good stories so your materials not only look good but also get people interested and set you apart from the crowd.",
        },
        Illustrations: {
          i: "The WOW Factor",
          p: "We make eye-catching graphics, cool artwork and fun animations to boost your brand and really connect with your audience. We'll team up with you to figure out your story and turn it into awesome visuals that click with the people you're trying to reach.",
        },
        "Amazon A+ Content": {
          i: "Make every detail magnetic, irresistible",
          p: "We jazz up your Amazon product listings with loads of cool stuff to really grab shoppers' attention. Think of awesome photos and videos that show off your product, easy-peasy comparison charts and stories that make people feel connected to your brand. Basically, we make your product pages super engaging and helpful, so you sell more on Amazon.",
        },
      },
      id: "creative-designing",
    },
    Branding: {
      i: "Craft the soul m of your company",
      img: "icon-4.png",
      description: [
        "We create a killer company identity that hits home with your people and makes them feel something. It's not just about a logo; we figure out what your company is all about, what you stand for, and make sure everyone gets it. That way, customers are sold on your whole vibe. A solid brand makes people remember you, feel good about you, and keep coming back. We nail your message, make you look awesome, and make sure the whole experience is spot-on so you stand out from the crowd.",
        "In this crazy market, a great brand is a must. It builds trust and gets you noticed, even when things are packed. People will choose you because they know you. Let us handle your branding so you can set yourself up for serious growth.",
      ],
      offerings: {
        "Naming & Logo Development": {
          i: "Your story, your mark",
          p: "Our creative team will develop a comprehensive suite of branding materials that capture the essence of your company. This includes crafting compelling names, designing eye-catching logos, and developing other visual elements that effectively communicate your company's identity, values and mission to your target audience. We'll work closely with you to ensure that these branding elements resonate with your desired market and accurately reflect your unique selling proposition.",
        },
        "Brand Matrix & Packaging Development": {
          i: "Building an identity fortress that no one can trespass",
          p: `Firstly, we'll figure out exactly where you fit in the market, who you're talking to and what really matters to you. Then, we'll nail down a brand voice that's totally you, one that your customers will actually connect with. Think of it as the personality behind your brand, and we'll make sure it shines through everything you do. At last, we'll create some seriously awesome packaging. It's not just about keeping your product safe; it's about telling your story and making people go "wow." We want something that looks great and works perfectly, something that'll grab attention and stick in people's minds.`,
        },
        "UI Creation (Adobe Figma)": {
          i: "",
          p: "",
        },
      },
      id: "branding",
    },
    "Outdoor Advertising - Digicots OOH": {
      i: "Marking Your Territory in the Real World",
      img: "icon-3.png",
      description: [
        "Regardless of the ever-changing digital landscape, outdoor advertising remains an unparalleled tool for massive brand visibility. We, at Digicots, ensure that advertising comes across as an experience rather than an interruption. While digital ads can be skipped, outdoor ads remain unmissable and serve as a constant, powerful reminder of a brand’s presence.",
        "Unlike online ads you can just click away from or block, outdoor ads grab attention and stick around. You can't skip or close them and because they're big and out there, you can't really miss them. This means they keep your brand in people's minds, making it a familiar part of their day and that builds trust and eventually, sales.",
        "Moreover, outdoor ads reach everyone whether they're online all the time or not. Commuters, walkers, shoppers, tourists – lots of different people see them. Thus, if you want to reach a wide audience and find new customers, it's a great way to go.",
      ],
      offerings: {
        "Hoardings & Unipoles": {
          i: "Claim every corner yours with inescapable visuals",
          p: "Billboards are all about getting seen. Smack them in busy spots and everyone, even their dog will catch a glimpse of your ad. They're huge so it's hard to miss them and people keep seeing them over and over. Light them up at night and boom – your message is out there 24/7. Definitely a good way to get your brand stuck in people's heads.",
        },
        "Kiosks & Outdoor Design": {
          i: "Command attention and leave your mark",
          p: "We provide interactive kiosks, a super cool way to do out-of-home advertising. These kiosks have digital screens and we put them where lots of people are, like malls, airports, and stadiums. Brands can use them to chat directly with customers in a fun and informative way. People can actually interact with these kiosks. They can learn about products, look through catalogs, maybe even buy stuff. At an airport, a kiosk might show flight info or help people find their way around. It really depends on what the brand wants to do.",
        },
      },
      id: "outdoor-advertising",
    },
    "Website Development": {
      i: "Your Digital Swarm",
      img: "icon-1.png",
      description: [
        "Think of a website like your brand's online home. It's not just a place on the internet, it's how people see you. Building a great website needs a mix of tech smarts, good design and making sure it's easy for people to use. Get these right and you've got an awesome platform that keeps people interested and turns them into customers.",
        "Technically, you need the right coding systems to manage content and hosting so your site runs smoothly, stays safe and can handle lots of visitors. Choose the tools that make a solid, reliable site. Design-wise, make it look good, show off your brand and click with your audience. Colors, fonts, pictures and layout all matter. A well-designed site builds trust and gets your message across.",
        "User experience is key. Make it simple for people to find what they need. Organize your site and content so it's easy to navigate. A good user experience means more engagement and sales. Your website needs to work on phones and tablets too. More people use mobile so make sure your site looks good on any device.",
        "Speed matters. A fast site makes people happy and helps your search rankings. Optimize your site so it loads quickly and don't forget accessibility. Make sure everyone, including people with disabilities, can use your site. Follow guidelines and add features like alt text for images. Get the tech, design and user experience right and you'll have a website that brings in visitors and drives business. A good website is a powerful marketing tool and crucial for success these days.",
      ],
      offerings: {
        "eCommerce Websites & Landing Pages": {
          i: "Create the perfect trap",
          p: "We specialize in developing high-converting eCommerce platforms and bespoke landing pages that are not only visually appealing and user-friendly but also optimized for maximum conversion rates. Our landing pages are specifically designed to align with and enhance the effectiveness of your marketing campaigns ensuring a seamless and persuasive customer journey from the initial click to the final purchase.",
        },
        "Dynamic Website & CRO": {
          i: "Adapt, evolve & dominate every visitor’s journey",
          p: "We build websites packed with fun stuff like quizzes and polls to keep people hooked. Plus, we make sure your site runs super fast and smooth for the best user experience. This all helps you climb up in search results, turn visitors into customers and get more traffic. Basically, we make sure your online presence is awesome and actually works for you.",
        },
        "UX/UI Creation (Adobe Figma)": {
          i: "Smooth. Instinctive. Seamless.",
          p: "We're really good at making awesome user experiences! We use Adobe Figma to create wireframes, prototypes and user flows that are super detailed. Basically, we take what users want and what the business needs and we turn it into designs that are easy to use and look great. Our team works with everyone involved to make sure the final product is a hit with users and helps the business achieve its goals.",
        },
      },
      id: "website-development",
    },
    "Artificial Reality (AR)": {
      i: "Wildly Immersive Experiences",
      img: "icon-2.png",
      description: [
        "The future of marketing is immersive. AR brings products to life – allowing consumers to virtually experience near-real manifestations of products before purchasing them. This revolutionizes how brands interact with consumers making experiences richer, more engaging and more impactful. Engage your audience with interactive tools that leave them hooked and coming back for more.",
        "For businesses, it's a chance to really grab attention and get people excited. AR lets them add fun, interactive stuff to their marketing making customers more loyal and boosting sales. We're talking things like virtual product demos, try-ons and even story-driven games. It's all about creating something unique that people will remember and actually connect with.",
      ],
      offerings: {},
      id: "artificial-reality",
    },
  };
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  // const [selected, setSelected] = useState("Website Development");

  return (
    
    <section className=" bg-[#FFC395]">
      <div className="container-xxl">
        {Object.entries(data).map(([title, service], index) => (
          <div
            key={index}
            className="service-box grid md:grid-cols-2 gap-10 md:gap-20 py-4"
            id={service.id}
          >
            {/* Left Side - Image and Title */}
            <div className="service-img">
              <h5 className="font-normal text-sm text-[#DF782B] font-inter">
                SOLUTION {index + 1}
              </h5>
              <h2 className="font-black text-4xl md:text-6xl text-black font-inter">
                {title}
              </h2>
              <img
                src={service.img}
                className="w-full max-w-[600px]"
                alt={title}
              />
            </div>

            {/* Right Side - Description and Offerings */}
            <div className="service-text md:max-h-[400px] md:overflow-y-scroll md:pe-10">
              <p className="font-inter text-sm text-black mb-3 italic">
                {service.i}
              </p>
              {service.description.map((i, index) => {
                return (
                  <p key={index} className="font-inter text-sm text-black mb-3">
                    {i}
                  </p>
                );
              })}

              {/* Offerings */}
              <div className="offerings mt-5 md:mt-20">
                {Object.entries(service.offerings).map(
                  ([offeringTitle, offeringDesc], i) => (
                    <div key={i} className="list mt-5">
                      <div className="font-inter text-2xl text-black capitalize">
                        {offeringTitle}
                      </div>
                      <p className="font-inter text-sm text-black my-3 italic">
                        {offeringDesc.i}
                      </p>
                      <p className="font-inter text-sm text-black my-3">
                        {offeringDesc.p}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AllService;
