"use client";

import Image from "next/image";
import React, { useState } from "react";
import SearchManufacturer from "./SearchManufacturer";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const SearchBar = () => {
  const [manufacturer, setManuFacturer] = useState("");
  const [model, setModel] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (manufacturer.trim() === "" && model.trim() === "") {
      return alert("Please provide some input");
    }

    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
  };

  const updateSearchParams = (model: string, manufacturer: string) => {
    // Create a new URLSearchParams object using the current URL search parameters
    const params = new URLSearchParams(searchParams.toString());

    // Update or delete the 'model' search parameter based on the 'model' value
    if (model) {
      params.set("model", model);
    } else {
      params.delete("model");
    }

    // Update or delete the 'manufacturer' search parameter based on the 'manufacturer' value
    if (manufacturer) {
      params.set("manufacturer", manufacturer);
    } else {
      params.delete("manufacturer");
    }

    // Generate the new pathname with the updated search parameters
    const newPathname = `${pathname}?${params.toString()}`;

    router.push(newPathname);
  };
  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer
          manufacturer={manufacturer}
          setManuFacturer={setManuFacturer}
        />
      </div>
      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
          alt="car model"
        />
        <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Type your favorite car model..."
          className="searchbar__input"
        />
      </div>
      <button type="submit" className={`-ml-3 z-10 `}>
        <Image
          src={"/magnifying-glass.svg"}
          alt={"magnifying glass"}
          width={40}
          height={40}
          className="object-contain"
        />
      </button>
    </form>
  );
};

export default SearchBar;
