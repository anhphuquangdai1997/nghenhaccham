import React from 'react'
import '../assets/css/doc.css';
export default function Doc({ props: { open1, setOpen1 } }) {
    return (
        <div className={`listt ${open1 ? 'show' : ''}`}>
            <div className="header">
                Nội Dung Tìm Hiểu Thêm
                <i className="material-icons" onClick={() => setOpen1(false)}>close</i>
            </div >
            <div className="noidung">
                <h3 className='title'>DÂN CA DÂN NHẠC VN – DÂN CA CHAMPA/CHĂM PA</h3>
                <hr />
                <p>Chào các bạn,<br />
                    Dân tộc Champa vốn quần tụ tại khu vực duyên hải miền Trung Việt Nam từ rất lâu đời. Ngay từ những thế kỷ đầu công nguyên cho tới thế kỷ XVII, người Champa đã từng xây dựng nên vương quốc Champa với nền vǎn hoá Sa Huỳnh rực rỡ, ảnh hưởng của vǎn hoá Ấn Độ.
                    <br />
                    Dân tộc này còn có các tên gọi khác là: Chàm, Chiêm, Chiêm Thành, Hời… với các nhóm địa phương: Chăm Hroi, Chăm Poổng, Chà Và Ku, Chăm Châu Ðốc. Họ có khoảng chừng 161.729 người (theo kết quả điều tra dân số năm 2009 của Tổng cục thống kê), và tiếng nói thuộc nhóm ngôn ngữ Malayô-Polynéxia (ngữ hệ Nam Ðảo).
                    <br />
                    Người Champa theo đạo Hồi và đạo Bà La Môn. Trong các bản làng Chǎm lễ hội diễn ra quanh nǎm và không lúc nào thiếu vắng âm nhạc. Đối với kho tàng âm nhạc của người Champa, thậm chí âm nhạc nghi lễ tín ngưỡng chiếm một phần lớn, vượt trội hơn rất nhiều so với âm nhạc đời thường.
                    <br />
                    Dàn nhạc đệm cho hát gồm có: kèn Xaranai (nhạc cụ họ hơi, dǎm kép, có 7 lỗ bấm trên, 1 lỗ bấm dưới), đàn Kanhi (nhạc cụ dây chi cung kéo, bầu đàn làm bằng mu rùa, có 2 dây), trống Paranưng (trống vỗ 1 mặt), cặp trống Ghì Nằng (trống 2 mặt, mặt trên vỗ, mặt dưới đánh bằng dùi), chiêng Prông (chiêng có núm) và chiêng Sit (chiêng có núm).

                    Hiện tại cư dân gồm có hai bộ phận chính: Bộ phận cư trú ở Ninh Thuận và Bình Thuận chủ yếu theo đạo Bà la môn (một bộ phận nhỏ người Champa ở đây theo đạo Islam truyền thống gọi là người Chăm Bà ni). Bộ phận cư trú ở một số địa phương thuộc các tỉnh Châu Ðốc, Tây Ninh, An Giang, Ðồng Nai và Sài Gòn theo đạo Islam (Hồi giáo) mới.

                    “Nhìn vào cuộc Nam Tiến của dân tộc Việt Nam, những vương quốc bị xâm lấn không hẳn đã vì kém văn minh, mà trái lại có những thời đại huy hoàng sớm sủa hơn chúng ta nhiều. Những công trình gần đây nghiên cứu về người Chiêm Thành (Chăm) và người Chân Lạp (Khmer) đã chứng tỏ điều đó.
                </p>
            </div>
        </div >
    )
}
