
'use client'

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import MainMenu from "../MainMenu";
import CurrenctyMegaMenu from "../CurrenctyMegaMenu";
import LanguageMegaMenu from "../LanguageMegaMenu";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { getUser } from '../../../features/hero/authSlice';

import MobileMenu from "../MobileMenu";

const Header1 = () => {
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  const dispatch = useDispatch();
  const router = useRouter();

  const { user, isUserLoggedIn } = useSelector((state) => state.user);
debugger;

useEffect(() => {
  debugger;
  if (!user.name) {
    dispatch(getUser());
  }
}, [dispatch]);
  const logOut = () => {
    debugger;
    router.push('/login')
  };
  return (
    <>
      <header className={`header bg-white ${navbar ? "is-sticky" : ""}`}>
        <div className="header__container px-30 sm:px-20">
          <div className="row justify-between items-center">
            <div className="col-auto">
              <div className="d-flex items-center">
                <Link href="/" className="header-logo mr-20">
                  <img src="/img/general/logo-dark.svg" alt="logo icon" />
                  <img src="/img/general/logo-dark.svg" alt="logo icon" />
                </Link>
                {/* End logo */}

                <div className="header-menu ms-5">
                  <div className="header-menu__content">
                    <MainMenu style="text-dark-1" />
                  </div>
                </div>
                {/* End header-menu */}
              </div>
              {/* End d-flex */}
            </div>
            {/* End col */}

            <div className="col-auto">
              <div className="d-flex items-center">
                <div className="row x-gap-20 items-center xxl:d-none">
                  <CurrenctyMegaMenu textClass="text-dark-1" />
                  {/* End Megamenu for Currencty */}

                  {/* Start vertical devider*/}
                  <div className="col-auto">
                    <div className="w-1 h-20 bg-white-20" />
                  </div>
                  {/* End vertical devider*/}

                  <LanguageMegaMenu textClass="text-dark-1" />
                  {/* End Megamenu for Language */}
                </div>
                {/* End language and currency selector */}

                {/* Start btn-group */}
                
        {isUserLoggedIn == true ? (
          
          <div className="header-menu">
          <div className="header-menu__content">
<nav className="menu js-navList">
<ul className={`menu__nav text-dark-1 -is-active`}>
<li
  className={"current menu-item-has-children"}
>
  <a href="#"><Image
width={20}
height={20}
src="/img/general/lang.png"
alt="image"
className="rounded-full mr-10"
/>
    <span className="mr-10" style={{minWidth:"120px"}}>{user?.name} </span>
    <i className="icon icon-chevron-sm-down" />
  </a>
  <ul className="subnav" style={{minWidth:"200px"}}>
      <li
        key={0}
        className={
          "current menu-item-has-children"
        }
      >
        <Link href={"/user-profile"}>My Profile</Link>
      </li>
      <li
        key={1}
        className={
          "current menu-item-has-children"
        }
      >
        <Link href={"3"}>My Bookings</Link>
      </li>
      <li
        key={2}
        className={
          "current menu-item-has-children"
        }
      >
        <Link href={"3"}>My Co-Travellers</Link>
      </li>
      <li
        key={3}
        className={
          "current menu-item-has-children"
        }
      >
        <Link href={"3"}>Sign Out</Link>
      </li>
  </ul>
</li>
</ul>
</nav>
</div>
</div>
        ) : ( isUserLoggedIn === false ? (
                <div className="d-flex items-center ml-20 is-menu-opened-hide md:d-none">
                  <Link
                    href="/signup"
                    className="button px-30 fw-400 text-14 -blue-1 bg-blue-1 h-50 text-white"
                  >
                    Sign In / Register
                  </Link>
                </div>) : <></>)}
                <div className="d-none items-center ml-20 is-menu-opened-hide md:d-none">
                  <Link
                    href="/login"
                    className="button px-30 fw-400 text-14 -blue-1 bg-blue-1 h-50 text-white"
                  >
                    Become An Expert
                  </Link>
                  <Link
                    href="/signup"
                    className="button px-30 fw-400 text-14 -outline-blue-1 h-50 text-blue-1 ml-20"
                  >
                    Sign In / Register
                  </Link>
                </div>
                {/* End btn-group */}

                {/* Start mobile menu icon */}
                <div className="d-none xl:d-flex x-gap-20 items-center pl-30 text-dark-1">
                  <div>
                    <Link
                      href="/login"
                      className="d-flex items-center icon-user text-inherit text-22"
                    />
                  </div>
                  <div>
                    <button
                      className="d-flex items-center icon-menu text-inherit text-20"
                      data-bs-toggle="offcanvas"
                      aria-controls="mobile-sidebar_menu"
                      data-bs-target="#mobile-sidebar_menu"
                    />

                    <div
                      className="offcanvas offcanvas-start  mobile_menu-contnet"
                      tabIndex="-1"
                      id="mobile-sidebar_menu"
                      aria-labelledby="offcanvasMenuLabel"
                      data-bs-scroll="true"
                    >
                      <MobileMenu />
                      {/* End MobileMenu */}
                    </div>
                  </div>
                </div>
                {/* End mobile menu icon */}
              </div>
            </div>
            {/* End col-auto */}
          </div>
          {/* End .row */}
        </div>
        {/* End header_container */}
      </header>
    </>
  );
};

export default Header1;
