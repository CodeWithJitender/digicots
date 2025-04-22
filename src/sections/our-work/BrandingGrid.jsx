import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useSearchParams } from "react-router-dom";

// Move constant data outside of component
const brandingData = [
  {
    id: 1,
    image: "https://ik.imagekit.io/8mbzq2hdl/digicots/project-1.webp",
    internal: "https://ik.imagekit.io/8mbzq2hdl/digicots/Internal/1.webp",
    url:"https://www.drinkcharlies.com/",
    title: "Charlie’s Organics",
    tags: ["HTML5", "CSS3", "React.js", "Vue.js", "JQuery"],
    description: "Sparkling Water Brand in Europe",
    complexity: "TAT",
    timeTaken: "3 Months",
    services: ["HTML5", "CSS3", "React.js", "Vue.js", "JQuery"],
    per1: "Charlie’s Organics is a vibrant digital store that embodies the brand’s commitment to healthy, organic refreshment with a sleek, modern interface designed to impress and engage its audience.",
    per2: "At its core, the website is a visually compelling, responsive platform that seamlessly showcases an array of products, all presented with clean, crisp imagery and intuitive navigation. From a developer’s perspective, the site is built on a robust foundation using HTML5 for semantic structure and CSS3 for polished, responsive styling. These core technologies work hand-in-hand to ensure that every element from the grid-based product layout to the animated transitions operates flawlessly across devices, whether accessed on mobile, tablet or desktop. JavaScript is skillfully utilized to handle dynamic content and interactive elements such as smooth-scrolling navigation menus, interactive product carousels and responsive forms that capture customer orders and inquiries with ease. While the website’s front-end appears streamlined and lightweight, it likely incorporates trusted JavaScript libraries such as jQuery or even frameworks like React or Vue to manage state, handle events and deliver those pleasing micro-interactions that keep users engaged. Moreover, this modern approach ensures that the website not only meets but exceeds performance benchmarks with fast load times and a secure environment, a critical factor for any ecommerce or product-focused digital presence. With responsive design techniques, quality imagery and an intuitive layout, the site encapsulates the philosophy of doing well by doing good.",
    per3: "Understanding the intricate development process behind Charlie’s Organics highlights our capacity to create similarly impactful websites for our clients. We bring expertise in front-end and back-end technologies, mastery of responsive design and a keen eye for aesthetic detail that delivers an engaging digital experience. With our comprehensive approach of utilizing industry-standard languages like HTML5, CSS3, JavaScript and powerful frameworks that streamline development, we are well-equipped to build a website that mirrors the exemplary standards set by Charlie’s Organics, tailored specifically to meet your business goals. Rest assured, our team is ready to translate your vision into a robust, dynamic online presence that captivates your audience and drives your brand’s success.",
  },
  {
    id: 2,
    image: "https://ik.imagekit.io/8mbzq2hdl/digicots/project-2.webp",
    internal: "https://ik.imagekit.io/8mbzq2hdl/digicots/Internal/2.webp",
    url:"https://www.triplettapizza.com/",
    title: "Tripletta",
    tags: ["HTML5", "CSS3", "GSAP", "React.js", "JQuery"],
    description: "Pizza Brand in France",
    complexity: "TAT",
    timeTaken: "3 Months",
    services: ["HTML5", "CSS3", "GSAP", "React.js", "JQuery"],
    per1: "Tripletta Pizza's website is a dynamic, visually immersive digital experience that masterfully showcases the brand’s distinct character and its local roots across various French cities. The website is crafted with a focus on immersive imagery, engaging typography and a sleek interface that reflects both modern design trends and the laid-back yet passionate ambiance of a neighborhood pizzeria.",
    per2: "From a developer’s perspective, this site is built using the latest web standards and technologies which ensure both performance and aesthetic appeal. At its foundation, the website utilizes HTML5 to create a semantically meaningful structure allowing search engines and accessibility tools to effectively parse the content. CSS3 is employed to render sophisticated visual elements including animations, transitions and responsive layouts. The clean, modern design is achieved through the smart use of media queries and flexbox or grid layouts ensuring the website looks stunning on a range of devices from high-resolution desktops to mobile screens. JavaScript plays a crucial role in providing interactive features such as custom cursors, dynamic content loading and interactive map-based location selection. The movement and fluidity in design are likely powered by libraries or in-house scripts that enhance the user experience without compromising load times.",
    per3: "The presence of multiple modern aesthetic elements and fluid interactions hints at the possible use of advanced web design tools or frameworks. The subtle yet effective animations and custom cursor effects suggest that lightweight JavaScript libraries like GSAP or jQuery might be in use or perhaps more contemporary frameworks like React for managing dynamic content components. In any case, the primary focus is on optimizing both user engagement and performance ensuring that the site is not only visually appealing but also highly functional and responsive. Moreover, the website is designed to integrate seamlessly with backend systems for order processing and customer engagement ensuring that services like online ordering, store location navigation and potentially even customer feedback are executed efficiently. The use of a Content Delivery Network (CDN) is inferred from the optimized loading of assets, images and multimedia content which enables a swift and smooth user experience even for customers across various geographic locations.",
    per4: "Understanding the technical and aesthetic elements that make Tripletta Pizza’s website a standout, we are fully equipped to create a similarly advanced and visually appealing website for your business. Our expert team specializes in the latest technologies – leveraging HTML5, CSS3, JavaScript and robust frameworks or CMS platforms as needed to build websites that not only captivate visitors but also deliver high performance and seamless functionality. Let us help you transform your vision into a digital masterpiece that drives engagement and elevates your brand presence. Whether it’s an immersive site with dynamic interactions or a reliable platform for online ordering and customer engagement, we are ready to deliver outstanding results tailored to your needs.",
  },
  {
    id: 3,
    image: "https://ik.imagekit.io/8mbzq2hdl/digicots/project-3.webp",
    internal: "https://ik.imagekit.io/8mbzq2hdl/digicots/Internal/3.webp",
    url:"https://surge.peachworlds.com/",
    title: "Surge",
    tags: ["HTML5", "CSS3", "GSAP,", "React.js", "JQuery"],
    description: "Bicycle Brand Use Case by PeachWorlds",
    complexity: "TAT",
    timeTaken: "5 Months",
    services: ["HTML5", "CSS3", "GSAP,", "React.js", "JQuery"],
    per1: "Surge by Peach Worlds is an innovative, high-impact digital platform designed to capture the essence of modern biking culture and performance-driven engineering. The website is structured to offer an immersive experience that highlights the unique features of the Surge bike.",
    per2: "From a developer’s perspective, the site is engineered using state-of-the-art web development tools and techniques with a strong foundation in modern web standards that ensure both aesthetic appeal and robust functionality. The core of the website is built using HTML5 providing a semantic and accessible structure that makes it easy for search engines and assistive technologies to interpret the content. CSS3 is extensively utilized to achieve the visually striking, minimalist design with smooth transitions, animations and responsive layouts that adapt seamlessly to various screen sizes and devices. Techniques like CSS Grid and Flexbox likely play a role in creating the flexible, dynamic arrangements of content ensuring the site is as functional on mobile devices as it is on desktop screens. JavaScript is at the heart of the site’s interactivity, facilitating dynamic content updates, smooth scrolling and engaging visual effects that enhance user engagement. It’s probable that the website leverages modern JavaScript frameworks and libraries, possibly React or Vue.js to manage its state and ensure efficient rendering of components, thereby optimizing the user experience. Such frameworks enable the creation of reusable UI components that not only improve development efficiency but also contribute to the maintainability and scalability of the site over time.",
    per3: "In addition to these core technologies, the website appears to utilize advanced web development platforms and services such as a headless CMS for efficient content management and streamlined updates. The reference to “Made with Peach Worlds” suggests that Peach Worlds’ proprietary tools and frameworks are integrated into the development process ensuring that the site not only meets the highest standards for performance and security but also pushes the envelope in terms of design innovation. This integration likely involves using a robust hosting infrastructure enhanced by Content Delivery Networks (CDNs) that help deliver content quickly and reliably to users around the globe.",
    per4: "Understanding the technology and design philosophy that underpin Surge gives us the confidence to replicate this level of excellence for our clients. Our team of expert developers is highly proficient in the latest web technologies including HTML5, CSS3, JavaScript (with frameworks like React and Vue) and advanced CMS integrations ensuring that we can create similarly striking, fully responsive websites that captivate users and drive business success. Whether you need a dynamic, visually stunning platform that embodies brand innovation or a user-centric digital experience that transforms how customers interact with your products, we have the skills and expertise to deliver results that exceed expectations. Let us help you surge ahead in the digital realm with a website that perfectly marries design with dominance.",
  },
  {
    id: 4,
    image: "https://ik.imagekit.io/8mbzq2hdl/digicots/project-4.webp",
    internal: "https://ik.imagekit.io/8mbzq2hdl/digicots/Internal/4.webp",
    url:"https://isradesign.com/en/",
    title: "ISRA Design",
    tags: ["HTML5", "CSS3", "GSAP", "React.js", "Vue.js", "JQuery"],
    description: "Architecture Design Studio",
    complexity: "TAT",
    timeTaken: "6 Months",
    services: ["Sports", "Branding", "E-commerce"],
    per1: "ISRA Design is a sleek and highly professional digital portfolio and design agency website that encapsulates the ethos of creative innovation and modern aesthetics through a carefully crafted user experience and technical implementation.",
    per2: "At its core, the website is designed to serve as both an impressive showcase for the agency’s work and a functional interface for communicating their services to prospective clients, employing a minimalist yet striking design that emphasizes visuals, typography and intuitive navigation. From a developer’s point of view, the website is constructed using the latest web standards and best practices to deliver exceptional performance, accessibility and responsiveness. The foundation is built on HTML5 which provides a semantic structure ensuring that every element is logically organized and easily interpretable by both search engines and assistive technologies. Complementing this structure, CSS3 is extensively utilized to create a visually compelling design that integrates modern features like flexible layouts, CSS Grid and Flexbox. These techniques allow the site to automatically adjust its layout to suit any device or screen resolution, delivering a consistent and engaging user experience whether viewed on a desktop, tablet or smartphone. The stylistic finesse is further enhanced by advanced CSS animations and transitions which add dynamic touches to elements such as hover effects, scrolling animations and content reveals, all of which contribute to a high-end, polished look that captures the essence of creative design.",
    per3: "JavaScript plays a crucial role in injecting interactivity and dynamic functionality into the site, managing client-side interactions without sacrificing speed or responsiveness. The development team likely leverages modern JavaScript frameworks or libraries to handle complex components and ensure smooth state management throughout the website. Such frameworks facilitate the creation of reusable components, streamline code maintenance and support rapid development cycles, which are essential for a website that frequently showcases new projects and updated content.",
    per4: "Additionally, the website may employ lightweight libraries for DOM manipulation and animation such as GSAP or jQuery to precisely control interactive elements and provide subtle yet effective user engagement features. A robust backend is implied through the seamless integration of content management systems (CMS) that empower the design team to effortlessly update and manage portfolio pieces, blog posts or case studies without needing extensive technical intervention. This integration not only reduces the time required for content updates but also ensures that the website remains cutting-edge with minimal downtime, thanks to modern hosting solutions and optimized server configurations. Understanding the sophisticated blend of design acumen and technical expertise that powers ISRA Design, we are fully equipped to create similarly outstanding digital experiences for our clients. Our team specializes in harnessing the power of HTML5, CSS3 and JavaScript to build scalable, elegant and high-performing websites. With a proven track record in delivering captivating designs that marry visual appeal with practical functionality, we are ready to translate your vision into a state-of-the-art digital presence that will set you apart in today’s competitive online landscape. Let us bring your ideas to life with a custom website that combines creativity, cutting-edge technology and seamless user experiences that drive business success.",
  },
  {
    id: 5,
    image: "https://ik.imagekit.io/8mbzq2hdl/digicots/project-5.webp",
    internal: "https://ik.imagekit.io/8mbzq2hdl/digicots/Internal/5.webp",
    url:"https://leoff-paris.com/en/",
    title: "Le OFF Paris",
    tags: ["HTML5", "CSS3", "Vue.js", "React.js", "Third-party APIs / Plugins"],
    description: "Food Repository",
    complexity: "9/10",
    timeTaken: "8 Months",
    services: [
      "HTML5",
      "CSS3",
      "Vue.js",
      "React.js",
      "Third-party APIs / Plugins",
    ],
    per1: "Le OFF Paris is a sophisticated digital platform and event initiative focusing on the finest selections of bars, restaurants, wines and spirits in the heart of Paris. The website exudes an elegant, artful design that not only showcases curated content but also serves as an interactive guide for gastronomes and connoisseurs looking to explore the capital’s best offerings. From a developer’s perspective, Le OFF Paris has been engineered with a clear focus on performance, visual aesthetics and an engaging user experience. Its clean design is achieved through a combination of modern web technologies starting with HTML5 which creates a semantic structure essential for both search engine optimization and accessible navigation. CSS3 is extensively utilized to implement the site's chic, minimalist design, the subtle yet effective animations, responsive grid layouts and fluid transitions are all indicators of a carefully thought-out stylesheet. Techniques such as media queries, flexbox and grid systems ensure that the site adapts effortlessly to different screen sizes, providing a seamless browsing experience whether on mobile, tablet or desktop devices.",
    per2: "JavaScript augments the user interface by delivering dynamic content updates and interactive components such as smooth scrolling effects, modal popups and real-time filtering of listings. It is likely that the development team leveraged popular JavaScript libraries or frameworks, possibly React or Vue.js to build these features as these tools enable the creation of reusable components, improved state management, and better performance overall. Furthermore, custom scripting appears to be in place to handle animations and interactive maps which enhance the overall navigability of the website directing users toward the event’s curated selections and highlights.",
    per3: "In addition, the integration of third-party APIs and services, for instance, for social media feeds, interactive maps or real-time updates suggests a highly modular architecture. This modular approach not only improves maintainability but also allows the site to be highly scalable. The use of Content Delivery Networks (CDNs) for image assets and other media further exemplifies a commitment to both speed and reliability ensuring fast load times even during peak user traffic.",
    per4: "Understanding the technical and aesthetic craftsmanship that powers Le OFF Paris, we have complete confidence in our ability to deliver a similarly stellar web experience for our clients. Our team is proficient in the latest web technologies including HTML5, CSS3 and JavaScript along with cutting-edge frameworks such as React or Vue ensuring that every aspect of design, performance and user engagement is meticulously engineered. We excel at creating high-impact digital platforms that captivate audiences and drive business success. Let us help you transform your vision into a dynamic, visually compelling and fully responsive website that stands as a testament to quality and innovation in the digital arena.",
  },
  {
    id: 6,
    image: "https://ik.imagekit.io/8mbzq2hdl/digicots/project-6.webp",
    internal: "https://ik.imagekit.io/8mbzq2hdl/digicots/Internal/6.webp",
    url:"https://kindly-2e8okmvk.peachworlds.com/",
    title: "Anima",
    tags: ["HTML5", "CSS3", "Vue.js", "React.js", "CMS (PeachWorlds)"],
    description: "Therapy Brand Use Case by PeachWorlds",
    complexity: "TAT",
    timeTaken: "8 Months",
    services: ["Technology", "Branding", "Retail"],
    per1: "Anima is a beautifully executed digital experience hosted on Peach Worlds that immediately captivates visitors with its modern, clean aesthetic and thoughtful design catering to audiences seeking elegance combined with functionality.",
    per2: "From a developer’s point of view, this website is crafted meticulously using the latest web standards leveraging the power of HTML5 to build a semantic, well-structured layout that ensures both accessibility and search engine friendliness. CSS3 is harnessed to deliver a visually appealing design characterized by smooth transitions, nuanced animations and responsive behaviors that adapt seamlessly across devices, thereby ensuring an optimal user experience regardless of how the website is accessed. JavaScript is integrated into the core of the site to bring interactivity to life, powering dynamic content loading and subtle micro-interactions that engage users without compromising performance. The site’s code is both elegant and efficient, likely utilizing modern frameworks and libraries that could include React or Vue.js to manage interactive components and state, thereby streamlining the development process and ensuring that every element behaves predictably under various conditions.",
    per3: "Moreover, kindly’s foundation on the Peach Worlds platform indicates that it is built upon a robust and scalable ecosystem designed to handle both rich media content and high user traffic effortlessly. This kind of platform typically supports a modular architecture wherein developers can incorporate custom components alongside out-of-the-box solutions. For instance, while HTML5 and CSS3 form the backbone of the presentation layer, JavaScript libraries facilitate critical aspects of user engagement such as asynchronous data loading and smooth scrolling effects. There is also a strong likelihood that advanced design tools and pre-processing technologies such as SASS or LESS are employed to manage stylesheets in a highly organized manner, reducing code redundancy and improving maintainability. The use of Content Delivery Networks (CDNs) further enhances the performance of the site, ensuring that images, fonts and other static assets load rapidly from geographically dispersed servers, thereby reducing latency and enhancing the user experience across global markets.",
    per4: "Understanding the intricacies and the high-performance digital architecture that powers kindly, our team stands ready to deliver similarly captivating websites for our clients. We specialize in using top-tier web technologies like HTML5, CSS3 and JavaScript coupled with advanced frameworks like React or Vue.js to build custom, scalable and visually stunning websites. By leveraging the same cutting-edge tools and industry best practices, we ensure that your online presence not only meets modern web standards but also captivates your audience with a sleek, efficient and immersive digital experience. Let us transform your digital vision into a state-of-the-art website that combines design finesse with robust functionality, positioning your brand at the forefront of the online arena.",
  },
];

