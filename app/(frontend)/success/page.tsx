"use client"
import { store } from "@/lib/store";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Container from "@/components/Container";
import Loading from "@/components/Loading";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const SuccessContent = () => {
  const { currentUser, cartProduct, resetCart } = store();
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id"); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      router.push("/");
    } else if (cartProduct.length > 0) {
      const saveOrder = async () => {
        try {
          setLoading(true);
          const orderRef = doc(db, "orders", currentUser?.email!);
          const docSnap = await getDoc(orderRef);
          if (docSnap.exists()) {
            // Document exists, update the orderItems array
            await updateDoc(orderRef, {
              orders: arrayUnion({
                userEmail: currentUser?.email,
                paymentId: sessionId,
                orderItems: cartProduct,
                paymentMethod: "stripe",
                userId: currentUser?.id,
              }),
            });
          } else {
            // Document doesn't exist, create a new one
            await setDoc(orderRef, {
              orders: [
                {
                  userEmail: currentUser?.email,
                  paymentId: sessionId,
                  orderItems: cartProduct,
                  paymentMethod: "stripe",
                },
              ],
            });
          }
          toast.success("Payment accepted successfully & order saved!");
          resetCart();
        } catch (error) {
          toast.error("Error saving order data");
        } finally {
          setLoading(false);
        }
      };
      saveOrder();
    }
  }, [sessionId, router, currentUser, cartProduct]);

  return (
    <Container>
      {loading && <Loading />}
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-y-5">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          {loading
            ? "Your order payment is processing"
            : "Your Payment Accepted by supergear.com"}
        </h2>
        <p>
          {loading ? "Once done" : "Now"} you can view your Orders or continue
          Shopping with us
        </p>
        <div className="flex items-center gap-x-5">
          <Link href="/orders">
            <button className="bg-black text-slate-100 w-52 h-12 rounded-full text-base font-semibold hover:bg-primeColor duration-300">
              View Orders
            </button>
          </Link>
          <Link href="/">
            <button className="bg-black text-slate-100 w-52 h-12 rounded-full text-base font-semibold hover:bg-primeColor duration-300">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </Container>
  );
};
const Success = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SuccessContent />
  </Suspense>
);

export default Success;
