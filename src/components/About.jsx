// import { useRef, useState, useCallback } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Grid,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import { styled, keyframes } from "@mui/material/styles";
// import {
//   motion,
//   useInView,
//   useScroll,
//   useTransform,
//   useSpring,
//   useMotionValue,
//   AnimatePresence,
// } from "framer-motion";
// import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
// import CodeIcon from "@mui/icons-material/Code";

// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

// // ─── Easing Curves ─────────────────────────────────────────────────────────────
// const EASE_EXPO = [0.16, 1, 0.3, 1];
// const EASE_BACK = [0.34, 1.56, 0.64, 1];
// const EASE_CINEMATIC = [0.22, 0.61, 0.36, 1];
// const EASE_OUT_QUART = [0.25, 1, 0.5, 1];

// // ─── Keyframes ────────────────────────────────────────────────────────────────
// const shimmer = keyframes`
//   0%   { background-position: -300% center; }
//   100% { background-position:  300% center; }
// `;

// const orbDrift = keyframes`
//   0%,100% { transform: translate(0,0) scale(1) rotate(0deg); }
//   25%      { transform: translate(50px,-40px) scale(1.08) rotate(3deg); }
//   50%      { transform: translate(20px, 30px) scale(0.95) rotate(-2deg); }
//   75%      { transform: translate(-30px,-15px) scale(1.04) rotate(1deg); }
// `;

// const scanline = keyframes`
//   0%   { transform: translateY(-100%); opacity: 0; }
//   8%   { opacity: 0.8; }
//   92%  { opacity: 0.8; }
//   100% { transform: translateY(100vh); opacity: 0; }
// `;

// const grainAnim = keyframes`
//   0%,100% { transform: translate(0,0); }
//   10%      { transform: translate(-2%,-3%); }
//   20%      { transform: translate(2%,2%); }
//   30%      { transform: translate(-1%,4%); }
//   40%      { transform: translate(3%,-1%); }
//   50%      { transform: translate(-2%,3%); }
//   60%      { transform: translate(1%,-2%); }
//   70%      { transform: translate(-3%,1%); }
//   80%      { transform: translate(2%,-3%); }
//   90%      { transform: translate(-1%,2%); }
// `;

// const ambientFloat = keyframes`
//   0%,100% { transform: translateY(0px) scale(1); opacity: 0.4; }
//   50%      { transform: translateY(-18px) scale(1.1); opacity: 0.7; }
// `;

// const pingAnim = keyframes`
//   0%   { box-shadow: 0 0 0 0 rgba(74,222,128,0.7); }
//   70%  { box-shadow: 0 0 0 10px rgba(74,222,128,0); }
//   100% { box-shadow: 0 0 0 0 rgba(74,222,128,0); }
// `;

// // ─── Styled ───────────────────────────────────────────────────────────────────
// const Root = styled(Box)(({ theme }) => ({
//   position: "relative",
//   backgroundColor: theme.palette.mode === "dark" ? "#000" : "#fff",
//   minHeight: "100vh",
//   overflow: "hidden",
//   display: "flex",
//   alignItems: "center",
//   padding: "120px 0",
//   fontFamily: "'Syne', sans-serif",
//   isolation: "isolate",
// }));
// const GrainOverlay = styled(Box)(({ theme }) => ({
//   position: "absolute",
//   inset: "-50%",
//   width: "200%",
//   height: "200%",
//   backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
//   backgroundRepeat: "repeat",
//   backgroundSize: "180px 180px",
//   opacity: theme.palette.mode === "dark" ? 0.038 : 0.022,
//   animation: `${grainAnim} 0.8s steps(1) infinite`,
//   pointerEvents: "none",
//   zIndex: 1,
//   willChange: "transform",
// }));

// const GlowOrb = styled(Box)(({ size = 480 }) => ({
//   position: "absolute",
//   width: size,
//   height: size,
//   borderRadius: "50%",
//   background:
//     "radial-gradient(circle, rgba(255,255,255,0.055) 0%, transparent 70%)",
//   filter: "blur(100px)",
//   animation: `${orbDrift} 18s ease-in-out infinite`,
//   pointerEvents: "none",
//   willChange: "transform",
// }));

// const Scanline = styled(Box)(({ theme }) => ({
//   position: "absolute",
//   left: 0,
//   right: 0,
//   height: 1,
//   background:
//     theme.palette.mode === "dark"
//       ? "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 20%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.04) 80%, transparent 100%)"
//       : "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.03) 20%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.03) 80%, transparent 100%)",
//   animation: `${scanline} 2.2s ${EASE_CINEMATIC} 0.1s forwards`,
//   pointerEvents: "none",
//   zIndex: 2,
// }));

// const HeadingGradient = styled(Typography)(({ theme }) => ({
//   background:
//     theme.palette.mode === "dark"
//       ? "linear-gradient(125deg,#ffffff 0%,#e8e8e8 25%,#a0a0a0 60%,#606060 100%)"
//       : "linear-gradient(125deg,#000000 0%,#2a2a2a 30%,#777777 70%,#b0b0b0 100%)",
//   backgroundSize: "300% auto",
//   WebkitBackgroundClip: "text",
//   WebkitTextFillColor: "transparent",
//   backgroundClip: "text",
//   animation: `${shimmer} 8s linear infinite`,
//   fontFamily: "'Syne', sans-serif",
//   fontWeight: 800,
//   lineHeight: 1.04,
//   letterSpacing: "-0.04em",
// }));

// const GlassParagraph = styled(Typography)(({ theme }) => ({
//   color:
//     theme.palette.mode === "dark"
//       ? "rgba(255,255,255,0.55)"
//       : "rgba(0,0,0,0.55)",
//   fontFamily: "'DM Sans', sans-serif",
//   lineHeight: 1.9,
//   fontWeight: 300,
// }));

// const SkillPillBase = styled(Box)(({ theme }) => ({
//   display: "inline-flex",
//   alignItems: "center",
//   gap: 8,
//   padding: "9px 18px",
//   borderRadius: 100,
//   border:
//     theme.palette.mode === "dark"
//       ? "1px solid rgba(255,255,255,0.08)"
//       : "1px solid rgba(0,0,0,0.08)",
//   background:
//     theme.palette.mode === "dark"
//       ? "rgba(255,255,255,0.035)"
//       : "rgba(0,0,0,0.035)",
//   backdropFilter: "blur(20px)",
//   cursor: "default",
//   userSelect: "none",
//   position: "relative",
//   overflow: "hidden",
//   transition: "border-color 0.3s ease",
// }));

