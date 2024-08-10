import { CountUp } from "countup.js";
import React, { useEffect, useRef, useState } from "react";
import "intersection-observer";

const Data: React.FC = () => {
  const orgsRef = useRef<HTMLDivElement>(null);
  const govsRef = useRef<HTMLDivElement>(null);
  const sessionsRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        const orgsAnim = new CountUp(orgsRef.current!, 300, { duration: 1 });
        const govsAnim = new CountUp(govsRef.current!, 110, { duration: 2 });
        const sessionsAnim = new CountUp(sessionsRef.current!, 589, {
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
    <section className="relative flex flex-col gap-20 pt-10 h-[80vh] w-full bg-cover bg-center">
      <div className="flex justify-center items-center">
        <p className="text-[42px] text-gray-800">Testing Simulation Data</p>
      </div>
      <div className="flex h-[60%]">
        <div className="flex flex-col text-green-800 border-r-[1px] border-b-[1px] border-t-[1px] border-green-200 h-full items-center justify-center w-1/3 text-[80px] font-bold">
          <div ref={orgsRef}>0</div> {/* Animated number */}
          <span className="text-[20px] font-semibold">
            Participating Organisations
          </span>
        </div>
        <div className="flex flex-col text-green-800 border-r-[1px] border-b-[1px] border-t-[1px] border-green-200 h-full items-center justify-center w-1/3 text-[80px] font-bold">
          <div ref={govsRef}>0</div> 
          <span className="text-[20px] font-semibold">
            National Governments
          </span>
        </div>
        <div className="flex flex-col text-green-800 border-r-[1px] border-b-[1px] border-t-[1px] border-green-200 h-full items-center justify-center w-1/3 text-[80px] font-bold">
          <div ref={sessionsRef}>0</div> 
          <span className="text-[20px] font-semibold">Testing Sessions</span>
        </div>
      </div>
    </section>
  );
};

export default Data;
