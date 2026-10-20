const Footer = () => {
  const year = new Date().toLocaleDateString("bn-BD", { year: "numeric" });

  return (
    <footer className="mt-auto w-full bg-gray-900 text-gray-300">
      <div className="mx-auto w-full max-w-7xl px-4 py-4 text-center text-xs sm:px-6 sm:py-5 sm:text-sm lg:px-8">
        © {year} Bangla News 24 · সর্বস্বত্ব সংরক্ষিত
      </div>
    </footer>
  );
};

export default Footer;