// const FloatingBadge = styled(motion.div)(({ theme }) => ({
//   position: "absolute",
//   display: "inline-flex",
//   alignItems: "center",
//   gap: 8,
//   padding: "10px 20px",
//   borderRadius: 14,
//   border:
//     theme.palette.mode === "dark"
//       ? "1px solid rgba(255,255,255,0.10)"
//       : "1px solid rgba(0,0,0,0.10)",
//   background: "#000",
//   color: "#eee",
//   backdropFilter: "blur(24px)",
//   WebkitBackdropFilter: "blur(24px)",
//   zIndex: 2,
//   cursor: "default",
//   boxShadow:
//     theme.palette.mode === "dark"
//       ? "0 8px 40px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.06) inset"
//       : "0 8px 40px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.9) inset",
// }));

// const StatusDot = styled(Box)(() => ({
//   width: 7,
//   height: 7,
//   borderRadius: "50%",
//   background: "#4ade80",
//   animation: `${pingAnim} 2.2s cubic-bezier(0,0,0.2,1) infinite`,
//   flexShrink: 0,
// }));

// // ─── Particle System ──────────────────────────────────────────────────────────
// const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
//   id: i,
//   x: Math.random() * 100,
//   y: Math.random() * 100,
//   size: Math.random() * 2 + 0.8,
//   duration: Math.random() * 8 + 6,
//   delay: Math.random() * 6,
//   opacity: Math.random() * 0.35 + 0.08,
// }));

// function AmbientParticles({ isDark }) {
//   return (
//     <Box
//       sx={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}
//     >
//       {PARTICLES.map((p) => (
//         <Box
//           key={p.id}
//           sx={{
//             position: "absolute",
//             left: `${p.x}%`,
//             top: `${p.y}%`,
//             width: p.size,
//             height: p.size,
//             borderRadius: "50%",
//             background: isDark
//               ? `rgba(255,255,255,${p.opacity})`
//               : `rgba(0,0,0,${p.opacity * 0.6})`,
//             animation: `${ambientFloat} ${p.duration}s ease-in-out ${p.delay}s infinite`,
//           }}
//         />
//       ))}
//     </Box>
//   );
// }

// // ─── Motion Variants (unified, no duplication) ────────────────────────────────
// const V = {
//   container: {
//     hidden: {},
//     visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
//   },
//   fadeUp: {
//     hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
//     visible: {
//       opacity: 1,
//       y: 0,
//       filter: "blur(0px)",
//       transition: { duration: 0.85, ease: EASE_EXPO },
//     },
//   },
//   fadeUpSlow: {
//     hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
//     visible: {
//       opacity: 1,
//       y: 0,
//       filter: "blur(0px)",
//       transition: { duration: 1.0, ease: EASE_EXPO },
//     },
//   },
//   pillContainer: {
//     hidden: {},
//     visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
//   },
//   pill: {
//     hidden: { opacity: 0, scale: 0.75, y: 16, filter: "blur(4px)" },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       y: 0,
//       filter: "blur(0px)",
//       transition: { duration: 0.55, ease: EASE_BACK },
//     },
//   },
//   cta: {
//     hidden: { opacity: 0, y: 24, scale: 0.96 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: { duration: 0.7, ease: EASE_EXPO, delay: 0.12 },
//     },
//   },
//   orbCore: {
//     hidden: { opacity: 0, scale: 0.6, filter: "blur(12px)" },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       filter: "blur(0px)",
//       transition: { duration: 1.3, ease: EASE_EXPO },
//     },
//   },
//   badge1: {
//     hidden: { opacity: 0, x: 36, y: -12, scale: 0.9 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       y: 0,
//       scale: 1,
//       transition: { duration: 0.85, ease: EASE_EXPO, delay: 0.6 },
//     },
//   },
//   badge2: {
//     hidden: { opacity: 0, x: -36, y: 14, scale: 0.9 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       y: 0,
//       scale: 1,
//       transition: { duration: 0.85, ease: EASE_EXPO, delay: 0.8 },
//     },
//   },
//   eyebrow: {
//     hidden: { opacity: 0, y: 20, scale: 0.94 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: { duration: 0.7, ease: EASE_EXPO },
//     },
//   },
// };

// // ─── Animated Word Split ──────────────────────────────────────────────────────
// function SplitHeading({ children, inView }) {
//   const lines = children.split("\n");
//   return (
//     <>
//       {lines.map((line, li) => (
//         <Box
//           key={li}
//           sx={{ overflow: "hidden", display: "block", pb: "0.06em" }}
//         >
//           {line.split(" ").map((word, wi) => (
//             <motion.span
//               key={wi}
//               style={{ display: "inline-block", marginRight: "0.28em" }}
//               initial={{ y: "115%", opacity: 0, rotateX: -18 }}
//               animate={
//                 inView
//                   ? {
//                       y: 0,
//                       opacity: 1,
//                       rotateX: 0,
//                       transition: {
//                         duration: 0.85,
//                         ease: EASE_EXPO,
//                         delay: li * 0.14 + wi * 0.065 + 0.08,
//                       },
//                     }
//                   : { y: "115%", opacity: 0, rotateX: -18 }
//               }
//             >
//               {word}
//             </motion.span>
//           ))}
//         </Box>
//       ))}
//     </>
//   );
// }

// // ─── Parallax Wrapper ────────────────────────────────────────────────────────
// function ParallaxLayer({ children }) {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start end", "end start"],
//   });
//   const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
//   const smoothY = useSpring(y, { stiffness: 50, damping: 18, mass: 0.8 });
//   return (
//     <motion.div ref={ref} style={{ y: smoothY }}>
//       {children}
//     </motion.div>
//   );
// }

// // ─── Skill Pill with Glow ────────────────────────────────────────────────────
// function GlowPill({ skill, isDark }) {
//   const [hovered, setHovered] = useState(false);

//   return (
//     <motion.div
//       variants={V.pill}
//       onHoverStart={() => setHovered(true)}
//       onHoverEnd={() => setHovered(false)}
//       whileHover={{
//         y: -4,
//         scale: 1.06,
//         transition: { duration: 0.28, ease: EASE_BACK },
//       }}
//       whileTap={{ scale: 0.95 }}
//       style={{ display: "inline-block", position: "relative" }}
//     >
//       {/* Glow aura */}
//       <motion.div
//         animate={hovered ? { opacity: 1 } : { opacity: 0 }}
//         transition={{ duration: 0.3 }}
//         style={{
//           position: "absolute",
//           inset: -6,
//           borderRadius: 100,
//           background: isDark
//             ? "radial-gradient(ellipse, rgba(255,255,255,0.12) 0%, transparent 70%)"
//             : "radial-gradient(ellipse, rgba(0,0,0,0.07) 0%, transparent 70%)",
//           filter: "blur(8px)",
//           pointerEvents: "none",
//         }}
//       />
//       <SkillPillBase
//         sx={{
//           borderColor: hovered
//             ? isDark
//               ? "rgba(255,255,255,0.2)"
//               : "rgba(0,0,0,0.18)"
//             : isDark
//               ? "rgba(255,255,255,0.08)"
//               : "rgba(0,0,0,0.08)",
//           transition: "border-color 0.3s ease, background 0.3s ease",
//           background: hovered
//             ? isDark
//               ? "rgba(255,255,255,0.07)"
//               : "rgba(0,0,0,0.06)"
//             : isDark
//               ? "rgba(255,255,255,0.035)"
//               : "rgba(0,0,0,0.035)",
//         }}
//       >
//         <Typography
//           sx={{
//             fontSize: "0.81rem",
//             fontFamily: "'DM Sans', sans-serif",
//             fontWeight: 500,
//             letterSpacing: "0.01em",
//             color: isDark ? "rgba(255,255,255,0.82)" : "rgba(0,0,0,0.78)",
//           }}
//         >
//           {skill}
//         </Typography>
//       </SkillPillBase>
//     </motion.div>
//   );
// }

