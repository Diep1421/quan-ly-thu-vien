import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { CallGetALlBooks } from "../redux/reducers/books/getAllBooks";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [order, setOrder] = useState("asc");
  const listBooks = useSelector((state) => state.getAllBooks.listBooks);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchBooks = async () => {
      await dispatch(
        CallGetALlBooks({
          keyword,
          sortBy: "title",
          page,
          limit,
          order,
        })
      );
    };
    fetchBooks();
  }, [page, keyword, order, limit]);
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <main className="mx-auto mt-0 pt-24 p-6 bg-blue-200 shadow-lg rounded-lg  dark:shadow-2xl">
      <aside>
        <h1
          className="text-4xl font-semibold text-center text-gray-800 mb-4 dark:text-gray-900"
          data-aos="fade-up"
        >
          Chào mừng đến <span className="wave-effect">ITCLib</span> - Thư viện
          số của bạn
        </h1>
        <p
          className="text-gray-600 text-center dark:text-gray-700"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          Khám phá các tài nguyên kỹ thuật số được thiết kế riêng cho sinh viên
          và giảng viên.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row justify-center items-center sm:space-x-6 text-center">
          {[
            {
              label: "📚 250+",
              text: "Sách học thuật",
              color: "text-blue-600",
            },
            {
              label: "🎓 1000+",
              text: "Tài liệu tham khảo",
              color: "text-green-600",
            },
            {
              label: "👨‍🎓 5000+",
              text: "Sinh viên sử dụng",
              color: "text-orange-600",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 rounded-lg shadow w-full sm:w-1/3 dark:bg-gray-800 mb-4 sm:mb-0"
              data-aos="zoom-in"
              data-aos-delay={400 + index * 100}
            >
              <p className={`text-2xl font-semibold ${item.color}`}>
                {item.label}
              </p>
              <p className="text-gray-700 dark:text-gray-300">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="relative flex flex-col items-center mt-6">
          <input
            type="text"
            placeholder="Tìm kiếm sách, tài liệu"
            className="input w-full max-w-md p-2 border rounded"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 200)}
          />
          {open && keyword && (
            <ul className="absolute bg-white dark:bg-gray-800 border mt-14 rounded-lg shadow-lg z-10 overflow-auto max-h-40 w-full max-w-md">
              {listBooks?.result && listBooks.result.length > 0 ? (
                listBooks.result.map((item) => (
                  <li
                    key={item._id}
                    className="p-3 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900"
                  >
                    {item.title}
                  </li>
                ))
              ) : (
                <li className="p-3 text-gray-500">
                  Không tìm thấy sách hoặc tài liệu nào.
                </li>
              )}
            </ul>
          )}
        </div>
      </aside>

      <div
        className="max-w-6xl mx-auto mt-6 p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800 dark:shadow-xl"
        data-aos="fade-up"
      >
        <h2 className="text-3xl text-center font-bold text-gray-800 mb-4 dark:text-white">
          Giới Thiệu
        </h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <Swiper
              navigation
              pagination
              modules={[Navigation, Pagination]}
              className="mySwiper"
            >
              {["/images/lib5.jpg", "/images/lib6.jpg", "/images/lib7.jpg"].map(
                (src, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={src}
                      alt={`Library ${index}`}
                      className="rounded-lg w-full min-h-[340px] h-[340px] object-cover"
                    />
                  </SwiperSlide>
                )
              )}
            </Swiper>
          </div>
          <div className="md:w-1/2 flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg shadow dark:bg-gray-700">
            <h3 className="text-xl font-semibold sm:text-2xl dark:text-white">
              Khám Phá Kho Sách ITC
            </h3>
            <div className="mt-4 flex flex-col sm:flex-row gap-4 w-full">
              {[
                {
                  title: "📚 Sách",
                  desc: "Kho tàng sách học thuật.",
                  link: "/book",
                  color: "bg-green-500 hover:bg-blue-600",
                },
                {
                  title: "📄 Tài Liệu",
                  desc: "Kho tài liệu học tập chất lượng.",
                  link: "/tai-lieu",
                  color: "bg-green-500 hover:bg-green-600",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="w-full sm:w-1/2 bg-white p-4 shadow rounded-lg text-center dark:bg-gray-800"
                >
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 mt-2 text-left dark:text-gray-300">
                    {item.desc}
                  </p>
                  <a
                    href={item.link}
                    className={`mt-4 text-white px-4 py-2 rounded-lg ${item.color} dark:bg-blue-600 dark:hover:bg-blue-800`}
                  >
                    Xem ngay
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
