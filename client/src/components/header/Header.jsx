import React from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  MenuIcon,
  UserCircleIcon,
  XIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { useLocation } from "react-router-dom";

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Movies", href: "/movies", current: false },
  { name: "Tv-Shows", href: "/tvShows", current: false },
  { name: "Actors", href: "/actors", current: false },
  { name: "About", href: "/about", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const location = useLocation();
  navigation.forEach((item) => {
    item.current = location.pathname === item.href;
  });

  return (
    <Disclosure as="nav" className="bg-white-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-20 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-pink-600 hover:bg-pink-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://i.hizliresim.com/3d2jchy.png"
                    alt="WatchList"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-pink-600 text-white"
                            : "text-black-300 hover:bg-pink-600 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start lg:flex hidden  ">
                <div className="relative flex w-full">
                  <input
                    type="text"
                    className="block w-full pl-6 pr-3 py-1 text-gray-600 bg-white border rounded-full focus:border-pink-600 focus:ring-pink-600 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Search..."
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-2 sm:pr-0 ">
                    <button
                      type="button"
                      className="relative rounded-full bg-pink-600 p-1 text-white-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-white-2 focus:ring-offset-white-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Search</span>
                      <SearchIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-pink-600 p-1 text-white-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-white-2 focus:ring-offset-white-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full text-white bg-pink-600 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-white-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <UserCircleIcon className="h-8 w-8 text-white" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-white ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <div className="relative flex w-full">
                <input
                  type="text"
                  className="block w-full pl-6 pr-3 py-1 text-gray-600 bg-white border rounded-full focus:border-pink-600 focus:ring-pink-600 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Search..."
                />
                <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-2 sm:pr-0 ">
                  <button
                    type="button"
                    className="relative rounded-full bg-pink-600 p-1 text-white-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-white-2 focus:ring-offset-white-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Search</span>
                    <SearchIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-pink-600 text-white"
                      : "text-black-300 hover:bg-pink-600 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
