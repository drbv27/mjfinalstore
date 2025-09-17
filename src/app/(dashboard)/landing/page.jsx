//src/app/landing/page.jsx
"use client";

import Counter from "@/components/Counter";

const LandingPage = () => {
  return (
    <div className="ml-auto mr-auto mt-24">
      <h1 className="text-4xl font-bold text-teal-900">La tienda de Diego</h1>
      <p className="font-semibold text-teal-800">
        Encuentra los mejores productos para todas tus necesidades
      </p>
      {/* <Counter /> */}
    </div>
  );
};

export default LandingPage;
