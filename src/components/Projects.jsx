import { useState, useCallback, useEffect, useRef } from "react";
import { Box, Typography, Button } from "@mui/material";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useTheme } from "@mui/material/styles";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const projects = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop",
    alt: "Red Nike sneaker",
    title: "Nike Store App",
    href: "https://example.com/project1",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=800&fit=crop",
    alt: "Green Nike sneaker",
    title: "Sneaker Dashboard",
    href: "https://example.com/project2",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=800&fit=crop",
    alt: "White sneaker",
    title: "E-Commerce Platform",
    href: "https://example.com/project3",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=800&fit=crop",
    alt: "Black and white sneaker",
    title: "Portfolio Website",
    href: "https://example.com/project4",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&h=800&fit=crop",
    alt: "Brown leather boot",
    title: "Fashion Landing Page",
    href: "https://example.com/project5",
  },
];

export default function Projects() {
  const theme = useTheme();

  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Scroll-driven animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Convert scroll progress to image index
  const rawIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, projects.length - 1],
  );

  useMotionValueEvent(rawIndex, "change", (latest) => {
    const next = Math.round(latest);
    setCurrentIndex(Math.min(Math.max(next, 0), projects.length - 1));
  });

  const getCardStyle = (index) => {
    const total = projects.length;
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    if (diff === 0) {
      return { y: 0, scale: 1, opacity: 1, zIndex: 5, rotateX: 0 };
    } else if (diff === -1) {
      return { y: -160, scale: 0.82, opacity: 0.6, zIndex: 4, rotateX: 8 };
    } else if (diff === -2) {
      return { y: -280, scale: 0.7, opacity: 0.3, zIndex: 3, rotateX: 15 };
    } else if (diff === 1) {
      return { y: 160, scale: 0.82, opacity: 0.6, zIndex: 4, rotateX: -8 };
    } else if (diff === 2) {
      return { y: 280, scale: 0.7, opacity: 0.3, zIndex: 3, rotateX: -15 };
    } else {
      return {
        y: diff > 0 ? 400 : -400,
        scale: 0.6,
        opacity: 0,
        zIndex: 0,
        rotateX: diff > 0 ? -20 : 20,
      };
    }
  };

  const isVisible = (index) => {
    const total = projects.length;
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return Math.abs(diff) <= 2;
  };

  const handleCardClick = (href) => {
    window.open(href, "_blank");
  };

  // هل فيه hover على الكارت الحالي؟
  const isAnyHovered = hoveredIndex !== null;

  return (
    <Box
      ref={containerRef}
      id="projects"
      sx={{
        height: `${projects.length * 80}vh`,
        position: "relative",
        background: (theme) =>
          theme.palette.mode === "dark" ? "#050505" : "#ffffff",
        p: { xs: 3, sm: 5, md: 8 },
      }}
    >
      {/* Sticky container */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Ambient glow */}
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.02)"
                : "rgba(0,0,0,0.02)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        {/* Card Stack */}
        <Box
          sx={{
            position: "relative",
            display: "flex",
            height: 500,
            width: 320,
            alignItems: "center",
            justifyContent: "center",
            perspective: "1200px",
          }}
        >
          {projects.map((project, index) => {
            if (!isVisible(index)) return null;
            const style = getCardStyle(index);
            const isCurrent = index === currentIndex;
            const isHovered = hoveredIndex === index;

            // الكروت اللي مش الحالية تتضبب لما الكارت الحالية يتهافر
            const shouldBlur = isAnyHovered && !isCurrent;

            return (
              <motion.div
                key={project.id}
                style={{
                  position: "absolute",
                  transformStyle: "preserve-3d",
                  zIndex: style.zIndex,
                }}
                animate={{
                  y: style.y,
                  scale:
                    isHovered && isCurrent ? style.scale * 1.02 : style.scale,
                  opacity: style.opacity,
                  rotateX: style.rotateX,
                  filter: shouldBlur ? "blur(4px) brightness(0.6)" : "blur(0px) brightness(1)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 1,
                }}
                onMouseEnter={() => isCurrent && setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Box
                  sx={{
                    position: "relative",
                    height: 420,
                    width: { xs: 340, sm: 400, md: 500 },
                    overflow: "hidden",
                    borderRadius: "24px",
                    background: (theme) =>
                      theme.palette.mode === "dark" ? "#1a1a1a" : "#f5f5f5",
                    boxShadow: isCurrent
                      ? (theme) =>
                          theme.palette.mode === "dark"
                            ? "0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)"
                            : "0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)"
                      : (theme) =>
                          theme.palette.mode === "dark"
                            ? "0 10px 30px -10px rgba(0,0,0,0.3)"
                            : "0 10px 30px -10px rgba(0,0,0,0.1)",
                    border: (theme) =>
                      `1px solid ${
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.08)"
                          : "rgba(0,0,0,0.08)"
                      }`,
                    transition: "box-shadow 0.3s ease",
                    "&:hover": isCurrent
                      ? {
                          boxShadow:
                            theme.palette.mode === "dark"
                              ? "0 30px 60px -12px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1)"
                              : "0 30px 60px -12px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08)",
                        }
                      : {},
                  }}
                >
                  {/* Top gradient */}
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "24px",
                      background:
                        "linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)",
                      pointerEvents: "none",
                      zIndex: 1,
                    }}
                  />

                  {/* Project Image */}
                  <Box
                    component="img"
                    src={project.src}
                    alt={project.alt}
                    draggable={false}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition:
                        "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                      transform: isHovered ? "scale(1.05)" : "scale(1)",
                    }}
                  />

                  {/* Bottom gradient */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 180,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
                      pointerEvents: "none",
                      zIndex: 2,
                    }}
                  />

                  {/* Project Title & Button */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      p: 3,
                      zIndex: 3,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "20px",
                        fontWeight: 600,
                        color: "#fff",
                        mb: 1.5,
                        fontFamily: "'Syne', sans-serif",
                        textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                        opacity: isCurrent ? 1 : 0,
                        transform: isCurrent
                          ? "translateY(0)"
                          : "translateY(10px)",
                        transition: "all 0.4s ease 0.1s",
                      }}
                    >
                      {project.title}
                    </Typography>

                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(project.href);
                      }}
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
                        View Page
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
                  </Box>
                </Box>
              </motion.div>
            );
          })}
        </Box>

        {/* Navigation dots */}
        <Box
          sx={{
            position: "absolute",
            right: { xs: 0, sm: 20, md: 32 },
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {projects.map((project, index) => (
            <Button
              key={index}
              onClick={() => {
                const container = containerRef.current;
                if (container) {
                  const targetScroll =
                    (index / (projects.length - 1)) *
                    (container.scrollHeight - window.innerHeight);
                  window.scrollTo({ top: targetScroll, behavior: "smooth" });
                }
              }}
              sx={{
                minWidth: 0,
                width: index === currentIndex ? 6 : 8,
                height: index === currentIndex ? 24 : 8,
                borderRadius: index === currentIndex ? "3px" : "50%",
                padding: 0,
                transition: "all 0.3s ease",
                backgroundColor:
                  index === currentIndex
                    ? "#00d4ff"
                    : (theme) =>
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.3)"
                          : "rgba(0,0,0,0.3)",
                "&:hover": {
                  backgroundColor:
                    index === currentIndex
                      ? "#00d4ff"
                      : (theme) =>
                          theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.5)"
                            : "rgba(0,0,0,0.5)",
                },
              }}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </Box>

        {/* Counter */}
        <Box
          sx={{
            position: "absolute",
            left: { xs: 0, sm: 20, md: 32 },
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "36px",
              fontWeight: 300,
              color: (theme) =>
                theme.palette.mode === "dark" ? "#fff" : "#1a1a1a",
              fontVariantNumeric: "tabular-nums",
              fontFamily: "'Syne', sans-serif",
            }}
          >
            {String(currentIndex + 1).padStart(2, "0")}
          </Typography>
          <Box
            sx={{
              width: 32,
              height: 1,
              my: 1,
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.2)"
                  : "rgba(0,0,0,0.2)",
            }}
          />
          <Typography
            sx={{
              fontSize: "14px",
              color: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.5)"
                  : "rgba(0,0,0,0.5)",
              fontVariantNumeric: "tabular-nums",
              fontFamily: "'Syne', sans-serif",
            }}
          >
            {String(projects.length).padStart(2, "0")}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}