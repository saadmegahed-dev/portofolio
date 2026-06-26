import { Typography, Box, Stack, IconButton, useTheme } from "@mui/material";
import { GitHub, LinkedIn, Email } from "@mui/icons-material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        overflow: "hidden",
        pt: 10,
        pb: 0,
        px: 2,
        borderTop: isDark
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid rgba(0,0,0,0.08)",
        background: isDark
          ? "linear-gradient(to bottom,#050505,#0b0b0b)"
          : "linear-gradient(to bottom,#f8f8f8,#ffffff)",
      }}
    >
      {/* Glow */}
      <Box
        sx={{
          position: "absolute",
          top: -120,
          left: "50%",
          transform: "translateX(-50%)",
          width: 500,
          height: 500,
          borderRadius: "50%",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <MotionBox
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        sx={{
          position: "relative",
          zIndex: 2,
          maxWidth: "900px",
          mx: "auto",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            mb: 2,
            fontSize: { xs: "2rem", md: "3rem" },
            letterSpacing: "-0.04em",
          }}
        >
          Let’s build something amazing.
        </Typography>

        <Typography
          sx={{
            opacity: 0.7,
            maxWidth: 600,
            mx: "auto",
            lineHeight: 1.8,
            fontSize: { xs: "15px", sm: "17px" },
          }}
        >
          Frontend developer passionate about crafting smooth,
          interactive, and visually stunning digital experiences.
        </Typography>

        {/* Contact */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 5 }}
        >
          <Typography sx={{ opacity: 0.8 }}>
            saadmegahed177@gmail.com
          </Typography>

          <Box
            sx={{
              display: { xs: "none", sm: "block" },
              width: 5,
              height: 5,
              borderRadius: "50%",
              bgcolor: "text.secondary",
              opacity: 0.4,
            }}
          />

          <Typography sx={{ opacity: 0.8 }}>
            +20 109 443 1696
          </Typography>
        </Stack>

        {/* Socials */}
        <Stack
          direction="row"
          spacing={1.5}
          justifyContent="center"
          sx={{ mt: 4 }}
        >
          {[GitHub, LinkedIn, Email].map((Icon, i) => (
            <IconButton
              key={i}
              sx={{
                width: 52,
                height: 52,
                border: isDark
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid rgba(0,0,0,0.08)",
                backdropFilter: "blur(10px)",
                background: isDark
                  ? "rgba(255,255,255,0.03)"
                  : "rgba(255,255,255,0.6)",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-6px)",
                  background: isDark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(255,255,255,0.9)",
                },
              }}
            >
              <Icon />
            </IconButton>
          ))}
        </Stack>
      </MotionBox>

      {/* Huge Text */}
      <Typography
        sx={{
          mt: 10,
          textAlign: "center",
          fontWeight: 900,
          fontSize: {
            xs: "4rem",
            sm: "7rem",
            md: "11rem",
          },
          letterSpacing: "-0.08em",
          lineHeight: 0.8,
          userSelect: "none",

          background: isDark
            ? "linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.02))"
            : "linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.03))",

          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        SAAD.DEV
      </Typography>
    </Box>
  );
}

export default Footer;