// // ─── Right Side Orb Visual ────────────────────────────────────────────────────
// function OrbVisual({ isDark, inView }) {
//   return (
//     <Box
//       sx={{
//         position: "relative",
//         height: 540,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       {/* Pulse wave rings */}
//       {[0, 0.8, 1.6].map((delay, i) => (
//         <motion.div
//           key={i}
//           style={{
//             position: "absolute",
//             width: 200,
//             height: 200,
//             borderRadius: "50%",
//             border: isDark
//               ? "1px solid rgba(255,255,255,0.06)"
//               : "1px solid rgba(0,0,0,0.06)",
//             pointerEvents: "none",
//           }}
//           animate={
//             inView
//               ? {
//                   scale: [1, 2.2],
//                   opacity: [0.5, 0],
//                 }
//               : {}
//           }
//           transition={{
//             duration: 3.2,
//             ease: "easeOut",
//             repeat: Infinity,
//             delay: delay + 1.2,
//             repeatDelay: 0.2,
//           }}
//         />
//       ))}

//       {/* Outer dashed ring — animated trace */}
//       <motion.div
//         style={{ position: "absolute", width: 360, height: 360 }}
//         initial={{ opacity: 0 }}
//         animate={inView ? { opacity: 1 } : { opacity: 0 }}
//         transition={{ delay: 0.5, duration: 0.8 }}
//       >
//         <svg
//           width="360"
//           height="360"
//           viewBox="0 0 360 360"
//           fill="none"
//           style={{ position: "absolute", top: 0, left: 0 }}
//         >
//           {/* Static dashed base */}
//           <circle
//             cx="180"
//             cy="180"
//             r="168"
//             stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}
//             strokeWidth="1"
//             strokeDasharray="3 9"
//           />
//           {/* Animated trace */}
//           <motion.circle
//             cx="180"
//             cy="180"
//             r="168"
//             stroke={isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.14)"}
//             strokeWidth="1"
//             strokeLinecap="round"
//             strokeDasharray="1056"
//             initial={{ strokeDashoffset: 1056, opacity: 0 }}
//             animate={
//               inView
//                 ? { strokeDashoffset: 0, opacity: 1 }
//                 : { strokeDashoffset: 1056, opacity: 0 }
//             }
//             transition={{
//               strokeDashoffset: {
//                 duration: 2.2,
//                 ease: EASE_CINEMATIC,
//                 delay: 0.5,
//               },
//               opacity: { duration: 0.4, delay: 0.5 },
//             }}
//           />
//         </svg>

//         {/* Orbiting dot — outer */}
//         <motion.div
//           style={{
//             position: "absolute",
//             width: 10,
//             height: 10,
//             borderRadius: "50%",
//             background: isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)",
//             top: "50%",
//             left: "50%",
//             marginTop: -168 - 5,
//             marginLeft: -5,
//             transformOrigin: `5px ${168 + 5}px`,
//             boxShadow: isDark
//               ? "0 0 12px rgba(255,255,255,0.6)"
//               : "0 0 12px rgba(0,0,0,0.3)",
//           }}
//           animate={{ rotate: 360 }}
//           transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
//           initial={{ opacity: 0 }}
//         />
//         {/* Counter-orbiting dot */}
//         <motion.div
//           style={{
//             position: "absolute",
//             width: 6,
//             height: 6,
//             borderRadius: "50%",
//             background: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)",
//             top: "50%",
//             left: "50%",
//             marginTop: -168 - 3,
//             marginLeft: -3,
//             transformOrigin: `3px ${168 + 3}px`,
//           }}
//           animate={{ rotate: -360 }}
//           transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
//           initial={{ opacity: 0 }}
//         />
//       </motion.div>

//       {/* Middle ring */}
//       <motion.div
//         style={{
//           position: "absolute",
//           width: 268,
//           height: 268,
//           borderRadius: "50%",
//           border: isDark
//             ? "1px solid rgba(255,255,255,0.06)"
//             : "1px solid rgba(0,0,0,0.06)",
//         }}
//         initial={{ scale: 0.4, opacity: 0 }}
//         animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.4, opacity: 0 }}
//         transition={{ duration: 1.1, ease: EASE_EXPO, delay: 0.4 }}
//       >
//         {/* Orbiting dot — middle ring */}
//         <motion.div
//           style={{
//             position: "absolute",
//             width: 5,
//             height: 5,
//             borderRadius: "50%",
//             background: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)",
//             top: "50%",
//             left: "50%",
//             marginTop: -134 - 2.5,
//             marginLeft: -2.5,
//             transformOrigin: `2.5px ${134 + 2.5}px`,
//           }}
//           animate={{ rotate: 360 }}
//           transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
//         />
//       </motion.div>

