import React from 'react';

const UserFeedback = () => {
  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-4 text-center text-purple-300">Đánh Giá Của Bạn</h3>
      <div className="bg-white bg-opacity-5 p-4 rounded-lg">
        <div className="text-center mb-4">
          <p className="mb-2">Bạn đánh giá trải nghiệm nghe nhạc như thế nào?</p>
          <div className="flex justify-center space-x-4 text-2xl">
            <span className="cursor-pointer hover:scale-125 transition-transform duration-300">⭐</span>
            <span className="cursor-pointer hover:scale-125 transition-transform duration-300">⭐</span>
            <span className="cursor-pointer hover:scale-125 transition-transform duration-300">⭐</span>
            <span className="cursor-pointer hover:scale-125 transition-transform duration-300">⭐</span>
            <span className="cursor-pointer hover:scale-125 transition-transform duration-300">⭐</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Bình luận của bạn:</label>
            <textarea 
              className="w-full bg-black bg-opacity-30 border border-purple-700 rounded-md p-2 text-white placeholder-gray-500"
              placeholder="Chia sẻ cảm nhận của bạn về ứng dụng..."
              rows={4}
            />
          </div>
          
          <div>
            <label className="block text-sm mb-1">Email của bạn (không bắt buộc):</label>
            <input 
              type="email" 
              className="w-full bg-black bg-opacity-30 border border-purple-700 rounded-md p-2 text-white placeholder-gray-500"
              placeholder="email@example.com"
            />
          </div>
          
          <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-md hover:from-purple-700 hover:to-indigo-700 transition-all duration-300">
            Gửi Đánh Giá
          </button>
        </div>
        
        <div className="mt-4 text-center text-xs text-gray-400">
          Cảm ơn bạn đã dành thời gian đánh giá! Phản hồi của bạn sẽ giúp chúng tôi cải thiện dịch vụ.
        </div>
      </div>
    </div>
  );
};

export default UserFeedback; 