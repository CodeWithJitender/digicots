import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function BlogSection() {
  const posts = [
    {
      id: "1",
      title: "This is a very long heading with lots of words...",
      author: "Aishwary Sinha",
      date: "Jan 25, 2025",
      readTime: "2 Min Read",
      img:"blog/topic-1.png"
    },
    {
      id: "2",
      title: "This is a very long heading with lots of words...",
      author: "Aishwary Sinha",
      date: "Jan 25, 2025",
      readTime: "2 Min Read",
      img:"blog/topic-2.png"
    },
    {
      id: "",
      title: "This is a very long heading with lots of words...",
      author: "Aishwary Sinha",
      date: "Jan 25, 2025",
      readTime: "2 Min Read",
      img:"blog/topic-3.png"
    },
    {
      id: "",
      title: "This is a very long heading with lots of words...",
      author: "Aishwary Sinha",
      date: "Jan 25, 2025",
      readTime: "2 Min Read",
      img:"blog/topic-4.png"
    },
  ];

  const hoverDivRef = useRef([]);
  const [isHovered, setisHovered] = useState(false);
  const [imgSrc, setimgSrc] = useState(posts[0].img);

  useEffect(() => {
    let timeout;
    const handleMouseEnter = (event,i) => {
      // event.target.style.backgroundColor = "lightblue";
      clearTimeout(timeout);
      setimgSrc(posts[i].img);
      setisHovered(true);
      gsap.to(hoverDivRef.current[i].querySelector('.post-title'),{
        color:"#DF782B"
      })

    };

    const handleMouseLeave = (event,i) => {
      // event.target.style.backgroundColor = "white";
      timeout = setTimeout(() => {
        gsap.to(imgDivref.current,{
          opacity: 0,
          scale:.8,
          filter: "blur(4px)",
          duration:.5,
          onComplete:()=>{
            setisHovered(false);
          }
        })
      }, 500);
      gsap.to(hoverDivRef.current[i].querySelector('.post-title'),{
        color:"white"
      })
    };

    // Loop through all refs and add event listeners
    hoverDivRef.current.forEach((div,i) => {
      if (div) {
        div.addEventListener("mousemove", (e) => handleMouseEnter(e,i));
        div.addEventListener("mouseleave", (e) => handleMouseLeave(e,i));
      }
    });

    // Cleanup function to remove event listeners
    return () => {
      hoverDivRef.current.forEach((div) => {
        if (div) {
          div.removeEventListener("mouseenter", handleMouseEnter);
          div.removeEventListener("mouseleave", handleMouseLeave);
        }
      });
    };
  }, [hoverDivRef.current]);

  const imgDivref = useRef(null);
  const imgRef = useRef(null);

  useGSAP(()=>{
    if(!imgDivref.current) return;
    gsap.from(imgDivref.current , {
      duration: .5,
      opacity: 0,
      filter:"blur(4px)",
      scale: .9,
      ease: "power1.inOut",
      transformOrigin: "center",
    })



  },[isHovered])

  useGSAP(()=>{
    gsap.fromTo(imgRef.current , {
      duration: 1,
      // opacity: 0,
      filter:"blur(4px)",
      scale: 1.3,
      ease: "power1.inOut",
      transformOrigin: "center",
    },
    {
      opacity: 1,
      filter:"blur(0px)",
      scale: 1,
    }
  )
  },[imgSrc])



  const mainImgRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger)
  useGSAP(()=>{
    const tl = gsap.timeline({
      scrollTrigger:{
        trigger:mainImgRef.current,
        start:"top 70%",
        end:"top 30%",
        scrub: true,
      }
    })
    tl.from(mainImgRef.current , {
      opacity:0,
      scale:.9,
      duration:1,
      filter:"blur(4px)",
      ease: "power1.inOut",
      transformOrigin: "center",
    })
  },[mainImgRef.current])



  return (
    <section 
    ref={mainImgRef}

     className=" text-white py-12 px-6 md:px-12">
      <div className="max-w-6xl relative mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Side - Blog List */}
        <div>
          {/* <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Changes in the <br /> Marketing Landscape
            </h2> */}

          <div className="">
            {posts.map((post, index) => (
              <div
                ref={(el) => (hoverDivRef.current[index] = el)}
                key={index}
                className=" hoverDiv border-t border-gray-600 border-dotted pt-5 md:pt-10 md:pb-5"
              >
                <Link>
                  <h3 className="post-title text-lg md:text-2xl font-bold font-inter text-white hover:text-[] pb-2 md:pb-5">
                    {post.title}
                  </h3>
                  <div className="flex text-sm text-gray-400 mt-1 space-x-3">
                    <span className="font-bold text-white">{post.author}</span>
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {isHovered && (
          <div
          ref={imgDivref}
            className="absolute top-[-10%] left-1/2 -translate-x-1/2  overflow-hidden h-[255px] w-[210px] z-[2] rounded-lg pointer-events-none "
          >
            <img
            ref={imgRef}
             className="h-full w-full object-cover" src={imgSrc} alt="" />
          </div>
        )}

        {/* Right Side - Featured Post */}
        <div className="relative">
          <img
            src="blog/featured-post.png"
            alt="Featured Post"
            className="w-full h-80 md:h-full object-cover rounded-lg"
          />
          <div className="absolute bottom-0 left-0 w-full p-6 rounded-b-lg">
            <h3 className="font-bold text-xl text-white mb-4">
              Leading heading of the Latest Post
            </h3>
            <div className="flex text-sm text-gray-300 mt-1 space-x-7">
              <span className="font-bold text-white">Aishwary Sinha</span>
              <span>Jan 25, 2025</span>
              <span>2 Min Read</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// #DF782B