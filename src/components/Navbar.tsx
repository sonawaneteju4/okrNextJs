"use client";
import React from "react";
import Link from "next/link";
function Navbar() {
  return (
    <div>
      {sessionStorage.getItem("accessToken") && (
        <>
          <ul className="flex gap-5 px-5 py-2 bg-slate-200">
            <li>
              <Link href={"/"} className="font-semibold">
                SupportSync
              </Link>
            </li>
            <li>
              <Link href="/ticket">Ticket</Link>
            </li>
            <li>
              <Link href="/support">Support</Link>
            </li>
          </ul>
        </>
      )}
    </div>
  );
}

export default Navbar;
