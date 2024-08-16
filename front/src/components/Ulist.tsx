"use client";
//importamos interface
import { IItem } from "@/interfaces/Item.interface";
import React, { useState } from "react";

const Ulist: React.FC<IItem> = ({ id, title, content }) => {
  //seteamos el estado para el id de la lista
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  //manejamos la apertura/cierre de la lista con el id
  const handleToggle = () => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <li className="mb-4">
      <button
        className="w-full text-left p-4 text-blackColor dark:bg-black dark:text-basicColor border rounded-lg shadow-sm focus:outline-none border-gray-500"
        onClick={handleToggle}
      >
        {title}
      </button>
      {openIndex === id && (
        <div className="mt-2 p-4 dark:bg-black border border-t-0 border-gr border-gray-500 rounded-b-lg text-blackColor dark:text-slate-200 text-xs font-semibold">
          {content}
        </div>
      )}
    </li>
  );
};

export default Ulist;
