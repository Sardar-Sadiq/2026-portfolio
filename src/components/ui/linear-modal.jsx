"use client";
import React, {
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";
import { XIcon } from "lucide-react";
const DialogContext = React.createContext(null);
function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
}
function DialogProvider({ children, transition }) {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useId();
  const triggerRef = useRef(null);
  const contextValue = useMemo(
    () => ({ isOpen, setIsOpen, uniqueId, triggerRef }),
    [isOpen, uniqueId],
  );
  return (
    <DialogContext.Provider
      //@ts-ignore
      value={contextValue}>
      <MotionConfig transition={transition}>{children}</MotionConfig>
    </DialogContext.Provider>
  );
}
function Dialog({ children, transition }) {
  return (
    <DialogProvider>
      <MotionConfig transition={transition}>{children}</MotionConfig>
    </DialogProvider>
  );
}
function DialogTrigger({ children, className, style, triggerRef }) {
  const { setIsOpen, isOpen, uniqueId } = useDialog();
  const handleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setIsOpen(!isOpen);
      }
    },
    [isOpen, setIsOpen],
  );
  return (
    <motion.div
      ref={triggerRef}
      layoutId={`dialog-${uniqueId}`}
      className={cn("relative cursor-pointer", className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={style}
      role="button"
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-controls={`dialog-content-${uniqueId}`}>
      {children}
    </motion.div>
  );
}
function DialogContent({ children, className, style }) {
  const { setIsOpen, isOpen, uniqueId, triggerRef } = useDialog();
  const containerRef = useRef(null);
  const [firstFocusableElement, setFirstFocusableElement] = useState(null);
  const [lastFocusableElement, setLastFocusableElement] = useState(null);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
      if (event.key === "Tab") {
        if (!firstFocusableElement || !lastFocusableElement) return;
        if (event.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            event.preventDefault();
            lastFocusableElement.focus();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            event.preventDefault();
            firstFocusableElement.focus();
          }
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setIsOpen, firstFocusableElement, lastFocusableElement]);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const focusableElements = containerRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusableElements && focusableElements.length > 0) {
        setFirstFocusableElement(focusableElements[0]);
        setLastFocusableElement(
          focusableElements[focusableElements.length - 1],
        );
        // Delay focus slightly to allow animation to start
        requestAnimationFrame(() => {
          focusableElements[0].focus();
        });
      }
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
    } else {
      document.body.style.overflow = "";
      triggerRef.current?.focus();
    }
  }, [isOpen, triggerRef]);
  return (
    <>
      <motion.div
        ref={containerRef}
        layoutId={`dialog-${uniqueId}`}
        className={cn("overflow-hidden", className)}
        style={{
          ...style,
          willChange: "transform, opacity", // GPU acceleration
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`dialog-title-${uniqueId}`}
        aria-describedby={`dialog-description-${uniqueId}`}
        initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
        exit={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 300,
          mass: 0.8,
        }}>
        {children}
      </motion.div>
    </>
  );
}
function DialogContainer({ children, className, overlayClassName }) {
  const { isOpen, setIsOpen, uniqueId } = useDialog();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const drawerWrapper = document.querySelectorAll("[drawer-wrapper]");
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
      drawerWrapper.forEach((wrapper) => wrapper?.classList.add("open"));
    } else {
      document.body.classList.remove("overflow-hidden");
      drawerWrapper.forEach((wrapper) => wrapper?.classList.remove("open"));
    }
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);
  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);
  if (!mounted) return null;
  return createPortal(
    <AnimatePresence initial={false} mode="wait">
      {isOpen && (
        <>
          <motion.div
            key={`backdrop-${uniqueId}`}
            data-lenis-prevent
            className={cn(
              "fixed inset-0 h-full z-50 w-full backdrop-blur-2xl bg-black/60 overflow-hidden",
              overlayClassName,
            )}
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{
              duration: 0.4,
              ease: "circOut",
            }}
            onClick={() => setIsOpen(false)}>
            {/* Noise Layer */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          </motion.div>
          <motion.div
            className={cn(`fixed inset-0 z-50 w-fit mx-auto`, className)}
            style={{ willChange: "transform" }} // GPU acceleration for transforms
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
function DialogTitle({ children, className, style }) {
  const { uniqueId } = useDialog();
  return (
    <motion.h1
      layoutId={`dialog-title-container-${uniqueId}`}
      className={className}
      style={style}
      layout>
      {children}
    </motion.h1>
  );
}
function DialogSubtitle({ children, className, style }) {
  const { uniqueId } = useDialog();
  return (
    <motion.div
      layoutId={`dialog-subtitle-container-${uniqueId}`}
      className={className}
      style={style}>
      {children}
    </motion.div>
  );
}
function DialogDescription({
  children,
  className,
  variants,
  disableLayoutAnimation,
}) {
  const { uniqueId } = useDialog();
  return (
    <motion.div
      key={`dialog-description-${uniqueId}`}
      layoutId={
        disableLayoutAnimation
          ? undefined
          : `dialog-description-content-${uniqueId}`
      }
      variants={variants}
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      id={`dialog-description-${uniqueId}`}>
      {children}
    </motion.div>
  );
}
function DialogImage({ src, alt, className, style }) {
  const { uniqueId } = useDialog();
  return (
    <motion.img
      src={src}
      alt={alt}
      className={cn(className)}
      layoutId={`dialog-img-${uniqueId}`}
      style={style}
    />
  );
}
function DialogClose({ children, className, variants }) {
  const { setIsOpen, uniqueId } = useDialog();
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);
  return (
    <motion.button
      onClick={handleClose}
      type="button"
      aria-label="Close dialog"
      key={`dialog-close-${uniqueId}`}
      className={cn("absolute right-6 top-6 text-white", className)}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}>
      {children || <XIcon size={24} />}
    </motion.button>
  );
}
export {
  Dialog,
  DialogTrigger,
  DialogContainer,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogSubtitle,
  DialogDescription,
  DialogImage,
};