import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CallGetALlBooks } from "../../redux/reducers/books/getAllBooks";

export default function Book() {
  const dispatch = useDispatch();

  // Các state để điều khiển tìm kiếm, sắp xếp và phân trang
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [order, setOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("title");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // Lấy dữ liệu sách từ Redux store
  const listBooks = useSelector((state) => state.getAllBooks.listBooks);

  // Fetch sách mỗi khi các tham số thay đổi
  useEffect(() => {
    dispatch(CallGetALlBooks({ keyword, sortBy, page, limit, order }));
  }, [dispatch, keyword, sortBy, page, limit, order]);

  // Tính số trang (giả sử API trả về thuộc tính total)
  const totalPages = listBooks.totalPages;
  const FilterSidebar = () => (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Tìm kiếm sách..."
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
          setPage(1);
        }}
        className="border p-2 rounded w-full"
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium">Sắp xếp theo</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="title">Tiêu đề</option>
          <option value="published_date">Ngày xuất bản</option>
          <option value="author">Tác giả</option>
          <option value="major">Ngành</option>
          <option value="subject">Môn học</option>
          <option value="department">Khoa</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Thứ tự</label>
        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="asc">Tăng dần</option>
          <option value="desc">Giảm dần</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Số lượng hiển thị</label>
        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
          className="border p-2 rounded w-full"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg md:hidden"
      >
        {isSidebarOpen ? (
          <i class="fa-solid fa-x"></i>
        ) : (
          <i class="fa-solid fa-bars"></i>
        )}
      </button>

      <div className="flex flex-col sm:flex-row">
        {/* Sidebar */}
        <aside
          className={`
  fixed md:relative top-0 z-40 h-screen w-64 
  transform transition-transform duration-200 ease-in-out
  bg-white shadow-lg md:shadow-none
  ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
`}
        >
          <div className="p-4 h-full overflow-y-auto">
            <h2 className="text-xl font-bold mb-6">Bộ lọc</h2>
            <FilterSidebar />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Thư Viện Sách</h1>

          {/* Grid of books */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listBooks?.result && listBooks.result.length > 0 ? (
              listBooks.result.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow p-4 flex flex-col justify-between hover:shadow-lg transition"
                >
                  <div className="mb-4">
                    <img
                      src={item.cover ? item.cover : "/default-book-cover.jpg"}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded mb-4"
                    />
                    <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                    <p className="text-gray-600 mb-1">
                      Tác giả: {item.author.name}
                    </p>
                    <p className="text-gray-600 mb-1">
                      Ngày xuất bản: {item.published_date}
                    </p>
                    <p className="text-gray-600 mb-1">
                      Ngành: {item.major.name}
                    </p>
                  </div>
                  <button
                    onClick={() => alert(`Mượn sách: ${item.title}`)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Mượn sách
                  </button>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                Không tìm thấy sách hoặc tài liệu nào.
              </p>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-8 gap-4">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Trang {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
