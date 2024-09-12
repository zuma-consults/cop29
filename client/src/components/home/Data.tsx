import { CountUp } from "countup.js";
import React, { useEffect, useRef, useState } from "react";
import "intersection-observer";

const Data: React.FC = ({overviewDetails}: {
  
}) => {
  const orgsRef = useRef<HTMLDivElement>(null);
  const govsRef = useRef<HTMLDivElement>(null);
  const sessionsRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        const orgsAnim = new CountUp(orgsRef.current!, overviewDetails?.totalDelegates || 0, { duration: 1 });
        const govsAnim = new CountUp(govsRef.current!, overviewDetails?.totalOrganizations || 0, { duration: 2 });
        const sessionsAnim = new CountUp(sessionsRef.current!, overviewDetails?.bookedSlots || 0, {
          duration: 3,
        });

        if (!orgsAnim.error) orgsAnim.start();
        if (!govsAnim.error) govsAnim.start();
        if (!sessionsAnim.error) sessionsAnim.start();
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });

    if (orgsRef.current) observer.observe(orgsRef.current);
    if (govsRef.current) observer.observe(govsRef.current);
    if (sessionsRef.current) observer.observe(sessionsRef.current);

    return () => {
      if (orgsRef.current) observer.unobserve(orgsRef.current);
      if (govsRef.current) observer.unobserve(govsRef.current);
      if (sessionsRef.current) observer.unobserve(sessionsRef.current);
    };
  }, [hasAnimated]);

  return (
    <section
      className="relative flex flex-col gap-10 md:gap-20 pt-10 h-auto md:h-[80vh] w-full bg-cover bg-center"
      data-aos="fade-up"
    >
      <div
        className="flex justify-center items-center mb-4"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <p className="text-[28px] md:text-[42px] text-gray-800 font-bold">
          Data Overview
        </p>
      </div>
      <div className="flex flex-col md:flex-row h-auto md:h-[60%] w-full">
        <div
          className="flex flex-col text-green-800 border-r-[1px] border-b-[1px] border-t-[1px] p-3 border-green-200 items-center justify-center w-full md:w-1/3 text-[50px] md:text-[80px] font-bold mb-8 md:mb-0"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          {/* <p className="text-[16px] md:text-[20px] font-semibold">over</p>{" "} */}
          <div ref={orgsRef} className="text-[50px]">
            0
          </div>
          <span className="text-[16px] md:text-[20px] font-semibold">
            Participating Delegates
          </span>
        </div>
        <div
          className="flex flex-col text-green-800 border-r-[1px] border-b-[1px] border-t-[1px] p-3 border-green-200 items-center justify-center w-full md:w-1/3 text-[50px] md:text-[80px] font-bold mb-8 md:mb-0"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          {/* <p className="text-[16px] md:text-[20px] font-semibold">over</p>{" "} */}
          <div ref={govsRef} className="text-[50px]">
            0
          </div>
          <span className="text-[16px] md:text-[20px] font-semibold">
            Organizations
          </span>
        </div>
        <div
          className="flex flex-col text-green-800 border-r-[1px] border-b-[1px] border-t-[1px] p-3 border-green-200 items-center justify-center w-full md:w-1/3 text-[50px] md:text-[80px] font-bold"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          {/* <p className="text-[16px] md:text-[20px] font-semibold">over</p>{" "} */}
          <div ref={sessionsRef} className="text-[50px]">
            0
          </div>
          <span className="text-[16px] md:text-[20px] font-semibold">
            Booked Slots
          </span>
        </div>
      </div>
    </section>
  );
};

export default Data;
