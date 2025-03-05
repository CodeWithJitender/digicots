export default function CaseStudy({ slide, onClose }) {
  return (
    <div className="fixed inset-0  bg-opacity-60 flex h-[100vh]  z-[1000]">
      <div className="bg-white  w-full  overflow-hidden flex relative">
        
        <div className="w-1/2 p-6">
        <div className="flex justify-between  mb-10">
            <img src="logo-black.png" className="max-w-[200px]" alt="" />
            <button
          onClick={onClose}
          className=" text-xl text-gray-600 hover:text-black"
        >
          ✖
        </button>
        </div>
          <h2 className="text-2xl font-bold">{slide.title}</h2>
          <p className="mt-4 text-gray-600">{slide.text}</p>
        </div>
        <div className="w-1/2">
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
