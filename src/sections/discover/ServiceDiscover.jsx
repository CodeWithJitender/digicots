import React from "react";

function ServiceDiscover() {
  return (
    <div className="service-discover relative">
      <div className="service-img-1">
        <img src="discover-2.png" className="w-full max-h-[100vh] object-cover" alt="" />
      </div>
      <div className="service-text flex flex-col md:flex-row justify-between items-end absolute bottom-0 w-full py-10 md:p-5 px-10 text-center md:text-start gap-5">
        <h1 className="m-auto max-w-[500px] font-black text-4xl md:text-6xl text-white">Let's Discover Our Services</h1>
        <h3 className="m-auto max-w-[350px] font-semibold text-2xl  md:text-4xl text-white">We are happy to see you here</h3>
      </div>
    </div>
  );
}

export default ServiceDiscover;
