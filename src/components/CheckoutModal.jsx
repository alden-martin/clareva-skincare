"use client"
import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Link from 'next/link';
import { Badge } from './ui/badge';
import { supabase } from '@/lib/supabaseClient';
import { useUser } from "@/contexts/UserContext";
import toast from "react-hot-toast";

function CheckoutModal({
  open,
  setOpen,
  method,
  setCheckout,
  checkout,
  total,
  coupon,
  cart,
  address,
}) {
  const { user } = useUser();
  const clearCart = async () => {
    const { error: clearError } = await supabase
      .from("cart")
      .update({ products: [] })
      .eq("userId", user?.id);

    if (clearError) {
      console.error("Error clearing cart:", clearError);
    }
  };

  const updateCouponUsage = async () => {
    if (!coupon || !user) return;

    const { data: couponData } = await supabase
      .from("coupons")
      .select("usedBy")
      .eq("couponId", coupon.couponId)
      .single();

    if (couponData) {
      const updatedUsedBy = couponData.usedBy || [];
      if (!updatedUsedBy.includes(user.id)) {
        updatedUsedBy.push(user.id);
        await supabase
          .from("coupons")
          .update({ usedBy: updatedUsedBy })
          .eq("couponId", coupon.couponId);
      }
    }
  };

  const handleCheckout = async () => {
    // console.log(cart);
    // console.log(coupon);
    const { error: orderError } = await supabase.from("orders").insert({
      userId: user?.id,
      products: cart,
      status: "pending",
      delivery_address: address,
      coupon: coupon ? coupon.couponId : null,
      total: total,
      method: method?.name,
    });
    if (orderError) {
      console.log(orderError);

      toast.error(orderError.message);
    } else {
      // Clear cart after successful order
      await clearCart();
      // Update coupon usage if coupon was used
      await updateCouponUsage();
      setCheckout(true);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!checkout ? (
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">Confirm Checkout</DialogTitle>
            {method && (
              <div className="mt-4">
                <h2 className="font-semibold text-lg">{method.name}</h2>
                <p className="text-sm text-text/65 whitespace-pre-line mt-2">
                  {method.details}
                </p>
                {coupon && (
                  <Badge className="mt-3 p-5">
                    Coupon: {coupon.title} - {coupon.discountPercentage}%
                  </Badge>
                )}
              </div>
            )}
            <div className="mt-4 pt-4 border-t border-border">
              <h2 className="font-semibold text-lg">
                Total: Rs. {total?.toLocaleString()}
              </h2>
            </div>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleCheckout}>Confirm</Button>
            <Button variant="destructive" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      ) : (
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">Checkout Confirmed</DialogTitle>
            {method && (
              <div className="mt-4">
                <h2 className="font-semibold text-lg">
                  Thanks for purchasing from clareva
                </h2>
                {method.id === "cod" ? (
                  <p className="text-sm text-text/65 whitespace-pre-line mt-2">
                    Your order will be delivered soon
                  </p>
                ) : (
                  <p className="text-sm text-text/65 whitespace-pre-line mt-2">
                    Confirm your payment by sending the payment slip at +92 321
                    2049947
                  </p>
                )}
              </div>
            )}
            <div className="mt-4 pt-4 border-t border-border">
              <h2 className="font-semibold text-lg">
                Total: Rs. {total?.toLocaleString()}
              </h2>
            </div>
          </DialogHeader>
          <DialogFooter>
            <a
              className="bg-green-400 p-3 rounded-2xl text-white flex flex-row items-center gap-x-2"
              href={"whatsapp://send?phone=+923212049947"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                id="whatsapp"
                className="w-6 h-6"
              >
                <rect width="48" height="48" fill="#0DC143" rx="24"></rect>
                <path
                  fill="#fff"
                  d="M34.7507 13.2115C32.1777 10.5628 28.621 9.125 24.9885 9.125C17.2696 9.125 11.0642 15.4061 11.1399 23.0493C11.1399 25.4709 11.821 27.8169 12.9561 29.9358L10.9885 37.125L18.3291 35.2331C20.3723 36.3682 22.6426 36.898 24.9128 36.898C32.5561 36.898 38.7615 30.6169 38.7615 22.9736C38.7615 19.2655 37.3237 15.7845 34.7507 13.2115ZM24.9885 34.552C22.9453 34.552 20.902 34.0223 19.1615 32.9628L18.7074 32.7358L14.3183 33.8709L15.4534 29.5574L15.1507 29.1034C11.821 23.7304 13.4101 16.6169 18.8588 13.2872C24.3074 9.95743 31.3453 11.5466 34.675 16.9953C38.0047 22.4439 36.4156 29.4818 30.9669 32.8115C29.2264 33.9466 27.1074 34.552 24.9885 34.552ZM31.648 26.152L30.8156 25.7736C30.8156 25.7736 29.6047 25.2439 28.848 24.8655C28.7723 24.8655 28.6966 24.7899 28.621 24.7899C28.3939 24.7899 28.2426 24.8655 28.0912 24.9412C28.0912 24.9412 28.0156 25.0169 26.9561 26.2277C26.8804 26.3791 26.7291 26.4547 26.5777 26.4547H26.502C26.4264 26.4547 26.275 26.3791 26.1993 26.3034L25.821 26.152C24.9885 25.7736 24.2318 25.3196 23.6264 24.7142C23.475 24.5628 23.248 24.4115 23.0966 24.2601C22.5669 23.7304 22.0372 23.125 21.6588 22.4439L21.5831 22.2926C21.5074 22.2169 21.5074 22.1412 21.4318 21.9899C21.4318 21.8385 21.4318 21.6872 21.5074 21.6115C21.5074 21.6115 21.8101 21.2331 22.0372 21.0061C22.1885 20.8547 22.2642 20.6277 22.4156 20.4764C22.5669 20.2493 22.6426 19.9466 22.5669 19.7196C22.4912 19.3412 21.5831 17.298 21.3561 16.8439C21.2047 16.6169 21.0534 16.5412 20.8264 16.4655H20.5993C20.448 16.4655 20.221 16.4655 19.9939 16.4655C19.8426 16.4655 19.6912 16.5412 19.5399 16.5412L19.4642 16.6169C19.3128 16.6926 19.1615 16.8439 19.0101 16.9196C18.8588 17.0709 18.7831 17.2223 18.6318 17.3736C18.102 18.0547 17.7993 18.8872 17.7993 19.7196C17.7993 20.325 17.9507 20.9304 18.1777 21.4601L18.2534 21.6872C18.9345 23.125 19.8426 24.4115 21.0534 25.5466L21.3561 25.8493C21.5831 26.0764 21.8101 26.2277 21.9615 26.4547C23.5507 27.8169 25.3669 28.8007 27.4101 29.3304C27.6372 29.4061 27.9399 29.4061 28.1669 29.4818C28.3939 29.4818 28.6966 29.4818 28.9237 29.4818C29.302 29.4818 29.7561 29.3304 30.0588 29.1791C30.2858 29.0277 30.4372 29.0277 30.5885 28.8764L30.7399 28.725C30.8912 28.5736 31.0426 28.498 31.1939 28.3466C31.3453 28.1953 31.4966 28.0439 31.5723 27.8926C31.7237 27.5899 31.7993 27.2115 31.875 26.8331C31.875 26.6818 31.875 26.4547 31.875 26.3034C31.875 26.3034 31.7993 26.2277 31.648 26.152Z"
                ></path>
              </svg>
              Send receipt to whatsapp
            </a>
            {/* <Button variant='destructive' onClick={() => {setCheckout(false); setOpen(false)}}>Exit</Button> */}
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}

export default CheckoutModal