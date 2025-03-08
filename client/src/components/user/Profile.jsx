import React, { useEffect, useState } from "react";
import { CallGetUserById } from "../../redux/reducers/user/getUserById";
// import { CallUpdateUser } from "../../redux/reducers/user/updateUser";
import Swal from "sweetalert2";

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Mật Khẩu Không Khớp!",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    setIsOpen(false);
    Swal.fire({
      icon: "success",
      title: "Mật khẩu đã được cập nhật!",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = localStorage.getItem("dataUser");
      let dataUser = storedUser ? JSON.parse(storedUser) : null;
      if (dataUser) {
        const res = await CallGetUserById(dataUser._id);
        setFormData({
          username: res?.content?.username || "",
          first_name: res?.content?.first_name || "",
          last_name: res?.content?.last_name || "",
          email: res?.content?.email || "",
          phone: res?.content?.phone || "",
        });
      }
    };
    fetchUserData();
  }, []);

  return (
    <section className="py-10 my-auto bg-gray-100 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Thông Tin Cá Nhân
        </h1>

        {/* Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["username", "first_name", "last_name", "email", "phone"].map(
            (field, index) => (
              <div key={index}>
                <label className="block text-gray-700 dark:text-gray-300 mb-1 capitalize">
                  {field.replace("_", " ")}
                </label>
                <input
                  disabled={!isEdit}
                  value={formData[field]}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [field]: e.target.value,
                    }))
                  }
                  type={field === "email" ? "email" : "text"}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 transition disabled:bg-gray-200 dark:bg-gray-700 dark:text-white"
                />
              </div>
            )
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between mt-6">
          <button
            onClick={() => setIsOpen(true)}
            className="w-full sm:w-1/2 px-4 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition mr-2"
          >
            Đổi Mật Khẩu
          </button>
          <button
            className={`w-full sm:w-1/2 px-4 py-3 text-white rounded-lg font-semibold transition ${
              isEdit ? "bg-green-500 hover:bg-green-600" : "bg-gray-500"
            }`}
            onClick={() => setIsEdit(!isEdit)}
          >
            {isEdit ? "Lưu" : "Chỉnh Sửa"}
          </button>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
              Đổi Mật Khẩu
            </h2>
            <form onSubmit={handleSubmit1}>
              {["oldPassword", "newPassword", "confirmPassword"].map(
                (field, index) => (
                  <input
                    key={index}
                    type="password"
                    name={field}
                    placeholder={
                      field === "oldPassword"
                        ? "Mật khẩu cũ"
                        : field === "newPassword"
                        ? "Mật khẩu mới"
                        : "Xác nhận mật khẩu mới"
                    }
                    value={passwords[field]}
                    onChange={handleChange}
                    required
                    className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-400 transition dark:bg-gray-700 dark:text-white"
                  />
                )
              )}

              <button
                type="submit"
                className="w-full p-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
              >
                Xác Nhận
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full mt-2 p-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
              >
                Hủy
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
