"use client";
import React, { useState, useRef, useEffect, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import GithubIcon from "../../public/github-icon.svg";
import LinkedinIcon from "../../public/linkedin-icon.svg";

const ContactSection: React.FC = () => {
  const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isMounted = useRef(true); // Create a ref

  useEffect(() => {
    return () => {
      isMounted.current = false; // Set ref to false on unmount
    };
  }); // Empty dependency array ensures this runs only on mount/unmount

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null); // Clear any previous errors
    try {
      const target = e.target as typeof e.target & {
        email: { value: string };
        subject: { value: string };
        message: { value: string };
      };

      const data = {
        email: target.email.value,
        subject: target.subject.value,
        message: target.message.value,
      };

      const JSONdata = JSON.stringify(data);
      const endpoint = "/api";

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSONdata,
      };
      const response = await fetch(endpoint, options);
      if (!response.ok) {
        const errorData = await response.json(); // Try to parse error response from the API
        throw new Error(errorData.error || response.statusText); // Throw an error with API message or status
      }

      const resData = await response.json();
      console.log("Message sent:", resData);

      if (isMounted.current) {
        // Check if component is still mounted
        setEmailSubmitted(true);
        (e.target as HTMLFormElement).reset();
      }
    } catch (error: any) {
      console.error("Error sending message:", error);
      if (isMounted.current) {
        // Check if component is still mounted
        setErrorMessage(error.message);
        setEmailSubmitted(false);
      }
    } finally {
      if (isMounted.current) {
        // Check if component is still mounted
        setLoading(false);
      }
    }
  };

  return (
    <section
      id='contact'
      className='grid md:grid-cols-2 my-12 md:my-12 py-24 px-12 gap-4 relative'
    >
      <div className='bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-700 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-1/2 transform  -translate-1/2'></div>
      <div className='lg:hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary-900 to-transparent rounded-full h-80 w-80 z-0 lg:-right-1 blur-lg absolute top-1/2 -right-4 transform -translate-x-2 -translate-1/2'></div>
      <div className='z-9'>
        <h5 className='text-xl font-bold text-white my-2'>
          Let&apos;s Connect
        </h5>
        <p className='text-[#ADB7BE] mb-4 max-w-md'>
          {" "}
          I&apos;m currently looking for new opportunities, my inbox is always
          open. Whether you have a question or just want to say hi, I&apos;ll
          try my best to get back to you!
        </p>
        <div className='socials flex flex-row gap-2'>
          <Link href='https://github.com/AdrianTodd'>
            <Image src={GithubIcon} alt='Github Icon' />
          </Link>
          <Link href='https://www.linkedin.com/in/adrian-todd/'>
            <Image src={LinkedinIcon} alt='Linkedin Icon' />
          </Link>
        </div>
      </div>
      <div className='z-10'>
        {emailSubmitted ? (
          <p className='text-green-500 text-sm mt-2'>
            Email sent successfully!
          </p>
        ) : (
          <form className='flex flex-col' onSubmit={handleSubmit}>
            <div className='mb-6'>
              <label
                htmlFor='email'
                className='text-white block mb-2 text-sm font-medium'
              >
                Your email
              </label>
              <input
                name='email'
                type='email'
                id='email'
                required
                className='bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5'
                placeholder='email@google.com'
              />
            </div>
            <div className='mb-6'>
              <label
                htmlFor='subject'
                className='text-white block text-sm mb-2 font-medium'
              >
                Subject
              </label>
              <input
                name='subject'
                type='text'
                id='subject'
                required
                className='bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5'
                placeholder='Just saying hi'
              />
            </div>
            <div className='mb-6'>
              <label
                htmlFor='message'
                className='text-white block text-sm mb-2 font-medium'
              >
                Message
              </label>
              <textarea
                name='message'
                id='message'
                className='bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5'
                placeholder="Let's talk about..."
              ></textarea>
            </div>
            <button
              type='submit'
              className='bg-primary-500 hover:bg-primary-600 text-white font-medium py-2.5 px-5 rounded-lg w-full'
            >
              {loading ? "Sending..." : "Send Message"}{" "}
              {/* Show "Sending..." while loading */}
            </button>
            {loading && <p className='text-gray-500 mt-2'>Sending email...</p>}{" "}
            {/* Display loading message */}
            {errorMessage && (
              <p className='text-red-500 mt-2'>{errorMessage}</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
