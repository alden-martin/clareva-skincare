"use client"
import { useUser } from '@/contexts/UserContext';
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/lib/supabaseClient';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import Loading from '@/components/Loading';
import CtaButton from '@/components/CtaButton';
import { Home, LocationEdit, MapPin } from 'lucide-react';
import Link from 'next/link';
import CheckoutModal from '@/components/CheckoutModal';
import { useRouter } from 'next/navigation';

function page() {
  const router = useRouter()
  const { user } = useUser()
  const { cartItems, cartProducts, loading: cartLoading, clearCart } = useCart()
  const [open, setOpen] = useState(false)
  const [userDetail, setUserDetail] = useState(null)
  const [coupon,setCoupon] = useState(null)
  const [userCoupon,setUserCoupon] = useState("")
  const [checkoutConfirm , setCheckoutConfirm] = useState(false)
  const [changeAddress,setChangeAddress] = useState(false);
  const [loading, setLoading] = useState(true)
  const [address, setAddress] = useState("")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
  const [selectedMethodDetails, setSelectedMethodDetails] = useState(null)
  const fetchData = async () => {
            const { data, error: userError } = await supabase
              .from("user")
              .select("*")
              .eq("id", user?.id);

            if (userError) {
                toast.error(userError.message)
                setLoading(false)
            } else if (data && data.length > 0) {
                setUserDetail(data[0])
                setLoading(false)
            } else {
                setLoading(false)
            }
  }

  const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported by your browser");
            return;
        }

        toast.loading("Getting your location...", { id: "location" });

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                
                // Use reverse geocoding to get address from coordinates
                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    );
                    const data = await response.json();
                    
                    if (data && data.display_name) {
                        setAddress(data.display_name);
                        toast.success("Location found!", { id: "location" });
                    } else {
                        toast.error("Could not get address from location", { id: "location" });
                    }
                } catch (error) {
                    console.error("Reverse geocoding error:", error);
                    // Fallback to coordinates if geocoding fails
                    setAddress(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
                    toast.success("Location coordinates found!", { id: "location" });
                }
            },
            (error) => {
                console.error("Geolocation error:", error);
                toast.error("Unable to retrieve your location", { id: "location" });
            }
        );
  };
  
  const getTotal = (productTotal , discount=0 , deliveryCharges=200 , cod) => {
    if (cod) {

      return (productTotal - discount) + 150 + deliveryCharges
    } else {
      return (productTotal - discount) + deliveryCharges
    }
  }

  const getDiscount = (productTotal) => {    
    return (productTotal * (coupon?.discountPercentage || 0))/100;
  }

  const validateCoupon = async (input) => {
    if (!input) {
      toast.error("Please enter a coupon code");
      return false;
    }

    if (!user) {
      toast.error("Please sign in to use a coupon");
      return false;
    }

    try {
      const { data, error } = await supabase
        .from("coupons")
        .select("*")
        .eq("title", input.toUpperCase())
        .single();

      if (error || !data) {
        toast.error("Invalid coupon code");
        return false;
      }

      // Check if coupon is active
      if (data.status !== "active") {
        toast.error("This coupon is not active");
        return false;
      }

      // Check if coupon is expired
      if (data.expiry_date && new Date(data.expiry_date) < new Date()) {
        toast.error("This coupon has expired");
        return false;
      }

      // Check if user has already used this coupon
      if (data.usedBy && data.usedBy.includes(user.id)) {
        toast.error("You have already used this coupon");
        return false;
      }

      // Coupon is valid
      setCoupon(data);
      toast.success(`Coupon applied! ${data.discountPercentage}% discount`);
      return true;
    } catch (error) {
      console.error("Coupon validation error:", error);
      toast.error("Error validating coupon");
      return false;
    }
  };

  useEffect(() => {
        fetchData();
    }, [user]);

  if (loading || cartLoading) {
    return <Loading />;
  }
  const checkout = () => {
    console.log("Checkout");
  }
  return (
    <div className="mt-20 flex justify-center items-center">
      <div className="flex flex-col w-fit p-10 bg-card m-10 rounded-2xl min-w-2xl">
        <div className="flex w-full justify-between items-center border-b border-secondary pb-4 mb-6">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <Home onClick={()=>{router.push("/")}}/>
        </div>

        {/* Cart Items */}
        <div className="flex flex-col gap-4 mb-6">
          {cartProducts.length === 0 ? (
            <p className="text-text/65 text-center py-10">Your cart is empty</p>
          ) : (
            cartProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-4 bg-secondary/50 hover:bg-secondary/70 rounded-lg"
              >
                <div className="w-20 h-20 bg-background rounded-lg flex items-center justify-center">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-text/65 text-xs">No image</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-text/65">{product.price}</p>
                  <p className="text-sm font-medium">Qty: {product.amount}</p>
                </div>
                <Link href={`/product/${product.id}`}>
                  <CtaButton>View product</CtaButton>
                </Link>
              </div>
            ))
          )}
        </div>

        {/* Subtotal */}
        <div className="border-t border-secondary pt-4">
          <div className="flex justify-between">
            <span className="font-medium">Subtotal</span>
            <span className="font-bold">
              Rs.{" "}
              {cartProducts
                .reduce((total, product) => {
                  const priceString = product.price || "0";
                  const priceMatch = priceString.match(/[\d,]+\.?\d*/);
                  const price = priceMatch
                    ? parseFloat(priceMatch[0].replace(/,/g, ""))
                    : 0;
                  return total + price * (product.amount || 0);
                }, 0)
                .toLocaleString()}
            </span>
          </div>
        </div>
        {/* Delivery Address */}
        <div className="my-6 w-full">
          <h2 className="text-lg font-semibold mb-3">Delivery Address</h2>
          {userDetail?.address ? (
            <div className="flex flex-row gap-3">
              <div className="relative">
                <input
                  type="text"
                  value={changeAddress ? address : userDetail.address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={!changeAddress}
                  className="border border-secondary-foreground p-3 rounded-lg bg-background disabled:opacity-70 disabled:cursor-not-allowed disabled:text-text/70 min-w-xl"
                />
              </div>
              <div className="flex gap-2">
                {changeAddress ? (
                  <>
                    <CtaButton
                      clickFunction={getCurrentLocation}
                      changeStyle="bg-secondary text-text hover:bg-secondary/80 px-4 py-2 rounded-lg text-sm font-medium flex flex-row items-center gap-2"
                    >
                      Use Current Location
                      <MapPin className="text-text/65" />
                    </CtaButton>
                    <CtaButton
                      clickFunction={async () => {
                        const { error } = await supabase
                          .from("user")
                          .update({ Address: address })
                          .eq("id", user.id);
                        if (error) {
                          toast.error(error.message);
                        } else {
                          toast.success("Address updated successfully!");
                          setChangeAddress(false);
                          fetchData();
                        }
                      }}
                      changeStyle="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      Save
                    </CtaButton>
                  </>
                ) : (
                  <CtaButton
                    clickFunction={() => {
                      setAddress(userDetail.address);
                      setChangeAddress(true);
                    }}
                    changeStyle="text-primary hover:underline text-sm font-medium"
                  >
                    Change
                  </CtaButton>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                className="border border-secondary-foreground p-3 rounded-lg bg-background"
              />
              <div className="flex gap-2">
                <CtaButton
                  clickFunction={getCurrentLocation}
                  changeStyle="bg-secondary text-text hover:bg-secondary/80 px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Use Current Location
                </CtaButton>
                <CtaButton
                  clickFunction={async () => {
                    const { error } = await supabase
                      .from("user")
                      .update({ Address: address })
                      .eq("id", user.id);
                    if (error) {
                      toast.error(error.message);
                    } else {
                      toast.success("Address saved successfully!");
                      fetchData();
                    }
                  }}
                  changeStyle="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Save
                </CtaButton>
              </div>
            </div>
          )}
        </div>
        {/* Payment Method */}
        <div className="my-6 w-full">
          <h2 className="text-lg font-semibold mb-3">Payment Method</h2>
          <div className="flex flex-col gap-3">
            {[
              // {
              //   id: "easypaisa",
              //   name: "EasyPaisa",
              //   details: "Send payment to 03XX-XXXXXXX",
              // },
              // {
              //   id: "jazzcash",
              //   name: "JazzCash",
              //   details: "Title: \nSend payment to 03XX-XXXXXXX",
              // },
              {
                id: "bank",
                name: "Bank Transfer",
                details:
                  "Title: Muhammad Haris Khan\nAccount:  0892-0009-8429\nIBAN: PK04MSHQ0000089200098429\nBank: Mashreq Bank",
              },
              {
                id: "cod",
                name: "Cash on Delivery",
                details: "Pay when your order arrives \nExtra Charges Rs.150",
              },
            ].map((method) => (
              <div
                key={method.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedPaymentMethod === method.id
                    ? "border-primary bg-primary/10"
                    : "border-secondary-foreground hover:border-primary/50"
                }`}
                onClick={() => {
                  setSelectedPaymentMethod(method.id);
                  setSelectedMethodDetails(method);
                }}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment-method"
                    value={method.id}
                    checked={selectedPaymentMethod === method.id}
                    onChange={() => setSelectedPaymentMethod(method.id)}
                    className="w-4 h-4"
                  />
                  <span className="font-medium">{method.name}</span>
                </div>
                {selectedPaymentMethod === method.id && (
                  <div className="mt-3 pt-3 border-t border-secondary-foreground/30 text-sm text-text/65 whitespace-pre-line">
                    {method.details}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Cupon */}
        <div className="my-6 w-full">
          <h2 className="text-lg font-semibold mb-3">Cuopoun Code</h2>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              className="border border-secondary-foreground rounded-lg py-2 px-4"
              value={userCoupon}
              onChange={(e) => setUserCoupon(e.target.value)}
            />
          </div>
        </div>
        <h6 className="text-sm mb-5">* Rs.200 Deleviery Charges Applied</h6>
        <CtaButton
          clickFunction={async () => {
            if (!cartProducts || cartProducts.length === 0) {
              toast.error("Please add items to your cart");
              return;
            }
            if (!selectedPaymentMethod) {
              toast.error("Please select a payment method");
              return;
            }

            if (userCoupon) {
              const isValid = await validateCoupon(userCoupon);
              if (!isValid) {
                return;
              }
            }

            setOpen(true);
          }}
        >
          Confirm Checkout
        </CtaButton>
      </div>
      <CheckoutModal
        open={open}
        setOpen={setOpen}
        method={selectedMethodDetails}
        setCheckout={setCheckoutConfirm}
        checkout={checkoutConfirm}
        address={userDetail?.address || address}
        coupon={coupon}
        cart={cartItems}
        total={getTotal(
          cartProducts.reduce((total, product) => {
            const priceString = product.price || "0";
            const priceMatch = priceString.match(/[\d,]+\.?\d*/);
            const price = priceMatch
              ? parseFloat(priceMatch[0].replace(/,/g, ""))
              : 0;
            return total + price * (product.amount || 0);
          }, 0),
          getDiscount(
            cartProducts.reduce((total, product) => {
              const priceString = product.price || "0";
              const priceMatch = priceString.match(/[\d,]+\.?\d*/);
              const price = priceMatch
                ? parseFloat(priceMatch[0].replace(/,/g, ""))
                : 0;
              return total + price * (product.amount || 0);
            }, 0),
          ),
          200,
          selectedPaymentMethod === "cod",
        )}
      />
    </div>
  );
}

export default page