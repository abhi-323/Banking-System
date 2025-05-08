import Slider from "react-slick";

const slides = [
  {
    title: "Secure Banking",
    description: "Your money is safe with our top-grade encryption & security.",
    image: "https://source.unsplash.com/800x400/?bank,safe",
  },
  {
    title: "Easy Loan Access",
    description: "Apply for personal and business loans in just a few clicks.",
    image: "https://source.unsplash.com/800x400/?loan,finance",
  },
  {
    title: "24/7 Customer Support",
    description: "Our dedicated team is here to assist you around the clock.",
    image: "https://source.unsplash.com/800x400/?customer,support",
  },
];
const HeroSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: true,
  };
  return (
    <div>
      {/* Header */}
      <header className="bg-blue-700 text-white p-4 text-center text-2xl font-bold">
        TrustBank - Secure. Reliable. Fast.
      </header>

      {/* Hero Slider */}
      <Slider {...settings}>
        {slides.map((slide, idx) => (
          <div key={idx} className="relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-96 object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-6">
              <h2 className="text-3xl font-bold">{slide.title}</h2>
              <p className="text-lg mt-2 max-w-xl">{slide.description}</p>
            </div>
          </div>
        ))}
      </Slider>

      <section className="p-6 grid md:grid-cols-3 gap-6 text-center">
        <div className="bg-white shadow-md p-4 rounded-2xl">
          <h3 className="font-semibold text-xl mb-2">Accounts</h3>
          <p>Open and manage your savings, current, and salary accounts.</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-2xl">
          <h3 className="font-semibold text-xl mb-2">Loans</h3>
          <p>
            Quick and easy loans for all your personal and professional needs.
          </p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-2xl">
          <h3 className="font-semibold text-xl mb-2">Investments</h3>
          <p>
            Grow your wealth with our trusted investment options and advisors.
          </p>
        </div>
      </section>

      <footer className="bg-gray-800 text-white p-4 text-center">
        &copy; {new Date().getFullYear()} TrustBank. All rights reserved.
      </footer>
    </div>
  );
};

export default HeroSection;
