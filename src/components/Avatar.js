import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Avatar.css';

const avatars = [
  { emoji: '👨‍🚀', name: 'Astronaut' },
  { emoji: '👩‍🚀', name: 'Astronette' },
  { emoji: '🧑‍🚀', name: 'Cosmonaut' },
  { emoji: '👽', name: 'Alien' },
  { emoji: '🤖', name: 'Robot' },
  { emoji: '🦸', name: 'Space Hero' }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
};

const avatarVariants = {
  hidden: (index) => ({
    x: index % 2 === 0 ? '-100vw' : '100vw',
    opacity: 0
  }),
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100
    }
  }
};

const Avatar = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  return (
    <div className="avatar-container">
      <div className="space-background">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>
      </div>
      <h1 className="title">Choose Your Avatar</h1>
      <motion.div 
        className="avatar-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {avatars.map((avatar, index) => (
          <motion.div
            key={index}
            className="avatar-box"
            variants={avatarVariants}
            custom={index}
            whileHover={{ 
              scale: 1.1, 
              rotate: 5,
              boxShadow: '0 0 25px rgba(255, 255, 255, 0.5)'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedAvatar(avatar)}
          >
            <span className="avatar-emoji">{avatar.emoji}</span>
            <span className="avatar-name">{avatar.name}</span>
          </motion.div>
        ))}
      </motion.div>
      <AnimatePresence>
        {selectedAvatar && (
          <motion.div 
            className="avatar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAvatar(null)}
          >
            <motion.div 
              className="avatar-detail"
              initial={{ y: '-100vh' }}
              animate={{ y: 0 }}
              exit={{ y: '100vh' }}
            >
              <h2>{selectedAvatar.name}</h2>
              <p className="avatar-emoji-large">{selectedAvatar.emoji}</p>
              <p>You've selected {selectedAvatar.name}!</p>
              <button onClick={() => setSelectedAvatar(null)}>Proceed</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Avatar;