//       {/* Core orb */}
//       <motion.div
//         variants={V.orbCore}
//         initial="hidden"
//         animate={inView ? "visible" : "hidden"}
//         whileHover={{
//           scale: 1.06,
//           transition: { type: "spring", stiffness: 160, damping: 16 },
//         }}
//       >
//         <Box
//           sx={{
//             width: 210,
//             height: 210,
//             borderRadius: "50%",
//             background: isDark
//               ? "radial-gradient(circle at 35% 30%, #2e2e2e 0%, #101010 60%, #060606 100%)"
//               : "radial-gradient(circle at 35% 30%, #ffffff 0%, #e8e8e8 60%, #d0d0d0 100%)",
//             border: isDark
//               ? "1px solid rgba(255,255,255,0.12)"
//               : "1px solid rgba(0,0,0,0.10)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             boxShadow: isDark
//               ? "0 0 0 1px rgba(255,255,255,0.04), 0 40px 120px rgba(0,0,0,0.7), 0 0 80px rgba(255,255,255,0.03) inset"
//               : "0 0 0 1px rgba(0,0,0,0.06), 0 40px 120px rgba(0,0,0,0.15), 0 0 60px rgba(255,255,255,0.8) inset",
//             position: "relative",
//             overflow: "hidden",
//           }}
//         >
//           {/* Top sheen */}
//           <Box
//             sx={{
//               position: "absolute",
//               top: "8%",
//               left: "12%",
//               width: "44%",
//               height: "28%",
//               borderRadius: "50%",
//               background: isDark
//                 ? "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)"
//                 : "radial-gradient(circle, rgba(255,255,255,0.95) 0%, transparent 70%)",
//             }}
//           />
//           {/* Bottom shadow */}
//           <Box
//             sx={{
//               position: "absolute",
//               bottom: "8%",
//               right: "10%",
//               width: "30%",
//               height: "20%",
//               borderRadius: "50%",
//               background: isDark
//                 ? "radial-gradient(circle, rgba(0,0,0,0.5) 0%, transparent 70%)"
//                 : "radial-gradient(circle, rgba(0,0,0,0.08) 0%, transparent 70%)",
//             }}
//           />
//           <motion.div
//             animate={{ rotate: [0, 6, -6, 0], scale: [1, 1.03, 0.98, 1] }}
//             transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
//           >
//             <CodeIcon
//               sx={{
//                 fontSize: 68,
//                 color: isDark ? "rgba(255,255,255,0.92)" : "rgba(0,0,0,0.88)",
//                 filter: isDark
//                   ? "drop-shadow(0 0 12px rgba(255,255,255,0.2))"
//                   : "drop-shadow(0 0 8px rgba(0,0,0,0.1))",
//               }}
//             />
//           </motion.div>
//         </Box>
//       </motion.div>

//       {/* Badge: Available for work */}
//       <FloatingBadge
//         variants={V.badge1}
//         initial="hidden"
//         animate={inView ? "visible" : "hidden"}
//         whileHover={{
//           y: -5,
//           scale: 1.04,
//           transition: { duration: 0.24, ease: EASE_BACK },
//         }}
//         sx={{ top: 48, right: -16 }}
//       >
//         <StatusDot />
//         <Typography
//           sx={{
//             fontSize: "0.77rem",
//             fontFamily: "'DM Sans', sans-serif",
//             fontWeight: 500,
//             letterSpacing: "0.02em",
//             color: "inherit",
//             opacity: isDark ? 0.88 : 0.82,
//           }}
//         >
//           Available for work
//         </Typography>
//       </FloatingBadge>

//       {/* Badge: Performance-first */}
//       <FloatingBadge
//         variants={V.badge2}
//         initial="hidden"
//         animate={inView ? "visible" : "hidden"}
//         whileHover={{
//           y: -5,
//           scale: 1.04,
//           transition: { duration: 0.24, ease: EASE_BACK },
//         }}
//         sx={{ bottom: 62, left: -16 }}
//       >
//         <Box
//           sx={{
//             width: 7,
//             height: 7,
//             borderRadius: "50%",
//             background: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)",
//             flexShrink: 0,
//           }}
//         />
//         <Typography
//           sx={{
//             fontSize: "0.77rem",
//             fontFamily: "'DM Sans', sans-serif",
//             fontWeight: 500,
//             letterSpacing: "0.02em",
//             color: "inherit",
//             opacity: isDark ? 0.88 : 0.82,
//           }}
//         >
//           Performance-first
//         </Typography>
//       </FloatingBadge>
//     </Box>
//   );
// }

// // ─── Main Component ───────────────────────────────────────────────────────────
// const SKILLS = [
//   "React / Next.js",
//   "TypeScript",
//   "Framer Motion",
//   "Node.js APIs",
//   "GraphQL",
//   "Three.js",
//   "TailwindCSS",
//   "AI-Powered Features",
// ];

// export default function About() {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"), {
//     noSsr: true,
//   });
//   const isDark = theme.palette.mode === "dark";

//   const sectionRef = useRef(null);

//   const inView = useInView(sectionRef, { once: true, amount: 0.15 });

//   return (
//     <>
//       <Root ref={sectionRef} id="about">
//         {/* Grain overlay */}
//         <GrainOverlay />

//         {/* Scanline on mount */}
//         <Scanline />

//         {/* Dynamic mouse-follow spotlight */}
//         {!isMobile && (
//           <motion.div
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               width: "100%",
//               height: "100%",
//               pointerEvents: "none",
//               zIndex: 0,
//             }}
//           />
//         )}

//         {/* Page content */}
//         <Box
//           sx={{
//             position: "relative",
//             zIndex: 2,
//             width: "100%",
//             maxWidth: 1200,
//             mx: "auto",
//             px: { xs: 3, md: 5 },
//           }}
//         >
//           <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center">
//             {/* ── LEFT COLUMN ─────────────────────────────────────────────── */}
//             <Grid item xs={12} md={7}>
//               <motion.div
//                 variants={V.container}
//                 initial="hidden"
//                 animate={inView ? "visible" : "hidden"}
//               >
//                 {/* Eyebrow */}
//                 <motion.div variants={V.eyebrow}>
//                   <Box
//                     sx={{
//                       display: "inline-flex",
//                       alignItems: "center",
//                       gap: "8px",
//                       padding: "6px 16px 6px 10px",
//                       borderRadius: 100,
//                       border: "1px solid rgba(255, 255, 255, 0.1)",
//                       background:
//                         "linear-gradient(135deg, #16213e, #9b8ec4 60%, #1a1a2e)",
//                       backdropFilter: "blur(16px)",
//                       mb: 3.5,
//                       boxShadow: isDark
//                         ? "0 1px 0 rgba(255,255,255,0.07) inset"
//                         : "0 1px 0 rgba(255,255,255,0.6) inset",
//                     }}
//                   >
//                     <StatusDot />
//                     <Typography
//                       sx={{
//                         fontSize: "0.77rem",
//                         fontFamily: "'DM Sans', sans-serif",
//                         fontWeight: 500,
//                         letterSpacing: "0.05em",
//                         textTransform: "uppercase",
//                         color: isDark
//                           ? "rgba(255,255,255,0.65)"
//                           : "rgba(0,0,0,0.6)",
//                       }}
//                     >
//                       Open to opportunities
//                     </Typography>
//                   </Box>
//                 </motion.div>

//                 {/* Heading */}
//                 <Box sx={{ mb: 3.5, perspective: "800px" }}>
//                   <HeadingGradient
//                     variant="h1"
//                     sx={{
//                       fontSize: {
//                         xs: "2.5rem",
//                         sm: "3.1rem",
//                         md: "3.8rem",
//                         lg: "4.4rem",
//                       },
//                       fontWeight: 800,
//                     }}
//                   >
//                     <SplitHeading inView={inView}>
//                       {"Building modern\ndigital experiences."}
//                     </SplitHeading>
//                   </HeadingGradient>
//                 </Box>

