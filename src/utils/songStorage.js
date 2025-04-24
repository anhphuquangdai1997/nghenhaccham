// Utility functions to manage songs in local storage

// Kích thước tối đa cho localStorage (tính bằng MB)
const MAX_LOCAL_STORAGE_SIZE = 5; // 5MB

// Chuyển đổi kích thước từ bytes sang MB
const bytesToMB = (bytes) => {
    return bytes / (1024 * 1024);
};

// Kiểm tra kích thước localStorage hiện tại
const getCurrentLocalStorageSize = () => {
    let totalSize = 0;
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            totalSize += (localStorage[key].length + key.length) * 2; // Nhân 2 vì JavaScript sử dụng UTF-16
        }
    }
    return bytesToMB(totalSize);
};

// Lấy tỷ lệ phần trăm dung lượng đã sử dụng
export const getStorageUsagePercentage = () => {
    const currentSize = getCurrentLocalStorageSize();
    return Math.min(100, (currentSize / MAX_LOCAL_STORAGE_SIZE) * 100);
};

// Kiểm tra xem có đủ không gian để lưu trữ không
const hasEnoughStorage = (dataSize) => {
    const currentSize = getCurrentLocalStorageSize();
    const availableSize = MAX_LOCAL_STORAGE_SIZE - currentSize;
    return availableSize >= dataSize;
};

// Kiểm tra xem nguồn bài hát có phải là blob URL không
const isBlobSource = (src) => {
    return typeof src === 'string' && src.startsWith('blob:');
};

// Kiểm tra xem bài hát có phải do người dùng tải lên không
export const isUserUploadedSong = (songId) => {
    try {
        const uploadedSongs = JSON.parse(localStorage.getItem('uploadedSongs')) || [];
        return uploadedSongs.some(song => song.id === songId);
    } catch (error) {
        console.error('Lỗi khi kiểm tra bài hát:', error);
        return false;
    }
};

// Xóa các bài hát có blob URL không hợp lệ
const cleanupInvalidBlobSongs = () => {
    try {
        // Lấy danh sách bài hát đã tải lên
        const uploadedSongs = JSON.parse(localStorage.getItem('uploadedSongs')) || [];

        // Lọc ra các bài hát không sử dụng blob URL
        const validSongs = uploadedSongs.filter(song => {
            if (!song || !song.src) return false;
            return !isBlobSource(song.src);
        });

        // Nếu có bài hát không hợp lệ, cập nhật lại localStorage
        if (validSongs.length !== uploadedSongs.length) {
            console.log(`Đã xóa ${uploadedSongs.length - validSongs.length} bài hát có blob URL không hợp lệ`);
            localStorage.setItem('uploadedSongs', JSON.stringify(validSongs));
            return true;
        }

        return false;
    } catch (error) {
        console.error('Lỗi khi dọn dẹp localStorage:', error);
        return false;
    }
};

// Nén dữ liệu hình ảnh base64 để giảm kích thước lưu trữ
const compressImageBase64 = async (base64String, maxWidthHeight = 300) => {
    // Nếu không phải base64 hình ảnh, trả về nguyên bản
    if (!base64String || !base64String.startsWith('data:image')) {
        return base64String;
    }

    return new Promise((resolve) => {
        const img = new Image();
        img.src = base64String;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            // Giảm kích thước hình ảnh nếu cần
            if (width > maxWidthHeight || height > maxWidthHeight) {
                if (width > height) {
                    height = Math.round(height * (maxWidthHeight / width));
                    width = maxWidthHeight;
                } else {
                    width = Math.round(width * (maxWidthHeight / height));
                    height = maxWidthHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // Giảm chất lượng xuống để giảm kích thước
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
            resolve(compressedBase64);
        };

        img.onerror = () => {
            // Nếu có lỗi, trả lại chuỗi gốc
            resolve(base64String);
        };
    });
};

// Get all songs (default songs + user uploaded songs)
export const getAllSongs = (defaultSongs) => {
    try {
        // Dọn dẹp các bài hát không hợp lệ trước
        cleanupInvalidBlobSongs();

        // Get user uploaded songs from local storage
        const uploadedSongs = JSON.parse(localStorage.getItem('uploadedSongs')) || [];

        // Combine with default songs
        return [...defaultSongs, ...uploadedSongs];
    } catch (error) {
        console.error('Error loading songs from localStorage:', error);
        return defaultSongs; // Return default songs if there's an error
    }
};

// Add a new song to local storage
export const addSong = async (song) => {
    try {
        // Dọn dẹp các bài hát không hợp lệ trước
        cleanupInvalidBlobSongs();

        // Nén ảnh thumbnail nếu có
        if (song.thumbnail && song.thumbnail.startsWith('data:image')) {
            song.thumbnail = await compressImageBase64(song.thumbnail);
        }

        // Get existing uploaded songs
        const existingSongs = JSON.parse(localStorage.getItem('uploadedSongs')) || [];

        // Add new song
        const updatedSongs = [...existingSongs, song];

        // Kiểm tra dung lượng trước khi lưu
        const songDataJson = JSON.stringify(updatedSongs);
        const songDataSize = bytesToMB(songDataJson.length * 2); // Nhân 2 vì JavaScript sử dụng UTF-16

        if (!hasEnoughStorage(songDataSize)) {
            console.error('Không đủ dung lượng localStorage để lưu bài hát');
            return false;
        }

        // Save back to local storage
        localStorage.setItem('uploadedSongs', songDataJson);

        return true;
    } catch (error) {
        console.error('Error saving song to localStorage:', error);
        return false;
    }
};

// Remove a user uploaded song
export const removeSong = (songId) => {
    try {
        // Get existing uploaded songs
        const existingSongs = JSON.parse(localStorage.getItem('uploadedSongs')) || [];

        // Filter out the song to remove
        const updatedSongs = existingSongs.filter(song => song.id !== songId);

        // Save back to local storage
        localStorage.setItem('uploadedSongs', JSON.stringify(updatedSongs));

        return true;
    } catch (error) {
        console.error('Error removing song from localStorage:', error);
        return false;
    }
}; 