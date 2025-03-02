
"use client";
import React from "react";
import { ProductsData } from "../data/data";
import { useCart } from "../Context/CartContext";
import { urlFor } from "@/sanity/lib/image";
import { useSnapshot } from "valtio";
import { state } from "../../../../store/store";
import Link from "next/link";


const Cart = () => {
  const {sale}= useSnapshot(state)
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();
  const tax = 500;
  const shipping = 250;

  return (
    <div className="font-sans">
      <title>Cart | Gulnar</title>
      <div className="grid lg:grid-cols-3">
        {/* Cart Items Select */}
        <div className="lg:col-span-2 p-6 bg-white overflow-x-auto">
          <div className="flex gap-2 border-b pb-4">
            <h2 className="text-xl font-bold text-gray-800 flex-1">
              Shopping Cart
            </h2>
            <h3 className="text-base text-gray-800">{cart.length} Items</h3>
          </div>

          <table className="mt-6 w-full border-collapse divide-y">
            <thead className="whitespace-nowrap text-left">
              <tr>
                <th className="text-base text-gray-500 p-4">Description</th>
                <th className="text-base text-gray-500 p-4">Quantity</th>
                <th className="text-base text-gray-500 p-4">Price</th>
              </tr>
            </thead>

            <tbody className="whitespace-nowrap divide-y">
              {cart.map((item, index) => (
                <tr key={index}>
                  <td className="p-4">
                    <div className="flex items-center gap-4 w-max">
                      <div className="w-24 h-24 shrink-0">
                        <img
                          src={urlFor(item?.images?.[0])?.url()}
                          className="w-full h-full object-cover"
                          alt={item?.name}
                        />
                      </div>
                      <div>
                        <p className="text-base font-bold text-gray-800">
                          {item?.name} ({item?.size})
                        </p>
                        <button
                          type="button"
                          className="mt-2 font-semibold text-red-400 text-sm"
                          onClick={() => removeFromCart(item._id, item.size)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="flex items-center mt-2 pt-10">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.size, item.quantity - 1)
                      }
                      disabled={item?.quantity <= 1}
                      className="sm:py-2 py-1 px-2 sm:px-4 bg-black text-white rounded"
                    >
                      -
                    </button>
                    <span className="sm:px-4 sm:py-2 py-1 px-2">
                      {item?.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item?._id, item?.size, item?.quantity + 1)
                      }
                      className="sm:py-2 sm:px-4 py-1 px-2 bg-black text-white rounded"
                    >
                      +
                    </button>
                  </td>
                  <td className="p-4">
                    <h4 className="text-base font-bold text-gray-800">
                      PKR {item?.onSale? (item?.price*((100-sale?.percentageOff)/100))*item?.quantity : item?.price * item?.quantity}
                    </h4>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-6 lg:sticky lg:top-0 lg:h-screen">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-4">
            Order Summary
          </h2>

          <ul className="text-gray-800 divide-y mt-6">
            <li className="flex flex-wrap gap-4 text-base py-3">
              Subtotal <span className="ml-auto font-bold">PKR {subtotal}</span>
            </li>
            <li className="flex flex-wrap gap-4 text-base py-3">
              Shipping <span className="ml-auto font-bold">PKR {shipping}</span>
            </li>
            {/* <li className="flex flex-wrap gap-4 text-base py-3">
              Tax <span className="ml-auto font-bold">{tax}</span>
            </li> */}
            <li className="flex flex-wrap gap-4 text-base py-3 font-bold">
              Total{" "}
              <span className="ml-auto">PKR {subtotal + shipping}</span>
            </li>
          </ul>
<Link href={"/checkout"}>
          <button
          disabled={cart?.length > 0 ? false : true}
            type="button"
            className="mt-6 text-base px-4 py-2 tracking-wide w-full bg-black hover:bg-slate-800 text-white"
            >
            Place Order
          </button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
