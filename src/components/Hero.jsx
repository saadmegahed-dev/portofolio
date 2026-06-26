import { useRef, useEffect } from "react";
import { Container, Typography, Button, Box, Chip } from "@mui/material";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import heroImage from "../images/hero-image.png";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CodeIcon from "@mui/icons-material/Code";

// ─── Animated Icons (Framer Motion SVG) ───────────────────────────────────────

// ─── Tech Stack Icon ── Animated Code Brackets ────────────────────────────────
const TechStackIcon = () => (
  <motion.svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#000"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <motion.path
      d="M16 18l6-6-6-6"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        repeatDelay: 0.5,
        ease: "easeInOut",
      }}
    />
    <motion.path
      d="M8 6l-6 6 6 6"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        repeatDelay: 0.5,
        ease: "easeInOut",
        delay: 0.2,
      }}
    />
    <motion.line
      x1="12"
      y1="2"
      x2="12"
      y2="22"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: [0, 1, 1, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.svg>
);

// ─── Performance Icon ── Animated Lightning Bolt ─────────────────────────────
const PerformanceIcon = () => (
  <motion.svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#000000"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <motion.path
      d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
      initial={{ pathLength: 0, opacity: 0, scale: 0.8 }}
      animate={{ pathLength: 1, opacity: 1, scale: [0.8, 1.1, 1] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        repeatDelay: 0.8,
        ease: "easeInOut",
      }}
    />
    <motion.circle
      cx="12"
      cy="12"
      r="2"
      fill="#fff"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        repeatDelay: 0.8,
        ease: "easeOut",
      }}
    />
  </motion.svg>
);

// ═══════════════════════════════════════════════════════════════════════════════
// ─── Spring Configs ─────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════
const SPRING_SMOOTH = { stiffness: 60, damping: 20, mass: 1 };
const SPRING_SNAPPY = { stiffness: 90, damping: 22, mass: 0.8 };

// ═══════════════════════════════════════════════════════════════════════════════
// ─── Floating Animations ──────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════
const floatAnimation = {
  y: [0, -12, 0],
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
};

const floatAnimationDelayed = {
  y: [0, -10, 0],
  transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 },
};

