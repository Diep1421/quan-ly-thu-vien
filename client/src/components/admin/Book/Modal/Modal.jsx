import React from 'react'

const Modal = ({ isModalOpen, setIsModalOpen, formData, handleChange, handleSubmit, listAuthors, listMajors, listSubjects, listDepartments, isEdit, setIsEdit, handleResetForm }) => {
    return (
        <div
            id="createBookModal"
            tabIndex="-1"
            aria-hidden={!isModalOpen}
            className={`${isModalOpen ? "fixed inset-0 z-50 overflow-y-auto" : "hidden"}`}
        >
            <div className="flex items-center justify-center min-h-screen px-4">
                {/* Overlay có thể đóng modal khi click */}
                <div
                    className="fixed inset-0 bg-black opacity-50"
                    aria-hidden={!isModalOpen}
                    onClick={() => setIsModalOpen(false)}
                ></div>
                {/* Modal content */}
                <div className="bg-white rounded-lg shadow-lg relative z-10 w-[1000px] p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-gray-800">{isEdit ? "Chỉnh Sửa Sách" : "Tạo Sách Mới"}</h3>
                        <button
                            type="button"
                            onClick={() => {
                                setIsModalOpen(false)
                                setIsEdit(false)
                                handleResetForm()
                            }}
                            className="text-gray-600 hover:text-gray-800"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">Tiêu đề</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">Mô tả</label>
                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">Ngày xuất bản</label>
                            <input
                                type="date"
                                name="published_date"
                                value={formData.published_date}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">ISBN</label>
                            <input
                                type="text"
                                name="isbn"
                                value={formData.isbn}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">Tác giả</label>
                            <select name="author" value={formData.author} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded">
                                <option value="">Chọn tác giả</option>
                                {listAuthors?.result?.map((author, index) => (
                                    <option key={index} value={author._id}>{author.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">Ngành</label>
                            <select name="major" value={formData.major} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded">
                                <option value="">Chọn ngành</option>
                                {listMajors?.result?.map((major, index) => (
                                    <option key={index} value={major._id}>{major.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">Môn học</label>
                            <select name="subject" value={formData.subject} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded">
                                <option value="">Chọn môn học</option>
                                {listSubjects?.result?.map((subject, index) => (
                                    <option key={index} value={subject._id}>{subject.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">Khoa</label>
                            <select name="department" value={formData.department} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded">
                                <option value="">Chọn khoa</option>
                                {listDepartments?.result?.map((department, index) => (
                                    <option key={index} value={department._id}>{department.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsModalOpen(false)
                                    setIsEdit(false)
                                    handleResetForm()
                                }}
                                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded"
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
                            >
                                {isEdit ? "Cập nhật" : "Thêm sách"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Modal