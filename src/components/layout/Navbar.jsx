import React from "react";

function Navbar() {
  return (
    <div className="navbar fixed top-0 z-10 text-white ">
      {/* START */}
      <div className="">
        {/* Mobile Menu */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Beranda</a>
            </li>
            <li>
              <a>Prestasi</a>
            </li>
            <li>
              <a>Buku</a>
            </li>
          </ul>
        </div>
        {/* Logo */}
        <a className="btn btn-ghost  text-white  text-xl">FulanChess</a>
      </div>

      {/* CENTER */}
      <div className="hidden lg:flex  text-white  navbar-center ">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Beranda</a>
          </li>
          <li>
            <a>Prestasi</a>
          </li>
          <li>
            <a>Buku</a>
          </li>
          <li>
            <a>Streaming</a>
          </li>
          <li>
            <a>Artikel</a>
          </li>
          <li>
            <a>Kontak</a>
          </li>
        </ul>
      </div>

      {/* END */}
      <div className="flex items-center navbar-end ">
        {/* Cart */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator  text-white ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content mt-3 w-52 bg-base-100 shadow z-[1]"
          >
            <div className="card-body">
              <span className="text-lg font-bold">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