// Memoized BrandingCard component
const BrandingCard = React.memo(({ card, onClick }) => {
  const imgRef = useRef(null);
  const animationRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleMouseMove = useCallback(
    (e) => {
      if (!imageLoaded) return;

      if (animationRef.current) cancelAnimationFrame(animationRef.current);

      animationRef.current = requestAnimationFrame(() => {
        const img = imgRef.current;
        if (!img) return;

        const rect = img.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        let x = (e.clientX - centerX) / (rect.width / 2);
        let y = (e.clientY - centerY) / (rect.height / 2);

        x = Math.max(-1, Math.min(1, x));
        y = Math.max(-1, Math.min(1, y));

        gsap.to(img, {
          rotationX: y * 10,
          rotationY: x * -10,
          ease: "linear",
          duration: 0.05,
        });
      });
    },
    [imageLoaded]
  );

  const handleMouseLeave = useCallback(() => {
    if (!imageLoaded) return;

    gsap.to(imgRef.current, {
      rotationX: 0,
      rotationY: 0,
      ease: "linear",
      duration: 0.1,
    });
  }, [imageLoaded]);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // Add event listeners only after image is loaded
    if (imageLoaded) {
      img.addEventListener("mousemove", handleMouseMove);
      img.addEventListener("mouseleave", handleMouseLeave);
    }

    console.log(imageLoaded);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      img.removeEventListener("mousemove", handleMouseMove);
      img.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave, imageLoaded]);

  return (
    <div
      ref={imgRef}
      className="text-white rounded-lg overflow-hidden shadow-lg cursor-pointer transition transform perspective-[1000px]"
      onClick={() => onClick(card)}
    >
      <img
        src={card.image}
        alt={card.title}
        className="w-full  rounded-2xl"
        onLoad={() => setImageLoaded(true)}
        style={{ display: imageLoaded ? "block" : "none" }}
      />
      {!imageLoaded && (
        <div className="w-full h-[200px] bg-gray-800 rounded-2xl animate-pulse"></div>
      )}
      <div className="py-4">
        <div className="text-sm font-semibold mb-2 space-x-2">
          {card.tags?.map((tag, index) => (
            <React.Fragment key={index}>
              <span className="text-white">{tag}</span>
              {index < card.tags.length - 1 && (
                <span className="text-orange-500">•</span>
              )}
            </React.Fragment>
          ))}
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
          {card.title}
        </h2>
      </div>
    </div>
  );
});

