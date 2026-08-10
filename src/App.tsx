import './App.css';
import { useEffect, useRef, useState } from 'react';

// Avatar
import avatar from "./assets/avatar.png";
// MUI
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
  useColorScheme,
  useMediaQuery
} from '@mui/material';
// MUI Icons
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import PublicIcon from '@mui/icons-material/Public';


// Constants
import { ABOUT } from './constants/About';
import { EDUCATION } from './constants/Education';
import { EXPERIENCES } from './constants/Experiences';
import { PROJECTS } from './constants/Projects';

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
];


const THEME_OPTIONS = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
] as const
type ThemeMode = (typeof THEME_OPTIONS)[number]['value'];

export default function App() {
  const { mode, setMode } = useColorScheme();
  const [activeSection, setActiveSection] = useState('about');
  const isDesktop = useMediaQuery('(min-width:1024px)');
  const isManualScroll = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScroll.current) return;

        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (visibleEntries.length > 0) {
          const topMostEntry = visibleEntries.reduce((prev, current) => {
            return Math.abs(current.boundingClientRect.top) < Math.abs(prev.boundingClientRect.top)
              ? current
              : prev;
          });

          setActiveSection(topMostEntry.target.id);
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -50% 0px',
        threshold: [0, 0.25, 0.5],
      }
    );

    NAV_ITEMS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    isManualScroll.current = true;

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    // Re-enable observer tracking after smooth scroll completes
    setTimeout(() => {
      isManualScroll.current = false;
    }, 1000);
  };

  const Header = () => {
    return (
      <Box
        component="header"
        sx={{
          width: { md: '40%' },
          position: { md: 'sticky' },
          top: { md: 0 },
          alignSelf: { md: 'flex-start' },
          height: { md: '100vh' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          py: { xs: 6, md: 10, lg: 12 },
          boxSizing: 'border-box',
        }}
      >
        {/* Top Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            component={'img'}
            src={avatar}
            sx={{
              height: 'auto',
              width: 256,
            }}
          />
          <Box
            sx={{
              minWidth: 256,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: 'center',
            }}
          >
            <Typography variant="h3" sx={{ color: 'text.primary' }}>
              Ted Lim
            </Typography>

            {/* Socials Stack */}
            <Stack direction="row" spacing={1}>
              <IconButton
                href="https://github.com/tlim414"
                target="_blank" aria-label="GitHub"
                sx={{
                  '&:hover': {
                    color: 'primary.main',
                  }
                }}>
                <GitHubIcon />
              </IconButton>
              <IconButton
                href="https://linkedin.com/in/tlim414"
                target="_blank" aria-label="LinkedIn"
                sx={{
                  '&:hover': {
                    color: 'primary.main',
                  }
                }}>
                <LinkedInIcon />
              </IconButton>
              <IconButton
                href="mailto:tedgitaelim@email.com"
                aria-label="Email"
                sx={{
                  '&:hover': {
                    color: 'primary.main',
                  }
                }}>
                <EmailIcon />
              </IconButton>
            </Stack>
          </Box>
        </Box>

        {/* Navigation Links */}
        {isDesktop && (
          <Stack spacing={1} component="nav" sx={{ mt: 3, width: '100%' }}>
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  sx={{
                    justifyContent: 'flex-start',
                    color: isActive ? 'primary.main' : 'text.secondary',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.875rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    p: 0,
                    minWidth: 'auto',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: isActive ? 48 : 24,
                      height: '2px',
                      backgroundColor: isActive ? 'primary.main' : 'text.secondary',
                      mr: 2,
                      transition: 'all 0.2s ease-in-out',
                    }}
                  />
                  {item.label}
                </Button>
              );
            })}
          </Stack>
        )}

        {/* Theme Mode */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Typography variant="h5">Theme</Typography>
          <TextField
            select
            label=""
            variant="outlined"
            size="small"
            value={mode ?? ''}
            onChange={(e) => setMode(e.target.value as ThemeMode)}
          >
            {THEME_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>
    );
  };

  const Content = () => {
    return (
      <Box
        component="main"
        id="content"
        sx={{
          width: { md: '60%' },
          py: { xs: 6, md: 10, lg: 12 },
        }}
      >
        {/* About Section */}
        <Box
          component="section"
          id="about"
          sx={{
            mb: { xs: 8, lg: 16 },
            scrollMarginTop: { xs: '64px', lg: '96px' },
          }}
          aria-label="About me"
        >
          {ABOUT.map((para, idx) => (
            <Typography key={idx} variant='body1' sx={{ color: 'text.primary' }}>
              {para}
            </Typography>
          ))}
        </Box>

        {/* Experience Section */}
        <Box
          component="section"
          id="experience"
          sx={{
            mb: { xs: 8, lg: 16 },
            scrollMarginTop: { xs: '64px', lg: '96px' },
          }}
        >
          <Typography variant="h4" sx={{ color: 'text.primary', mb: 3 }}>
            Experience
          </Typography>
          <Stack spacing={3}>
            {EXPERIENCES.map((exp, idx) => (
              <Card key={idx}>
                <CardContent>
                  <Box>
                    <Typography variant="h5" sx={{ color: 'text.primary' }}>
                      {exp.company}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                      {exp.role}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                      {exp.period}
                    </Typography>
                  </Box>
                  {exp.description.map((desc, idx) => (
                    <Typography key={idx} variant="body1" sx={{ mt: 1 }}>
                      {desc}
                    </Typography>
                  ))}
                  <Stack
                    direction="row"
                    spacing={1}
                    useFlexGap
                    sx={{ flexWrap: 'wrap', py: 2 }}
                  >
                    {exp.skills.map((skill, sIdx) => (
                      <Chip label={skill} key={sIdx} color="secondary" />
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>

        {/* Projects Section */}
        <Box
          component="section"
          id="projects"
          sx={{
            mb: { xs: 8, lg: 16 },
            scrollMarginTop: { xs: '64px', lg: '96px' },
          }}
        >
          <Typography variant="h4" sx={{ color: 'text.primary', mb: 3 }}>
            Projects
          </Typography>
          <Stack spacing={3}>
            {PROJECTS.map((proj, idx) => (
              <Card key={idx}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h5" sx={{ color: 'text.primary', flexGrow: 1 }}>
                      {proj.title}
                    </Typography>
                    {proj.liveLink && <IconButton href={proj.liveLink} target="_blank">
                      <PublicIcon />
                    </IconButton>}
                    <IconButton href={proj.githubLink} target="_blank">
                      <GitHubIcon />
                    </IconButton>
                  </Box>
                  {proj.description.map((desc, idx) => (
                    <Typography key={idx} variant="body1" sx={{ mt: 1 }}>
                      {desc}
                    </Typography>
                  ))}
                  <Stack
                    direction="row"
                    spacing={1}
                    useFlexGap
                    sx={{ flexWrap: 'wrap', py: 2 }}
                  >
                    {proj.skills.map((skill, sIdx) => (
                      <Chip label={skill} key={sIdx} color="secondary" />
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>

        {/* Education Section */}
        <Box
          component="section"
          id="education"
          sx={{
            mb: { xs: 8, lg: 16 },
            scrollMarginTop: { xs: '64px', lg: '96px' },
          }}
        >
          <Typography variant="h4" sx={{ color: 'text.primary', mb: 3 }}>
            Education
          </Typography>
          <Stack spacing={3}>
            {EDUCATION.map((edu, idx) => (
              <Box
                key={idx}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  textAlign: 'start',
                }}
              >
                <Typography variant="h5" sx={{ color: 'text.primary' }}>
                  {edu.institution}
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                  {edu.degree}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                  {edu.period}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        px: { xs: 3, md: 6, lg: 12 },
      }}
    >
      {/* Outer Flex Wrapper */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          gap: 4,
          width: '100%',
          flexGrow: 1,
        }}
      >
        {/* LEFT COLUMN: Fixed Header */}
        <Header />

        {/* RIGHT COLUMN: Scrollable Content */}
        <Content />
      </Box>
    </Container>
  );
}