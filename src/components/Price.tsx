"use client";

import { ProductType } from "@/types/types";
import { useCartStore } from "@/utils/store";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Price = ({ product }: { product: ProductType }) => {
  const router = useRouter();

  // If size options are defined within the product options, remove the sizeOptions array below
  const sizeOptions = [
    { title: 'Small', additionalPrice: 0 },
    { title: 'Medium', additionalPrice: 2 },
    { title: 'Large', additionalPrice: 4 },
  ];

  const [total, setTotal] = useState(product.price + sizeOptions[0].additionalPrice);
  const [quantity, setQuantity] = useState(1);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);

  const { addToCart } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    setTotal(
      quantity * (product.price + sizeOptions[selectedSizeIndex].additionalPrice)
    );
  }, [quantity, selectedSizeIndex, product.price]);

  const handleCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      img: product.img,
      price: total,
      optionTitle: sizeOptions[selectedSizeIndex].title,
      quantity: quantity,
    });
    toast.success("Product added to the cart!");
    router.push(`/menu/${product.catSlug}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">${total}</h2>
      {/* SIZE OPTIONS CONTAINER */}
      <div className="flex gap-4 mb-4">
        <span className="font-medium"></span>
        {sizeOptions.map((size, index) => (
          <button
            key={size.title}
            className={`min-w-[6rem] p-2 ring-1 rounded-md ${
              selectedSizeIndex === index ? 'bg-yellow-600 text-white' : 'bg-white text-blue-600'
            }`}
            onClick={() => setSelectedSizeIndex(index)}
          >
            {size.title}
          </button>
        ))}
      </div>
      {/* QUANTITY AND ADD BUTTON CONTAINER */}
      <div className="flex justify-between items-center">
        {/* QUANTITY */}
        <div className="flex justify-between w-full p-3 ring-1 ring-yellow-500">
          <span>Quantity</span>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              {"<"}
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}
            >
              {">"}
            </button>
          </div>
        </div>
        {/* CART BUTTON */}
        <button
          className="uppercase w-56 bg-yellow-600 text-white p-3 ring-1 ring-yellow-600"
          onClick={handleCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Price;