//                 {/* Paragraph */}
//                 <motion.div variants={V.fadeUpSlow}>
//                   <GlassParagraph
//                     sx={{
//                       fontSize: { xs: "0.95rem", md: "1.02rem" },
//                       maxWidth: 500,
//                       mb: 5,
//                     }}
//                   >
//                     I'm a Frontend Developer focused on creating elegant,
//                     responsive, and high-performance user experiences with
//                     modern technologies and premium UI systems.
//                   </GlassParagraph>
//                 </motion.div>

//                 {/* Skill pills */}
//                 <motion.div variants={V.fadeUp}>
//                   <motion.div
//                     variants={V.pillContainer}
//                     initial="hidden"
//                     animate={inView ? "visible" : "hidden"}
//                   >
//                     <Box
//                       sx={{
//                         display: "flex",
//                         flexWrap: "wrap",
//                         gap: 1.4,
//                         mb: 5.5,
//                       }}
//                     >
//                       {SKILLS.map((skill) => (
//                         <GlowPill key={skill} skill={skill} isDark={isDark} />
//                       ))}
//                     </Box>
//                   </motion.div>
//                 </motion.div>

//                 {/* CTA */}
//                 <motion.div variants={V.cta}>
//                   <Button
//                     onClick={() =>
//                       document
//                         .getElementById("projects")
//                         ?.scrollIntoView({ behavior: "smooth" })
//                     }
//                     sx={{
//                       position: "relative",
//                       height: "48px",
//                       pl: "24px",
//                       pr: "56px",
//                       borderRadius: "999px",
//                       overflow: "hidden",
//                       textTransform: "none",
//                       fontWeight: 600,
//                       fontSize: "14px",

//                       bgcolor: isDark ? "#fff" : "#000",
//                       color: isDark ? "#000" : "#fff",

//                       transition: "all .5s ease",

//                       "& .arrow-circle": {
//                         transform: "rotate(45deg)",
//                       },

//                       "&:hover": {
//                         pl: "56px",
//                         pr: "24px",
//                         bgcolor: isDark ? "#fff" : "#000",
//                       },

//                       "&:hover .arrow-circle": {
//                         right: "calc(100% - 44px)",
//                         transform: "rotate(90deg)",
//                       },
//                     }}
//                   >
//                     <Box
//                       component="span"
//                       sx={{
//                         position: "relative",
//                         zIndex: 2,
//                         px: 0.7,
//                         fontSize: 15,
//                       }}
//                     >
//                       View My Work
//                     </Box>

//                     <Box
//                       className="arrow-circle"
//                       sx={{
//                         position: "absolute",
//                         right: 4,
//                         width: 40,
//                         height: 40,
//                         borderRadius: "50%",

//                         bgcolor: isDark ? "#000" : "#fff",
//                         color: isDark ? "#fff" : "#000",

//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         transition: "all .5s ease",
//                       }}
//                     >
//                       <ArrowUpwardIcon sx={{ fontSize: 16 }} />
//                     </Box>
//                   </Button>
//                 </motion.div>
//               </motion.div>
//             </Grid>

//             {/* ── RIGHT COLUMN ────────────────────────────────────────────── */}
//             {!isMobile && (
//               <Grid item xs={12} md={5}>
//                 <ParallaxLayer>
//                   <OrbVisual isDark={isDark} inView={inView} />
//                 </ParallaxLayer>
//               </Grid>
//             )}
//           </Grid>
//         </Box>
//       </Root>
//     </>
//   );
// }
import { useRef } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Chip,
  Grid,
  useTheme,
} from "@mui/material";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CodeIcon from "@mui/icons-material/Code";
import PaletteIcon from "@mui/icons-material/Palette";
import DevicesIcon from "@mui/icons-material/Devices";
import SpeedIcon from "@mui/icons-material/Speed";
import StorageIcon from "@mui/icons-material/Storage";
import GitHubIcon from "@mui/icons-material/GitHub";
import JavascriptIcon from "@mui/icons-material/Javascript";
import HtmlIcon from "@mui/icons-material/Html";
import CssIcon from "@mui/icons-material/Css";
import DataObjectIcon from "@mui/icons-material/DataObject";
import WebIcon from "@mui/icons-material/Web";
import BuildIcon from "@mui/icons-material/Build";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

// Spring Configs
const SPRING_SMOOTH = { stiffness: 60, damping: 20, mass: 1 };

// Animated Service Card
function ServiceCard({ icon: Icon, title, description, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Box
        sx={{
          background: isDark
            ? "rgba(255, 255, 255, 0.02)"
            : "rgba(0, 0, 0, 0.02)",
          backdropFilter: "blur(10px)",
          border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.08)"}`,
          borderRadius: "20px",
          p: 4,
          height: "100%",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.4s ease",
          cursor: "default",
          "&:hover": {
            background: isDark
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(0, 0, 0, 0.04)",
            borderColor: "rgba(0, 212, 255, 0.3)",
            transform: "translateY(-8px)",
            boxShadow: `0 20px 40px rgba(0, 0, 0, 0.4), 0 0 60px rgba(0, 212, 255, 0.15)`,
          },
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: `linear-gradient(90deg, transparent, #00d4ff, transparent)`,
            opacity: 0,
            transition: "opacity 0.4s ease",
          },
          "&:hover::before": {
            opacity: 0.6,
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "-50%",
            right: "-30%",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)`,
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />

        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: "14px",
            background: `linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(0, 212, 255, 0.1))`,
            border: `1px solid rgba(0, 212, 255, 0.3)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
            transition: "all 0.3s ease",
          }}
        >
          <Icon sx={{ color: "#00d4ff", fontSize: 26 }} />
        </Box>

        <Typography
          sx={{
            color: isDark ? "#fff" : "#1a1a1a",
            fontSize: "18px",
            fontWeight: 700,
            mb: 1.5,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            color: isDark ? "#888" : "#666",
            fontSize: "14px",
            lineHeight: 1.7,
            fontWeight: 400,
          }}
        >
          {description}
        </Typography>
      </Box>
    </motion.div>
  );
}

