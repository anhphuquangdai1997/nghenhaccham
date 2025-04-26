import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FamousArtists = () => {
  const [hoveredId, setHoveredId] = useState(null);

  const artists = [
    { id: 1, name: 'Chế Linh', genre: 'Bolero', followers: '2.5M', img: 'https://avatar-ex-swe.nixcdn.com/singer/avatar/2016/01/25/4/1/1/7/1453717930700_600.jpg' },
    { id: 2, name: 'Chế Kha', genre: 'Bolero', followers: '1.8M', img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRTSo8dVj0jPjzMwrrM4LlZQ5CsBkiTP_rLtoPpkxFILxI7a-RXiPJc1JDEZOYVIEdXPrtM-ERqQd6uQCOTasAOhQ' },
    { id: 3, name: 'Chế Tuấn', genre: 'Bolero', followers: '1.2M', img: 'https://yt3.googleusercontent.com/ytc/AIdro_lq_eXmJsLKq-CKigaKbEWA9phDn9aIxUDHVfNc7BriqhM=s160-c-k-c0x00ffffff-no-rj' },
    { id: 4, name: 'Amư Nhân', genre: 'R&B', followers: '3.1M', img: 'https://nld.mediacdn.vn/thumb_w/698/291774122806476800/2021/5/8/5-amu-nhan-4-16204808658662080641579.jpg' },
    { id: 5, name: 'Y Sa', genre: 'Electronic', followers: '950K', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScGwDUyPdN-s6tQ7srYdSDNEFBFpVqv3W50aHdVZn7gall4qAUCgKGcvEa-QXdoxutPUc&usqp=CAU' },
    { id: 6, name: 'Vương Rock', genre: 'Hip-Hop', followers: '2.7M', img: 'https://yt3.ggpht.com/HU1OW3gP2r91DTGcEkgVjtW-Z7rAMI7QHxm2VmeLgflw37ne8wOUGDSo3zKZzLzjV3swnUW3w1aDpg=s800-c-fcrop64=1,00003863ffffce14-rw-nd-v1' },
  ];

  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 via-purple-950 to-indigo-900 rounded-xl shadow-2xl">
      <motion.h3
        className="text-3xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Nghệ Sĩ Nổi Tiếng
      </motion.h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {artists.map(artist => (
          <motion.div
            key={artist.id}
            className="relative group"
            style={{
              zIndex: hoveredId === artist.id ? 10 : 1,
              perspective: "1000px"
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: artist.id * 0.1 }}
            onHoverStart={() => setHoveredId(artist.id)}
            onHoverEnd={() => setHoveredId(null)}
          >
            <motion.div
              className="relative bg-gradient-to-br from-purple-800/30 to-indigo-900/30 p-6 rounded-xl backdrop-blur-sm border border-purple-500/20 flex flex-col items-center"
              whileHover={{
                rotateY: 15,
                rotateX: -5,
                scale: 1.08,
                boxShadow: "0 25px 30px -5px rgba(139, 92, 246, 0.3), 0 15px 15px -5px rgba(186, 135, 250, 0.25)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {/* Glowing background effect */}
              <motion.div
                className="absolute inset-0 rounded-xl blur-sm opacity-30"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(186, 135, 250, 0.5), transparent 70%)',
                  zIndex: -1
                }}
                animate={{
                  opacity: hoveredId === artist.id ? 0.5 : 0.3,
                  scale: hoveredId === artist.id ? 1.1 : 1
                }}
              />

              {/* 3D Image */}
              <div className="relative w-28 h-28 mb-4">
                <motion.div
                  className="w-full h-full rounded-full overflow-hidden"
                  style={{
                    boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.4)"
                  }}
                  whileHover={{
                    scale: 1.15,
                    rotate: 5
                  }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="w-full h-full rounded-full overflow-hidden ring-2 ring-purple-500 ring-offset-4 ring-offset-indigo-900/50">
                    <img
                      src={artist.img}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>

                {/* Image shadow/glow effect */}
                <motion.div
                  className="absolute -inset-2 rounded-full blur-md opacity-40 -z-10"
                  style={{
                    background: 'radial-gradient(circle at 30% 70%, rgba(139, 92, 246, 0.8), transparent 60%)'
                  }}
                  animate={{
                    opacity: hoveredId === artist.id ? 0.6 : 0.4,
                  }}
                />
              </div>

              <motion.h4
                className="font-bold text-white text-lg mb-1"
                animate={{
                  textShadow: hoveredId === artist.id ? "0 0 8px rgba(186, 135, 250, 0.7)" : "none"
                }}
              >
                {artist.name}
              </motion.h4>

              <p className="text-sm text-purple-300 mb-2">{artist.genre}</p>

              <motion.div
                className="text-xs font-medium px-3 py-1.5 bg-purple-500/30 rounded-full text-purple-200 flex items-center backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
              >
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                {artist.followers}
              </motion.div>

              {/* Shiny edge effect */}
              <motion.div
                className="absolute -bottom-2 -right-2 -left-2 h-1.5 bg-gradient-to-r from-purple-500 via-pink-400 to-indigo-500 rounded-full"
                initial={{ width: "30%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FamousArtists; 