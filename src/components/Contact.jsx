import { useState, useRef, useCallback, useMemo, memo } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Box,
  Typography,
  Stack,
  Chip,
  useTheme,
  alpha,
  styled,
} from "@mui/material";

import { keyframes } from "@mui/material/styles";

// ─── Animation Constants ──────────────────────────────────────────────────────
const EASE_EXPO = [0.16, 1, 0.3, 1];
const EASE_BACK = [0.34, 1.56, 0.64, 1];

const fadeUp = (delay = 0, duration = 0.9) => ({
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration, ease: EASE_EXPO, delay },
  },
});

const stagger = (delayChildren = 0.05) => ({
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren } },
});

// ─── Static Data ──────────────────────────────────────────────────────────────
const KEY_POINTS = [
  { label: "Availability", value: "Open to full-time & freelance", icon: "◎" },
  { label: "Response Time", value: "Usually within 24 hours", icon: "⟳" },
  { label: "Collaboration", value: "Remote-first, async-friendly", icon: "⬡" },
];
const HEADING_WORDS = ["Let's", "Work", "Together."];
const SOCIAL_LINKS = ["Github", "LinkedIn"];

// ─── Styled Components ────────────────────────────────────────────────────────
const SectionRoot = styled(Box)(({ theme }) => ({
  position: "relative",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: theme.palette.background.default,
  overflow: "hidden",
  padding: "80px 24px",
  fontFamily: theme.typography.fontFamily,
}));

const CardInner = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  background:
    theme.palette.mode === "dark"
      ? alpha(theme.palette.background.paper, 0.45)
      : alpha(theme.palette.background.paper, 0.86),
  backdropFilter: "blur(28px) saturate(150%)",
  WebkitBackdropFilter: "blur(28px) saturate(150%)",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius * 5,
  padding: "clamp(24px, 4vw, 44px)",
  boxShadow:
    theme.palette.mode === "dark"
      ? `0 2px 0 ${alpha("#fff", 0.05)} inset, 0 48px 96px ${alpha("#000000", 0.6)}, 0 0 0 1px ${alpha("#000", 0.5)}`
      : `0 2px 0 ${alpha("#fff", 0.95)} inset, 0 24px 64px ${alpha("#000", 0.08)}`,
}));

const FieldRoot = styled(Box)({
  position: "relative",
});

const FieldLabel = styled(motion.label)(({ theme }) => ({
  position: "absolute",
  left: 16,
  transformOrigin: "left center",
  fontSize: "0.875rem",
  fontWeight: 500,
  pointerEvents: "none",
  zIndex: 2,
  fontFamily: theme.typography.fontFamily,
  letterSpacing: "0.01em",
  color: theme.palette.text.secondary,
}));

const baseInputStyles = (theme) => ({
  width: "100%",
  boxSizing: "border-box",
  background: alpha(
    theme.palette.mode === "dark" ? "#ffffff" : "#000",
    theme.palette.mode === "dark" ? 0.028 : 0.018,
  ),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius * 3,
  fontSize: "0.9rem",
  color: theme.palette.text.primary,
  fontFamily: theme.typography.fontFamily,
  outline: "none",
  transition: "border-color 0.22s ease",
  position: "relative",
  zIndex: 1,
  "&:-webkit-autofill": {
    WebkitBoxShadow: `0 0 0 100px ${theme.palette.background.paper} inset`,
    WebkitTextFillColor: theme.palette.text.primary,
  },
});

const StyledInput = styled("input")(({ theme }) => ({
  ...baseInputStyles(theme),
  padding: "22px 16px 10px",
  height: 58,
}));

const StyledTextarea = styled("textarea")(({ theme }) => ({
  ...baseInputStyles(theme),
  padding: "28px 16px 14px",
  resize: "none",
  lineHeight: 1.65,
}));