// ═══════════════════════════════════════════════════════════════════════════════
// ─── Hero Component ─────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════
function Hero() {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const bgYRaw = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgY = useSpring(bgYRaw, SPRING_SMOOTH);

  const bgScaleRaw = useTransform(scrollYProgress, [0, 1], [1.08, 1.0]);
  const bgScale = useSpring(bgScaleRaw, SPRING_SMOOTH);

  const overlayOpacityRaw = useTransform(scrollYProgress, [0, 0.6], [1, 1.35]);
  const overlayOpacity = useSpring(overlayOpacityRaw, SPRING_SMOOTH);

  const textYRaw = useTransform(scrollYProgress, [0, 0.65], ["0px", "-60px"]);
  const textY = useSpring(textYRaw, SPRING_SMOOTH);

  const textOpacityRaw = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const textOpacity = useSpring(textOpacityRaw, SPRING_SNAPPY);

  const ctaScaleRaw = useTransform(scrollYProgress, [0, 0.4], [1, 0.88]);
  const ctaScale = useSpring(ctaScaleRaw, SPRING_SNAPPY);

  const ctaOpacityRaw = useTransform(scrollYProgress, [0.1, 0.45], [1, 0]);
  const ctaOpacity = useSpring(ctaOpacityRaw, SPRING_SNAPPY);

  return (
    <Box
      ref={heroRef}
      id="hero"
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* ═══ Parallax Background ═══ */}
      <motion.div
        style={{
          position: "absolute",
          inset: "-15% 0",
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          y: bgY,
          scale: bgScale,
          transformOrigin: "center center",
          willChange: "transform",
        }}
      />

      {/* ═══ Gradient Overlay ═══ */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.9) 100%)",
          opacity: overlayOpacity,
          zIndex: 1,
          willChange: "opacity",
        }}
      />

      {/* ═══ Content ═══ */}
      <Container
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 4,
        }}
      >
        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* ─── LEFT SIDE: Main Content ──────────────────────────────────────── */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <Box sx={{ flex: 1, maxWidth: { xs: "100%", sm: "60%", md: "45%" } }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: -10 }} 
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              style={{
                y: textY,
                opacity: textOpacity,
                willChange: "transform, opacity",
              }}
            >
              {/* ── Glass Card ── */}
              <Box
                sx={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(16px) saturate(150%)",
                  WebkitBackdropFilter: "blur(16px) saturate(150%)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "24px",
                  boxShadow: `
                    0 8px 32px rgba(0, 0, 0, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1)
                  `,
                  p: { xs: 3, sm: 3, md: 4 },
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.4s ease",
                  mb: 2,
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.1)",
                    borderColor: "rgba(255, 255, 255, 0.25)",
                    boxShadow: `
                      0 12px 40px rgba(0, 0, 0, 0.4),
                      0 0 60px rgba(255, 255, 255, 0.05),
                      inset 0 1px 0 rgba(255, 255, 255, 0.15)
                    `,
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  },
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "-50%",
                    right: "-20%",
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
                    filter: "blur(40px)",
                    pointerEvents: "none",
                  }}
                />

                <Typography
                  sx={{
                    fontSize: { xs: "15px", sm: "17px", md: "20px" },
                    letterSpacing: 0.3,
                    lineHeight: 1.7,
                    color: "rgba(255, 255, 255, 0.85)",
                    fontWeight: 400,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      fontWeight: 600,
                      background: "#000",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Front-End Developer{" "}
                  </Box>
                  crafting pixel-perfect, high-performance web experiences. I
                  transform complex designs into clean, interactive interfaces
                  using React, TypeScript, and modern animation libraries.
                </Typography>
              </Box>

              {/* ── CTA Button ── */}
              <motion.div
                style={{
                  scale: ctaScale,
                  opacity: ctaOpacity,
                  transformOrigin: "left center",
                  display: "inline-block",
                  willChange: "transform, opacity",
                }}
              >
                <Button
                  onClick={() =>
                    document
                      .getElementById("projects")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  sx={{
                    position: "relative",
                    height: "48px",
                    pl: "24px",
                    pr: "56px",
                    borderRadius: "999px",
                    overflow: "hidden",
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "14px",
                    bgcolor: "#fff",
                    color: "#000",
                    transition: "all .5s ease",
                    "& .arrow-circle": {
                      transform: "rotate(45deg)",
                    },
                    "&:hover": {
                      pl: "56px",
                      pr: "24px",
                      bgcolor: "#fff",
                    },
                    "&:hover .arrow-circle": {
                      right: "calc(100% - 44px)",
                      transform: "rotate(90deg)",
                    },
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      position: "relative",
                      zIndex: 2,
                      px: 0.7,
                      fontSize: 15,
                    }}
                  >
                    View My Work
                  </Box>

                  <Box
                    className="arrow-circle"
                    sx={{
                      position: "absolute",
                      right: 4,
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      bgcolor: "#000",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all .5s ease",
                    }}
                  >
                    <ArrowUpwardIcon sx={{ fontSize: 16 }} />
                  </Box>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </Box>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* ─── RIGHT SIDE: Floating Cards ─────────────────────────────────── */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            gap: 3,
            position: "relative",
            width: "400px",
            flexShrink: 0,
          }}
        >
          {/* ── Card 1: Tech Stack ── */}
          <motion.div
            animate={floatAnimation}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Box
              sx={{
                width: "280px",
                left: "140px",
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(16px) saturate(150%)",
                WebkitBackdropFilter: "blur(16px) saturate(150%)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "20px",
                p: 3,
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.09)",
                  borderColor: "rgba(102, 126, 234, 0.4)",
                  transform: "translateY(-4px) scale(1.02)",
                  boxShadow: "0 20px 40px rgba(102, 126, 234, 0.15)",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: "#fff",
                  opacity: 0.6,
                },
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                {/* ═══ Animated Tech Stack Icon ═══ */}
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "12px",
                    background:
                      "linear-gradient(135deg, #dfdfdf21 0%, #b1afaf33 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.39)",
                  }}
                >
                  <TechStackIcon />
                </Box>
                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "16px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Tech Stack
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {["React", "Next.js", "TypeScript", "Tailwind","Node.js"].map((tech) => (
                  <Chip
                    key={tech}
                    label={tech}
                    size="small"
                    sx={{
                      bgcolor: "rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.9)",
                      fontWeight: 500,
                      fontSize: "12px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      "&:hover": {
                        bgcolor: "rgba(102, 126, 234, 0.2)",
                        borderColor: "rgba(102, 126, 234, 0.4)",
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          </motion.div>

          {/* ── Card 2: Performance ── */}
          <motion.div
            animate={floatAnimationDelayed}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Box
              sx={{
                width: "280px",
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(16px) saturate(150%)",
                WebkitBackdropFilter: "blur(16px) saturate(150%)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "20px",
                p: 3,
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.09)",
                  borderColor: "rgba(118, 75, 162, 0.4)",
                  transform: "translateY(-4px) scale(1.02)",
                  boxShadow: "0 20px 40px rgba(118, 75, 162, 0.15)",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: "#fff",
                  opacity: 0.6,
                },
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                {/* ═══ Animated Performance Icon ═══ */}
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "12px",
                    background:
                      "linear-gradient(135deg, #dfdfdf21 0%, #b1afaf33 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.39)",
                  }}
                >
                  <PerformanceIcon />
                </Box>
                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "16px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Performance
                </Typography>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {[
                  { label: "Lighthouse", value: "98+" },
                  { label: "Load Time", value: "<1s" },
                  { label: "Accessibility", value: "100%" },
                ].map((stat) => (
                  <Box
                    key={stat.label}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.6)",
                        fontSize: "13px",
                        fontWeight: 400,
                      }}
                    >
                      {stat.label}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#000000",
                        fontSize: "14px",
                        fontWeight: 700,
                        background: "#000000",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {stat.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}

export default Hero;
// vertical image

// You are given a task to integrate an existing React component in the codebase

// The codebase should support:
// - shadcn project structure
// - Tailwind CSS
// - Typescript

// If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

// Determine the default path for components and styles.
// If default path for components is not /components/ui, provide instructions on why it's important to create this folder
// Copy-paste this component to /components/ui folder:
// ```tsx
// vertical-image-stack.tsx
// "use client"

// import { useState, useCallback, useEffect, useRef } from "react"
// import { motion, type PanInfo } from "framer-motion"
// import Image from "next/image"

// const images = [
//   {
//     id: 1,
//     src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/luxury-black-sneaker-with-red-sole-on-grey-backgro-hj40sZT8MUUSeLz18VN7EjhcnV0kSD.jpg",
//     alt: "Black sneaker with red sole",
//   },
//   {
//     id: 2,
//     src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/white-minimalist-sneaker-on-light-background-xQxkXgGrSrAe6pvLPNC6yrh20Atqoa.jpg",
//     alt: "White minimalist sneaker",
//   },
//   {
//     id: 3,
//     src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/navy-blue-running-shoe-on-gradient-background-E1spqSK9gDvh3gTNwASkttEg76nZgm.jpg",
//     alt: "Navy blue running shoe",
//   },
//   {
//     id: 4,
//     src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/red-athletic-sneaker-on-dark-background-skamDX1NbCRW4jvHxijkfmCnHGr6NJ.jpg",
//     alt: "Red athletic sneaker",
//   },
//   {
//     id: 5,
//     src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/green-forest-hiking-boot-on-natural-background-T41PNLzI60G2u6rFIRxeCbKT6RWKOH.jpg",
//     alt: "Green hiking boot",
//   },
// ]

// export function VerticalImageStack() {
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const lastNavigationTime = useRef(0)
//   const navigationCooldown = 400 // ms between navigations

//   const navigate = useCallback((newDirection: number) => {
//     const now = Date.now()
//     if (now - lastNavigationTime.current < navigationCooldown) return
//     lastNavigationTime.current = now

//     setCurrentIndex((prev) => {
//       if (newDirection > 0) {
//         return prev === images.length - 1 ? 0 : prev + 1
//       }
//       return prev === 0 ? images.length - 1 : prev - 1
//     })
//   }, [])

//   const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
//     const threshold = 50
//     if (info.offset.y < -threshold) {
//       navigate(1)
//     } else if (info.offset.y > threshold) {
//       navigate(-1)
//     }
//   }

//   const handleWheel = useCallback(
//     (e: WheelEvent) => {
//       if (Math.abs(e.deltaY) > 30) {
//         if (e.deltaY > 0) {
//           navigate(1)
//         } else {
//           navigate(-1)
//         }
//       }
//     },
//     [navigate],
//   )

//   useEffect(() => {
//     window.addEventListener("wheel", handleWheel, { passive: true })
//     return () => window.removeEventListener("wheel", handleWheel)
//   }, [handleWheel])

//   const getCardStyle = (index: number) => {
//     const total = images.length
//     let diff = index - currentIndex
//     if (diff > total / 2) diff -= total
//     if (diff < -total / 2) diff += total

//     if (diff === 0) {
//       return { y: 0, scale: 1, opacity: 1, zIndex: 5, rotateX: 0 }
//     } else if (diff === -1) {
//       return { y: -160, scale: 0.82, opacity: 0.6, zIndex: 4, rotateX: 8 }
//     } else if (diff === -2) {
//       return { y: -280, scale: 0.7, opacity: 0.3, zIndex: 3, rotateX: 15 }
//     } else if (diff === 1) {
//       return { y: 160, scale: 0.82, opacity: 0.6, zIndex: 4, rotateX: -8 }
//     } else if (diff === 2) {
//       return { y: 280, scale: 0.7, opacity: 0.3, zIndex: 3, rotateX: -15 }
//     } else {
//       return { y: diff > 0 ? 400 : -400, scale: 0.6, opacity: 0, zIndex: 0, rotateX: diff > 0 ? -20 : 20 }
//     }
//   }

//   const isVisible = (index: number) => {
//     const total = images.length
//     let diff = index - currentIndex
//     if (diff > total / 2) diff -= total
//     if (diff < -total / 2) diff += total
//     return Math.abs(diff) <= 2
//   }

//   return (
//     <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-background">
//       {/* Subtle ambient glow */}
//       <div className="pointer-events-none absolute inset-0">
//         <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/[0.02] blur-3xl" />
//       </div>

//       {/* Card Stack */}
//       <div className="relative flex h-[500px] w-[320px] items-center justify-center" style={{ perspective: "1200px" }}>
//         {images.map((image, index) => {
//           if (!isVisible(index)) return null
//           const style = getCardStyle(index)
//           const isCurrent = index === currentIndex

//           return (
//             <motion.div
//               key={image.id}
//               className="absolute cursor-grab active:cursor-grabbing"
//               animate={{
//                 y: style.y,
//                 scale: style.scale,
//                 opacity: style.opacity,
//                 rotateX: style.rotateX,
//                 zIndex: style.zIndex,
//               }}
//               transition={{
//                 type: "spring",
//                 stiffness: 300,
//                 damping: 30,
//                 mass: 1,
//               }}
//               drag={isCurrent ? "y" : false}
//               dragConstraints={{ top: 0, bottom: 0 }}
//               dragElastic={0.2}
//               onDragEnd={handleDragEnd}
//               style={{
//                 transformStyle: "preserve-3d",
//                 zIndex: style.zIndex,
//               }}
//             >
//               <div
//                 className="relative h-[420px] w-[280px] overflow-hidden rounded-3xl bg-card ring-1 ring-border/20"
//                 style={{
//                   boxShadow: isCurrent
//                     ? "0 25px 50px -12px hsl(var(--foreground) / 0.15), 0 0 0 1px hsl(var(--foreground) / 0.05)"
//                     : "0 10px 30px -10px hsl(var(--foreground) / 0.1)",
//                 }}
//               >
//                 {/* Card inner glow - uses foreground with low opacity */}
//                 <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-foreground/10 via-transparent to-transparent" />

//                 <Image
//                   src={image.src || "/placeholder.svg"}
//                   alt={image.alt}
//                   fill
//                   className="object-cover w-full h-full"
//                   draggable={false}
//                   priority={isCurrent}
//                 />

//                 {/* Bottom gradient overlay - uses background color */}
//                 <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background/60 to-transparent" />
//               </div>
//             </motion.div>
//           )
//         })}
//       </div>

//       {/* Navigation dots */}
//       <div className="absolute right-8 top-1/2 flex -translate-y-1/2 flex-col gap-2">
//         {images.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => {
//               if (index !== currentIndex) {
//                 setCurrentIndex(index)
//               }
//             }}
//             className={`h-2 w-2 rounded-full transition-all duration-300 ${
//               index === currentIndex ? "h-6 bg-foreground" : "bg-foreground/30 hover:bg-foreground/50"
//             }`}
//             aria-label={`Go to image ${index + 1}`}
//           />
//         ))}
//       </div>

//       {/* Instruction hint */}
//       <motion.div
//         className="absolute bottom-12 left-1/2 -translate-x-1/2"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 1, duration: 0.6 }}
//       >
//         <div className="flex flex-col items-center gap-2 text-muted-foreground">
//           <motion.div
//             animate={{ y: [0, -8, 0] }}
//             transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
//           >
//             <svg
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M12 5v14M5 12l7-7 7 7" />
//             </svg>
//           </motion.div>
//           <span className="text-xs font-medium tracking-widest uppercase">Scroll or drag</span>
//           <motion.div
//             animate={{ y: [0, 8, 0] }}
//             transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
//           >
//             <svg
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M12 5v14M19 12l-7 7-7-7" />
//             </svg>
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* Counter */}
//       <div className="absolute left-8 top-1/2 -translate-y-1/2">
//         <div className="flex flex-col items-center">
//           <span className="text-4xl font-light text-foreground tabular-nums">
//             {String(currentIndex + 1).padStart(2, "0")}
//           </span>
//           <div className="my-2 h-px w-8 bg-foreground/20" />
//           <span className="text-sm text-muted-foreground tabular-nums">{String(images.length).padStart(2, "0")}</span>
//         </div>
//       </div>
//     </div>
//   )
// }

// demo.tsx
// import { VerticalImageStack } from "@/components/ui/vertical-image-stack"

// export default function Home() {
//   return (
//     <main className="min-h-screen w-full select-none">
//       <VerticalImageStack />
//     </main>
//   )
// }

// ```

// Install NPM dependencies:
// ```bash
// next, framer-motion
// ```

// Implementation Guidelines
//  1. Analyze the component structure and identify all required dependencies
//  2. Review the component's argumens and state
//  3. Identify any required context providers or hooks and install them
//  4. Questions to Ask
//  - What data/props will be passed to this component?
//  - Are there any specific state management requirements?
//  - Are there any required assets (images, icons, etc.)?
//  - What is the expected responsive behavior?
//  - What is the best place to use this component in the app?

// Steps to integrate
//  0. Copy paste all the code above in the correct directories
//  1. Install external dependencies
//  2. Fill image assets with Unsplash stock images you know exist
//  3. Use lucide-react icons for svgs or logos if component requires them
