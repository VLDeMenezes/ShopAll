import { IContact } from "@/interfaces/Contact.interface";
import Image from "next/image";
import Link from "next/link";
import { ContactData } from "../helpers/Contact.helper";

const Contact: React.FC = () => {
  return (
    <>
      <h2 className="font-bold text-lg">Contact</h2>
      <h3>Phone: +54 9 11 5555-5555</h3>
      <div className="flex flex-wrap justify-center p-5 m-2">
        {ContactData.map((data) => (
          <Link key={data.id} href={data.link} target="_blank">
            <Image
              src={data.src}
              alt={data.alt}
              width={50}
              height={50}
              className="hover:scale-110 m-2 hover:bg-slate-300 rounded-md"
              loading="lazy"
            ></Image>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Contact;