const SubmitButtonInner = styled(motion.div)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  borderRadius: theme.shape.borderRadius * 3,
  padding: "17px 28px",
  fontSize: "0.875rem",
  fontWeight: 600,
  letterSpacing: "0.04em",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  fontFamily: theme.typography.fontFamily,
  transition: "background 0.2s ease",
}));

const SocialLink = styled(motion.a)(({ theme }) => ({
  padding: "7px 14px",
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${theme.palette.divider}`,
  background: alpha(
    theme.palette.mode === "dark" ? "#ffffff" : "#000",
    theme.palette.mode === "dark" ? 0.032 : 0.025,
  ),
  backdropFilter: "blur(10px)",
  fontSize: "0.72rem",
  fontWeight: 600,
  letterSpacing: "0.04em",
  color: theme.palette.text.secondary,
  textDecoration: "none",
  display: "inline-block",
}));

const KeyPointIcon = styled(motion.div)(({ theme }) => ({
  width: 34,
  height: 34,
  borderRadius: theme.shape.borderRadius * 2.25,
  border: `1px solid ${theme.palette.divider}`,
  background: alpha(
    theme.palette.mode === "dark" ? "#ffffff" : "#000",
    theme.palette.mode === "dark" ? 0.032 : 0.025,
  ),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.85rem",
  color: theme.palette.text.secondary,
  flexShrink: 0,
  backdropFilter: "blur(8px)",
}));

// ─── NoiseOverlay ─────────────────────────────────────────────────────────────
const NoiseOverlay = memo(() => (
  <Box
    component="svg"
    aria-hidden="true"
    sx={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      opacity: 0.032,
      pointerEvents: "none",
      zIndex: 0,
    }}
  >
    <filter id="noise-contact">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.72"
        numOctaves="4"
        stitchTiles="stitch"
      />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise-contact)" />
  </Box>
));
NoiseOverlay.displayName = "NoiseOverlay";

// ─── OrbitParticle ────────────────────────────────────────────────────────────
const OrbitParticle = memo(
  ({ radius, duration, size, opacity, startAngle = 0 }) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const ringColor = alpha(isDark ? "#ffffff" : "#000", isDark ? 0.06 : 0.04);
    const particleColor = isDark
      ? `rgba(160,140,255,${opacity})`
      : `rgba(80,80,120,${opacity})`;
    const particleGlow = isDark
      ? `0 0 ${size * 3}px rgba(160,140,255,${opacity * 1.5})`
      : "none";

    return (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          width: radius * 2,
          height: radius * 2,
          borderRadius: "50%",
          border: `1px solid ${ringColor}`,
          top: "50%",
          left: "50%",
          marginTop: -radius,
          marginLeft: -radius,
          rotate: startAngle,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -size / 2,
            left: "50%",
            marginLeft: `-${size / 2}px`,
            width: size,
            height: size,
            borderRadius: "50%",
            background: particleColor,
            boxShadow: particleGlow,
          }}
        />
      </motion.div>
    );
  },
);
OrbitParticle.displayName = "OrbitParticle";

// ─── LoadingDots ──────────────────────────────────────────────────────────────
const LoadingDots = memo(() => {
  const theme = useTheme();
  return (
    <Stack direction="row" gap="4px" alignItems="center" sx={{ height: 20 }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 0.7,
            repeat: Infinity,
            delay: i * 0.14,
            ease: "easeInOut",
          }}
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: alpha(
              theme.palette.text.primary,
              theme.palette.mode === "dark" ? 0.28 : 0.22,
            ),
          }}
        />
      ))}
    </Stack>
  );
});
LoadingDots.displayName = "LoadingDots";

// ─── PremiumField ─────────────────────────────────────────────────────────────
const PremiumField = memo(
  ({ label, name, value, onChange, error, multiline, rows, type = "text" }) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const [focused, setFocused] = useState(false);
    const floated = focused || value.length > 0;

    const borderColor = error
      ? theme.palette.error.main
      : focused
        ? alpha(theme.palette.text.primary, isDark ? 0.5 : 0.55)
        : theme.palette.divider;

    const focusRingShadow = isDark
      ? "0 0 0 3px rgba(180,160,255,0.12), 0 0 20px rgba(140,120,255,0.08)"
      : `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`;

    return (
      <FieldRoot>
        <FieldLabel
          animate={{
            y: floated ? -22 : 0,
            scale: floated ? 0.78 : 1,
            color: focused
              ? alpha(theme.palette.text.primary, 0.75)
              : theme.palette.text.secondary,
          }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          style={{
            top: multiline ? 16 : "50%",
            translateY: multiline ? 0 : "-50%",
          }}
        >
          {label}
        </FieldLabel>

        <motion.div
          animate={{ opacity: focused ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "absolute",
            inset: -1,
            borderRadius: theme.shape.borderRadius * 3,
            boxShadow: focusRingShadow,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {multiline ? (
          <StyledTextarea
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            rows={rows ?? 5}
            style={{ borderColor }}
          />
        ) : (
          <StyledInput
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{ borderColor }}
          />
        )}

        <AnimatePresence>
          {error && (
            <motion.p
              role="alert"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              style={{
                margin: "5px 0 0 4px",
                fontSize: "0.72rem",
                color: theme.palette.error.main,
                fontFamily: theme.typography.fontFamily,
              }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </FieldRoot>
    );
  },
);
PremiumField.displayName = "PremiumField";

const shimmer = keyframes`
  0%   { background-position: -300% center; }
  100% { background-position:  300% center; }
`;

const HeadingGradient = styled(Typography)(({ theme }) => ({
  background:
    theme.palette.mode === "dark"
      ? "linear-gradient(125deg,#ffffff 0%,#e8e8e8 25%,#a0a0a0 60%,#606060 100%)"
      : "linear-gradient(125deg,#000000 0%,#2a2a2a 30%,#777777 70%,#b0b0b0 100%)",
  backgroundSize: "300% auto",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  animation: `${shimmer} 8s linear infinite`,
  fontFamily: "'Syne', sans-serif",
  fontWeight: 800,
  lineHeight: 1.04,
  letterSpacing: "-0.04em",
}));

// ─── MagneticButton ───────────────────────────────────────────────────────────
const MagneticButton = memo(({ children, onClick, disabled, loading, type = "button" }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 22 });
  const springY = useSpring(y, { stiffness: 280, damping: 22 });

  const handleMove = useCallback(
    (e) => {
      if (!ref.current || disabled) return;
      const rect = ref.current.getBoundingClientRect();
      x.set((e.clientX - rect.left - rect.width / 2) * 0.22);
      y.set((e.clientY - rect.top - rect.height / 2) * 0.22);
    },
    [disabled, x, y],
  );

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const btnBg = disabled
    ? alpha(theme.palette.text.primary, 0.1)
    : theme.palette.text.primary;
  const btnColor = disabled
    ? alpha(theme.palette.text.primary, 0.3)
    : theme.palette.background.default;
  const btnShadow =
    !disabled && !isDark
      ? "0 4px 24px rgba(0,0,0,0.16), 0 1px 0 rgba(255,255,255,0.12) inset"
      : "none";

  return (
    <motion.button
      ref={ref}
      type={type}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      disabled={disabled}
      aria-busy={loading}
      style={{
        x: springX,
        y: springY,
        width: "100%",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        padding: 0,
        background: "transparent",
      }}
      whileTap={!disabled ? { scale: 0.97 } : {}}
    >
      <SubmitButtonInner
        whileHover={!disabled ? { scale: 1.018 } : {}}
        transition={{ type: "spring", stiffness: 340, damping: 24 }}
        style={{ background: btnBg, color: btnColor, boxShadow: btnShadow }}
      >
        {!disabled && (
          <motion.div
            initial={{ x: "-110%", skewX: "-18deg" }}
            whileHover={{ x: "110%" }}
            transition={{ duration: 0.55, ease: EASE_EXPO }}
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.14) 50%, transparent 100%)",
              pointerEvents: "none",
            }}
          />
        )}
        {children}
      </SubmitButtonInner>
    </motion.button>
  );
});
MagneticButton.displayName = "MagneticButton";

function SplitHeading({ children, inView }) {
  const lines = children.split("\n");
  return (
    <>
      {lines.map((line, li) => (
        <Box
          key={li}
          sx={{ overflow: "hidden", display: "block", pb: "0.06em" }}
        >
          {line.split(" ").map((word, wi) => (
            <motion.span
              key={wi}
              style={{ display: "inline-block", marginRight: "0.28em" }}
              initial={{ y: "115%", opacity: 0, rotateX: -18 }}
              animate={
                inView
                  ? {
                      y: 0,
                      opacity: 1,
                      rotateX: 0,
                      transition: {
                        duration: 0.85,
                        ease: EASE_EXPO,
                        delay: li * 0.14 + wi * 0.065 + 0.08,
                      },
                    }
                  : { y: "115%", opacity: 0, rotateX: -18 }
              }
            >
              {word}
            </motion.span>
          ))}
        </Box>
      ))}
    </>
  );
}

// ─── CardShell ────────────────────────────────────────────────────────────────
const CardShell = memo(({ children }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [hovered, setHovered] = useState(false);

  const gradientBorder = isDark
    ? "linear-gradient(135deg, rgba(120,100,255,0.35) 0%, rgba(255,255,255,0.08) 50%, rgba(80,200,255,0.2) 100%)"
    : "linear-gradient(135deg, rgba(80,60,200,0.18) 0%, rgba(0,0,0,0.06) 50%, rgba(20,120,200,0.12) 100%)";

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: theme.shape.borderRadius * 5,
      }}
    >
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: "absolute",
          inset: -1,
          borderRadius: theme.shape.borderRadius * 5 + 1,
          background: gradientBorder,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <CardInner>{children}</CardInner>
    </motion.div>
  );
});
CardShell.displayName = "CardShell";

// ─── SuccessState ─────────────────────────────────────────────────────────────
const SuccessState = memo(() => {
  const theme = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: EASE_BACK }}
    >
      <Stack
        alignItems="center"
        gap={2}
        sx={{ py: 8, px: 3, textAlign: "center" }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: EASE_BACK, delay: 0.1 }}
        >
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              bgcolor: "rgba(74,222,128,0.12)",
              border: "1px solid rgba(74,222,128,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.4rem",
            }}
          >
            ✓
          </Box>
        </motion.div>
        <Typography variant="body1" fontWeight={600} color="text.primary">
          Message sent!
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ lineHeight: 1.6 }}
        >
          I'll get back to you within 24 hours.
        </Typography>
      </Stack>
    </motion.div>
  );
});
SuccessState.displayName = "SuccessState";

// ─── FormBody ─────────────────────────────────────────────────────────────────
const FormBody = memo(({ form, errors, loading, onChange, onSubmit }) => (
  <motion.form
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    noValidate
  >
    <Stack gap={2.5}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 2,
        }}
      >
        <PremiumField
          label="Name"
          name="name"
          value={form.name}
          onChange={onChange}
          error={errors.name}
        />
        <PremiumField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          error={errors.email}
        />
      </Box>
      <PremiumField
        label="Subject"
        name="subject"
        value={form.subject}
        onChange={onChange}
        error={errors.subject}
      />
      <PremiumField
        label="Message"
        name="message"
        value={form.message}
        onChange={onChange}
        error={errors.message}
        multiline
        rows={5}
      />
      
      {errors.general && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            margin: "0 0 0 4px",
            fontSize: "0.72rem",
            color: "#ff6b6b",
            fontFamily: "inherit",
          }}
        >
          {errors.general}
        </motion.p>
      )}
      
      <Box sx={{ mt: 0.5 }}>
        <MagneticButton 
          type="submit"
          disabled={loading} 
          loading={loading}
        >
          {loading ? (
            <LoadingDots />
          ) : (
            <>
              <Typography
                component="span"
                sx={{
                  fontSize: "inherit",
                  fontWeight: "inherit",
                  letterSpacing: "inherit",
                }}
              >
                Send Message
              </Typography>
              <span style={{ marginLeft: 2 }}>→</span>
            </>
          )}
        </MagneticButton>
      </Box>
    </Stack>
    <Typography
      variant="caption"
      sx={{
        display: "block",
        mt: 2.5,
        textAlign: "center",
        color: "text.disabled",
        lineHeight: 1.6,
      }}
    >
      No spam, ever. Your information stays private.
    </Typography>
  </motion.form>
));
FormBody.displayName = "FormBody";

// ─── Contact (root) ───────────────────────────────────────────────────────────
export default function Contact() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springMX = useSpring(mouseX, { stiffness: 60, damping: 30 });
  const springMY = useSpring(mouseY, { stiffness: 60, damping: 30 });
  const glowX = useTransform(springMX, (v) => `${v}px`);
  const glowY = useTransform(springMY, (v) => `${v}px`);

  const handleMouseMove = useCallback(
    (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    },
    [mouseX, mouseY],
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = useCallback(() => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  }, [form]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => (p[name] ? { ...p, [name]: undefined } : p));
  }, []);

  const handleSubmit = useCallback(async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("access_key", "0c419efa-6030-4711-9d18-fa0838d2addc");
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("subject", form.subject);
      formData.append("message", form.message);
      formData.append("from_name", "Portfolio Contact");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSent(true);
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSent(false), 6000);
      } else {
        setErrors({ general: data.message || "Failed to send. Please try again." });
      }
    } catch (err) {
      setErrors({ general: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  }, [validate, form]);

  const accentLineColor = alpha(
    isDark ? "#ffffff" : "#000",
    isDark ? 0.1 : 0.07,
  );
  const glowColor = isDark ? "rgba(110,90,255,0.07)" : "rgba(80,60,200,0.04)";
  const headingGradient = isDark
    ? "linear-gradient(140deg, #ffffff 0%, #c8c8c8 45%, #707070 100%)"
    : "linear-gradient(140deg, #000 0%, #2a2a2a 45%, #888888 100%)";

  const accentLines = useMemo(
    () => [
      {
        top: "12%",
        left: 0,
        width: "28%",
        background: `linear-gradient(90deg, transparent, ${accentLineColor} 60%, transparent)`,
        transformOrigin: "left",
        delay: 0.6,
      },
      {
        bottom: "14%",
        right: 0,
        width: "22%",
        background: `linear-gradient(270deg, transparent, ${accentLineColor} 60%, transparent)`,
        transformOrigin: "right",
        delay: 0.8,
      },
    ],
    [accentLineColor],
  );

  return (
    <SectionRoot
      id="contact"
      ref={sectionRef}
      component="section"
      aria-label="Contact"
      onMouseMove={handleMouseMove}
    >
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "15%",
            right: "8%",
            width: 220,
            height: 220,
          }}
        >
          <OrbitParticle radius={110} duration={18} size={4} opacity={0.55} />
          <OrbitParticle
            radius={80}
            duration={12}
            size={3}
            opacity={0.35}
            startAngle={120}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: "18%",
            left: "4%",
            width: 160,
            height: 160,
          }}
        >
          <OrbitParticle
            radius={80}
            duration={22}
            size={3}
            opacity={0.4}
            startAngle={60}
          />
        </Box>
      </Box>

      {accentLines.map(({ delay, ...style }, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1.4, ease: EASE_EXPO, delay }}
          style={{ position: "absolute", height: 1, zIndex: 0, ...style }}
        />
      ))}

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 1120,
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 440px), 1fr))",
          gap: "clamp(40px, 6vw, 96px)",
          alignItems: "start",
        }}
      >
        <motion.div
          variants={stagger(0.05)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ paddingTop: 8 }}
        >
          <motion.div variants={fadeUp(0)} style={{ marginBottom: 28 }}>
            <Chip
              component={motion.div}
              whileHover={{
                scale: 1.04,
                borderColor: alpha(
                  theme.palette.text.primary,
                  isDark ? 0.22 : 0.2,
                ),
              }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              label={
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#000",
                  }}
                >
                  Open for Work
                </Typography>
              }
              variant="outlined"
              sx={{
                borderRadius: 99,
                border: `1px solid ${theme.palette.divider}`,
                background:
                  "linear-gradient(135deg, #16213e, #00d4ff 60%, #001930)",
                backdropFilter: "blur(12px)",
                cursor: "default",
                height: 30,
                "& .MuiChip-label": { px: 1 },
                "& .MuiChip-icon": { ml: 0, mr: 0 },
              }}
            />
          </motion.div>

          <Box sx={{ mb: 3.5, perspective: "800px" }}>
            <HeadingGradient
              variant="h1"
              sx={{
                fontSize: {
                  xs: "2.5rem",
                  sm: "3.1rem",
                  md: "3.8rem",
                  lg: "4.4rem",
                },
                fontWeight: 800,
              }}
            >
              <SplitHeading inView={inView}>
                {"Let's work together."}
              </SplitHeading>
            </HeadingGradient>
          </Box>

          <motion.div variants={fadeUp(0.38)}>
            <Typography
              variant="body1"
              sx={{
                mb: 5.5,
                color: "text.secondary",
                lineHeight: 1.78,
                maxWidth: 400,
                fontWeight: 400,
                fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)",
              }}
            >
              I'm a software engineer open to new opportunities — whether that's
              a long-term product role, a focused freelance project, or a
              technical consulting engagement.
            </Typography>
          </motion.div>

          <motion.div variants={stagger(0.42)}>
            {KEY_POINTS.map((pt, i) => (
              <motion.div
                key={pt.label}
                variants={fadeUp(0)}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={2}
                  sx={{
                    py: 2,
                    borderBottom:
                      i < KEY_POINTS.length - 1
                        ? `1px solid ${theme.palette.divider}`
                        : "none",
                    cursor: "default",
                  }}
                >
                  <KeyPointIcon
                    whileHover={{ rotate: 90, scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  >
                    {pt.icon}
                  </KeyPointIcon>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        fontWeight: 700,
                        letterSpacing: "0.11em",
                        textTransform: "uppercase",
                        color: "text.disabled",
                        mb: 0.25,
                      }}
                    >
                      {pt.label}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.primary", lineHeight: 1.5 }}
                    >
                      {pt.value}
                    </Typography>
                  </Box>
                </Stack>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp(0.6)}>
            <Stack direction="row" gap={1.25} sx={{ mt: 4 }}>
              {SOCIAL_LINKS.map((s) => (
                <SocialLink
                  key={s}
                  href="#"
                  whileHover={{
                    y: -2,
                    borderColor: alpha(
                      theme.palette.text.primary,
                      isDark ? 0.22 : 0.2,
                    ),
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                >
                  {s}
                </SocialLink>
              ))}
            </Stack>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 44, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.0, ease: EASE_EXPO, delay: 0.26 }}
        >
          <CardShell>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 3.5 }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "text.disabled",
                }}
              >
                Send a Message
              </Typography>
              <Stack aria-hidden="true" direction="row" gap="6px">
                {["#fe5f57", "#febc2e", "#27c840"].map((bg, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      bgcolor: bg,
                      opacity: 0.72,
                    }}
                  />
                ))}
              </Stack>
            </Stack>

            <AnimatePresence mode="wait">
              {sent ? (
                <SuccessState key="success" />
              ) : (
                <FormBody
                  key="form"
                  form={form}
                  errors={errors}
                  loading={loading}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                />
              )}
            </AnimatePresence>
          </CardShell>
        </motion.div>
      </Box>
    </SectionRoot>
  );
}