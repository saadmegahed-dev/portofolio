
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import { useRef } from "react";

import WebIcon from "@mui/icons-material/Web";
import BrushIcon from "@mui/icons-material/Brush";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import InsightsIcon from "@mui/icons-material/Insights";
import CodeIcon from "@mui/icons-material/Code";
import SpeedIcon from "@mui/icons-material/Speed";

const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionTypography = motion(Typography);

const services = [
  {
    title: "Website Design & Development",
    desc: "High-performance digital products built with modern architecture, clean code, and scalable systems.",
    icon: <WebIcon sx={{ fontSize: 36 }} />,
    number: "01",
  },
  {
    title: "UI/UX Design",
    desc: "Intuitive interfaces focused on clarity, usability, and conversion-driven experiences.",
    icon: <BrushIcon sx={{ fontSize: 36 }} />,
    number: "02",
  },
  {
    title: "Frontend Architecture",
    desc: "Scalable component systems with React, Next.js, and modern state management patterns.",
    icon: <CodeIcon sx={{ fontSize: 36 }} />,
    number: "03",
  },
  {
    title: "Performance Optimization",
    desc: "Lightning-fast load times, Core Web Vitals excellence, and SEO-first development.",
    icon: <SpeedIcon sx={{ fontSize: 36 }} />,
    number: "04",
  },
  {
    title: "AI Automations",
    desc: "Smart AI systems that automate workflows, enhance UX, and optimize operations.",
    icon: <SmartToyIcon sx={{ fontSize: 36 }} />,
    number: "05",
  },
  {
    title: "Strategic Consultations",
    desc: "Actionable strategies that help scale products and businesses with data-driven decisions.",
    icon: <InsightsIcon sx={{ fontSize: 36 }} />,
    number: "06",
  },
];

// ───── Animations ─────
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const titleAnim = {
  hidden: { opacity: 0, y: 60, filter: "blur(12px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

const subtitleAnim = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 0.6,
    y: 0,
    transition: { duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardAnim = {
  hidden: { opacity: 0, y: 80, scale: 0.9, filter: "blur(8px)" },
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const lineAnim = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Services() {
  const theme = useTheme();
  const containerRef = useRef(null);

  // Scroll-driven parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const titleX = useTransform(scrollYProgress, [0, 0.5], ["-10%", "0%"]);

  return (
    <Box
      ref={containerRef}
      id="services"
      sx={{
        position: "relative",
        backgroundColor: "#050505",
        color: "#ffffff",
        py: { xs: 12, md: 20 },
        overflow: "hidden",
        minHeight: "100vh",
      }}
    >
      {/* Animated background gradient */}
      <motion.div
        style={{
          position: "absolute",
          top: "-20%",
          left: "-10%",
          width: "120%",
          height: "140%",
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.03) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(255,255,255,0.02) 0%, transparent 40%)",
          y: backgroundY,
          pointerEvents: "none",
        }}
      />

      {/* Grid pattern overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        {/* SECTION HEADER */}
        <Box sx={{ mb: { xs: 8, md: 12 }, position: "relative" }}>
          {/* Label */}
          <MotionBox
            variants={subtitleAnim}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            sx={{ mb: 3 }}
          >
            <Typography
              sx={{
                fontSize: "0.85rem",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              What I Do
            </Typography>
          </MotionBox>

          {/* Main Title */}
          <MotionBox
            variants={titleAnim}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            style={{ x: titleX }}
          >
            <Typography
              sx={{
                fontWeight: 800,
                mb: 3,
                lineHeight: 1.05,
                fontSize: { xs: "2.2rem", sm: "3.5rem", md: "4.5rem", lg: "5.5rem" },
                letterSpacing: "-0.03em",
                fontFamily: "'Inter', 'Syne', sans-serif",
              }}
            >
              Services that{" "}
              <Box
                component="span"
                sx={{
                  background:
                    "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.4) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                drive results
              </Box>
            </Typography>
          </MotionBox>

          {/* Subtitle */}
          <MotionBox
            variants={subtitleAnim}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            <Typography
              sx={{
                maxWidth: 600,
                opacity: 0.5,
                lineHeight: 1.8,
                fontSize: { xs: "1rem", md: "1.15rem" },
                color: "rgba(255,255,255,0.6)",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Premium digital services crafted with clarity, performance, and
              modern design systems that elevate your brand.
            </Typography>
          </MotionBox>

          {/* Decorative line */}
          <MotionBox
            variants={lineAnim}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            sx={{
              mt: 6,
              height: "1px",
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)",
              transformOrigin: "left",
            }}
          />
        </Box>

        {/* SERVICES GRID */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {services.map((service, i) => (
              <Grid item xs={12} sm={6} lg={4} key={i}>
                <MotionCard
                  custom={i}
                  variants={cardAnim}
                  whileHover={{
                    scale: 1.02,
                    y: -8,
                    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                  }}
                  sx={{
                    background: "rgba(255,255,255,0.02)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "20px",
                    boxShadow: "none",
                    transition: "0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                    position: "relative",
                    overflow: "hidden",
                    cursor: "default",
                    height: "100%",

                    "&:hover": {
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      boxShadow: "0 0 60px rgba(255,255,255,0.03)",
                    },

                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "1px",
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                      opacity: 0,
                      transition: "opacity 0.4s ease",
                    },

                    "&:hover::before": {
                      opacity: 1,
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 3, md: 4 }, position: "relative" }}>
                    {/* Number */}
                    <Typography
                      sx={{
                        position: "absolute",
                        top: 20,
                        right: 24,
                        fontSize: "0.75rem",
                        fontWeight: 300,
                        color: "rgba(255,255,255,0.15)",
                        letterSpacing: "0.1em",
                        fontFamily: "'Inter', monospace",
                      }}
                    >
                      {service.number}
                    </Typography>

                    {/* Icon with glow */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.1 + 0.2,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      viewport={{ once: true }}
                    >
                      <Box
                        sx={{
                          mb: 3,
                          width: 56,
                          height: 56,
                          borderRadius: "16px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "rgba(255,255,255,0.8)",
                          transition: "all 0.4s ease",
                        }}
                      >
                        {service.icon}
                      </Box>
                    </motion.div>

                    {/* Title */}
                    <Typography
                      sx={{
                        fontSize: "1.15rem",
                        fontWeight: 600,
                        mb: 1.5,
                        letterSpacing: "-0.01em",
                        color: "rgba(255,255,255,0.95)",
                        fontFamily: "'Inter', sans-serif",
                        lineHeight: 1.3,
                      }}
                    >
                      {service.title}
                    </Typography>

                    {/* Description */}
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.4)",
                        lineHeight: 1.7,
                        fontSize: "0.95rem",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {service.desc}
                    </Typography>

                    {/* Hover indicator line */}
                    <Box
                      sx={{
                        mt: 3,
                        height: "1px",
                        width: "30%",
                        background:
                          "linear-gradient(90deg, rgba(255,255,255,0.2), transparent)",
                        transition: "width 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                      }}
                      className="hover-line"
                    />
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Bottom decorative element */}
        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          sx={{
            mt: { xs: 10, md: 16 },
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "0.8rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.2)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Ready to build something great?
          </Typography>
        </MotionBox>
      </Container>
    </Box>
  );
}