// Memoized PopupModal component
const PopupModal = React.memo(({ card, onClose }) => {
  const popupRef = useRef(null);
  const popupContainer = useRef(null);
  const scrollY = useRef(0);
  const touchStartY = useRef(0);

  useGSAP(() => {
    if (card) {
      gsap.from(popupRef.current, {
        duration: 1,
        opacity: 0,
        y: 100,
        ease: "power4.inOut",
      });
    }
  }, [card]);

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const container = popupContainer.current;
    if (!container) return;

    const maxScroll = container.scrollHeight - container.clientHeight + 5;
    scrollY.current -= e.deltaY * 0.5;
    scrollY.current = Math.max(-maxScroll, Math.min(0, scrollY.current));

    gsap.to(container, {
      y: scrollY.current,
      duration: 2,
      ease: "power2.out",
    });
  }, []);

  const handleTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e) => {
    e.preventDefault();
    const container = popupContainer.current;
    if (!container) return;

    const maxScroll = container.scrollHeight - container.clientHeight + 5;
    const touchY = e.touches[0].clientY;
    const deltaY = (touchStartY.current - touchY) * 0.5;

    scrollY.current -= deltaY;
    scrollY.current = Math.max(-maxScroll, Math.min(0, scrollY.current));

    gsap.to(container, {
      y: scrollY.current,
      duration: 0.5,
      ease: "power2.out",
    });

    touchStartY.current = touchY;
  }, []);

  useEffect(() => {
    if (!card) return;

    const container = popupContainer.current;
    if (!container) return;

    window.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [card, handleWheel, handleTouchStart, handleTouchMove]);

  if (!card) return null;

  return (
    <div
      ref={popupRef}
      data-lenis-prevent
      className="fixed inset-0 flex items-end bottom-0 z-[1000] justify-center overflow-hidden bg-black bg-opacity-60 backdrop-blur-md px-4"
    >
      <button
        className="absolute sm:top-[15vh] top-[8vh] cursor-pointer right-[50%] translate-x-[50%] text-black text-xl bg-white p-2 rounded-[50%]"
        onClick={() => {
          gsap.to(popupRef.current, {
            duration: 0.3,
            opacity: 0,
            y: 100,
            ease: "power4.inOut",
            onComplete: onClose,
          });
        }}
      >
        ✖
      </button>
      <div className="bg-white rounded-lg rounded-b-none w-full overflow-hidden max-w-[1400px] py-4 px-2 md:p-6 relative shadow-xl relative z-50">
        <div className="max-h-[500px] overflow-y-auto popup-container">
          <h2 className="text-2xl font-bold text-center">{card?.title}</h2>
          <p className="text-gray-600 text-center">{card?.description}</p>
          <div className=" mt-4 md:py-10 md:gap-10 px-5">
            <div className="text-sm text-[#202020] text-justify">
              <p>{card?.per1}</p>
              <p className="mt-3">{card?.per2}</p>
              <p className="mt-3">{card?.per3}</p>
              <p className="mt-3">{card?.per4}</p>
            </div>
            <br />
            <br className="hidden md:block" />
            {/* <br /> */}
            <div className="h-full flex  flex-col md:flex-row justify-between gap-3 mb-5">
              <p className="text-2xl font-bold">
                Complexity: <br />
                <span className="text-gray-600 text-[18px]">
                  {card?.complexity}
                </span>
              </p>
              <p className="text-2xl font-bold">
                Time Taken: <br />
                <span className="text-gray-600 text-[18px]">
                  {card?.timeTaken}
                </span>
              </p>
              <div>
                <p className="text-2xl font-bold md:text-end">Services:</p>
                <ul className="text-gray-600 md:text-end list-none">
                  {card?.services.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex justify-center mb-4">
            <img
              src={card?.internal}
              alt={card?.title}
              className="w-full  object-cover rounded-lg"
            />
          </div>

          <div className="flex justify-center relative">
            <a
              className="bg-[#ED510C] block text-center rounded-[8px] font-bold text-white text-[14px] font-inter p-3  lg:px-5 md:absolute md:bottom-[80px]"
              href={card?.url} target="_blank"
            >
              Visit Site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});

// Memoized CardWrapper component
const CardWrapperDesktop = React.memo(({ setSelectedCard, from, to }) => {
  const cardRef = useRef(null);
  const cardWrapperRef = useRef(null);
  const isDesktop = window.innerWidth > 628;

  useGSAP(() => {
    if (!cardWrapperRef.current || !cardRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardWrapperRef.current,
        start: "top 120%",
        end: "top -90%",
        scrub: 1,
      },
    });

    tl.fromTo(
      cardRef.current,
      { scale: 1.2, opacity: 0, rotationX: 40 },
      {
        scale: 0.8,
        opacity: 1,
        rotationX: 0,
        duration: 20,
        ease: "power1.inOut",
      }
    ).to(
      cardRef.current,
      {
        scale: 1.2,
        opacity: 0.2,
        rotationX: -40,
        duration: 20,
        ease: "power1.inOut",
        immediateRender: false,
      },
      "-=1"
    );
  }, [isDesktop, cardRef.current, cardWrapperRef.current]);

  const handleCardClick = useCallback(
    (index) => {
      setSelectedCard(brandingData[from + index]);
    },
    [from, setSelectedCard]
  );

  return (
    <div
      ref={cardWrapperRef}
      className="card-wrapper flex flex-col gap-10 perspective-[1000px]"
    >
      <div
        ref={cardRef}
        className="w-full bg-cover transform-3d translate-3d rotate-x-[30deg]"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 md:gap-20 perspective-[1000px]">
          {brandingData.slice(from, to).map((card, index) => (
            <BrandingCard
              key={`${card.id}-${index}`}
              card={card}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

const CardWrapperMobile = React.memo(({ setSelectedCard, from, to }) => {
  const cardRef = useRef(null);
  const cardWrapperRef = useRef(null);
  const isDesktop = window.innerWidth > 628;

  useGSAP(() => {
    if (!cardWrapperRef.current || !cardRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardWrapperRef.current,
        start: "top 120%",
        end: "top -40%",
        scrub: 1,
      },
    });

    tl.fromTo(
      cardRef.current,
      { scale: 1.2, opacity: 0, rotationX: 40 },
      {
        scale: 0.8,
        opacity: 1,
        rotationX: 0,
        duration: 20,
        ease: "power1.inOut",
      }
    ).to(
      cardRef.current,
      {
        scale: 1.1,
        opacity: 0.2,
        rotationX: -40,
        duration: 15,
        ease: "power1.inOut",
        // immediateRender: false,
      },
      "-=1"
    );
  }, [isDesktop, cardRef.current, cardWrapperRef.current]);

  const handleCardClick = useCallback(
    (index) => {
      setSelectedCard(brandingData[from + index]);
    },
    [from, setSelectedCard]
  );

  return (
    <div
      ref={cardWrapperRef}
      className="card-wrapper flex flex-col gap-10 perspective-[1000px]"
    >
      <div
        ref={cardRef}
        className="w-full bg-cover transform-3d translate-3d rotate-x-[30deg]"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 md:gap-20 perspective-[1000px]">
          {brandingData.slice(from, to).map((card, index) => (
            <BrandingCard
              key={`${card.id}-${index}`}
              card={card}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

// Main BrandingGrid component

const BrandingGrid = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("i");
  const [selectedCard, setSelectedCard] = useState(null);
  const isDesktop = useMemo(() => window.innerWidth > 628, []);

  // 🔁 Refresh the page once when this component mounts
  useEffect(() => {
    const hasRefreshed = sessionStorage.getItem("hasRefreshed");
    if (!hasRefreshed) {
      sessionStorage.setItem("hasRefreshed", "true");
      window.location.reload();
    }

    return () => {
      setTimeout(() => {
        sessionStorage.removeItem("hasRefreshed");
      }, 2000);
    };
  }, []);

  useEffect(() => {
    if (id) {
      const cardIndex = parseInt(id, 10);
      if (!isNaN(cardIndex) && brandingData[cardIndex]) {
        setSelectedCard(brandingData[cardIndex]);
      }
    }
  }, [id]);

  const cardWrappers = useMemo(() => {
    if (isDesktop) {
      return [0, 2, 4, 6].map((from) => (
        <CardWrapperDesktop
          key={`desktop-${from}`}
          setSelectedCard={setSelectedCard}
          from={from}
          to={from + 2}
        />
      ));
    }
    return brandingData.map((_, i) => (
      <CardWrapperMobile
        key={`mobile-${i}`}
        setSelectedCard={setSelectedCard}
        from={i}
        to={i + 1}
      />
    ));
  }, [isDesktop]);

  return (
    <div className="container-xxl overflow-x-hidden">
      {cardWrappers}
      <PopupModal card={selectedCard} onClose={() => setSelectedCard(null)} />
    </div>
  );
};

export default React.memo(BrandingGrid);
