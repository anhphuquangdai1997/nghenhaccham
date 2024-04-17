import React from 'react'
export default function Lyrics({ props: { open2, setOpen2 } }) {
    return (
        <div className={`listt ${open2 ? 'show' : ''}`}>
            <div className="header">
                Lời Bài Hát
                <i className="material-icons" onClick={() => setOpen2(false)}>close</i>
            </div >
            <div className="noidung">
                <h3 className='title'>Đêm Hội Raglai</h3>
                <hr />
                <p style={{padding:'10px 39px'}}>
                    Em đi đi về miền Bác Ái quê anh
                    Xanh xanh núi Tà Năng trắng làn mây bay
                    Chim về vui ca tiếng suối Rớ róc rách
                    Đêm nay trong hội làng ta múa ta say
                    Ngất ngây tiếng mả la, tiếng đàn chapi
                    Tiếng khèn du dương, tiếng đàn đá âm vang

                    Lo líu lo líu lo chim rừng về hót trong mê say
                    Trường làng khang trang đàn em bé tung tăng
                    Từng đàn chim xinh bay về đây hót vang
                    Núi Tà Năng đó nghiêng soi dòng suối
                    Em ca bài ca trong tiếng đàn đá Bác Ái

                    Rượu cần đã ngấm vào uống nữa đi anh
                    Rượu cần say sưa anh cùng em múa quay
                    Vui trọn đêm nay anh vui cùng em
                    Anh say cùng em vui quê hương mới

                    Năm xưa em luồn rừng tiếp tế nuôi quân
                    Anh lên núi Tà Năng bẩy đá cung tên
                    Đánh đồn maty tin vui Tà Lú chiến thắng
                    Năm nay ta lại về vui rẫy vui nương
                    Ta say tiếng kèn môi, tiếng đàn kanhi
                    Tiếng sarakhen, đêm hội mới Raglai
                </p>
            </div>
        </div >
    )
}