// Floating Particle
const FloatingParticle = ({ delay, size, x, duration }) => (
  <motion.div
    style={{
      position: "absolute",
      width: size,
      height: size,
      borderRadius: "50%",
      background: "#00d4ff",
      opacity: 0.15,
      left: x,
      top: "20%",
    }}
    animate={{
      y: [0, -100, 0],
      opacity: [0.15, 0.4, 0.15],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Animated Orb Visual for My Story section
function StoryOrb() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: 300, md: 400 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Outer pulse rings */}
      {[0, 0.8, 1.6].map((delay, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: 180,
            height: 180,
            borderRadius: "50%",
            border: `1px solid ${isDark ? "rgba(0, 212, 255, 0.1)" : "rgba(0, 212, 255, 0.15)"}`,
          }}
          animate={{
            scale: [1, 2.2],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 3.2,
            ease: "easeOut",
            repeat: Infinity,
            delay: delay + 1.2,
            repeatDelay: 0.2,
          }}
        />
      ))}

      {/* Rotating dashed ring */}
      <motion.div
        style={{ position: "absolute", width: 280, height: 280 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <svg width="280" height="280" viewBox="0 0 280 280" fill="none">
          <circle
            cx="140"
            cy="140"
            r="130"
            stroke={
              isDark ? "rgba(0, 212, 255, 0.15)" : "rgba(0, 212, 255, 0.2)"
            }
            strokeWidth="1"
            strokeDasharray="8 12"
          />
        </svg>
      </motion.div>

      {/* Counter-rotating ring */}
      <motion.div
        style={{ position: "absolute", width: 220, height: 220 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
          <circle
            cx="110"
            cy="110"
            r="100"
            stroke={isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.1)"}
            strokeWidth="1"
            strokeDasharray="4 8"
          />
        </svg>
      </motion.div>

      {/* Core orb */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.9, 1, 0.9],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Box
          sx={{
            width: 140,
            height: 140,
            borderRadius: "50%",
            background: isDark
              ? "radial-gradient(circle at 35% 30%, #1a1a2e 0%, #0a0a0a 60%, #050505 100%)"
              : "radial-gradient(circle at 35% 30%, #e0f7ff 0%, #f0f9ff 60%, #ffffff 100%)",
            border: `1px solid ${isDark ? "rgba(0, 212, 255, 0.2)" : "rgba(0, 212, 255, 0.3)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: isDark
              ? "0 0 60px rgba(0, 212, 255, 0.2), inset 0 0 40px rgba(0, 212, 255, 0.05)"
              : "0 0 60px rgba(0, 212, 255, 0.15), inset 0 0 40px rgba(0, 212, 255, 0.03)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Inner glow */}
          <Box
            sx={{
              position: "absolute",
              top: "15%",
              left: "20%",
              width: "40%",
              height: "35%",
              borderRadius: "50%",
              background: isDark
                ? "radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(0, 212, 255, 0.25) 0%, transparent 70%)",
            }}
          />
          <CodeIcon
            sx={{
              fontSize: 50,
              color: "#00d4ff",
              filter: "drop-shadow(0 0 12px rgba(0, 212, 255, 0.4))",
            }}
          />
        </Box>
      </motion.div>

      {/* Floating dots */}
      <motion.div
        style={{
          position: "absolute",
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#00d4ff",
          top: "30%",
          right: "25%",
        }}
        animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={{
          position: "absolute",
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.3)",
          bottom: "30%",
          left: "25%",
        }}
        animate={{ y: [0, 15, 0], opacity: [0.3, 0.7, 0.3] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </Box>
  );
}

// Infinite scrolling skills marquee
function SkillsMarquee() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const skillIcons = [
    <CodeIcon sx={{ fontSize: 28, color: "#00d4ff" }} />,
    <WebIcon sx={{ fontSize: 28, color: "#00d4ff" }} />,
    <DataObjectIcon sx={{ fontSize: 28, color: "#00d4ff" }} />,
    <JavascriptIcon sx={{ fontSize: 28, color: "#00d4ff" }} />,
    <HtmlIcon sx={{ fontSize: 28, color: "#00d4ff" }} />,
    <CssIcon sx={{ fontSize: 28, color: "#00d4ff" }} />,
    <PaletteIcon sx={{ fontSize: 28, color: "#00d4ff" }} />,
    <BuildIcon sx={{ fontSize: 28, color: "#00d4ff" }} />,
    <SpeedIcon sx={{ fontSize: 28, color: "#00d4ff" }} />,
    <GitHubIcon sx={{ fontSize: 28, color: "#00d4ff" }} />,
    <StorageIcon sx={{ fontSize: 28, color: "#00d4ff" }} />,
    <DevicesIcon sx={{ fontSize: 28, color: "#00d4ff" }} />,
    <StorageOutlinedIcon sx={{ fontSize: 28, color: "#00d4ff" }} />,
    <IntegrationInstructionsIcon sx={{ fontSize: 28, color: "#00d4ff" }} />,
    <AutoFixHighIcon sx={{ fontSize: 28, color: "#00d4ff" }} />,
  ];

  // Duplicate for seamless loop
  const allIcons = [...skillIcons, ...skillIcons, ...skillIcons];

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        py: 3,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "80px",
          background: `linear-gradient(90deg, ${isDark ? "#050505" : "#ffffff"}, transparent)`,
          zIndex: 2,
          pointerEvents: "none",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "80px",
          background: `linear-gradient(270deg, ${isDark ? "#050505" : "#ffffff"}, transparent)`,
          zIndex: 2,
          pointerEvents: "none",
        },
      }}
    >
      <motion.div
        animate={{ x: [0, -1920] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        }}
        style={{
          display: "flex",
          gap: 40,
          width: "fit-content",
        }}
      >
        {allIcons.map((icon, index) => (
          <Box
            key={index}
            sx={{
              width: 56,
              height: 56,
              borderRadius: "14px",
              background: isDark
                ? "rgba(255, 255, 255, 0.03)"
                : "rgba(0, 0, 0, 0.03)",
              border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "all 0.3s ease",
              "&:hover": {
                background: "rgba(0, 212, 255, 0.08)",
                borderColor: "rgba(0, 212, 255, 0.3)",
                transform: "scale(1.1)",
                boxShadow: "0 0 20px rgba(0, 212, 255, 0.2)",
              },
            }}
          >
            {icon}
          </Box>
        ))}
      </motion.div>
    </Box>
  );
}

// Main About Section
function About() {
  const sectionRef = useRef(null);
  // في بداية الـ About component، بدل:
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // استخدم:
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

// الحركات المرتبطة بالـ Scroll - يجي من الشمال ويقف
const storyX = useTransform(
  scrollYProgress,
  [0, 0.3, 0.7, 1],
  [-200, 0, 0, 0],  // من الشمال → يقف → يفضل واقف
);

const orbX = useTransform(
  scrollYProgress,
  [0, 0.3, 0.7, 1],
  [-300, 0, 0, 0],  // من الشمال → يقف → يفضل واقف
);

const storyOpacity = useTransform(
  scrollYProgress,
  [0, 0.15, 0.85, 1],
  [0, 1, 1, 1],  // يظهر ويفضل ظاهر
);

const orbOpacity = useTransform(
  scrollYProgress,
  [0, 0.15, 0.85, 1],
  [0, 1, 1, 1],
);
  // Smooth spring
  const smoothStoryX = useSpring(storyX, SPRING_SMOOTH);
  const smoothOrbX = useSpring(orbX, SPRING_SMOOTH);
  const smoothStoryOpacity = useSpring(storyOpacity, SPRING_SMOOTH);
  const smoothOrbOpacity = useSpring(orbOpacity, SPRING_SMOOTH);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  // const { scrollYProgress } = useScroll({
  //   target: sectionRef,
  //   offset: ["start end", "end start"],
  // });

  const bgY = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "20%"]),
    SPRING_SMOOTH,
  );

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
    SPRING_SMOOTH,
  );

  const services = [
    {
      icon: CodeIcon,
      title: "Clean Code",
      description:
        "Writing maintainable, scalable code with modern patterns and best practices for long-term project success.",
    },
    {
      icon: PaletteIcon,
      title: "UI/UX Design",
      description:
        "Crafting pixel-perfect interfaces with attention to detail, accessibility, and user-centered design principles.",
    },
    {
      icon: DevicesIcon,
      title: "Responsive Design",
      description:
        "Building fluid layouts that adapt seamlessly across all devices and screen sizes with mobile-first approach.",
    },
    {
      icon: SpeedIcon,
      title: "Performance",
      description:
        "Optimizing load times, bundle sizes, and rendering for lightning-fast user experiences and high SEO scores.",
    },
    {
      icon: StorageIcon,
      title: "API Integration",
      description:
        "Seamlessly connecting frontend applications with RESTful APIs, GraphQL, and real-time data services.",
    },
    {
      icon: GitHubIcon,
      title: "Version Control",
      description:
        "Managing code with Git workflows, collaborative development, and automated deployment pipelines.",
    },
  ];

  return (
    <Box
      ref={sectionRef}
      id="about"
      sx={{
        position: "relative",
        minHeight: "100vh",
        background: isDark ? "#050505" : "#ffffff",
        overflow: "hidden",
        py: { xs: 8, md: 12 },
      }}
    >
      {/* Background Grid Pattern */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundSize: "60px 60px",
          opacity: 0.5,
        }}
      />

      {/* Floating Particles */}
      <FloatingParticle delay={0} size={4} x="10%" duration={6} />
      <FloatingParticle delay={2} size={6} x="25%" duration={8} />
      <FloatingParticle delay={1} size={3} x="70%" duration={7} />
      <FloatingParticle delay={3} size={5} x="85%" duration={9} />
      <FloatingParticle delay={1.5} size={4} x="50%" duration={5} />

      {/* Gradient Orbs */}
      <motion.div
        style={{
          position: "absolute",
          top: "10%",
          left: "-10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)`,
          filter: "blur(60px)",
          y: bgY,
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "-10%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(0, 150, 200, 0.1) 0%, transparent 70%)`,
          filter: "blur(50px)",
          y: bgY,
        }}
      />

      {/* Content */}
      <Container
        sx={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1200px",
        }}
      >
        <motion.div style={{ opacity }}>
          {/* Section Header */}
          <Box sx={{ textAlign: "center", mb: { xs: 6, md: 10 } }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Typography
                sx={{
                  fontWeight: 900,
                  mb: 2,
                  lineHeight: 0.85,
                  textAlign: "center",
                  fontSize: { xs: "1.7rem", sm: "2.2rem", md: "3.5rem" },
                  background: isDark
                    ? "linear-gradient(180deg,#fff,rgba(255,255,255,0.4))"
                    : "linear-gradient(180deg,#000,#555)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "block",
                }}
              >
                About Me
              </Typography>
            </motion.div>

            {/* <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "32px", sm: "40px", md: "52px" },
                  fontWeight: 800,
                  color: isDark ? "#fff" : "#1a1a1a",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  mb: 3,
                }}
              >
                Building Digital{" "}
                <Box
                  component="span"
                  sx={{
                    background: `linear-gradient(135deg, #00d4ff, #0099cc)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Experiences
                </Box>
              </Typography>
            </motion.div> */}

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "15px", sm: "17px", md: "18px" },
                  color: isDark ? "#888" : "#666",
                  maxWidth: "600px",
                  mx: "auto",
                  lineHeight: 1.8,
                  fontWeight: 400,
                }}
              >
                I specialize in creating immersive web experiences that combine
                cutting-edge technology with thoughtful design. Every pixel
                matters, every animation has a purpose.
              </Typography>
            </motion.div>
          </Box>

          {/* My Story + Orb Visual */}
          <Grid container spacing={6} sx={{ mb: { xs: 6, md: 8 } }}>
            {/* Left: My Story - يجي من اليمين */}
            <Grid item xs={12} md={7}>
              <motion.div
                style={{
                  x: smoothStoryX,
                  opacity: smoothStoryOpacity,
                }}
              >
                <Box
                  sx={{
                    background: isDark
                      ? "rgba(255, 255, 255, 0.02)"
                      : "rgba(0, 0, 0, 0.02)",
                    border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.08)"}`,
                    borderRadius: "24px",
                    p: { xs: 3, md: 4 },
                    height: "100%",
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: "-30%",
                      right: "-20%",
                      width: "200px",
                      height: "200px",
                      borderRadius: "50%",
                      background: `radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)`,
                      filter: "blur(50px)",
                    }}
                  />

                  <Box>
                    <Typography
                      sx={{
                        color: isDark ? "#fff" : "#1a1a1a",
                        fontSize: "24px",
                        fontWeight: 700,
                        mb: 3,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      My Story
                    </Typography>

                    <Typography
                      sx={{
                        color: isDark ? "#888" : "#666",
                        fontSize: "15px",
                        lineHeight: 1.8,
                        mb: 2.5,
                      }}
                    >
                      With over 2 years of hands-on experience in frontend
                      development, I have honed my skills in building scalable
                      web applications using modern technologies like React,
                      Next.js, and TypeScript.
                    </Typography>

                    <Typography
                      sx={{
                        color: isDark ? "#888" : "#666",
                        fontSize: "15px",
                        lineHeight: 1.8,
                        mb: 2.5,
                      }}
                    >
                      I am passionate about creating smooth, interactive user
                      interfaces with Framer Motion and GSAP. My approach
                      combines technical excellence with creative
                      problem-solving to deliver products that users love.
                    </Typography>

                    <Typography
                      sx={{
                        color: isDark ? "#888" : "#666",
                        fontSize: "15px",
                        lineHeight: 1.8,
                      }}
                    >
                      When I am not coding, I am exploring new design trends,
                      contributing to open-source projects, or mentoring
                      aspiring developers in the community.
                    </Typography>
                  </Box>

                  {/* CTA Button under story */}
                  <Box sx={{ mt: 4 }}>
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

                        bgcolor: isDark ? "#fff" : "#000",
                        color: isDark ? "#000" : "#fff",

                        transition: "all .5s ease",

                        "& .arrow-circle": {
                          transform: "rotate(45deg)",
                        },

                        "&:hover": {
                          pl: "56px",
                          pr: "24px",
                          bgcolor: isDark ? "#fff" : "#000",
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

                          bgcolor: isDark ? "#000" : "#fff",
                          color: isDark ? "#fff" : "#000",

                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all .5s ease",
                        }}
                      >
                        <ArrowUpwardIcon sx={{ fontSize: 16 }} />
                      </Box>
                    </Button>
                  </Box>
                </Box>
              </motion.div>
            </Grid>

            {/* Right: Animated Orb Visual - يجي من اليمين برضه */}
            <Grid item xs={12} md={5}>
              <motion.div
                style={{
                  x: smoothOrbX,
                  opacity: smoothOrbOpacity,
                }}
              >
                <StoryOrb />
              </motion.div>
            </Grid>
          </Grid>

          {/* Skills Marquee - Icons only, infinite scroll */}
          <Box sx={{ mb: { xs: 8, md: 12 } }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: isDark ? "#888" : "#666",
                  textAlign: "center",
                  mb: 3,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                Tech Stack
              </Typography>
            </motion.div>
            <SkillsMarquee />
          </Box>

          {/* Services Grid */}
          <Box sx={{ mb: { xs: 6, md: 10 } }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "28px", sm: "36px", md: "42px" },
                  fontWeight: 800,
                  color: isDark ? "#fff" : "#1a1a1a",
                  textAlign: "center",
                  mb: 2,
                  letterSpacing: "-0.03em",
                }}
              >
                What I{" "}
                <Box
                  component="span"
                  sx={{
                    background: `linear-gradient(135deg, #00d4ff, #0099cc)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Do
                </Box>
              </Typography>
            </motion.div>

            <Grid container spacing={3} sx={{ mt: 2 }}>
              {services.map((service, index) => (
                <Grid item xs={12} sm={6} md={4} key={service.title}>
                  <ServiceCard {...service} index={index} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

export default About;
// <Grid container spacing={6} sx={{ mb: { xs: 6, md: 8 } }}>
//   {/* Left: My Story */}
//   <Grid item xs={12} md={7}>
//     <motion.div
//       initial={{ opacity: 0, x: -60 }}
//       animate={isInView ? { opacity: 1, x: 0 } : {}}
//       transition={{
//         duration: 0.8,
//         delay: 0.3,
//         ease: [0.16, 1, 0.3, 1],
//       }}
//     >
//       <Box
//         sx={{
//           background: isDark
//             ? "rgba(255, 255, 255, 0.02)"
//             : "rgba(0, 0, 0, 0.02)",
//           border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.08)"}`,
//           borderRadius: "24px",
//           p: { xs: 3, md: 4 },
//           height: "100%",
//           position: "relative",
//           overflow: "hidden",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-between",
//         }}
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: "-30%",
//             right: "-20%",
//             width: "200px",
//             height: "200px",
//             borderRadius: "50%",
//             background: `radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)`,
//             filter: "blur(50px)",
//           }}
//         />

//         <Box>
//           <Typography
//             sx={{
//               color: isDark ? "#fff" : "#1a1a1a",
//               fontSize: "24px",
//               fontWeight: 700,
//               mb: 3,
//               letterSpacing: "-0.02em",
//             }}
//           >
//             My Story
//           </Typography>

//           <Typography
//             sx={{
//               color: isDark ? "#888" : "#666",
//               fontSize: "15px",
//               lineHeight: 1.8,
//               mb: 2.5,
//             }}
//           >
//             With over 2 years of hands-on experience in frontend
//             development, I have honed my skills in building scalable
//             web applications using modern technologies like React,
//             Next.js, and TypeScript.
//           </Typography>

//           <Typography
//             sx={{
//               color: isDark ? "#888" : "#666",
//               fontSize: "15px",
//               lineHeight: 1.8,
//               mb: 2.5,
//             }}
//           >
//             I am passionate about creating smooth, interactive user
//             interfaces with Framer Motion and GSAP. My approach
//             combines technical excellence with creative
//             problem-solving to deliver products that users love.
//           </Typography>

//           <Typography
//             sx={{
//               color: isDark ? "#888" : "#666",
//               fontSize: "15px",
//               lineHeight: 1.8,
//             }}
//           >
//             When I am not coding, I am exploring new design trends,
//             contributing to open-source projects, or mentoring
//             aspiring developers in the community.
//           </Typography>
//         </Box>

//         {/* CTA Button under story */}
//         <Box sx={{ mt: 4 }}>
//           <Button
//             onClick={() =>
//               document
//                 .getElementById("projects")
//                 ?.scrollIntoView({ behavior: "smooth" })
//             }
//             sx={{
//               position: "relative",
//               height: "48px",
//               pl: "24px",
//               pr: "56px",
//               borderRadius: "999px",
//               overflow: "hidden",
//               textTransform: "none",
//               fontWeight: 600,
//               fontSize: "14px",

//               bgcolor: isDark ? "#fff" : "#000",
//               color: isDark ? "#000" : "#fff",

//               transition: "all .5s ease",

//               "& .arrow-circle": {
//                 transform: "rotate(45deg)",
//               },

//               "&:hover": {
//                 pl: "56px",
//                 pr: "24px",
//                 bgcolor: isDark ? "#fff" : "#000",
//               },

//               "&:hover .arrow-circle": {
//                 right: "calc(100% - 44px)",
//                 transform: "rotate(90deg)",
//               },
//             }}
//           >
//             <Box
//               component="span"
//               sx={{
//                 position: "relative",
//                 zIndex: 2,
//                 px: 0.7,
//                 fontSize: 15,
//               }}
//             >
//               View My Work
//             </Box>

//             <Box
//               className="arrow-circle"
//               sx={{
//                 position: "absolute",
//                 right: 4,
//                 width: 40,
//                 height: 40,
//                 borderRadius: "50%",

//                 bgcolor: isDark ? "#000" : "#fff",
//                 color: isDark ? "#fff" : "#000",

//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 transition: "all .5s ease",
//               }}
//             >
//               <ArrowUpwardIcon sx={{ fontSize: 16 }} />
//             </Box>
//           </Button>
//         </Box>
//       </Box>
//     </motion.div>
//   </Grid>

//   {/* Right: Animated Orb Visual */}
//   <Grid item xs={12} md={5}>
//     <motion.div
//       initial={{ opacity: 0, x: 60 }}
//       animate={isInView ? { opacity: 1, x: 0 } : {}}
//       transition={{
//         duration: 0.8,
//         delay: 0.4,
//         ease: [0.16, 1, 0.3, 1],
//       }}
//     >
//       <StoryOrb />
//     </motion.div>
//   </Grid>
// </Grid>
