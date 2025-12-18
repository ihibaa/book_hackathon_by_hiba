import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { login, signup } from '../services/api';
import styles from './AuthModal.module.css';

function AuthModal({ isOpen, onRequestClose, initialLoginState = true }) {
  const [isLogin, setIsLogin] = useState(initialLoginState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('beginner');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ Browser-only setup
  useEffect(() => {
    if (ExecutionEnvironment.canUseDOM) {
      Modal.setAppElement('#__docusaurus');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        alert('Login successful! Welcome back!');
      } else {
        await signup({
          email,
          password,
          experience_level: experienceLevel,
        });
        alert('Account created successfully! Welcome to Robotics Learning Platform!');
        setIsLogin(true);
      }

      onRequestClose();

      // ✅ Browser-only reload
      if (ExecutionEnvironment.canUseDOM) {
        window.location.reload();
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // ❗ Extra safety: don't render Modal during SSG
  if (!ExecutionEnvironment.canUseDOM) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName={styles.modalOverlay}
      className={styles.modalContent}
      closeTimeoutMS={300}
    >
      <div className={styles.modalHeader}>
        <h2 className={styles.modalTitle}>
          {isLogin ? 'Welcome Back' : 'Join Our Community'}
        </h2>
        <button
          onClick={onRequestClose}
          className={styles.closeButton}
          aria-label="Close modal"
        >
          ×
        </button>
      </div>

      <div className={styles.tabsContainer}>
        <div
          className={`${styles.toggleButtonGroup} ${
            isLogin ? styles.login : styles.signup
          }`}
        >
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`${styles.toggleText} ${
              isLogin ? styles.toggleTextActive : ''
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`${styles.toggleText} ${
              !isLogin ? styles.toggleTextActive : ''
            }`}
          >
            Sign Up
          </button>
        </div>
      </div>

      <div className={styles.formContainer}>
        {error && (
          <div className={styles.errorMessage}>
            <span className={styles.errorIcon}>⚠️</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.formGroup}>
            <div className={`${styles.inputWrapper} ${styles.emailInput}`}>
              <span className={styles.inputIcon}>📧</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className={styles.input}
                disabled={loading}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <div className={`${styles.inputWrapper} ${styles.passwordInput}`}>
              <span className={styles.inputIcon}>🔒</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                minLength={6}
                className={styles.input}
                disabled={loading}
              />
            </div>
          </div>

          {!isLogin && (
            <div className={styles.formGroup}>
              <label className={styles.selectLabel}>Experience Level</label>
              <div className={styles.selectWrapper}>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className={styles.select}
                  disabled={loading}
                >
                  <option value="beginner">👶 Beginner</option>
                  <option value="intermediate">🚀 Intermediate</option>
                  <option value="advanced">⚡ Advanced</option>
                </select>
                <span className={styles.selectArrow}>▼</span>
              </div>
              <p className={styles.experienceHint}>
                This helps us personalize your learning experience
              </p>
            </div>
          )}

          <button
            type="submit"
            className={`${styles.submitButton} ${
              loading ? styles.loading : ''
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className={styles.loadingSpinner}></span>
            ) : isLogin ? (
              'Login to Continue'
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className={styles.formFooter}>
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className={styles.toggleAuth}
            disabled={loading}
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : 'Already have an account? Login'}
          </button>
        </div>

        <div className={styles.privacyNote}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </Modal>
  );
}

export default AuthModal;
