"use client"
import Loading from '@/components/Loading';
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/lib/supabaseClient';
import { signOut } from '@/utils/auth';
import { Edit } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function page() {
    const router = useRouter()
    const [loading , setLoading] = useState(true)
    const {user} = useUser()
    const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    });

    const [edit, setEdit] = useState(false)
    useEffect(() => {
        setTimeout(()=> {      if (!user) {
          toast.error("No User Found Please sign in first", {
            duration: 10000,
          });
          router.push("/login")
        }} , 10000)
   
     
        fetchData()
    } , [user])
    const fetchData = async () => {
        const { data, error: fetchError } = await supabase
          .from("user")
          .select("*")
          .eq("id", user.id);
   
        if (fetchError) {
            toast.error(fetchError.message)
            setLoading(false)
        } else if (data && data.length > 0) {
            setFormData(
                {
                   email: data[0].email,
                   name: data[0].name,
                   phone: data[0].phone,
                   address: data[0].address,
                }
            )
            console.log(data);
            setLoading(false)
        } else {
            toast.error("User data not found")
            setLoading(false)
        }
    }   
      const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    };
    const handleUpdate = async () =>{
        if (!formData.name || !formData.email || !formData.phone) {
            toast.error("Please fill all required details")
            return;
        }
        const { error: updateError } = await supabase.from("user").update({
          email: formData.email,
          phone: formData.phone,
          name: formData.name,
          address: formData.address,
        }).eq("id" , user.id);
        if (updateError) {
            toast.error(updateError.message)
        } else {
            toast.success("Profile updated successfully")
            fetchData()
        }
    }
    if (loading) {
        return <Loading />
    }
  return (
    <div className="mt-20 bg-card flex flex-col lg:flex-row">
      {/* User Information  */}
      <div className="bg-background m-10 rounded-xl p-5 w-fit ">
        <div className="flex flex-row justify-between">
          {/* Heading */}
          <h1 className="text-2xl font-bold border-b border-secondary">
            User Information
          </h1>
          <Edit className="text-text/80" onClick={() => setEdit(!edit)} />
        </div>
        {/* Details */}
        <form
          className="flex flex-col items-center gap-y-5 p-10 rounded-2xl bg-background  w-96" // fixed height & width
          onSubmit={handleUpdate}
        >
          {edit && (
            <h1 className="font-heading text-3xl font-bold text-primary italic">
              Update Information
            </h1>
          )}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            disabled={!edit}
            className="border border-secondary-foreground py-2 px-10 rounded-2xl pl-5 w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            disabled={!edit}
            className="border border-secondary-foreground py-2 px-10 rounded-2xl pl-5 w-full"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address ? formData.address : edit ? "" : "N/A"}
            onChange={handleChange}
            disabled={!edit}
            className="border border-secondary-foreground py-2 px-10 rounded-2xl pl-5 w-full"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={!edit}
            className="border border-secondary-foreground py-2 px-10 rounded-2xl pl-5 w-full"
          />

          {edit && (
            <button className="bg-linear-to-r from-primary/80 to-primary py-4 px-8 rounded-2xl text-white text-sm font-body shadow-xl hover:bg-secondary-foreground hover:scale-105 transition-all delay-50 uppercase w-full">
              {"Update"}
            </button>
          )}
          {!edit && (
            <button 
              className="bg-linear-to-r from-primary/80 to-primary py-4 px-8 rounded-2xl text-white text-sm font-body shadow-xl hover:bg-secondary-foreground hover:scale-105 transition-all delay-50 uppercase w-full"
              onClick={() => {
                // TODO: Implement logout functionality
                console.log("Logout clicked");
                signOut();
              }}
            >
              {"Log Out"}
            </button>
          )}
        </form>
      </div>
      {/* Cart */}
      <div className="flex flex-col m-10 p-5 rounded-xl bg-background min-w-[50%]">
        {/* Heading */}
        <h1 className="text-2xl font-bold border-b border-secondary">
          Cart <span>(0)</span>
        </h1>
        <div className="flex h-full w-full justify-center items-center">
          <p className="font-body text-text/50">No Items Found!</p>
        </div>
      </div>
    </div>
  );
}

export default page