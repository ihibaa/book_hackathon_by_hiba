import { useState, useEffect } from 'react';
import AuthModal from './AuthModal';
import styles from './ChapterToolbar.module.css';

function ChapterToolbar({
  currentLanguage // New prop to indicate current language for button text
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buttonText, setButtonText] = useState('Translate to Urdu');

  useEffect(() => {
    if (currentLanguage === 'ur') {
      setButtonText('انگریزی میں ترجمہ کریں'); // Translate to English
    } else {
      setButtonText('Translate to Urdu');
    }
  }, [currentLanguage]);

  return (
    <>
      <div className={`alert alert--secondary ${styles.chapterToolbar}`}>
        <button className="button button--primary">Personalize: Beginner</button>
      </div>
      <AuthModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default ChapterToolbar;