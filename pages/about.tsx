import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex w-full items-center px-6 py-3 font-mono underline">
        <Link href="/">Back to Home</Link>
      </div>
      <div className="flex h-full items-center p-5">
        <div className="basis-1/2 items-center">
          <h1 className="font-mono text-9xl">About Us</h1>
          <p className="py-5 font-mono">
            This project focuses on building an information retrieval system on
            large amount of FDA Drug datasets. <br />
            Algorithm used includes: <br />
            <strong>Vector Space Model</strong> - Main search functionality{" "}
            <br />
            <strong>Edit Distance</strong> - Fall back after VSM <br />
            <strong>Inverted Index</strong> - Search for bioequivalent drugs
          </p>
          <a href="https://github.com/fushaoqin-devops/fda-drug-search">
            <button
              type="button"
              className="inline-block rounded-full bg-yellow-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800"
            >
              <Image src="/github.png" alt="" width={25} height={25} />
              <div>Find us on Github</div>
            </button>
          </a>
        </div>
        <div className="h-[500px] w-[700px] basis-1/2 overflow-hidden rounded-lg">
          <Image
            src="/medicine.jpg"
            alt="about image"
            width="700"
            height="700"
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default About;
