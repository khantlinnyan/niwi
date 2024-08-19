"use client";

import { lancelotFont } from "@/libs/font/font-helper";
import { cn } from "@/libs/utils";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: React.ReactNode;
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [hasHydrate, setHyrate] = useState(false);
  useEffect(() => setHyrate(true), []);

  useEffect(() => {
    const details = detailsRef.current;
    const content = contentRef.current;

    if (!details || !content) return;

    const setContentHeight = () => {
      const isOpen = details?.open;
      setOpen(isOpen === true);

      if (content) {
        content.style.height = isOpen ? `${content.scrollHeight}px` : "0px";
      }
    };

    // Add event listener for the toggle event
    details.addEventListener("toggle", setContentHeight);

    // Clean up the event listener on component unmount
    return () => {
      details.removeEventListener("toggle", setContentHeight);
    };
  }, [hasHydrate]);

  if (!hasHydrate) return null;

  return (
    <details ref={detailsRef} className="niwi-faq-item">
      <summary className={cn("text-lg")}>
        <span className={cn(open && "niwi-logo-text")}>{question}</span>
      </summary>
      <div ref={contentRef} className="faq-content">
        {answer}
      </div>
    </details>
  );
}

const Faq = () => {
  return (
    <section className="w-full mt-[60px] pt-[20px] max-w-[760px] mx-auto bg-white dark:bg-transparent rounded-[12px] ">
      <div className="niwi-faq grid grid-cols-1 lg:grid-cols-2 gap-x-[10px] px-[20px]">
        <div className="mb-5 text-center lg:text-left">
          <h2 className={cn("niwi-logo-text text-xl mb-4")}>
            Frequently Asked Questions
          </h2>
          <p>
            Have another question? Contact me on{" "}
            <Link
              href="https://x.com/LwinMoePaingDev"
              className={cn("niwi-logo-text")}
            >
              Twitter
            </Link>{" "}
            or by{" "}
            <Link
              href="mailto:lwinmoepaing.dev@gmail.com"
              className={cn("niwi-logo-text")}
            >
              email
            </Link>
            .
          </p>
        </div>
        <div>
          <FaqItem
            question="What do Niwi Provide exactly?"
            answer={
              <>
                <p className="mb-2">- Command line interface support.</p>
                <p className="mb-2">
                  - The NextJS starter with all the boilerplate code you need to
                  run an online business: a payment system, a database, login, a
                  blog, UI components, and much more
                </p>
                <p className="mb-2">
                  - The documentation helps you set up your app from scratch!
                  Why are you wasting your time? Let's get started.
                </p>
              </>
            }
          />
          <FaqItem
            question="Is it F.O.C?"
            answer={
              <>
                <p className="mb-2">
                  {" "}
                  - Completely Free and It's Open Source Template.
                </p>
                <p className="mb-2"> - Available for everyone.</p>
              </>
            }
          />

          <FaqItem
            question="How do I learn Niwi?"
            answer={
              <>
                <p className="mb-2">
                  - We can learn from our documentation{" "}
                  <Link
                    href="https://niwi-docs.vercel.app/"
                    className={cn(
                      "underline niwi-logo-text text-xl",
                      lancelotFont.className
                    )}
                  >
                    Click here!
                  </Link>
                </p>
              </>
            }
          />

          <FaqItem
            question="How often is Niwi-Starter updated?"
            answer={
              <>
                <p className="mb-1">
                  We are updating it regularly on our github.
                </p>
                <p className="mb-2">
                  ⭐{" "}
                  <Link
                    href="https://github.com/lwinmoepaing/niwi/"
                    className="underline niwi-logo-text"
                  >
                    https://github.com/lwinmoepaing/niwi
                  </Link>
                </p>
              </>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Faq;
