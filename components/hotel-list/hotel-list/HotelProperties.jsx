
'use client'

import { hotelsData } from "../../../data/hotels";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

const HotelProperties = () => {
  const { hotelList,loading } = useSelector((state) => ({ ...state.hotel }));
  return (
    <>
      {hotelList.slice(0, 7).map((item) => (
        <div className="col-12" key={item?.code}>
          <div className="border-top-light pt-30">
            <div className="row x-gap-20 y-gap-20">
              <div className="col-md-auto">
                <div className="cardImage ratio ratio-1:1 w-250 md:w-1/1 rounded-4">
                  <div className="cardImage__content">
                    <div className="cardImage-slider rounded-4  custom_inside-slider">
                      <Swiper
                        className="mySwiper"
                        modules={[Pagination, Navigation]}
                        pagination={{
                          clickable: true,
                        }}
                        navigation={true}
                      >
                        {item?.hotelInfo?.images?.map((slide, i) => (
                          <SwiperSlide key={i}>
                            <Image
                              width={250}
                              height={250}
                              className="rounded-4 col-12 js-lazy"
                              src={slide.url}
                              alt="image"
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </div>
                  {/* End image */}

                  <div className="cardImage__wishlist">
                    <button className="button -blue-1 bg-white size-30 rounded-full shadow-2">
                      <i className="icon-heart text-12"></i>
                    </button>
                  </div>
                </div>
              </div>
              {/* End .col */}

              <div className="col-md">
                <h3 className="text-18 lh-16 fw-500">
                  {item?.hotelInfo?.name}
                  <br className="lg:d-none" /> {item?.hotelInfo?.address}
                  <div className="d-inline-block ml-10">
                    <i className="icon-star text-10 text-yellow-2"></i>
                    <i className="icon-star text-10 text-yellow-2"></i>
                    <i className="icon-star text-10 text-yellow-2"></i>
                    <i className="icon-star text-10 text-yellow-2"></i>
                    <i className="icon-star text-10 text-yellow-2"></i>
                  </div>
                </h3>

                <div className="row x-gap-10 y-gap-10 items-center pt-10">
                  <div className="col-auto">
                    <p className="text-14">{item?.hotelInfo?.address}</p>
                  </div>

                  <div className="col-auto">
                    <button
                      data-x-click="mapFilter"
                      className="d-block text-14 text-blue-1 underline"
                    >
                      Show on map
                    </button>
                  </div>

                  <div className="col-auto">
                    <div className="size-3 rounded-full bg-light-1"></div>
                  </div>

                  <div className="col-auto">
                    <p className="text-14">2 km to city center</p>
                  </div>
                </div>

                {/* {item?.hotelOptions?.hotelOption?.hotelRooms?.hotelRoomList?.map((room, i) => (
  <div className="text-14 lh-15 mt-20" key={i}>
    <div className="fw-500">{room.name}</div>
    <div className="text-light-1">{`${room.roomOccupancy.adults} adult${room.roomOccupancy.adults !== 1 ? 's' : ''}`}</div>
    {room.roomOccupancy.children > 0 && (
      <div className="text-light-1">{`${room.roomOccupancy.children} child${room.roomOccupancy.children !== 1 ? 'ren' : ''}`}</div>
    )}
  </div>
))} */}

{item?.hotelOptions?.hotelOption?.additionalElements?.hotelOffers?.hotelOffer?.category === "GEN" && (
  <div className="text-14 text-green-2 lh-15 mt-10">
    <div className="fw-500">{item?.hotelOptions?.hotelOption?.additionalElements?.hotelOffers?.hotelOffer?.name}</div>
    <div className="">
    {item?.hotelOptions?.hotelOption?.additionalElements?.hotelOffers?.hotelOffer?.description}
    </div>
  </div>
)}

                <div className="row x-gap-10 y-gap-10 pt-20">
                  <div className="col-auto">
                    <div className="border-light rounded-100 py-5 px-20 text-14 lh-14">
                      Breakfast
                    </div>
                  </div>

                  <div className="col-auto">
                    <div className="border-light rounded-100 py-5 px-20 text-14 lh-14">
                      WiFi
                    </div>
                  </div>

                  <div className="col-auto">
                    <div className="border-light rounded-100 py-5 px-20 text-14 lh-14">
                      Spa
                    </div>
                  </div>

                  <div className="col-auto">
                    <div className="border-light rounded-100 py-5 px-20 text-14 lh-14">
                      Bar
                    </div>
                  </div>
                </div>
              </div>
              {/* End .col-md */}

              <div className="col-md-auto text-right md:text-left">
                <div className="row x-gap-10 y-gap-10 justify-end items-center md:justify-start">
                  <div className="col-auto">
                    <div className="text-14 lh-14 fw-500">Exceptional</div>
                    <div className="text-14 lh-14 text-light-1">
                      3,014 reviews
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="flex-center text-white fw-600 text-14 size-40 rounded-4 bg-blue-1">
                      {item?.hotelInfo?.hotelCategory?.type.replace("est","")}
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className="text-14 text-light-1 mt-50 md:mt-20">
                    8 nights, 2 adult
                  </div>
                  <div className="text-22 lh-12 fw-600 mt-5">
                  {item?.hotelOptions?.hotelOption?.prices?.price?.currency} ${item?.hotelOptions?.hotelOption?.prices?.price?.totalFixAmounts?.nett}

                  </div>
                  <div className="text-14 text-light-1 mt-5">
                  US${item?.hotelOptions?.hotelOption?.prices?.price?.currency} ${item?.hotelOptions?.hotelOption?.prices?.price?.totalFixAmounts?.nett} taxes and charges
                  </div>

                  <Link
                    href={`/hotel-details/${item.code}`}
                    className="button -md -dark-1 bg-blue-1 text-white mt-24"
                  >
                    See Availability{" "}
                    <div className="icon-arrow-top-right ml-15"></div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default HotelProperties;
